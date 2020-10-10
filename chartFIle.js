var margin = {top:10,right:30,bottom:30,left:60},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var svg = d3.select("my_dataviz")
  .append("svg")
    .attr("width",width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
  .append("g")
<<<<<<< HEAD
    .attr("transform", "translate(" + margin.left + ","+margin.top + ")");
  
  d3.csv("ADGS.csv", function(data){

    var sumstat = d3.nest()
      .key(function(d){return d.pub_date;})
      .entries(data);

      console.log(sumstat)
    
    var mygroups = ["electronic","experimental","folk/country","global","jazz","metal","pop/r&b","rap","rock"]
    var mygroup = [1,2,3,4,5,6,7,8,9]
    var stackedData = d3.stack()
       .keys(mygroup)
       .value(function(d,key){
        })
        (sumstat)
        
    
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.pub_date;}))
      .range([0,width]);
    svg.append("g")
      .attr("transform","translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5));

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return + d.score})*1.2])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    var color = d3.scaleOrdinal()
      .domain(mygroups)
      .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
  
    svg
      .selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
        .style("fill", function(d) {name = mygroups[d.key-1]; return color(name);})
        .attr("d", d3.area()
          .x(function(d,i){return x(d.data.key); })
          .y0(function(d){return y(d[0]); })
          .y1(function(d){return y(d[1]); })
          
      )
  
  })
=======
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("ADGS.csv", function(data) {

  // group the data: one array for each value of the X axis.
  var sumstat = d3.nest()
    .key(function(d) { return d.pub_date;})
    .entries(data);

  // Stack the data: each group will be represented on top of each other
  var mygroups = ["electronic", 'metal', 'rock'] // list of group names
  var mygroup = [1,2,3] // list of group names
  var stackedData = d3.stack()
    .keys(mygroup)
    .value(function(d, key){
      return d.values[key].genre
    })
    (sumstat)

console.log(data)
  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.genre; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.reviewid; })*1.2])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette
  var color = d3.scaleOrdinal()
    .domain(mygroups)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .style("fill", function(d) { name = mygroups[d.key-1] ;  return color(name); })
      .attr("d", d3.area()
        .x(function(d, i) { return x(d.data.key); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
    )

})
>>>>>>> 5a39491b6e0cab17d15f699b935ab2b6ebaa590b
