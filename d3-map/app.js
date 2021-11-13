const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

//Fetch Quake GeoJSON

async function fetchQuakes(){
    const response = await fetch(url);
    const quakes = await response.json();
    return quakes.features[30].properties;
}

const quakes = fetchQuakes();

//console.log(quakes);

fetchQuakes();

const svg = d3.select("svg");

const projection = d3.geoOrthographic();
const pathGenerator = d3.geoPath().projection(projection);

svg.append('path')
.attr('class', 'sphere')
.attr('d', pathGenerator({type: "Sphere"}));



// Loading id --> country names
// use d.name for title
// use d.iso_n3 for id


Promise.all([
    d3.tsv('https://d3js.org/world-110m.v1.tsv'),
    d3.json('https://d3js.org/world-110m.v1.json')
]).then(([tsvData, topoJSONdata]) => {
    const countryName = tsvData.reduce((accumulator, d)=>{
        accumulator[d.iso_n3] = d;
        return accumulator;
    }, {});

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
    .text(d => countryName[d.id].name);
});


// Loading country sapes

d3.json('https://d3js.org/world-110m.v1.json')
    .then(data => {

    });