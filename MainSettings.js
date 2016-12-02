//TODO: FIGURE OUT HOW TO REMOVE IFRAME WHEN LAST CLICK WAS INSIDE IFRAME

document.getElementById("visualSettingButton").onclick = function(){
	location.href = "VideoSettings.html";
}

document.getElementById("audioSettingButton").onclick = function(){
	location.href = "AudioSettings.html";
}

document.getElementById("quitGameButton").onclick = function(){
	alert("quit");
}