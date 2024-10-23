const today = new Date();
const month = today.getMonth();
const day = today.getDate();
const confetti = document.getElementById("confettiId");
const body = document.body;
const subtitle = document.getElementById("subtitleMain");


function dateEvents() {

    if (month == 6 & day == 29){
        confetti.style.display = 'block';
        document.getElementById('subtitleMain').innerHTML = "Happy Birthday (to me!)";
        document.getElementById('subtitleMainMobile').innerHTML = "Happy Birthday (to me!)";
    };

    if (month == 9 & day >= 28 && day <= 31){
        console.log("HALLOWEEEEEN")
        body.className = "";
        body.className = "halloween";
        subtitle.innerText = "HAPPY HALLOWEEEEEN";
        var themebuttondiv = document.getElementById("themebuttondiv");
        var themebuttondivmobilewide = document.getElementById("themebuttondivmobilewide");
        var themebuttondivmobile = document.getElementById("themebuttondivmobile");

        themebuttondiv.remove();
        themebuttondivmobilewide.remove();
        themebuttondivmobile.remove();
    };

    if (month == 11 & day >= 23 && day <= 31){
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
  
// Call function when page loaded
window.onload = dateEvents();