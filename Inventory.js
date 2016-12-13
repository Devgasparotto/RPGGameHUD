function CloseSelf(){
	window.parent.postMessage({message: 'CloseIframe'}, "*");
}

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        CloseSelf();
    }
});

window.onload = function() {
    document.getElementById("selectDeselectAllCheckbox").checked = true;
    SelectDeselectAll();
};

"use strict";

//On hover display item characteristics
$(".inventory-item").mouseover(
    function(event){
        DisplayItemCharacteristics(event, this);
    }
);

$(".inventory-item").mouseout(
    function(){
        HideItemCharacteristics();
    }
);

function DisplayItemCharacteristics(event, inventoryItem){
    var itemCharacteristicsBox = document.getElementById("itemCharacteristics");
    var itemDescription = GetItemDescriptionByItemName(inventoryItem.className.split(" ")[1]);
    itemCharacteristicsBox.innerHTML = itemDescription;
    itemCharacteristicsBox.style.left = event.clientX + "px";
    itemCharacteristicsBox.style.top = event.clientY + "px";
    itemCharacteristicsBox.style.visibility = "visible";
}

function HideItemCharacteristics(){
    var itemCharacteristicsBox = document.getElementById("itemCharacteristics");
    itemCharacteristicsBox.style.visibility = "hidden";
}

function GetItemDescriptionByItemName(itemClass){
    var descriptionText = "";
    switch(itemClass){
        case "sword":
            descriptionText = "<p>Obsidian Sword</p>" +
            "<p>Damage: 15</p>" +
            "<p>Value: 15</p>" +
            "<p>An Obsidian sword used by one handed warriors. A very valuable weapon.</p>";
            break;
        case "axe":
            descriptionText = "<p>Axe</p>" +
            "<p>Damage: 10</p>" +
            "<p>Value: 5</p>" +
            "<p>Might not take down a dragon, but it will cut most foes in half.</p>";
            break;
        case "armor1":
            descriptionText = "<p>Light Armour</p>" +
            "<p>Armour: 15</p>" +
            "<p>Value: 15</p>" +
            "<p>A light armour that allows the hero to be agile.</p>";
            break;
        case "armor2":
            descriptionText = "<p>Heavy Armour</p>" +
            "<p>Armour: 35</p>" +
            "<p>Value: 15</p>" +
            "<p>Heavy armour that will keep the hero alive, but slow.</p>";
            break;
        case "shield1":
            descriptionText = "<p>Black Shield</p>" +
            "<p>Armour: 15</p>" +
            "<p>Value: 15</p>" +
            "<p>Has extra defense against magic.</p>";
            break;
        case "shield2":
            descriptionText = "<p>Shield</p>" +
            "<p>Armour: 5</p>" +
            "<p>Value: 15</p>" +
            "<p>A standard shield, it doesn't protect against much.</p>";
            break;
        case "spell1":
            descriptionText = "<p>Fireball</p>" +
            "<p>Damage: 25</p>" +
            "<p>Value: 25</p>" +
            "<p>A powerful spell that will light enemies aflame.</p>";
            break;
        case "spell2":
            descriptionText = "<p>Freeze</p>" +
            "<p>Damage: 5</p>" +
            "<p>Value: 5</p>" +
            "<p>This spell will freeze enemies in their track.</p>";
            break;
        default:
            descriptionText = "<p>Item Characteristic</p>";
            break;
    }
    return descriptionText;
}


//Update Inventory Display
function SelectDeselectAll(){
    var isSelectAll = document.getElementById("selectDeselectAllCheckbox").checked;
    if(isSelectAll){
        document.getElementById("weaponsCheckbox").checked = true;
        document.getElementById("armorCheckbox").checked = true;
        document.getElementById("shieldsCheckbox").checked = true;
        document.getElementById("spellsCheckbox").checked = true;
    }
    else{
        document.getElementById("weaponsCheckbox").checked = false;
        document.getElementById("armorCheckbox").checked = false;
        document.getElementById("shieldsCheckbox").checked = false;
        document.getElementById("spellsCheckbox").checked = false;
    }
    UpdateShownInventory();
}

