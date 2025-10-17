import { getTimeZones } from 'https://cdn.skypack.dev/@vvo/tzdb'
const timeZones = getTimeZones({ includeUtc: true});
const timeZoneList = [{}]
const timers = document.getElementById("timers")
const timeZoneSelect = document.getElementById("timeZoneSelect")
const timerTime = document.getElementById("timerTime")
const timerDate = document.getElementById("timerDate")
const timerColor = document.getElementById("timerColor")
const timerTitle = document.getElementById("timerTitle")

let currentDate = new Date()
const offset = currentDate.getTimezoneOffset()
currentDate = new Date(currentDate.getTime() - (offset*60*1000))

timerDate.min = currentDate.toISOString().split('T')[0]

for (var i=0; i < timeZones.length; i++){
  var abbreviation = timeZones[i].abbreviation
  var offsetInMinutes = abbreviation + " ["+ timeZones[i].rawFormat.slice(0, 6) + "]";
  var rawOffsetInMinutes = timeZones[i].rawOffsetInMinutes

  timeZoneList.push({"offsetInMins":offsetInMinutes, "rawOffsetInMinutes": rawOffsetInMinutes})
}

var cleanTimeZoneList = timeZoneList.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.offsetInMins === arr.offsetInMins && t.rawOffsetInMinutes === arr.rawOffsetInMinutes)))

for (var i=0; i < cleanTimeZoneList.length; i++){
  var rawOffsetInMinutes = cleanTimeZoneList[i].rawOffsetInMinutes
  var offsetInMinutes = cleanTimeZoneList[i].offsetInMins
  var option = document.createElement("option")
  option.value = rawOffsetInMinutes
  option.innerText = offsetInMinutes

  var nowTimeZone = new Date().getTimezoneOffset()
  nowTimeZone = Math.abs(nowTimeZone)

  if (i == 0){

  } else if(rawOffsetInMinutes == nowTimeZone) {
    option.selected = "true"
    timeZoneSelect.appendChild(option)
  } else {
    timeZoneSelect.appendChild(option)
  }

}


