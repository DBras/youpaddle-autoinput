


'use strict';

var x = "";
function doStuffWithDom(domContent) {
	console.log(domContent);
}

function readSingleFile(evt,x) {
    var f = evt.target.files[0]; 
    if (f) {
		var r = new FileReader();
		r.onload = function(e) { 
			var contents = e.target.result;
			var parser = new DOMParser();
			var heatResults = parser.parseFromString(contents, "text/xml")
				.getElementsByTagName("HeatResult")[0]
				.getElementsByTagName("Results")[0];
			
			console.log("Fil valgt: "+f.name);

			var i, 
				competitor_lane, line, runtime,
				time_ms, time_sec, time_min, time_h;
			var w = 0;
			for (competitor_lane = 1; competitor_lane < 10; competitor_lane++) {
				for (i=0; i<9; i++) {
					line = heatResults.childNodes[2*i+1]
					if (parseInt(line.getAttribute("Id"), 10) === competitor_lane) {
						runtime = line.getAttribute("Runtime");
						break;
					}
				}
				console.log(competitor_lane, runtime);
				if (document.getElementById("LanesNotUsed").value.indexOf(competitor_lane)!=-1) {
					w++;
					continue;
				}
				if (!runtime) {continue;}
				
				runtime = runtime.split(":");
				time_ms = runtime[runtime.length-1].split(".")[1];
				time_sec = runtime[runtime.length-1].split(".")[0];
				if (runtime.length >= 2) {
					time_min = runtime[runtime.length-2];
					chrome.tabs.executeScript(
					null,
					{code: "document.getElementsByTagName('input')["+(4*w+1)+"].value =" + time_min}
					);
				}
				if (runtime.length >= 3) {
					time_h = runtime[runtime.length-3];
					chrome.tabs.executeScript(
					null,
					{code: "document.getElementsByTagName('input')["+(4*w)+"].value =" + time_h}
					);
				}
				
				chrome.tabs.executeScript(
					null,
					{code: "document.getElementsByTagName('input')["+(4*w+2)+"].value =" + time_sec}
					);
				chrome.tabs.executeScript(
					null,
					{code: "document.getElementsByTagName('input')["+(4*w+3)+"].value =" + time_ms}
					);
				
				w++;	
			}	
		}
		r.readAsText(f);
    } else { 
		alert("Failed to load file");
    }
  }

document.getElementById("inputFile").addEventListener("change", readSingleFile, false);


