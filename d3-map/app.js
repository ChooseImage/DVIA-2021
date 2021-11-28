const quakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
const mapUrl = "https://d3js.org/world-110m.v1.json";

//Fetch Quake GeoJSON
d3.queue()
.defer(
    d3.json,
    mapUrl
)
.defer(
    d3.json,
    quakeUrl
)
.await(ready);

function ready(error, quake, map){
    console.log("quake", quake, "map", map);
}

async function fetchQuakes(){
    const response = await fetch(quakeUrl);
    const quakes = await response.json();
    return quakes.features[30].properties;
}

const quakes = fetchQuakes();

//console.log(quakes);

//fetchQuakes();

const svg = d3.select("svg");

const projection = d3.geoOrthographic();
const pathGenerator = d3.geoPath().projection(projection);

svg.append('path')
.attr('class', 'sphere')
.attr('d', pathGenerator({type: "Sphere"}));

// var projection = d3
//     .geoOrthographic()
//     .center([0, 20])
//     .scale(99)
//     .translate



// Loading id --> country names
// use d.name for title
// use d.iso_n3 for id


Promise.all([
    d3.json(quakeUrl),
    d3.json('https://d3js.org/world-110m.v1.json')
]).then(([quake, topoJSONdata]) => {
    console.log(quake.features[0].properties.mag);
    // const countryName = tsvData.reduce((accumulator, d)=>{
    //     accumulator[d.iso_n3] = d;
    //     return accumulator;
    // }, {});

    /*
    const countryName = {};
    tsvData.forEach(d => {
        countryName[d.iso_n3] = d.name;
    });
    */




    const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
    svg.selectAll('path')
    .data(countries.features)
    .enter().append('path')
    .attr('class', "country")
    .attr('title', 'input')
    .attr('d', pathGenerator)
    .append('title')
    //.text(d => countryName[d.id].name);
});


// Loading country sapes

d3.json('https://d3js.org/world-110m.v1.json')
    .then(data => {

    });