function UpdateShownInventory(){
    var itemsToDisplay = new Array();
    var itemsToNotDisplay = new Array();

    //Decide which items to display
    if(document.getElementById("weaponsCheckbox").checked){
        itemsToDisplay.push("sword");
        itemsToDisplay.push("axe");
    }
    else{
        itemsToNotDisplay.push("sword");
        itemsToNotDisplay.push("axe");
    }

    if(document.getElementById("armorCheckbox").checked){
        itemsToDisplay.push("armor1");
        itemsToDisplay.push("armor2");
    }
    else{
        itemsToNotDisplay.push("armor1");
        itemsToNotDisplay.push("armor2");
    }

    if(document.getElementById("shieldsCheckbox").checked){
        itemsToDisplay.push("shield1");
        itemsToDisplay.push("shield2");
    }
    else{
        itemsToNotDisplay.push("shield1");
        itemsToNotDisplay.push("shield2");
    }

    if(document.getElementById("spellsCheckbox").checked){
        itemsToDisplay.push("spell1");
        itemsToDisplay.push("spell2");   
    }
    else{
        itemsToNotDisplay.push("spell1");
        itemsToNotDisplay.push("spell2"); 
    }

    DisplayInventoryItems(itemsToDisplay);
    HideInventoryItems(itemsToNotDisplay);
}

function DisplayInventoryItems(itemsToDisplay){
    for(var i = 0; i < itemsToDisplay.length; i++){
        var itemElement = document.getElementsByClassName(itemsToDisplay[i])[0];
        itemElement.style.opacity = "1";
    }
}

function HideInventoryItems(itemsToNotDisplay){
    for(var i = 0; i < itemsToNotDisplay.length; i++){
        var itemElement = document.getElementsByClassName(itemsToNotDisplay[i])[0];
        itemElement.style.opacity = "0.25";
    }
}


jQuery.fn.extend({
    addRemoveItems: function(targetCount) {
        return this.each(function() {
            var $children = $(this).children();
            var rowCountDifference = targetCount - $children.length;
            //console.log('row count diff: ' + rowCountDifference);
           
            if(rowCountDifference > 0)
            {
                // Add items
                for(var i = 0; i < rowCountDifference; i++)
                {
                    //console.log($rows.first());
                    $children.last().clone().appendTo(this);
                }
            }
            else if(rowCountDifference < 0)
            {
                // remove items
                $children.slice(rowCountDifference).remove();
            }
        });
    },
    // Modified and Updated by MLM
    // Origin: Davy8 (http://stackoverflow.com/a/5212193/796832)

    //parentToAnimate: handles updating the images on the new spot dragged to
    
    parentToAnimate: function(newParent, duration) {
        duration = duration || 'slow';
        
        var $element = $(this);
        //console.log($element);
        if($element.length > 0)
        {
            
            newParent = $(newParent); // Allow passing in either a JQuery object or selector
            var oldOffset = $element.offset();
            $(this).appendTo(newParent);
            var newOffset = $element.offset();
            
            
            var temp = $element.clone().appendTo('body');
            
            temp.css({
                'position': 'absolute',
                'left': oldOffset.left,
                'top': oldOffset.top,
                'zIndex': 1000
            });
            
            $element.hide();
                
            temp.animate({
                'top': newOffset.top,
                'left': newOffset.left
            }, duration, function() {
                $element.show();
                temp.remove();
            });
            
            //console.log("parentTo Animate done");
        }
    }
    
});


$('#row-count').on('input propertychange change', function() {
    var targetRowCount = $(this).val();
    //console.log('target count: ' + targetRowCount);
    $('label[for="'+$(this).attr('id')+'"]').html(targetRowCount);
      
    $('#personal-inventory.inventory-table').addRemoveItems(targetRowCount);
    refreshSortableInventoryList();
}).trigger('change');


//column-count on change: updates number of columns in table as column slider adjusts
/*
$('#column-count').on('input propertychange change', function() {
    var targetColumnCount = $(this).val();
    //console.log('target count: ' + targetColumnCount);
    $('label[for="'+$(this).attr('id')+'"]').html(targetColumnCount);
        
    $('#personal-inventory.inventory-table .inventory-row').addRemoveItems(targetColumnCount);
    
    refreshSortableInventoryList();
}).trigger('change');
*/



// Sorting, dragging, dropping, etc

