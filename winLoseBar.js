function getWinLoseData(yearFrom, yearTo, team) {
    var winLoseTotal = { 'win': 0, 'lose': 0, 'defend': 0 };
    var asGuest = {};
    var asHost = {};

    while (yearFrom <= yearTo) {
        gameResults[yearFrom].forEach(function (d) {
            if (d.away_team == team || d.home_team == team) {
                // console.log(d);
                gameCity = d.city;
                if (d.away_team == team) {
                    if (!(gameCity in asGuest)) {
                        asGuest[gameCity] = { 'win': 0, 'lose': 0, 'defend': 0 };
                    }
                    if (d.away_score > d.home_score) {
                        winLoseTotal['win']++;
                        asGuest[gameCity]['win']++;
                    } else if (d.away_score == d.home_score) {
                        winLoseTotal['defend']++;
                        asGuest[gameCity]['defend']++;
                    } else {
                        winLoseTotal['lose']++;
                        asGuest[gameCity]['lose']++;
                    }
                } else if (d.home_team == team) {
                    if (!(gameCity in asHost)) {
                        asHost[gameCity] = { 'win': 0, 'lose': 0, 'defend': 0 };
                    }
                    if (d.home_score > d.away_score) {
                        winLoseTotal['win']++;
                        asHost[gameCity]['win']++;
                    } else if (d.home_score == d.away_score) {
                        winLoseTotal['defend']++;
                        asHost[gameCity]['defend']++;
                    } else {
                        winLoseTotal['lose']++;
                        asHost[gameCity]['lose']++;
                    }
                }
            }
        });
        yearFrom += 1;
    }

    return [winLoseTotal, asHost, asGuest]
}

function drawWinLoseBar(winLoseTotal, asHost, asGuest, team) {

    var hostCities = Object.keys(asHost);
    var guestCities = Object.keys(asGuest);
    var cities = hostCities.concat(guestCities);

    var totalWidth = 800;
    var totalHeight = 400;

    var margin = { top: 20, right: 20, bottom: 30, left: 40 };
    var width = totalWidth - margin.left - margin.right;
    var height = totalHeight - margin.top - margin.bottom;

    var svg = d3.select("#winLoseBar")
        .attr("width", totalWidth)
        .attr("height", totalHeight)

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(cities);
    y.domain([0, Math.max(winLoseTotal['win'], winLoseTotal['lose'] + winLoseTotal['defend'])]);

    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0" + height + ")")
    //     .call(d3.axisBottom(x));


    g.append("g")
        .attr("class", "axis axis--yw")
        .attr("y", 10)
        .attr("transform", "translate(0, -" + height / 2 + ")")
        .call(d3.axisLeft(y))
    // .ticks(10, "%"))
    // .append("text")
    // .attr("y", 120)
    // .attr("dy", "0.71em")
    // .attr("text-anchor", "end")
    // .text("Numbers")

    y.range([0, height])
    g.append("g")
        .attr("class", "axis axis--yl")
        .attr("y", 40)
        // .attr("transform", "rotate(180 0 10)")
        .attr("transform", "translate(0," + height / 2 + ")")
        .call(d3.axisLeft(y))

    y.range([height, 0])
    g.selectAll(".bar")
        .data(hostCities)
        .enter()
        .append("rect")
        .attr("class", "host_win")
        .attr("x", function (d) { return x(d) })
        .attr("y", function (d) { return y(asHost[d]['win']) })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(asHost[d]['win']) })
        .attr("transform", "translate(0, -" + height / 2 + ")")
        .attr("fill", "green")
        .on("mouseover", mouseOverHostWin)
        .on("mouseout", mouseOut)



    g.selectAll(".bar")
        .data(hostCities)
        .enter()
        .append("rect")
        .attr("class", "host_lose")
        .attr("x", function (d) { return x(d) })
        .attr("y", height / 2)
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return -y(asHost[d]['lose'] + asHost[d]['defend']) + height; })
        .attr("fill", "red")
        .on("mouseover", mouseOverHostLose)
        .on("mouseout", mouseOut)

    g.selectAll(".bar")
        .data(guestCities)
        .enter()
        .append("rect")
        .attr("class", "guest_win")
        .attr("x", function (d) { return x(d) })
        .attr("y", function (d) { return y(asGuest[d]['win']) })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(asGuest[d]['win']) })
        .attr("transform", "translate(0, -" + height / 2 + ")")
        .attr("fill", "blue")
        .on("mouseover", mouseOverGuestWin)
        .on("mouseout", mouseOut)

    g.selectAll(".bar")
        .data(guestCities)
        .enter()
        .append("rect")
        .attr("class", "guest_lose")
        .attr("x", function (d) { return x(d) })
        .attr("y", height / 2)
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return -y(asGuest[d]['lose'] + asGuest[d]['defend']) + height; })
        .attr("fill", "yellow")
        .on("mouseover", mouseOverGuestLose)
        .on("mouseout", mouseOut)

    function mouseOverHostWin(d) {
        console.log(d);
        d3.select("#tooltip").transition(200).style("opacity", 0.9);

        d3.select('#tooltip')
            .html(toolTip(d, team, 'HostWin'))
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 28) + 'px')
    }
    function mouseOverHostLose(d) {
        console.log(d);
        d3.select("#tooltip").transition(200).style("opacity", 0.9);

        d3.select('#tooltip')
            .html(toolTip(d, team, 'HostLose'))
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 28) + 'px')
    }
    function mouseOverGuestWin(d) {
        console.log(d);
        d3.select("#tooltip").transition(200).style("opacity", 0.9);

        d3.select('#tooltip')
            .html(toolTip(d, team, 'GuestWin'))
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 28) + 'px')
    }
    function mouseOverGuestLose(d) {
        console.log(d);
        d3.select("#tooltip").transition(200).style("opacity", 0.9);

        d3.select('#tooltip')
            .html(toolTip(d, team, 'GuestLose'))
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 28) + 'px')
    }

    function mouseOut(d) {
        console.log(d);
        d3.select("#tooltip").transition().duration(500).style("opacity", 0);
    }

    function toolTip(city, team, mode) {
        if (mode === 'HostWin') {
            return 'City: ' + city
                + '<br>' + 'Team: ' + team + ' as Host'
                + '<br>' + 'game played: ' + (asHost[city]['win'] + asHost[city]['lose'] + asHost[city]['defend'])
                + '<br>' + 'win: ' + asHost[city]['win']
        } else if (mode === 'HostLose') {
            return 'City: ' + city
                + '<br>' + 'Team: ' + team + ' as Host'
                + '<br>' + 'game played: ' + (asHost[city]['win'] + asHost[city]['lose'] + asHost[city]['defend'])
                + '<br>' + 'lose or defend: ' + (asHost[city]['lose'] + asHost[city]['defend']);
        } else if (mode === 'GuestWin') {
            return 'City: ' + city
                + '<br>' + 'Team: ' + team + ' as Guest'
                + '<br>' + 'game played: ' + (asGuest[city]['win'] + asGuest[city]['lose'] + asGuest[city]['defend'])
                + '<br>' + 'win: ' + asGuest[city]['win']
        } else if (mode === 'GuestLose') {
            return 'City: ' + city
                + '<br>' + 'Team: ' + team + ' as Guest'
                + '<br>' + 'game played: ' + (asGuest[city]['win'] + asGuest[city]['lose'] + asGuest[city]['defend'])
                + '<br>' + 'lose or defend: ' + (asGuest[city]['lose'] + asGuest[city]['defend']);
        }

    }


}

