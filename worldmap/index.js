import { select, json,
        geoPath,
        geoNaturalEarth1, zoom,
        event } from 'd3';
//importing packages from d3

import { feature } from 'topojson';
const svg = select('svg');

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

// add a path for the globe(seperate from background)

const g=svg.append('g');

g.append('path')
	.attr('class', 'sphere')
	.attr('d', pathGenerator({type: 'Sphere'}))



svg.call(zoom().on('zoom', () => {
  g.attr('transform', d3.event.transform);
}
  ));

json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
	.then(data => {
  const countries = feature(data, data.objects.countries);
  g.selectAll('path').data(countries.features)
      .enter().append('path')
  		.attr('class', 'country')
  		.attr('d', pathGenerator)
})
