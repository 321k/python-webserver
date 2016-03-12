
//'use strict';

function getFormKeywords(){
 var links;
 var keyword1 = document.getElementById('keywordID1').value;
 var keyword2 = document.getElementById('keywordID2').value;
 var keyword3 = document.getElementById('keywordID3').value;
 var keyword4 = document.getElementById('keywordID4').value;
 var keyword5 = document.getElementById('keywordID5').value;
 var keywords = [keyword1, keyword2, keyword3, keyword4, keyword5];

 var new_keywords = [];
 for(var i=0; i<keywords.length; i++){
  if(keywords[i]===""){
   continue;
  }
  new_keywords[i] = keywords[i];
 }
 links = URL_GT(new_keywords);
 window.location = links.url;
}


function URL_GT(keyword, country, region, year, month, length){
  
  var start = "http://www.google.com/trends/trendsReport?hl=en-US&q=";
  var end = "&cmpt=q&content=1&export=1";
  var geo = "";
  var date = "";
  var URL = "";
  var month=1;
  var length=3;
  var links = new Object();

  
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

  links.url = URL;
  return(links);
}

    $(document).ready(function() {
      if(isAPIAvailable()) {
        $('#files').bind('change', handleFileSelect);
      }
    });

    function isAPIAvailable() {
      // Check for the various File API support.
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        return true;
      } else {
        // source: File API availability - http://caniuse.com/#feat=fileapi
        // source: <output> availability - http://html5doctor.com/the-output-element/
        document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
        // 6.0 File API & 13.0 <output>
        document.writeln(' - Google Chrome: 13.0 or later<br />');
        // 3.6 File API & 6.0 <output>
        document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
        // 10.0 File API & 10.0 <output>
        document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
        // ? File API & 5.1 <output>
        document.writeln(' - Safari: Not supported<br />');
        // ? File API & 9.2 <output>
        document.writeln(' - Opera: Not supported');
        return false;
      }
    }

    function handleFileSelect(evt) {
      var files = evt.target.files; // FileList object
      var file = files[0];

      // read the file metadata
      var output = ''
          output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
          output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
          output += ' - FileSize: ' + file.size + ' bytes<br />\n';
          output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';

      // read the file contents
      printTable(file);

      // post the results
      $('#list').append(output);
    }

    function printTable(file) {
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event){
        var csv = event.target.result;
        var data = $.csv.toArrays(csv);
        var html = '';
        for(var row in data) {
          html += '
<tr>\r\n';
          for(var item in data[row]) {
            html += '<td>' + data[row][item] + '</td>\r\n';
          }
          html += '</tr>
\r\n';
        }
        $('#contents').html(html);
      };
      reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
    }