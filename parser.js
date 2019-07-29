
var jobs = [];
var m = 0;
var n = 0;

document.getElementById('file').onchange = function(){

	var file = this.files[0];
	var reader = new FileReader();
	reader.onload = function(){
  
	  // By lines
	  var lines = this.result.split('\n');
	  n = lines.length  ;
	  m = (lines[0].split(' ')).length;
	  for(var line = 0; line < n; line++){
			var values = lines[line].split(' ');
			//var tab = [];
			jobs[line] = new Array();		
			for(var i=0; i<m; i++)
			{
				jobs[line].push(parseInt(values[i]));
			}
	  }
			//Mettre à jour le n et m
			document.getElementById('n').value = n.toString();
			document.getElementById('m').value = m.toString();
			
	};
	reader.readAsText(file);
  };


