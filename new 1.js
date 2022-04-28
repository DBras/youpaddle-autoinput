
Ny kode

'use strict';

var i, w;
var bool = true;

function readSingleFile(evt) {
//Hent den første fil i listen over filer
    var f = evt.target.files[0]; 
//Hvis filen findes:
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      var contents = e.target.result;
		  console.log("       ");
		  if(contents.indexOf("  10      ")>=0){
			  console.log("Sucess");
		  } else {
			  console.log("Failure");
		  }
// Log filens navn
		  console.log("Fil valgt: "+f.name);
		    for(i=1;i<10;i++){
				if (contents.substr(contents.indexOf("  "+i+"      ")+19,1)===".") {

					chrome.tabs.executeScript(null, {code:"console.log(i)"});
					
					);
				}
			}  
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }
  
// Sætter en event-listener fast til inputfeltet med id "inputFile" (fra HTML) '
// Denne kører når feltet ændrer værdi (når en fil lægges ind)
// Når den ændrer værdi kører den funktionen readSingleFile med inputfeltet som værdi
document.getElementById("inputFile").addEventListener("change", readSingleFile, false);


