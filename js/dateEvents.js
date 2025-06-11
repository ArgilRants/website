const today = new Date();
const month = today.getMonth();
const day = today.getDate();
const confetti = document.getElementById("confettiId");
const body = document.body;
const subtitle = document.getElementById("subtitleMain");
const debugShow = document.getElementById("footerDebug")

function dateEvents() {
    if (debugShow.scrollHeight > 0){
        console.log("Debug on")
    } else {
        if (month == 6 & day == 29){
            confetti.style.display = 'block';
            document.getElementById('subtitleMain').innerHTML = "Happy Birthday (to me!)";
            document.getElementById('subtitleMainMobile').innerHTML = "Happy Birthday (to me!)";
        };

        if (month == 1 & day >= 9 && day <= 16){
            console.log("HAPPY VALENTINES")
            body.className = "";
            body.className = "valentine";
            subtitle.innerText = "happy valentines everyone :3";
            var themebuttondiv = document.getElementById("themebuttondiv");
            var themebuttondivmobilewide = document.getElementById("themebuttondivmobilewide");
            var themebuttondivmobile = document.getElementById("themebuttondivmobile");
    
            themebuttondiv.remove();
            themebuttondivmobilewide.remove();
            themebuttondivmobile.remove();
        };

        if (month == 5 & day >= 1 && day <= 30){
            console.log("HAPPY PRIDE")
            body.className = "";
            body.className = "pride";
            var themebuttondiv = document.getElementById("themebuttondiv");
            var themebuttondivmobilewide = document.getElementById("themebuttondivmobilewide");
            var themebuttondivmobile = document.getElementById("themebuttondivmobile");
    
            themebuttondiv.remove();
            themebuttondivmobilewide.remove();
            themebuttondivmobile.remove();
        };
    
        if (month == 9 & day >= 24 && day <= 31){
            console.log("HALLOWEEEEEN")
            body.className = "";
            body.className = "halloween";
            subtitle.innerText = "happy halloween everyone!! its treat time :3";
            var themebuttondiv = document.getElementById("themebuttondiv");
            var themebuttondivmobilewide = document.getElementById("themebuttondivmobilewide");
            var themebuttondivmobile = document.getElementById("themebuttondivmobile");
    
            themebuttondiv.remove();
            themebuttondivmobilewide.remove();
            themebuttondivmobile.remove();
        };
    
        if (month == 11 & day >= 19 && day <= 31){
            console.log("HAPPY HOLIDAYS")
            body.className = "";
            body.className = "holidays";
            subtitle.innerText = "HAPPY HOLIDAYYSSSS EVERYONE!!";
            var themebuttondiv = document.getElementById("themebuttondiv");
            var themebuttondivmobilewide = document.getElementById("themebuttondivmobilewide");
            var themebuttondivmobile = document.getElementById("themebuttondivmobile");
    
            themebuttondiv.remove();
            themebuttondivmobilewide.remove();
            themebuttondivmobile.remove();
        };
    }
    
    if (currentTheme == null){
        if (prefersLightScheme.matches){
            selectElement("debugThemeSelect", "auto");
            selectElement("themeSelect", "auto");
        } else {
            selectElement("debugThemeSelect", "auto");
            selectElement("themeSelect", "auto");
        }
    } else if(currentTheme == "auto"){
        selectElement("debugThemeSelect", "auto");
        selectElement("themeSelect", "auto");
    } else {
        selectElement("debugThemeSelect", themeBody.className);
        selectElement("themeSelect", themeBody.className);
    }

    if (debugOn == 0){
        document.querySelectorAll("*").forEach(x => x.style.outline = "");
    } else{
        if (debugOutlineToggleInput.checked == true){
            document.querySelectorAll("*").forEach(x => x.style.outline = "solid 0.25rem hsla(210, 100%, 100%, 0.5)");
        } else {
            document.querySelectorAll("*").forEach(x => x.style.outline = "");
        }
    }
}
  
window.onload = dateEvents();