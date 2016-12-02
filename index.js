//Specify Other HTML Page dimensions here
var inventoryWidth =1400;
var inventoryHeight = 800;
var mainSettingsWidth = 500;
var mainSettingsHeight = 500;
var mapWidth = 0;
var mapHeight = 0;

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
    //TODO: verify dimension specifications are correct: Initialize Map Screen Dimensions to entire screen
    //TODO: adjust map on screen reformat
    mapWidth = screen.width;
    mapHeight = screen.height;
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
        currentState = screenStates.Map;
        mapURL = "Map.html";
        SetMainScreenButtonVisibility(false);
        SetSecondaryWindowProperties(mapWidth, mapHeight, mapURL, true);
    }
}

function DisplayInventory(){
    if(currentState != screenStates.Inventory){
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