const iAmBlank = document.getElementById("onlineCheck");
const iAmPlaying = document.getElementById("playing");
const gameArt = document.getElementById("gameArt");
const gameNameEl = document.getElementById("gameName");
const gameLink = document.getElementById("gameLink")
const lastLoggedOff = document.getElementById("lastLoggedOff")
const onRecordHrs = document.getElementById("onRecordHrs")
const twoWeekHrs = document.getElementById("twoWeekHrs")
const weekHrInfo = document.getElementById("weekHrInfo")
const onlineCheckLoading = document.getElementById("onlineCheckLoading")

setInterval(function() {

    if ( document.hasFocus() ) {
        fetchOnlineInfo();
    };
  
}, 300000);//5 min






function fetchOnlineInfo(){
    fetch("https://online.argil.dev")
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
        onlineCheckLoading.style.display = "none";
        var obj = JSON.parse(JSON.stringify(obj.body))
        var onlineStatus = obj.response.players[0].personastate; 
        var gameStatus = obj.response.players[0].gameid;
        var gameName = obj.response.players[0].gameextrainfo;

        // time

        var lastLogOff = new Date(obj.response.players[0].lastlogoff);
        var currentTime = new Date(Math.round(Date.now()/1000))
        var timeDifference = (currentTime.getTime() - lastLogOff.getTime());
        var differenceDate = new Date(timeDifference*1000);
        var diffHours = differenceDate.getUTCHours();
        var diffMinutes = differenceDate.getUTCMinutes();

        // games

        var games = obj.response.playing[0].response.games;
        var results = [];


        if (diffHours == 0){
            lastLoggedOff.innerText = "for " + diffMinutes + " min(s) ";
        } else  {
            lastLoggedOff.innerText = "for " + diffHours + " hour(s) " + diffMinutes + " min(s) ";
        }



        
        if (onlineStatus == 1){
            console.log("online");
            iAmBlank.innerText = "IM ONLINE ✔"
            iAmBlank.className = '';
            iAmBlank.className = "online";
        } else if(onlineStatus == 2 || onlineStatus == 3){
            console.log("away")
            iAmBlank.innerText = "IM AWAY ⌚"
            iAmBlank.className = '';
            iAmBlank.className = "away";
            lastLoggedOff.style.display = "none";
            
        } else{
            console.log("offline")
            iAmBlank.innerText = "IM OFFLINE ❌"
            iAmBlank.className = '';
            iAmBlank.className = "offline";
            lastLoggedOff.style.display = "none";
        };

        if (gameStatus){
            iAmPlaying.style.display = "block";

            gameNameEl.innerText = gameName;

            gameArt.src = "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/"+gameStatus+"/library_600x900.jpg";

            gameLink.href = "https://store.steampowered.com/agecheck/app/" + gameStatus;

            for (var i=0; i < games.length; i++){
                if (games[i]["appid"] == gameStatus){
                    results.push(games[i])
                }
            }

            var playtimeTwoWeeks = results[0].playtime_2weeks; 
            var playtimeForever = results[0].playtime_forever;

            if (playtimeTwoWeeks != null){
                weekHrInfo.style.display = "block";
                twoWeekHrs.innerText = Math.round(playtimeTwoWeeks/60);
                onRecordHrs.innerText = Math.round(playtimeForever/60);
            } else{
                onRecordHrs.innerText = Math.round(playtimeForever/60);
            }
        };

        
    });

}


window.onload = (event) => {
    fetchOnlineInfo();
};