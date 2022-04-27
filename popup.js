


'use strict';

var x = "";
function readSingleFile(evt,x) {
//Hent den første fil i listen over filer
    var f = evt.target.files[0]; 
//Hvis filen findes:
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      var contents = e.target.result;
// Log filens navn

		  console.log(contents);
		  console.log("Fil valgt: "+f.name);
		  var i;
		  var w=0;

		  // For loop, der går igennem 9 baner, og tjekker værdier af tiderne
		for(i=1;i<10;i++){
			// Hvis en banes nummer står i inputfeltet, skal denne bane springes over. JavaScript skyder -1 ud af en indexOf-funktion, hvis strengen ikke findes i søgematerialet
			if (document.getElementById("LanesNotUsed").value.indexOf(i)!=-1) {
				
				w++;
				console.log("Lane Skipped");
				
			}
			// Er banen ikke i inputfeltet tjekker man filen igennem. Findes et . et bestemt sted, lægges denne tid ind på pladserne.
			// i kører igennem 9 gange. w er tallet for, hvilken plads af inputfelterne tiden skal lægges ind på
			else if (contents.substr(contents.indexOf("  "+i+"     ")+12,1)===".") {

				
				chrome.tabs.executeScript(
				null,
				{code: "document.getElementsByTagName('input')["+(4*w+1)+"].value = "+contents.substr(contents.indexOf("  "+i+"     ")+7,2)}
				);
				
				chrome.tabs.executeScript(
				null,
				{code: "document.getElementsByTagName('input')["+(4*w+2)+"].value = "+parseInt(contents.substr(contents.indexOf("  "+i+"     ")+10,2))}
				);
				
				if(parseInt(contents.substr(contents.indexOf("  "+i+"     ")+13,3)).toString().length ==3){

				chrome.tabs.executeScript(
				null,
				{code: "document.getElementsByTagName('input')["+(4*w+3)+"].value = "+parseInt(contents.substr(contents.indexOf("  "+i+"     ")+13,3))}
				);
				}

				else {

					chrome.tabs.executeScript(
				null,
				{code: "document.getElementsByTagName('input')["+(4*w+3)+"].value = "+parseInt(contents.substr(contents.indexOf("  "+i+"     ")+13,2))*10}
				);
					
				}
				

				w++
				}
			} 
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }
  


	


document.getElementById("inputFile").addEventListener("change", readSingleFile, false);


