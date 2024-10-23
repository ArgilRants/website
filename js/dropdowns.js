



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
    console.log(dropdownBtn);
    console.log(x);
    var dropdownVar = document.querySelector("div#drop"+x+" #dropdown");
    console.log(dropdownVar);
    dropdownVar.classList.toggle("showDropdown");
    dropdownBtn.classList.toggle("dropdownBtnTextUp");
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