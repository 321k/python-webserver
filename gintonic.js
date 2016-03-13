
//'use strict';

var links = executeWithParameters()
if(links.length>0){
  for(var i=0; i<links.length; i++){
    window.open(links[i]);
  }
}

function URL_GT(keyword, country, region, year, month, length){
  
  var start = "http://www.google.com/trends/trendsReport?hl=en-US&q=";
  var end = "&cmpt=q&content=1&export=1";
  var geo = "";
  var date = "";
  var URL = "";
  var month=1;
  var length=3;
  var links;

  
  //Geographic restrictions
  if(typeof country!=="undefined") {
    geo="&geo=";
    geo=geo + country;
    if(region!==undefined) geo=geo + "-" + region;
  }
  
  if(typeof keyword==="string"){
   var queries=keyword;
  }
  
  if(typeof keyword==="object"){
   var queries=keyword[0];
    for(var i=1; i < keyword.length; i++){
      queries=queries + "%2C" + keyword[i];
    }
  }
  
  //Dates
  if(typeof year!=="undefined"){
    date="&date="
    date=date + month + "%2F" + year + "%20" + length + "m"
  }
  
  URL = start + queries + geo + date + end;
  URL = URL.replace(" ", "%20");
  console.log(URL);

  links = URL;
  return(links);
}


function executeWithParameters(){
  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++)
  {
      if (query[i] === "") // check for trailing & with no param
          continue;

      var param = query[i].split("=");
      GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");

  }
  return convertToLinks(GET);
}

function convertToLinks(GET){
  var queries = Object.keys(GET)
  var links = [];
  var search_terms;
  for(var i=0; i < queries.length; i++){
      search_terms = GET[queries[i]].split(",");
      links[i] = URL_GT(search_terms);
  }
  return links;
}
