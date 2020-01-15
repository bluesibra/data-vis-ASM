function qs(search_for) {
  var query = window.location.search.substring(1);
  var parms = query.split('&');
  for (var i=0; i<parms.length; i++) {
     var pos = parms[i].indexOf('=');
     if (pos > 0  && search_for == parms[i].substring(0,pos)) {
       return parms[i].substring(pos+1);;
     }
  }
  return "";
};

const countryName = qs('name');

d3.select('title').text('Country page: ' + countryName);
d3.select('#country_name').select('h1').text(countryName);

d3.json('headsofstate.json', function(data) {
  d3.select('#head_of_state').select('h2').text('Head of state: ' + data[countryName]);
})

const hos_data = JSON.parse('Final Dataset.txt')['stateHeads'];

d3.select('#hos_list').selectAll('div').data(hos_data).enter().append('div')
  .append(p).text(d => d['name'])
  .append(p).text(d => d['office'] + ' of ' + d['country'])
  .append(p).text(function(d) {
    if (d['mandate_end'] === 'Incumbent') {
      return 'Serving since ' + d['mandate_start'];
    } else {
      return 'Served from ' + d['mandate_start'] + ' to ' + d['mandate_end'];
    }
  });

// d3.select('#head_of_state').text();
