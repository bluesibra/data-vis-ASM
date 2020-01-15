function qs(search_for) {
  var query = window.location.search.substring(1);
  var parms = query.split('&');
  for (var i=0; i<parms.length; i++) {
     var pos = parms[i].indexOf('=');
     if (pos > 0  && search_for == parms[i].substring(0,pos)) {
       return decodeURI(parms[i].substring(pos+1));
     }
  }
  return "";
};

const countryName = qs('name');

d3.select('title').text('Country page: ' + countryName);
d3.select('#country_name').select('h1').text(countryName);

d3.json('https://invinciblejackalope.github.io/data-vis-ASM/headsofstate.json').then(function(data) {
  d3.select('#head_of_state').select('h2').text('Head of state: ' + data[countryName][0] + ' (' + data[countryName][1] + ')');
});

d3.csv('https://invinciblejackalope.github.io/data-vis-ASM/FinalDataset.csv').then(function(data) {
  var hos = d3.select('#hos_list').selectAll('div').data(data).enter().filter(d => d.stateHeads__country === countryName)
    .append('div').attr('class', 'hos');
  var data1 = hos.append('div');
  data1.append('p').text(d => d.stateHeads__name);
  data1.append('p').text(d => d.stateHeads__office + ' of ' + d.stateHeads__country);
  data1.append('p').text(function(d) {
      if (d.stateHeads__mandate_end === 'Incumbent') {
        return 'Serving since ' + d.stateHeads__mandate_start;
      } else {
        return 'Served from ' + d.stateHeads__mandate_start + ' to ' + d.stateHeads__mandate_end;
      }
    })
  data1.append('p').text(d => 'Served for a total of ' + d.stateHeads__term_length);
  hos.append('div').attr('class', 'desc').append('p').text(d => d.stateHeads__description);
  hos.append('div').append('img').attr('src', d => d.stateHeads__img.substring(2));
});

// d3.select('#head_of_state').text();