function createTimer(oldTimerTitle, oldTimerDate, oldTimerColor, oldTimerTime, oldTimeZoneSelect, persistent) {
  var timerDiv = document.createElement("div")

  var countdownDiv = document.createElement("div")

  var countdownBackgroundDiv = document.createElement("div")
  var countdownBackgroundText = document.createElement("span")
  
  var countdownForegroundDiv = document.createElement("div")
  var countdownForegroundDays = document.createElement("span")
  var countdownForegroundHours = document.createElement("span")
  var countdownForegroundMinutes = document.createElement("span")
  var countdownForegroundSeconds = document.createElement("span")
  var countdownForegroundColon = document.createElement("span")

  var countdownBelowDiv = document.createElement("div")
  var countdownBelowDays = document.createElement("span")
  var countdownBelowHours = document.createElement("span")
  var countdownBelowMinutes = document.createElement("span")
  var countdownBelowSeconds = document.createElement("span")

  var deleteButton = document.createElement("span")

  timerDiv.className = "timer"
  countdownDiv.className = "countdownDiv"
  countdownBackgroundDiv.className = "countdownBackgroundDiv"
  countdownBackgroundText.className = "countdownBackgroundText"
  countdownForegroundDiv.className = "countdownForegroundDiv"
  countdownForegroundDays.className = "countdownForegroundDays"
  countdownForegroundHours.className = "countdownForegroundHours"
  countdownForegroundMinutes.className = "countdownForegroundMinutes"
  countdownForegroundSeconds.className = "countdownForegroundSeconds"
  countdownForegroundColon.className = "countdownForegroundColon"


  countdownBelowDiv.className = "countdownBelowDiv"
  countdownBelowDays.className = "countdownBelowDays"
  countdownBelowHours.className = "countdownBelowHours"
  countdownBelowMinutes.className = "countdownBelowMinutes"
  countdownBelowSeconds.className = "countdownBelowSeconds"

  
  if (oldTimerTitle != null){
    timerDiv.style.backgroundColor = oldTimerColor

    if (oldTimerTitle.length >= 12){
      var title = document.createElement("marquee")
      title.className = "timerTitleH2"
    } else {
      var title = document.createElement("p")
      title.className = "timerTitleH2"
    }
    title.innerText = oldTimerTitle
    timerDiv.id = oldTimerTitle.replace(/[\W_]/g, "_")+oldTimerDate.replaceAll("-", "_")+"_"+oldTimerTime.replaceAll(":","_")+"_"+oldTimeZoneSelect.replaceAll("-", "_")

    // var oldTimerJson = {"timerTitle": oldTimerTitle, "timerDate": oldTimerDate, "timerColor": oldTimerColor, "timerTime": oldTimerTime, "timerTimeZone": oldTimeZoneSelect}

    // storedTimers.push(oldTimerJson)

    // localStorage.setItem("storedTimers", JSON.stringify(storedTimers))

    countdownBackgroundText.innerText = "00:00:00:00"
    countdownForegroundDays.innerText = "00"
    countdownForegroundHours.innerText = "00"
    countdownForegroundMinutes.innerText = "00"
    countdownForegroundSeconds.innerText = "00"
    countdownForegroundColon.innerText = ":"

    countdownBelowDays.innerText = "Days"
    countdownBelowHours.innerText = "Hrs"
    countdownBelowMinutes.innerText = "Mins"
    countdownBelowSeconds.innerText = "Secs"

    deleteButton.innerHTML='<span class="timerDeleteButton" onclick="deleteTimer('+timerDiv.id+')"> ❌</span>'

    countdownBackgroundDiv.appendChild(countdownBackgroundText)

    countdownForegroundDiv.appendChild(countdownForegroundDays)
    countdownForegroundDiv.appendChild(countdownForegroundColon)
    countdownForegroundDiv.appendChild(countdownForegroundHours)
    countdownForegroundDiv.appendChild(countdownForegroundColon.cloneNode(true))
    countdownForegroundDiv.appendChild(countdownForegroundMinutes)
    countdownForegroundDiv.appendChild(countdownForegroundColon.cloneNode(true))
    countdownForegroundDiv.appendChild(countdownForegroundSeconds)

    countdownBelowDiv.appendChild(countdownBelowDays)
    countdownBelowDiv.appendChild(countdownBelowHours)
    countdownBelowDiv.appendChild(countdownBelowMinutes)
    countdownBelowDiv.appendChild(countdownBelowSeconds)

    countdownDiv.appendChild(countdownBackgroundDiv)
    countdownDiv.appendChild(countdownForegroundDiv)
    countdownDiv.appendChild(countdownBelowDiv)
    
    if (persistent){

    } else {
      timerDiv.appendChild(deleteButton)
    }

    timerDiv.appendChild(title)
    timerDiv.appendChild(countdownDiv)

    timers.appendChild(timerDiv)

  } else {
    var newTimerTitle = timerTitle.value
    var newTimerDate = timerDate.value
    var newTimerColor = timerColor.value
    var newTimerTime = timerTime.value
    var newTimeZoneSelect = timeZoneSelect.value


    var existingTimers = JSON.parse(localStorage.getItem("storedTimers"));
    if(existingTimers == null) existingTimers = []
    

    var newTimerJson = {"timerTitle": newTimerTitle, "timerDate": newTimerDate, "timerColor": newTimerColor, "timerTime": newTimerTime, "timerTimeZone": newTimeZoneSelect}

    existingTimers.push(newTimerJson)

    var cleanExistingTimers = existingTimers.filter((arr, index, self) =>
      index === self.findIndex((t) => (t.timerDate === arr.timerDate && t.timerTime === arr.timerTime && t.timerTimeZone === arr.timerTimeZone)))

    localStorage.setItem("storedTimers", JSON.stringify(cleanExistingTimers))

    loadStoredTimers()
  }

 


  
}

function updateTimers(id) {
  var timerId = ""
  if (id != null){
    timerId = id
  } else {
    var localStoredTimers = JSON.parse(localStorage.getItem("storedTimers"));
    if (localStoredTimers != null){
      for (var i=0; i < localStoredTimers.length; i++){
          var oldTimerTitle = localStoredTimers[i].timerTitle
          var oldTimerDate = localStoredTimers[i].timerDate
          var oldTimerColor = localStoredTimers[i].timerColor
          var oldTimerTime = localStoredTimers[i].timerTime
          var oldTimeZoneSelect = localStoredTimers[i].timerTimeZone
          timerId = oldTimerTitle.replace(/[\W_]/g, "_")+oldTimerDate.replaceAll("-", "_")+"_"+oldTimerTime.replaceAll(":","_")+"_"+oldTimeZoneSelect.replaceAll("-", "_")
          var timerToUpdate = document.getElementById(timerId)
          var updatingDays = document.querySelector("#" + timerId +" div.countdownDiv .countdownForegroundDiv .countdownForegroundDays")
          var updatingHours = document.querySelector("#" + timerId +" .countdownDiv .countdownForegroundDiv .countdownForegroundHours")
          var updatingMinutes = document.querySelector("#" + timerId +" .countdownDiv .countdownForegroundDiv .countdownForegroundMinutes")
          var updatingSeconds = document.querySelector("#" + timerId +" .countdownDiv .countdownForegroundDiv .countdownForegroundSeconds")

          var countdownDate = new Date(oldTimerDate + " " + oldTimerTime).getTime();
          var now = new Date().getTime();
          var nowTimeZone = new Date().getTimezoneOffset()
          nowTimeZone = Math.abs(nowTimeZone)
          if (nowTimeZone == oldTimeZoneSelect){

          } else{
            countdownDate = countdownDate + (oldTimeZoneSelect * 60 * 1000)
          }
          

          var distance = countdownDate - now;

          if(distance <= 0){
            var index = localStoredTimers.indexOf(localStoredTimers[i])
            if (index > -1){
              localStoredTimers.splice(index, 1)
            }
            localStorage.setItem("storedTimers", JSON.stringify(localStoredTimers))
            timerToUpdate.remove()
          }

          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          
          
          
          

          updatingDays.innerText = addLeading(days, 2)
          updatingHours.innerText = addLeading(hours, 2)
          updatingMinutes.innerText = addLeading(minutes, 2)
          updatingSeconds.innerText = addLeading(seconds, 2)


      }
    }
  }
}

