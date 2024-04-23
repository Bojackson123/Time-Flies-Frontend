const HEIGHT = window.innerHeight / 2;
const WIDTH = window.innerWidth;

const PALETTE = ['#ffa600', '#6aaa96', '#003f5c', '#665191', '#00876c', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#aecdc2', '#f1f1f1', '#f0b8b8', '#e67f83', '#d43d51', '#2f4b7c'];

const params = new URLSearchParams(window.location.search);
const videoPath = params.get('video');
const jsonPath = params.get('data');
// var playButton = document.getElementById('play-button');

var video = document.getElementById('video');
video.src = videoPath;

var svg = d3.select("#chart").append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);

let dropdown = d3.select("#chart").append("select")
    .style("position", "absolute")
    .style("top", "20px")
    .style("left", "20px");


let timeDisplay = d3.select("#chart").append("div")
    .style("position", "absolute")
    .style("top", "20px")
    .style("right", "20px")
    .style("color", "white")
    .style("padding", "5px 10px")
    .style("font-family", "Poppins, sans-serif")
    .style("text-align", "right");

window.data = {};

dropdown.on("change", function() {
    let selectedChart = window.data.charts[this.value];
    updateChart(selectedChart);
});

const updateChart = (chart) => {
    svg.selectAll("*").remove();
    var xScale = d3.scaleLinear()
        .domain([0, chart.data.x])
        .range([0, WIDTH]);

    const yKeys = Object.keys(chart.data).filter(key => key.startsWith('y'));
    const legendKeys = Object.keys(chart.data).filter(key => key.startsWith('label'));
    const allYValues = yKeys.reduce((acc, key) => acc.concat(chart.data[key]), []);

    var yScale = d3.scaleLinear()
        .domain([d3.min(allYValues), d3.max(allYValues)])
        .range([HEIGHT - 10, 10]);

    var line = d3.line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d));

    yKeys.forEach((key, i) => {
        svg.append("path")
            .datum(chart.data[key])
            .attr("fill", "none")
            .attr("stroke", PALETTE[i])
            .attr("stroke-opacity", 0.5)
            .attr("stroke-width", 2)
            .attr("d", line);
    });

    var verticalLine = svg.append("line")
        .attr("stroke", "grey")
        .attr("stroke-width", 3)
        .attr("y1", 0)
        .attr("y2", HEIGHT)
        .style("display", "none");

    var legendGroup = svg.append("g")
        .attr("font-size", "15px")
        .attr("font-family", "Arial, sans-serif")
        .attr("fill", "grey")
        .style("display", "none");

    var legendItems = legendGroup.selectAll("g")
        .data(yKeys)
        .enter()
        .append("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legendItems.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (d, i) => PALETTE[i]);

    var legendTexts = legendItems.append("text")
        .attr("x", 15)
        .attr("y", 10);

    // // Play/Pause Toggle
    // playButton.addEventListener('click', function() {
    //     if (video.paused) {
    //         video.play();
    //     } else {
    //         video.pause();
    //     }
    // });

    let throttleTimer = false;
    const throttleDuration = 100; // in milliseconds

    svg.on("mousemove", function() {
        if (!throttleTimer) {
            throttleTimer = true;
            setTimeout(() => throttleTimer = false, throttleDuration);

            const xPosition = d3.mouse(this)[0];
            const xValue = Math.round(xScale.invert(xPosition));
            verticalLine
                .attr("x1", xPosition)
                .attr("x2", xPosition)
                .style("display", null);

            legendTexts.text((d, i) => `${chart.data[legendKeys[i]]}: ${Number(chart.data[yKeys[i]][xValue]).toFixed(4)}`);
            legendGroup.attr("transform", `translate(${xPosition > WIDTH / 2 ? xPosition - 150 - legendGroup.node().getBBox().width : xPosition + 10},20)`).style("display", null);

            const newTime = xValue / chart.data.x * video.duration;
            video.currentTime = newTime; // Update the current time of the video
        }
    });

    svg.on("mouseleave", function() {
        verticalLine.style("display", "none");
        legendGroup.style("display", "none");
    });
};

d3.json(jsonPath).then(function(data) {
    const chartsForDropdown = data.charts.filter(chart => chart.name !== "Real Time vs Estimated Time");
    const timeData = data.charts.find(chart => chart.name === "Real Time vs Estimated Time");

    // Display time data statically
    if (timeData) {
        timeDisplay.html(`Real Time: ${timeData.data.real.toFixed(2)} sec<br>Estimated Time: ${timeData.data.est.toFixed(2)} sec`);
    }
    dropdown.selectAll("option")
        .data(chartsForDropdown.map(el => el.name))
        .enter()
        .append("option")
        .attr("value", (d, i) => i)
        .text((d, i) => d);

    window.data.charts = chartsForDropdown;
    if (chartsForDropdown.length > 0) {
        updateChart(chartsForDropdown[0]);
    }

}).catch(function(error) {
    console.log(error);
});