//refreshSortableInventoryList();
function refreshSortableInventoryList()
{
    $('.inventory-cell').sortable({
        connectWith: '.inventory-cell',
        placeholder: 'inventory-item-sortable-placeholder',
        receive: function( event, ui ) {
            var attrWhitelist = $(this).closest('.inventory-table').attr('data-item-filter-whitelist');
            var attrBlackList = $(this).closest('.inventory-table').attr('data-item-filter-blacklist');
            var itemFilterWhitelistArray = attrWhitelist ? attrWhitelist.split(/\s+/) : [];
            var itemFilterBlacklistArray = attrBlackList ? attrBlackList.split(/\s+/) : [];
            //console.log(itemFilterWhitelistArray);
            //console.log(itemFilterBlacklistArray);  
            
            var attrTypeList = $(ui.item).attr('data-item-type');
            var itemTypeListArray = attrTypeList ? attrTypeList.split(/\s+/) : [];
            //console.log(itemTypeListArray);
            
            var canMoveIntoSlot = verifyWithWhiteBlackLists(itemTypeListArray, itemFilterWhitelistArray, itemFilterBlacklistArray)
            
            if(!canMoveIntoSlot)
            {
                console.log("Can't move to this slot");
                //$(ui.sender).sortable('cancel');
                $(ui.item).parentToAnimate($(ui.sender), 200);
            }
            else                
            {
            
                // Swap places of items if dragging on top of another
                // Add the items in this list to the list the new item was from
                $(this).children().not(ui.item).parentToAnimate($(ui.sender), 200);
                
                // $(this) is the list the item is being moved into
                // $(ui.sender) is the list the item came from
                // Don't forget the move swap items as well
                
                // $(this).attr('data-slot-position-x');
                // $(this).attr('data-slot-position-y');
                // $(ui.sender).attr('data-slot-position-x');
                // $(ui.sender).attr('data-slot-position-y');
                //console.log("Moving to: (" + $(this).attr('data-slot-position-x') + ", " + $(this).attr('data-slot-position-y') + ") - From: (" + $(ui.sender).attr('data-slot-position-x') + ", " + $(ui.sender).attr('data-slot-position-y') + ")");
            }
        }
    }).each(function() {
        // Setup some nice attributes for everything
        // Makes it easier to update the backend
        $(this).attr('data-slot-position-x', $(this).prevAll('.inventory-cell').length);
        $(this).attr('data-slot-position-y', $(this).closest('.inventory-row').prevAll('.inventory-row').length);
    }).disableSelection();
}

//verifyWithWhiteBlackLists: checks if an item can be inserted
function verifyWithWhiteBlackLists(itemList, whiteList, blackList)
{
    // itemList should contain tags
    // whiteList and blackList can contain tags and tag queries
    
    // If we have a matching tags to some tag query in the whiteList but not in the blackList, then return true
    // Else return false
    
    
    console.group("Lists");
    console.log(itemList);
    console.log(whiteList);
    console.log(blackList);
    console.groupEnd();

    // If white and black lists are empty, return true
    // Save the calculations, no filtering
    if(whiteList.length == 0 && blackList.length == 0)
        return true;
    

    
    // Check if the itemList has an item in the blackList
    var inBlackList = false;
    $.each(blackList, function(index, value) {
        var itemBlack = value;
        var itemBlackAndArray = itemBlack.split(/\+/);
        console.log(itemBlackAndArray);
        
        var andedResult = true;
        for(var i = 0; i < itemBlackAndArray.length; i++)
        {
            if(blackList.length > 0 && $.inArray(itemBlackAndArray[i], itemList) !== -1)
            {
                andedResult = andedResult && true;
            }
            else
            {
                andedResult = andedResult && false;
            }
        }
        
        if(andedResult)
            inBlackList = true;
    });
    
    inBlackList = blackList.length > 0 ? inBlackList : false;
    
    
    // Check if the itemList has an item in the whiteList
    var inWhiteList = false;
    $.each(whiteList, function(index, value) {
        var itemWhite = value;
        var itemWhiteAndArray = itemWhite.split(/\+/);
        //console.log(itemWhiteAndArray);
        
        var andedResult = true;
        for(var i = 0; i < itemWhiteAndArray.length; i++)
        {
            if(whiteList.length > 0 && $.inArray(itemWhiteAndArray[i], itemList) !== -1)
            {
                andedResult = andedResult && true;
            }
            else
            {
                andedResult = andedResult && false;
            }
        }
        //console.log("andedResult: " + andedResult);
        
        if(andedResult)
            inWhiteList = true;
       
    });
    
    inWhiteList = whiteList.length > 0 ? inWhiteList : false;
    
    
    console.log("inWhite: " + inWhiteList + " - inBlack: " + inBlackList);
    
    if((whiteList.length == 0 || inWhiteList) && !inBlackList)
        return true;
    
    return false;
}
