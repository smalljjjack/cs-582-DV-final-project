function getWinLoseData(year, team) {
    winLoseTotal = { 'win': 0, 'lose': 0, 'defend': 0 };
    asGuest = {};
    asHost = {};

    gameResults[year].forEach(function (d) {
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
    return [winLoseTotal, asHost, asGuest]
}

function drawWinLoseBar(winLoseTotal, asHost, asGuest) {

    var hostCities = Object.keys(asHost);
    var guestCities = Object.keys(asGuest);
    var cities = hostCities.concat(guestCities);

    var totalWidth = 600;
    var totalHeight = 600;

    var margin = { top: 20, right: 20, bottom: 30, left: 40 };
    var width = totalWidth - margin.left - margin.right;
    var height = totalHeight - margin.top - margin.bottom;

    var svg = d3.select("#winLoseBar")
        .attr("width", totalWidth)
        .attr("height", totalHeight)

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(cities);
    y.domain([0, Math.max(winLoseTotal['win'], Math.max(winLoseTotal['lose'], winLoseTotal['defend']))]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0" + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(5, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Numbers")

    g.selectAll(".bar")
        .data(hostCities)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d) })
        .attr("y", function (d) { return y(asHost[d]['win']) })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(asHost[d]['win']) })
        .attr("transform", "translate(0, -" + height / 2 + ")")
        .attr("fill", "green")

    g.selectAll(".lbar")
        .data(hostCities)
        .enter()
        .append("rect")
        .attr("class", "lbar")
        .attr("x", function (d) { return x(d) })
        .attr("y", height/2)
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return -y(asHost[d]['lose']+asHost[d]['defend']) + height; })
        .attr("fill", "red")
        
        

}
