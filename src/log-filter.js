function handleFiles(files) {
    if (window.FileReader) {
        getAsText(files[0]);
    } else {
        alert('FileReader API not supported in this browser.');
    }
  }

  function getAsText(fileToRead) {
    var reader = new FileReader();

    reader.readAsText(fileToRead);
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
  }

  function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
  }

  function processData(csv) {
      var allTextLines = csv.split(/\r\n|\n/);
      var lines = [];
      for (var i=0; i<allTextLines.length; i++) {
          var data = allTextLines[i].split(',');
              var tarr = [];
              for (var j=0; j<data.length; j++) {
                  tarr.push(data[j].replace(/"/g, ''));
              }
              lines.push(tarr);
      }
    console.log(lines);
    drawOutput(lines);
  }

  function errorHandler(evnt) {
    if(evnt.target.error.name == "NotReadableError") {
        alert("Cannot read file!");
    }
  }

  function drawOutput(lines){
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	for (var i = 0; i < lines.length; i++) {
		var row = table.insertRow(-1);
		for (var j = 0; j < lines[i].length; j++) {
			var cell = row.insertCell(-1);
			cell.appendChild(document.createTextNode(lines[i][j]));
		}
	}
	document.getElementById("output").appendChild(table);
}