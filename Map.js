var fastTravelDialogueDisplayed = false;

window.onload = function() {
    var anchor = document.getElementById("anchorArea");
    var tower = document.getElementById("towerArea");
    var towerHouse = document.getElementById("towerHouseArea");
    anchor.addEventListener("click", FastTravelLocationClick, false);
    tower.addEventListener("click", FastTravelLocationClick, false);
    towerHouse.addEventListener("click", FastTravelLocationClick, false);

    fastTravelDialogueDisplayed = false;
};

function CloseSelf(){
	window.parent.postMessage({message: 'CloseIframe'}, "*");
}

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        CloseSelf();
    }
});

function FastTravelLocationClick(event){
	if(!fastTravelDialogueDisplayed){
		var fastTravelBox = document.getElementById("fastTravelBox");
		fastTravelBox.style.left = event.clientX + "px";
		fastTravelBox.style.top = event.clientY + "px";
		fastTravelBox.style.visibility = "visible";
		fastTravelDialogueDisplayed = true;
	}
}

function CloseFastTravelDialogue(){
	document.getElementById("fastTravelBox").style.visibility = "hidden";
	fastTravelDialogueDisplayed = false
}