setInterval(updateTimers, 1000);

function loadStoredTimers(){
  timers.innerHTML = ""
  var localStoredTimers = JSON.parse(localStorage.getItem("storedTimers"));
  if (localStoredTimers != null){
    for (var i=0; i < localStoredTimers.length; i++){
        var oldTimerTitle = localStoredTimers[i].timerTitle
        var oldTimerDate = localStoredTimers[i].timerDate
        var oldTimerColor = localStoredTimers[i].timerColor
        var oldTimerTime = localStoredTimers[i].timerTime
        var oldTimeZoneSelect = localStoredTimers[i].timerTimeZone
        var persistent = localStoredTimers[i].persistent
        createTimer(oldTimerTitle, oldTimerDate, oldTimerColor, oldTimerTime, oldTimeZoneSelect, persistent)
    }
  }
   
}


function deleteTimer(id){
  var timerToUpdate = id
  var localStoredTimers = JSON.parse(localStorage.getItem("storedTimers"));
  for (var i=0; i < localStoredTimers.length; i++){
    var oldTimerTitle = localStoredTimers[i].timerTitle
    var oldTimerDate = localStoredTimers[i].timerDate
    var oldTimerTime = localStoredTimers[i].timerTime
    var oldTimeZoneSelect = localStoredTimers[i].timerTimeZone
    var timerId = oldTimerTitle.replace(/[\W_]/g, "_")+oldTimerDate.replaceAll("-", "_")+"_"+oldTimerTime.replaceAll(":","_")+"_"+oldTimeZoneSelect.replaceAll("-", "_")
    if (timerId == timerToUpdate.id & localStoredTimers[i].persistent != true){
      clickSound()
      var index = localStoredTimers.indexOf(localStoredTimers[i])
      if (index > -1){
        localStoredTimers.splice(index, 1)
      }
      localStorage.setItem("storedTimers", JSON.stringify(localStoredTimers))
      timerToUpdate.remove()
    }
  }

  
}


document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const input = event.srcElement.previousElementSibling;
    try {
      input.showPicker();
    } catch (error) {
      // console.log(error);
    }
  });
});

function clearTimers(){
  localStorage.setItem("storedTimers", null)
  timers.innerHTML = ""
  addAllPersistentTimers()
}

function addLeading(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function addPersistentTimer(newTimerTitle, newTimerDate, newTimerColor, newTimerTime, newTimeZoneSelect){
  var existingTimers = JSON.parse(localStorage.getItem("storedTimers"));
  var persistent = true
  if(existingTimers == null) existingTimers = []
  

  var newTimerJson = {"timerTitle": newTimerTitle, "timerDate": newTimerDate, "timerColor": newTimerColor, "timerTime": newTimerTime, "timerTimeZone": newTimeZoneSelect, "persistent": persistent}

  existingTimers.push(newTimerJson)

  var cleanExistingTimers = existingTimers.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.timerDate === arr.timerDate && t.timerTime === arr.timerTime && t.timerTimeZone === arr.timerTimeZone)))

  localStorage.setItem("storedTimers", JSON.stringify(cleanExistingTimers))

  loadStoredTimers()
}

function addAllPersistentTimers(){
  addPersistentTimer("Mobile V2.1", "2025-11-18", "#4698cc", "20:00", "0")
}


window.createTimer = createTimer;
window.clearTimers = clearTimers;
window.deleteTimer = deleteTimer;

addAllPersistentTimers()

loadStoredTimers()
