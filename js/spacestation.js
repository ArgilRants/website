const dataToGather = ["NODE3000005","NODE3000008","NODE3000009"]
const velocityP = document.getElementById("velocity")
const altitudeP = document.getElementById("altitude")
const urinePee = document.getElementById("urine")
const wasteP = document.getElementById("wasteWater")
const cleanP = document.getElementById("cleanWater")



setInterval(function() {

    if ( document.hasFocus() ) {
        getIssInfo()
    };

  
}, 30000);//30 seconds (30000)

require(["LightstreamerClient","Subscription"],function(LightstreamerClient,Subscription) 
{
	var client = new LightstreamerClient("https://push.lightstreamer.com","ISSLIVE");
	client.connect();
 
	var sub = new Subscription("MERGE",dataToGather,["Value","TimeStamp"]);

var timeSub = new Subscription('MERGE', 'TIME_000001', ['TimeStamp','Status.Class']);

client.subscribe(sub);

function formatTelemetryValue(value) {
    // Check if the value is a number and has a decimal point
    if (!isNaN(parseFloat(value)) && isFinite(value) && value.toString().includes('.')) {
        return Number(value).toFixed(5);
    }

    return value;
}

sub.addListener({
    onItemUpdate: function(update) 
	{
		var item = update.getItemName();
        var updatevalue = formatTelemetryValue(update.getValue("Value"))

        for (var i=0; i < dataToGather.length; i++){
            if (item === dataToGather[i]){

                if (isNaN(updatevalue) == false){
                    updatevalue = Math.round(updatevalue)
                } 

                if (item === "NODE3000005"){
                    urinePee.innerHTML = updatevalue + " <span id='issUnits'>%"
                } else if (item === "NODE3000008"){
                    wasteP.innerHTML = updatevalue + " <span id='issUnits'>%"
                } else if (item === "NODE3000009"){
                    cleanP.innerHTML = updatevalue + " <span id='issUnits'>%"
                }
            }
        }


    }
})
})


function getIssInfo(){
    fetch("https://api.wheretheiss.at/v1/satellites/25544s")
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
        var latitude = obj.body.latitude
        var longitude = obj.body.longitude
        var velocity = obj.body.velocity
        velocity = Math.round(velocity)
        var altitude = obj.body.altitude
        altitude = Math.round(altitude)

        updateMap(latitude, longitude)

        velocityP.innerHTML = velocity + " <span id='issUnits'>km/h"
        altitudeP.innerHTML = altitude + " <span id='issUnits'>km"


        
    })
}



var latitude = 0 
var longitude = 0 
const map = L.map('map', {zoomControl: false, doubleClickZoom: false, dragging: false}).setView([latitude, longitude], -1);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 0,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const circle = L.circle([latitude, longitude], {
    color: 'var(--h2-color)',
    fillColor: 'var(--h2-color)',
    fillOpacity: 0.5,
    radius: 900000
}).addTo(map);

// circle.bindPopup("ISS Location");

function updateMap(latitude, longitude){
    circle.setLatLng([latitude, longitude])

    map.setView([latitude, longitude])
}


getIssInfo()