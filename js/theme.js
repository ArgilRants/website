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
const debugOn = document.getElementById("footerDebug").offsetTop;
const debugThemeSelect = document.getElementById("debugThemeSelect");
const themeSelectElm = document.getElementById("themeSelect")
const debugOutlineToggleInput = document.getElementById("debugOutlineToggleInput")
const checkIfListeningButton = document.getElementById("checkIfListeningButton")
const themeBodyAnim = themeBody.getAnimations()[0].animationName
const themeBodyAnimPlaybackTime = themeBody.getAnimations()[0].playbackRate
const previousProjectH2Icon = document.getElementById("previousProjectH2Icon")
const debugTestDataToggleInput = document.getElementById("debugTestDataToggleInput")

function debugTheme() {
  if (debugThemeSelect.value == "auto"){
    themeBody.className = ""
    localStorage.setItem("theme", debugThemeSelect.value);
  } else {
    themeBody.className = ""
    themeBody.className = debugThemeSelect.value;
    localStorage.setItem("theme", debugThemeSelect.value);
  }
}
  
function themeSelect() {
  if (themeSelectElm.value == "auto"){
    themeBody.className = ""
    localStorage.setItem("theme", themeSelectElm.value);
  } else {
    themeBody.className = ""
    themeBody.className = themeSelectElm.value;
    localStorage.setItem("theme", themeSelectElm.value);
  };
}

function dontDo() {
  preventDefault();
}

function playlistPlayIcon(obj){
  if (obj.innerText == "▶"){
    obj.innerText = "";
    obj.innerText = "⏹";
  } else {
    obj.innerText = "";
    obj.innerText = "▶";
  }
 
}

function outlineToggle(){
  if (debugOutlineToggleInput.checked == true){
    document.querySelectorAll("*").forEach(x => x.style.outline = "solid 0.25rem hsla(210, 100%, 100%, 0.5)");
  } else {
    document.querySelectorAll("*").forEach(x => x.style.outline = "");
  }
}

function testDataToggle(){
  if (debugTestDataToggleInput.checked == true){
    dataLink = "testdata.json"
    console.log("Test Data Active")
    fetchOnlineInfo(true);
  } else {
    dataLink = "https://online.argil.dev"
  }
}

function selectElement(id, valueToSelect) {    
  let element = document.getElementById(id);
  if (element == null){
    console.log(id + " doesn't exist")
  } else{
    element.value = valueToSelect;
  }
}

function clickSound(){
  var sound = new Audio('./audio/click.wav');
  sound.play();
}

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

function easyAlert(title, text, icon, timer, iconColor){
  Swal.fire({
    position: 'top',
    background: 'var(--bg-color)',
    color: 'var(--default-text-color)',
    showConfirmButton: false,
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    iconColor: iconColor,
  })
}

function previousProjectIcon(){
  themeBody.style.animation = "newsPaper 5s";

  if (previousProjectH2Icon == null){
    console.log("previousProjectH2 is null")
  } else{
    previousProjectH2Icon.style.display = "inline-block"
    previousProjectH2Icon.style.animation = "previousProjectAnim 5s"
  }




  setTimeout(function(){

    if (previousProjectH2Icon == null){
      // console.log("previousProjectH2 is null")
    } else{
      previousProjectH2Icon.style.display = ""
      previousProjectH2Icon.style.animation = ""
    }

    if (currentTheme == "sepia"){
      themeBody.style.animation = ""
    } else if (themeBodyAnim == "bodyload"){
      themeBody.style.animation = themeBodyAnim;
    } else {
      themeBody.style.animation = themeBodyAnim;
    }
  }, 5200);
}

document.addEventListener('keydown', debugKeybind);

function debugKeybind(e){
  if(e.key == "L" || e.key == "l"){
    if(e.shiftKey == true && e.ctrlKey == true){
      if (document.getElementById("footerDebug").offsetTop == 0){
        document.getElementById("footerDebug").style.display = "block";
        console.log("Debug Enabled");
        easyAlert('Debug option enabled', 'Ctrl+Shift+L to disable', 'success', '1500', 'var(--h2-color)')
      } else {
        document.getElementById("footerDebug").style.display = "none";
        console.log("Debug disabled");
        easyAlert('Debug option disabled', 'Ctrl+Shift+L to enable', 'error', '1500', 'var(--h3-color)')
      }
    }
  }
}

function spotifyLinkGrab(obj){
  var songLink = document.getElementById("songlink").getAttribute("href")
  event.preventDefault();
  window.open(songLink, '_blank').focus();
}

function truncateString(yourString, maxLength) {
  // get the index of space after maxLength
  const index = yourString.indexOf(" ", maxLength);
  return index === -1 ? yourString : yourString.substring(0, index)
}

if (firefoxBox == null){
  console.log("firefox box not found")
} else {
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
}

themeBody.id = "";

if (currentTheme == null){
  themeBody.className = "";
} else if(currentTheme == "auto"){
  themeBody.className = "";
} else {
  themeBody.className = "";
  themeBody.className = currentTheme;
};

console.log("Current theme is: "+currentTheme)

if (btn == null) {
  // console.log("btn returned null")
} else {
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
}

if (btnmobile == null) {
  // console.log("btnmobile returned null")
} else {
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
}

if (btnmobilewide == null) {
  // console.log("btnMobileWide returned null")
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
    } else {
      themeBody.className = "";
      themeBody.className = "light";
      var theme = "light";
    }
  localStorage.setItem("theme", theme);
  });
}


