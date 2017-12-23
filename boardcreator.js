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
  //Brian: width of the board
  var line = json.board.width;
  var elements = document.querySelectorAll('td');
  //Brian: Starts the whole document
  results.push("Row{");
  Array.prototype.forEach.call(elements, function(el, i){
     //Brian: At the division for each new row
  	   if (i % line == 0 && i != 0){ // Caret (ChromeOS programming text-editor says this should be === and not ==, and !== instead of !=)
			//Brian: Adds the ending and starting
			results.push("}\nRow{");
			//Brian:Note: "}Row{" also works in my java LevelGenerator, but I recommend "}\nRow{" for readability
			//Brian: I'll also add some whitespace to my LevelGenerator so that we could add spaces between each Row element
		}
		results.push(el.className);//Brian: we should capitalise the first letter of each tile so (el.classname.capitaliseFirst)
  });
  //Brian: ends the last element
  results.push("}");
  output.value = results.join("\n");
}