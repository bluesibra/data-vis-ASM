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
  d3.select('#head_of_state').select('h2').text('Current head of state: ' + data[countryName][0] + ' (' + data[countryName][1] + ')');
});

d3.csv('https://invinciblejackalope.github.io/data-vis-ASM/FinalDataset.csv').then(function(data) {
  data = data.filter(d => d.stateHeads__country === countryName)

  var data = d3.nest()
    .key(d => d.stateHeads__name)
    .entries(data);

  var hos = d3.select('#hos_list').selectAll('div').data(data).enter()
    .append('div').attr('class', 'hos');
  var data1 = hos.append('div').attr('class', 'data');
  data1.append('h4').text(d => d.key);

  var office = data1.selectAll('div').data(d => d.values).enter().append('div').attr('class', 'office');
  office.append('p').text(d => d.stateHeads__office + ' of ' + d.stateHeads__country);
  office.append('p').text(function(d) {
      if (d.stateHeads__mandate_end === 'Incumbent') {
        return 'Serving since ' + d.stateHeads__mandate_start;
      } else {
        return 'Served from ' + d.stateHeads__mandate_start + ' to ' + d.stateHeads__mandate_end;
      }
    })
  office.append('p').text(d => 'Served for a total of ' + d.stateHeads__term_length);

  hos.append('div').attr('class', 'data').append('p').text(d => d.values[0].stateHeads__description);
  hos.append('div').attr('class', 'img').append('img').attr('src', d => 'https://' + d.values[0].stateHeads__img.substring(2));

  if (d3.select('#hos_list').selectAll('div').empty()) {
    d3.select('#hos_list').append('p').text('No past female heads of state found :(');
  }
});

if (countryName === 'United States') {
  var us_info = d3.select('body').append('div').attr('class', 'us_info');
  var senate = us_info.append('div').attr('class', 'data');
  senate.append('h4').text('Female members of the Senate');
  var senate_table = senate.append('table');
  var senate_header = senate_table.append('thead').append('tr');
  senate_header.append('th').text('State');
  senate_header.append('th').text('Name');

  d3.json('https://invinciblejackalope.github.io/data-vis-ASM/senators.json').then(function (data) {
    var dlist = d3.entries(data);

    var senate_row = senate_table.append('tbody').selectAll('tr').data(dlist).enter().append('tr');
    senate_row.append('th').text(d => d.key);
    senate_row.append('th').text(d => d.value);
  });

  var rep = us_info.append('div').attr('class', 'data');
  rep.append('h4').text('Female members of the House of Representatives');
  var rep_table = rep.append('table');
  var rep_header = rep_table.append('thead').append('tr');
  rep_header.append('th').text('State');
  rep_header.append('th').text('Name');

  d3.json('https://invinciblejackalope.github.io/data-vis-ASM/representatives.json').then(function (data) {
    var dlist = d3.entries(data);

    var rep_row = rep_table.append('tbody').selectAll('tr').data(dlist).enter().append('tr');
    rep_row.append('th').text(d => d.key);
    rep_row.append('th').text(d => d.value);
  });

  var court = us_info.append('div').attr('class', 'data');
  court.append('h4').text('Female Supreme Court justices');
  d3.json('https://invinciblejackalope.github.io/data-vis-ASM/supremecourt.json').then(function (data) {
    court.selectAll('p').data(data).enter().append('p').text(d => d);
  });
}

// d3.select('#head_of_state').text();
