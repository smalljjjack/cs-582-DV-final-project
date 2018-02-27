function drawForceDirectedGraph(year) {
    var w = 800;
    var h = 400;

    // var year = 1949;

    var nodes = []
    teamListByYear[year].forEach(function (d) {
        entry = { name: d };
        nodes.push(entry);
        // console.log(d);
    });
    var links = [];
    gameResults[year].forEach(function (d) {
        // console.log(d.away_team);
        entry = { source: teamListByYear[year].indexOf(d.home_team), target: teamListByYear[year].indexOf(d.away_team) };
        links.push(entry);
    });

    var dataset = {
        nodes: nodes,
        edges: links
    }

    //Initialize a simple force layout, using the nodes and edges in dataset
    var force = d3.forceSimulation(dataset.nodes)
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink(dataset.edges))
        .force("center", d3.forceCenter().x(w / 2).y(h / 2));
    var colors = d3.scaleOrdinal(d3.schemeCategory10);
    //Create SVG element
    var svg = d3.select("#forceDirectedGraph")
        .attr("width", w)
        .attr("height", h);

    //Create edges as lines
    var edges = svg.selectAll("line")
        .data(dataset.edges)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1);

    //Create nodes as circles
    var nodes = svg.selectAll("circle")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .style("fill", function (d, i) {
            return colors(i);
        })
        .call(d3.drag()  //Define what to do on drag events
            .on("start", dragStarted)
            .on("drag", dragging)
            .on("end", dragEnded));
    //Add a simple tooltip
    // nodes.append("title")
    //     .text(function (d) {
    //         return d.name;
    //     });

    nodes
        .on("mouseover", function (d) {
            // console.log(d);
            nodes
                .style("fill", function (d1) {
                    return d1 == d ? "red" : "grey";
                })

            d3.select("#tooltip").transition(200).style("opacity", 0.9);

            d3.select('#tooltip')
                .html(d.name)
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY - 28) + 'px')
        })
        .on("mouseout", function (d) {
            nodes
                .style("fill", function (d, i) {
                    return colors(i);
                })
            d3.select("#tooltip").transition().duration(500).style("opacity", 0);
        })
        .on("click", function (d) {
            console.log(d);
            var team = d.name;
            activeTeam = team;
            yearFrom = year - 2 >= 1900 ? year - 2 : 1900;
            yearTo = year + 2 <= 2018 ? year + 2 : 2018;
            $("#winLoseBar").empty();
            var [winLoseTotal, asHost, asGuest] = getWinLoseData(yearFrom, yearTo, team);
            drawWinLoseBar(winLoseTotal, asHost, asGuest, team);
        })

    //Every time the simulation "ticks", this will be called
    force.on("tick", function () {
        edges.attr("x1", function (d) { return d.source.x/1.2; })
            .attr("y1", function (d) { return d.source.y/1.2; })
            .attr("x2", function (d) { return d.target.x/1.2; })
            .attr("y2", function (d) { return d.target.y/1.2; });

        nodes.attr("cx", function (d) { return d.x/1.2; })
            .attr("cy", function (d) { return d.y/1.2; });

    });
    //Define drag event functions
    function dragStarted(d) {
        if (!d3.event.active) force.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragging(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    function dragEnded(d) {
        if (!d3.event.active) force.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}
