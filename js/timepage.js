import { getTimeZones } from 'https://cdn.skypack.dev/@vvo/tzdb'

const timeFromInput = document.getElementById("timeFrom")
const timeReg = /^(|0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/
const timeRegWhiteSpace = /^(|0?[0-9]|1[0-9]|2[0-3])\s([0-5][0-9])$/
const lastNumberReg = /\D+$/g
const timeZones = getTimeZones();
const localOffset = new Date().getTimezoneOffset() * 60000
const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;


var timeZoneData = []
var timeFromTimeZone = ""
var twelveHourTime = false
var am = false
var pm = false
timeFromInput.addEventListener("input", parseValue)

function isTwelveHour(time){
    if (time.toUpperCase().includes("AM")){
        twelveHourTime = true
        am = true
    } else if (time.toUpperCase().includes("PM")){
        twelveHourTime = true
        pm = true
    } else {
        twelveHourTime = false
    }
}

function minutesToHHMM(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.abs(minutes % 60);
    return (hours < 0 ? '-': '+') + (Math.abs(hours) + '').padStart(2, '0') + ':' + (mins + '').padStart(2, '0')
}

function getTimezoneDetails(tz) {
    const currentOffsetMinutes = tz.currentTimeOffsetInMinutes;
    const currentOffset = 'UTC' + minutesToHHMM(currentOffsetMinutes);
    return { name: tz.name, currentOffsetMinutes, currentOffset, abbreviation: tz.abbreviation }
}

function checkTimezone(time){
    timeFromTimeZone = ""
    timeZoneData = []
    var allTimeZoneData = timeZones.map(getTimezoneDetails)
    for (var i=0; i < allTimeZoneData.length; i++){
        var abbr = allTimeZoneData[i].abbreviation
        if (time.toUpperCase().includes(abbr)){
            timeFromTimeZone = abbr 
            timeZoneData = allTimeZoneData[i]
        }
    }

}

function parseValue(e){
    var timeFromStr = e.target.value
    var justTimeFromStr = timeFromStr.replaceAll(lastNumberReg, "")
    isTwelveHour(timeFromStr)
    if (twelveHourTime == true){
        timeFromStr = timeFromStr.toUpperCase().replace("PM", "")
        timeFromStr = timeFromStr.toUpperCase().replace("AM", "")
    }

    var timeFrom = justTimeFromStr.match(timeReg)

    if (timeFrom == null){
        timeFrom = justTimeFromStr.match(timeRegWhiteSpace)
    }


    if (twelveHourTime == true){
        if (timeFrom[1] == 12 && am == false){
            timeFrom[1] = "12"            
        } else if(timeFrom[1] == 12 && am == true){
            timeFrom[1] = "00"            
        } else if (pm == true) {
            timeFrom[1] = (parseInt(timeFrom[1]) + 12).toString()
        }
    }

    checkTimezone(timeFromStr)

    var date = new Date();
    if (timeFrom == null){

    } else {
        date.setUTCHours(parseInt(timeFrom[1]))
        date.setUTCMinutes(parseInt(timeFrom[2]))
        date.setUTCSeconds(0)
    
        var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    date.getUTCDate(), date.getUTCHours(),
                    date.getUTCMinutes(), date.getUTCSeconds());
    
        
    
        var offset = timeZoneData.currentOffsetMinutes * 60000
        var dateFrom = new Date(now_utc + offset + localOffset)           
        var dateLocal = new Date(now_utc - offset)           
    
    
        console.log(dateLocal.toLocaleTimeString("en-GB", {hour: '2-digit', minute:'2-digit'}))
    }
   

}