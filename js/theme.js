const btn = document.querySelector(".btn-toggle");
const btnmobile = document.querySelector(".btnmobile-toggle");
const btnmobilewide = document.querySelector(".btnmobilewide-toggle");

const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");

const currentTheme = localStorage.getItem("theme");
const chromeShowFirefoxBox = localStorage.getItem("chromeShowFirefoxBox");


const buttonClickSound = new Audio('./audio/touch.wav');
const titleClickSound = new Audio('./audio/money.wav');

const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
const firefoxBox = document.getElementById("firefoxBox");

const themeBody = document.body;


function buttonClick(obj) {
  event.preventDefault();

  if (obj.getAttribute("id") == "titleLink"){
    titleClickSound.play();
    setTimeout(function() {
      window.location.href = obj.getAttribute("href");
   }, 250);
  }else{
    buttonClickSound.play();
    setTimeout(function() {
      window.location.href = obj.getAttribute("href");
   }, 200);
  }
}


function imgToGif(obj) {
  obj.src = "./img/randomgifs/1.gif"
}

function gifToImg(obj) {
  obj.src = "./img/5200Trans.png"
}

function marqueeStop(obj){
  if (isFirefox){
    return
  }else{
    obj.stop();
  }
}

function chromeHideFirefoxBox() {
  firefoxBox.style.display = "none";
}

if (isFirefox == false){
  if (chromeShowFirefoxBox == "Yes"){
    firefoxBox.style.display = "none";
  } else {
    firefoxBox.style.display = "block";
    localStorage.setItem("chromeShowFirefoxBox", "Yes");
  }
  
}

themeBody.id = "test";



if (currentTheme == "dark") {
  themeBody.className = ""
  themeBody.className = "dark";
} else if (currentTheme == "light") {
  themeBody.className = ""
  themeBody.className = "light";
}


btn.addEventListener("click", function () {
  var sound = new Audio('./audio/click.wav');
  sound.play();
    if (themeBody.className == ""){
      if (prefersLightScheme.matches){
        themeBody.className = "";
        themeBody.className = "dark";
        var theme = "dark";
      } else {
        themeBody.className = "";
        themeBody.className = "light";
        var theme = "light";
      }
    }
    else if (themeBody.className == "light"){
      themeBody.className = "";
      themeBody.className = "dark";
      var theme = "dark";
    } 
    else if (themeBody.className == "dark"){
      themeBody.className = "";
      themeBody.className = "light";
      var theme = "light";
    }
localStorage.setItem("theme", theme);
});




btnmobile.addEventListener("touchstart", function () {
  var sound = new Audio('./audio/touch.wav');
  sound.play();
  if (themeBody.className == ""){
    if (prefersLightScheme.matches){
      themeBody.className = "";
      themeBody.className = "dark";
      var theme = "dark";
    } else {
      themeBody.className = "";
      themeBody.className = "light";
      var theme = "light";
    }
  }
  else if (themeBody.className == "light"){
    themeBody.className = "";
    themeBody.className = "dark";
    var theme = "dark";
  } 
  else if (themeBody.className == "dark"){
    themeBody.className = "";
    themeBody.className = "light";
    var theme = "light";
  }
localStorage.setItem("theme", theme);
});

if (btnmobilewide == null) {
  console.log("btnMobileWide returned null")
} else {
  btnmobilewide.addEventListener("touchstart", function () {
    var sound = new Audio('./audio/touch.wav');
    sound.play();
    if (themeBody.className == ""){
      if (prefersLightScheme.matches){
        themeBody.className = "";
        themeBody.className = "dark";
        var theme = "dark";
      } else {
        themeBody.className = "";
        themeBody.className = "light";
        var theme = "light";
      }
    }
    else if (themeBody.className == "light"){
      themeBody.className = "";
      themeBody.className = "dark";
      var theme = "dark";
    } 
    else if (themeBody.className == "dark"){
      themeBody.className = "";
      themeBody.className = "light";
      var theme = "light";
    }
  localStorage.setItem("theme", theme);
  });
}


