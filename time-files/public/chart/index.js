const HEIGHT = window.innerHeight / 2
const WIDTH = window.innerWidth

const PALETTE = [ '#ffa600',  '#6aaa96', '#003f5c', '#665191', '#00876c', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#aecdc2', '#f1f1f1', '#f0b8b8', '#e67f83', '#d43d51', '#2f4b7c'];

const params = new URLSearchParams(window.location.search);
const videoPath = params.get('video');
const jsonPath = params.get('data');
var playButton = document.getElementById('play-button');

var video = document.getElementById('video');
video.src = videoPath;

var svg = d3.select("#chart").append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);

let dropdown = d3.select("#chart").append("select")
    .style("position", "absolute")
    .style("top", "20px")
    .style("left", "20px");

window.data = {}

dropdown.on("change", function() {
    let selectedChart = window.data.charts[this.value];
    updateChart(selectedChart);
});

const updateChart = (chart) => {
    
    svg.selectAll("*").remove();
    var xScale = d3.scaleLinear()
        .domain([0, chart.data.x])
        .range([0, WIDTH]);


    // Get all the keys that start with 'y'
    const yKeys = Object.keys(chart.data).filter(key => key.startsWith('y'));
    const legendKeys = Object.keys(chart.data).filter(key => key.startsWith('label'));

    // Concatenate all the 'y' arrays into one array
    const allYValues = yKeys.reduce((acc, key) => acc.concat(chart.data[key]), []);

    var yScale = d3.scaleLinear()
        .domain([d3.min(allYValues), d3.max(allYValues)])
        .range([HEIGHT - 10, 10]);
    
    var line = d3.line()
        .x(function(d, i) {
            return xScale(i);
        })
        .y(function(d) {
            return yScale(d);
        });
    
    yKeys.map((key, i) => {
        svg.append("path")
            .datum(chart.data[key])
            .attr("fill", "none")
            .attr("stroke", PALETTE[i])
            .attr("stroke-opacity", 0.5) 
            .attr("stroke-width", 2)
            .attr("d", line);
    
    })
  

        


// Append the vertical line
var verticalLine = svg.append("line")
    .attr("stroke", "grey")
    .attr("stroke-width", 3)
    .attr("y1", 0)
    .attr("y2", HEIGHT)
    .style("display", "none");

// Append the legend
var legend = svg.append("text")
    .attr("font-size", "15px")
    .attr("font-weight", "bold")
    .attr("font-family", "Arial, sans-serif") // Add this line
    .attr("fill", "grey") // Add this line
    .style("display", "none");


var legendGroup = svg.append("g")
    .attr("font-size", "15px")
    .attr("font-family", "Arial, sans-serif") // Add this line
    .attr("fill", "grey") // Add this line
    .style("display", "none");

// Create a group for each legend item
var legendItems = legendGroup.selectAll("g")
    .data(yKeys)
    .enter()
    .append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

// Add the colored square to each legend item
legendItems.append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", (d, i) => PALETTE[i]);

var legendTexts = legendItems.append("text")
    .attr("x", 15)
    .attr("y", 10)

var lastTime = 0;
// Add mousemove event to the SVG
svg.on("mousemove", function() {
        
    var xPosition = d3.mouse(this)[0];
    var xValue = Math.round(xScale.invert(xPosition));

    // Update the position of the vertical line and the legend
    verticalLine
        .attr("x1", xPosition)
        .attr("x2", xPosition)
        .style("display", null);

    if(chart.data.label1){
        
        // Add the label to each legend item
        
        legendTexts.text((d, i) => `${chart.data[legendKeys[i]]}: ${Number(chart.data[yKeys[i]][xValue]).toFixed(4)}`);
        
        legendGroup.attr("transform", `translate(${xPosition > WIDTH / 2 ?  xPosition - 150 - legend.node().getBBox().width : xPosition + 10},20)`).style("display", null);
    }

    legend
        .attr("x", xPosition > WIDTH / 2 ?  xPosition - 150 - legend.node().getBBox().width : xPosition + 10)
        .attr("y", 15)
        .text("FRAME " + xValue)
        .style("display", null);

    // Update the current time of the video to match the xValue
    var newTime = Math.round(xValue / video.duration * 100) / 100;
    if (newTime !== lastTime) {
        video.currentTime = newTime;
        lastTime = newTime;
    }

    playButton.addEventListener('click', function() {
        // Play the video
        video.play();
    
        // Scroll the chart
        var chartScroll = setInterval(function() {
            if (video.paused) {
                // If the video is paused, stop scrolling the chart
                clearInterval(chartScroll);
            } else {
                // Otherwise, scroll the chart
                var xPosition = xScale(video.currentTime / video.duration * chart.data.x);
                verticalLine
                    .attr("x1", xPosition)
                    .attr("x2", xPosition)
                    .style("display", null);
                legend
                    .attr("x", xPosition > WIDTH / 2 ?  xPosition - 150 - legend.node().getBBox().width : xPosition + 10)
                    .attr("y", 15)
                    .text("FRAME " + Math.round(xScale.invert(xPosition)))
                    .style("display", null);
                    
        // Add the label to each legend item
        
        legendTexts.text((d, i) => `${chart.data[legendKeys[i]]}: ${Number(chart.data[yKeys[i]][xValue]).toFixed(4)}`);
        
        legendGroup.attr("transform", `translate(${xPosition > WIDTH / 2 ?  xPosition - 150 - legend.node().getBBox().width : xPosition + 10},20)`).style("display", null);
            }
        }, 1000 / 60); // Scroll 60 times per second
    });

});

// Hide the vertical line and the legend when the mouse leaves the SVG
svg.on("mouseleave", function() {
    verticalLine.style("display", "none");
    legend.style("display", "none");
});
}

d3.json(jsonPath).then(function(data) {
    dropdown.selectAll("option")
        .data(data.charts.map(el => el.name))
        .enter()
        .append("option")
        .attr("value", (d, i) => i)
        .text((d, i) => d);
    window.data = data;
    updateChart(data.charts[0]);

}).catch(function(error) {
    console.log(error);
});