//TODO: FIGURE OUT HOW TO REMOVE IFRAME WHEN LAST CLICK WAS INSIDE IFRAME

document.getElementById("visualSettingButton").onclick = function(){
	location.href = "VideoSettings.html";
}

document.getElementById("audioSettingButton").onclick = function(){
	location.href = "AudioSettings.html";
}

document.getElementById("quitGameButton").onclick = function(){
	window.parent.postMessage({message: 'QuitGame'}, "*");
}

function CloseSelf(){
	window.parent.postMessage({message: 'CloseIframe'}, "*");
}

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        CloseSelf();
    }
});