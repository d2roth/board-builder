// Convert strings to title case
function titleCase(str) {
   var chars = str.toLowerCase().split(' ');
   for (var i = 0; i < chars.length; i++) {
      chars[i] = chars[i].charAt(0).toUpperCase() + chars[i].substring(1);     
   };
   return chars.join(' '); 
}


function mapCell(type, x, y){
  x = x+1;
  y = y+1;
  var element = document.querySelectorAll('tr:nth-child(' + y + ') td:nth-child(' + x + ')' );
  element = element[0];

  // Remove classes
  element.className = '';

  // Set the inner text to the row/columns
  element.innerText = x + 'x' + y;

  // Return if we are not adding any classes
  if(type == "")
    return;
  
  // Split the classes so we can add each individually
  var classes = type.toLowerCase().split(' ');

  // Add each class individually
  Array.prototype.forEach.call(classes, function(cls, i){
    if (element.classList)
      element.classList.add(cls);
    else
      element.className += ' ' + cls;
  });
}

function buildTable(width, height){
  // Create one row
  var row = document.createElement('tr');
  for(var c = 0; c < width; c++){
    var col = document.createElement('td');
    row.appendChild(col);
  }
  
  // Now clone the first row as many times as we need it
  for(var r = 0; r < height; r++){
    var clone = row.cloneNode(true);
    table.appendChild(clone);
  }
}

/*
 * @return string containing all the information to generate a map in the format of type
 */
function getExport(type){
  var results = [];

  switch(type){

    case 'json_flat':
      var elements = document.querySelectorAll('td');
      Array.prototype.forEach.call(elements, function(el, i){
        results.push(titleCase(el.className));
      });
      results = JSON.stringify(results);
      break;

    case 'json_rows':
      var rows = table.querySelectorAll('tr');
      Array.prototype.forEach.call(rows, function(row, i){
        var cols = row.querySelectorAll('td');
        var row_json = [];
        Array.prototype.forEach.call(cols, function(col, i){
          row_json.push(titleCase(col.className));
        });
        results.push(row_json)
      });
      results = JSON.stringify(results);
      break;

    case 'lines':
      var line = json.board.width;
      var elements = document.querySelectorAll('td');
      results.push("Row{");
      Array.prototype.forEach.call(elements, function(el, i){
        if (i % line == 0 && i != 0){
          results.push("}\nRow{")
        }
        // Captializing the first letter of each class
        results.push(titleCase(el.className));
      });
      results.push("}")
      results = results.join("\n");
      break;
  }

  return results;
}

/*
 * Takes the data from #data and maps it onto the table
 */
function getImport(type){
  // The source data
  var data = document.getElementById('data').value;

  switch(type){

    // Flat json string with each cell as an element
    case 'json_flat':
      // Convert the data into a JSON string so we can properly use is
      data = JSON.parse(data);

      Array.prototype.forEach.call(data, function(cell_type, index){
        //var index = index+1;
        var x = (index%json.board.width);
        var y =  Math.floor(index/json.board.height);
        mapCell(''+cell_type, x, y);
      });
      break;

    // 
    case 'json_rows':
      // Get the data the way we need
      data = JSON.parse(data);

      // Loop through each row in the data
      Array.prototype.forEach.call(data, function(row, row_index){
        // Loop through each cell in the row
        Array.prototype.forEach.call(row, function(cell_type, cell_index){
          // Map the cell
          mapCell(''+cell_type, cell_index, row_index);
        });
      });
      break;

    // Not implemented yet
    case 'lines':
      // Get the data the way we need it
      data = data.replace("\r\n", "\n");

      var rows = data.split('Row{');
      // Remove the first opening row
      rows.shift();

      Array.prototype.forEach.call(rows, function(row, row_index){
        // Remove trailing }
        var row = row.replace(/\}\n?$/g, "");
        //var row = row.trim();
        var cols = row.split("\n");
        console.log(cols);

        Array.prototype.forEach.call(cols, function(cell_type, cell_index){
          mapCell(''+cell_type, cell_index, row_index);
        });
      });
      break;
  }
}


/* This is in the format of json_flat. Check out the files in the examples folder for other tile structiures */
var json = {
  "board": {
    "width":25,
    "height":25
  },
  "tiles":["grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","brick","brick","brick","brick","door","door","door","door","door","brick","brick","brick","brick","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"]};
var table = document.getElementById('board');

buildTable(json.board.width, json.board.height);

/* Set the initial board up */
document.getElementById('data').value = JSON.stringify(json.tiles);
getImport('json_flat');



document.getElementsByTagName('body')[0].addEventListener('click', function(e){
  if(e.target.nodeName != "TD")
    return;
    
  var target = e.target;
  var type = document.getElementById('type').value;
  var className = type;
  
  if (target.classList) {
    target.classList.toggle(className);
  } else {
    var classes = target.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

    target.className = classes.join(' ');
  }
});

// Set our event listener for export
document.getElementById('export').addEventListener('click', function(){
  console.log('exporting...');
  var data = document.getElementById('data');
  var export_type = document.getElementById('export_type').value;

  data.value = getExport(export_type);
});


// Set our event listener for import
document.getElementById('import').addEventListener('click', function(){
  console.log('importing...');
  var export_type = document.getElementById('export_type').value;

  getImport(export_type);
});