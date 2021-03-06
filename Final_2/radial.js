// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    innerRadius = 90,
    innerRadius1 = 170,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + ( height/2 )+ ")"); 


var svg1 = d3.select("#my_dataviz1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + ( height/2 )+ ")"); 

    // Creating a variable for single movie with three ratings




//https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv
const movie = "movieRating.csv";
const moviepta = "movieRatingpta.csv";
const dummy = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv";
const thickness = 100;
const labelOffset = 20;
//const innerRadius = 80;

d3.csv(moviepta, function(data) {

  // X scale
  var x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing ?
      .domain( data.map(function(d) { return d.original_title; }) ); // The domain of the X axis is the list of states.

  // Y scale
  var y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 23]); // Domain of Y is from 0 to the max seen in the data

  // Add bars
  svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "rgba(252, 206, 42, 1)")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d['avg_vote']); })
          .startAngle(function(d) { return x(d.original_title); })
          .endAngle(function(d) { return x(d.original_title) + x.bandwidth()  / 3; })
          .padAngle(0.05)
          .padRadius(innerRadius))

    svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "rgba(28, 156, 110, 1)")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d['let']); })
          .startAngle(function(d) { return x(d.original_title) + x.bandwidth() / 3 ; })
          .endAngle(function(d) { return x(d.original_title) + x.bandwidth() * 2 / 3 ; })
          .padAngle(0.05)
          .padRadius(innerRadius))

    svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "rgba(90, 90, 90, 1)")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d['met']); })
          .startAngle(function(d) { return x(d.original_title) + 2 * x.bandwidth() / 3; })
          .endAngle(function(d) { return x(d.original_title) + x.bandwidth(); })
          .padAngle(0.05)
          .padRadius(innerRadius))

  svg.append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("text-anchor", function(d) { return (x(d.original_title) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
    .attr("transform", function(d) { return "rotate(" + ((x(d.original_title) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['avg_vote'])+labelOffset) + ",0)"; })
    .append("text")
    .text(function(d){return(d.original_title)})
    .attr("transform", function(d) { return (x(d.original_title) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
    .style("font-size", "11px")
    .attr("alignment-baseline", "middle")



    /* 

      stacked

    */


  // Add bars
  svg1.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "rgba(252, 206, 42, 0.7)")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius1)
          .outerRadius(function(d) { return y(d['avg_vote']); })
          .startAngle(function(d) { return x(d.original_title); })
          .endAngle(function(d) { return x(d.original_title) + x.bandwidth()})
          .padAngle(0.05)
          .padRadius(innerRadius1))

    svg1.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "rgba(28, 156, 110, 0.7)")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius1)
          .outerRadius(function(d) { return y(d['let']); })
          .startAngle(function(d) { return x(d.original_title) })
          .endAngle(function(d) { return x(d.original_title) + x.bandwidth()})
          .padAngle(0.05)
          .padRadius(innerRadius1))

    svg1.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "rgba(90, 90, 90, 0.7)")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius1)
          .outerRadius(function(d) { return y(d['met']); })
          .startAngle(function(d) { return x(d.original_title)})
          .endAngle(function(d) { return x(d.original_title) + x.bandwidth(); })
          .padAngle(0.05)
          .padRadius(innerRadius1))

  svg1.append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("text-anchor", function(d) { return (x(d.original_title) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
    .attr("transform", function(d) { return "rotate(" + ((x(d.original_title) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['avg_vote'])+labelOffset) + ",0)"; })
    .append("text")
    .text(function(d){return(d.original_title)})
    .attr("transform", function(d) { return (x(d.original_title) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
    .style("font-size", "11px")
    .attr("alignment-baseline", "middle")

});