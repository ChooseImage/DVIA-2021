export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 04-Visualizing Space`
)});
  main.variable(observer("s")).define("s", function(){return(
450
)});
  main.variable(observer("radius")).define("radius", ["s"], function(s){return(
s/2.4
)});
  main.variable(observer("viewof rotation")).define("viewof rotation", ["DOM"], function(DOM){return(
DOM.range(0, 360,1)
)});
  main.variable(observer("rotation")).define("rotation", ["Generators", "viewof rotation"], (G, _) => G.input(_));
  main.variable(observer("globe")).define("globe", ["DOM","s","d3","radius","rotation","world","quakeRadius","quakes"], function(DOM,s,d3,radius,rotation,world,quakeRadius,quakes)
{
  var c = DOM.context2d(s, s);
  var canvas = c.canvas;
  let colorStroke = d3.color("rgb(200, 100, 100)");
  colorStroke.opacity = 0;
  c.strokeStyle = colorStroke;
  var projection = d3.geoOrthographic().scale(radius).translate([s / 2, s / 2]);
  projection.rotate([rotation, 0]);
  var path = d3.geoPath(projection, c);
  
  // Draw the seas.
  c.lineWidth = 1.5;
  c.fillStyle = d3.color("rgb(130, 130, 130)");
  c.beginPath(), c.arc(s / 2, s / 2, radius, 0, 2 * Math.PI), c.fill(), c.stroke();
  
  // Draw the land.
  c.lineWidth = 0.35;
  c.strokeStyle = "white";
  c.fillStyle = d3.color("rgb(130, 130, 130)");
  c.beginPath(), path(world), c.fill(), c.stroke();
  
  // Draw the earthquakes.
  let color = d3.color("rgb(255, 115, 0)");
  color.opacity = 0.5;
  c.fillStyle = color;
  path.pointRadius(quakeRadius);
  quakes.features.forEach(quake => {c.beginPath(), path(quake), c.fill();});
  
  return canvas;
}
);
  main.variable(observer()).define(["quakes"], function(quakes){return(
quakes
)});
  main.variable(observer("quakeRadius")).define("quakeRadius", ["d3"], function(d3)
{
  const scale = d3.scaleSqrt().domain([0, 400]).range([0, 6]);
  return function(quake){
    return scale(Math.exp(quake.properties.mag));
  }
}
);
  main.variable(observer()).define(["quakes"], function(quakes){return(
quakes[1]
)});
  main.variable(observer()).define(["quakeRadius","quakes"], function(quakeRadius,quakes){return(
quakeRadius(quakes.features)
)});
  main.variable(observer("url")).define("url", function(){return(
"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
)});
  main.variable(observer("quakes")).define("quakes", ["url"], async function(url){return(
(await fetch(url)).json()
)});
  main.variable(observer("exampleQuake")).define("exampleQuake", ["quakes"], function(quakes){return(
quakes.features[30].properties
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require('topojson')
)});
  main.variable(observer("world")).define("world", ["topojson"], async function(topojson)
{
  let world = await (await fetch("https://unpkg.com/world-atlas@1/world/110m.json")).json();
  return topojson.feature(world, world.objects.countries);
}
);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3")
)});
  return main;
}
