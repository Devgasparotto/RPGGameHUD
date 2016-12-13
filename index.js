//Specify Other HTML Page dimensions here
var inventoryWidth =1000;
var inventoryHeight = 600;
var mainSettingsWidth = 500;
var mainSettingsHeight = 500;
var mapWidth = 800;
var mapHeight = 375;

//Specify current state of screen
var screenStates = {
    Main: 0,
    Inventory: 1,
    Map: 2,
    Settings: 3
};
var currentState = screenStates.Main;

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        if(currentState == screenStates.Main){
            DisplayMainSettings();
        }
        else{
            CloseCurrentScreen();
        }
    }
});

window.onload = function() {
    OnLoad();
    //Initialize Width and Height on screen
    inventoryWidth = 0.8*window.screen.availHeight;
    inventoryHeight = 0.8*window.screen.availHeight;
};

function OnLoad(){
    var SecondaryWindow = $('#secondaryWindow');
    SecondaryWindow.hide();
}

function SetSecondaryWindowProperties(width, height, url, visible){ 
    var SecondaryWindow = $('#secondaryWindow');

    if(visible == true){
        widthText = width.toString() + "px";
        heightText = height.toString() + "px";
        SecondaryWindow.width(widthText);
        SecondaryWindow.height(heightText);
        
        
        SecondaryWindow.attr("src", url);
        //Re-center SecondaryWindow
        var marginTop = height*-0.5;
        var marginLeft = width*-0.5;
        SecondaryWindow.css('margin-top', marginTop);
        SecondaryWindow.css('margin-left', marginLeft);
        SecondaryWindow.show();
    }
    else{
        SecondaryWindow.hide();
        SecondaryWindow.attr("src", "");
    }
}

function SetMainScreenButtonVisibility(visible){
    $(".mainScreenButton").each(function(index, obj){
        if(visible){
            obj.style.visibility = "visible";
        }
        else{
            obj.style.visibility = "hidden";
        }
    });
}

function DisplayMainSettings(){
    if(currentState != screenStates.Settings){
        currentState = screenStates.Settings;
        settingsURL = "MainSettings.html";
        SetSecondaryWindowProperties(mainSettingsWidth, mainSettingsHeight, settingsURL, true);
    }
    else{
        currentState = screenStates.Main;
        SetSecondaryWindowProperties(0, 0, "", false);
    }
}

function DisplayMap(){
    if(currentState != screenStates.Settings){
        mapWidth = window.screen.availWidth;
        mapHeight = mapWidth/2.133;
        currentState = screenStates.Map;
        mapURL = "Map.html";
        SetMainScreenButtonVisibility(false);
        SetSecondaryWindowProperties(mapWidth, mapHeight, mapURL, true);
    }
}

function DisplayInventory(){
    if(currentState != screenStates.Settings && currentState != screenStates.Inventory){
        currentState = screenStates.Inventory;
        inventoryURL = "Inventory.html";
        SetSecondaryWindowProperties(inventoryWidth, inventoryHeight, inventoryURL, true);
    }
    else{
        currentState = screenStates.Main;
        SetSecondaryWindowProperties(0, 0, "", false);
    }
}

function CloseCurrentScreen(){
    currentState = screenStates.Main;
    SetMainScreenButtonVisibility(true);
    SetSecondaryWindowProperties(0, 0, "", false);
}

//Receive message from window inside Iframe and hide Iframe
window.addEventListener('message', function(event) {
    if(event.data.message == "CloseIframe")        {
        CloseCurrentScreen();
    }
    else if(event.data.message = "QuitGame"){
        alert("Quitting Game");
    }
}, false);