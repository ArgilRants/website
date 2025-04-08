const changelogDropdownText = document.getElementById("changelogDropdownText")


function dropdown(x) {
    if(window.matchMedia("(pointer: coarse)").matches) {
        dropdownRun(x);
        var sound = new Audio('./audio/touch.wav');
        sound.play()
        // touchscreen
    }else{
        dropdownRun(x);
        var sound = new Audio('./audio/click.wav');
        sound.play()
    }
}

function dropdownRun(x){
    var dropdownBtn = document.querySelector("div#drop"+x+" #dropdownBtnId");
    var dropdownVar = document.querySelector("div#drop"+x+" #dropdown");
    if (dropdownVar.classList.contains("showDropdown")){
        dropdownVar.className = "dropdownContent";
        dropdownBtn.className = "dropdownBtn dropdownBtnText";

        if (changelogDropdownText == null){
 
        } else {
            if (changelogDropdownText.style.display = "none"){
                changelogDropdownText.style.display = "block";
            }
        }

    } else {
        dropdownVar.className = "";
        dropdownVar.className = "dropdownContent showDropdown";
        dropdownBtn.className = "dropdownBtn dropdownBtnTextUp";

        if (changelogDropdownText == null){
 
        } else {
            if (changelogDropdownText.style.display = "block"){
                changelogDropdownText.style.display = "none";
            }
        }
    }
}

// remove dropdowns on click just in case
// window.onclick = function(event) {
//     if (!event.target.matches('.dropdownBtn')) {
//         var dropdowns = document.getElementsByClassName("dropdownContent");
//         var i;
//         for (i =0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('showDropdown')) {
//                 openDropdown.classList.remove('showDropdown');
//             }
//         }
//     }
// }