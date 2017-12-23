var json = {
	"board": {
  	"width":25,
    "height":25
  },
  "tiles":["grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","carpet","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","brick","brick","brick","brick","brick","door","door","door","door","door","brick","brick","brick","brick","brick","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"]};
var table = $('table')[0];

function mapCell(type, x, y, width, height){
	if(typeof width === 'undefined')
  	var width = 1;
  if(typeof height === 'undefined')
  	var height = 1;
    
	for(var left = x; left < (x + width); left++){
  	for(var top = y; top < (y + height); top++){
      $('tr:nth-child(' + top + ') td:nth-child(' + left + ')' )
      	.addClass(type)
        .text(left + 'x' + top);
    }
  }
}

function buildTable(width, height){
  // Create one row
  var row = document.createElement('tr');
  for(var c = 0; c<width; c++){
    var col = document.createElement('td');
    row.appendChild(col);
  }
  
  // Now clone the first row as many times as we need it
	for(var r=0; r<height; r++){
  	var clone = row.cloneNode(true);
    table.appendChild(clone);
  }
}
buildTable(json.board.width, json.board.height);
var size = Math.sqrt(json.tiles.length);
$(json.tiles).each(function(index){
	//var index = index+1;
	var x = (index%size)+1;
  var y =  Math.floor(index/size)+1;
  mapCell(''+this, x, y, 1, 1);
});

/* Functions strictly for Map Builder */
// document.getElementsByTagName('td')
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
document.getElementById('export-json').addEventListener('click', getJSON);
document.getElementById('export-lines').addEventListener('click', getLines);
//Brian: imports
document.getElementById('import-lines').addEventListener('click', setLines);

function getJSON(){
	var output = document.getElementById('output');
  var results = {
  	board:{},
    tiles:[]
   };
  results.board.width = document.querySelectorAll('tr:first-child td').length;
  results.board.height = document.querySelectorAll('tr').length;
  
  var elements = document.querySelectorAll('td');
  Array.prototype.forEach.call(elements, function(el, i){
    results.tiles.push(el.className);
  });
  output.value = JSON.stringify(results);
}


function getLines(){
	var output = document.getElementById('output');
  var results = [];
  var line = json.board.width;
  var elements = document.querySelectorAll('td');
  results.push("Row{");
  Array.prototype.forEach.call(elements, function(el, i){
  	if (i % line == 0 && i != 0){
			results.push("}\nRow{")
		}
		results.push(el.className);//we should capitalise the first letter of each so (el.classname.capitaliseFirst)
  });
  results.push("}")
  output.value = results.join("\n");
}

function setLines(){
	var input = document.getElementById('input');
  var text = input.value;
  var textArray = text.split('\n');
  var output = document.getElementById('output');
  output.value = textArray.join('\n');
  
  //Brian: logic comes here
  var row = -1;//Must be -1 since the starting tag increments it
  var column = 0;
  var map = [[]]
  var bracketCount = 0; // Used for error messages
  for(var line = 0; line < textArray.length; line++){
		if(line == "Row{") {
    	bracketCount++;
  		row++;
      map.push([]);
    }	else if( line == "Grass" ){
  		map[row].push("grass");
      column++;
    } else if( line == "Brick") {
    	map[row].push("brick");
  	} else if( line == "Carpet")  {
  		map[row].push("carpet");
      column++;
    } else if(line == "Door") {
  		map[row].push("door");
      column++;
    } else if(line == "}") {
    	column = 0;
      bracketCount--;
		}
  }
  /*
  var row = document.createElement('tr');
  for(var c = 0; c < map.length; c++){
    var col = document.createElement('td');
    row.appendChild(col);
  }
  
  // Now clone the first row as many times as we need it
	for(var r=0; r < map[0].length; r++){
  	var clone = row.cloneNode(true);
    table.appendChild(clone);
  }
}
  //How do I add this to the table ?
  
  for(var left = 0; left < map.length; left++){
  	for(var top = 0; top < map[0].length, top++){
  		$('tr:nth-child(' + top + ') td:nth-child(' + left + ')' )
      	.addClass(type)
        .text(left + 'x' + top);
    }
  }
  */
  
}

