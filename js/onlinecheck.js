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
const nowPlaying = document.getElementById("nowplaying")
const nowPlayingArtist = document.getElementById("nowPlayingArtist")
const songLink = document.getElementById("songlink")
const albumArt = document.getElementById("albumart")
const pulse = document.getElementById("pulse")
const listeningBox = document.getElementById("listening")
const listeningLoader = document.getElementById("listeningLoading")
const listeningTitle = document.getElementById("listeningtitle")
const listeningSubtitle = document.getElementById("listeningSubtitle")
const achievements = document.getElementById('achievements')
const achievementsUnlocked = document.getElementById('achievementsUnlocked')
const achievementsUnlockedPercentage = document.getElementById('achievementsUnlockedPercentage')
const achievementBar = document.getElementById("achievementBar")
const scrollablePlaylistArea = document.getElementById("scrollablePlaylistArea")
const playlists = document.getElementsByClassName("playlists")
const mySetupScrollableIcon = document.getElementById("mySetupScrollableIcon")
const mySetupDefaultSubtitle = document.getElementById("mySetupDefaultSubtitle")
const mySetupSecondSubtitle = document.getElementById("mySetupSecondSubtitle")
const mySetupScrollableSection = document.getElementById("mySetupScrollableSection")
const onlineCheckBox = document.getElementById("onlineCheckBox")


var dataLink = "https://online.argil.dev"

setInterval(function() {

    if ( document.hasFocus() ) {
        fetchOnlineInfo(false);
    };

  
}, 180000);//3 min

function spotifyAlbumArt(songUriFormatted){
    var url = "https://open.spotify.com/oembed?url=spotify:track:" + songUriFormatted 
    fetch(url)
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
        var obj = JSON.parse(JSON.stringify(obj.body))
        var albumUrl = obj.thumbnail_url;
        if (albumUrl == undefined){
            albumArt.src = "./img/musicload.png";
            listeningSubtitle.innerHTML = "spotify deleted the track image yet a-<span id='censored'>fucking</span> again";
        } else {
            albumArt.src = albumUrl;
        }
    });
}



function fetchOnlineInfo(testData){

    listeningLoader.style.animation = "loading .7s linear infinite"
    listeningLoader.style.display = "inline-block"
    listeningLoader.innerText = "progress_activity"

    

    

    fetch(dataLink)
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
        var obj = JSON.parse(JSON.stringify(obj.body))
        if (obj.response.players[0].onlineStatus == "false"){
            var onlineStatus = "rateLimited"
        } else {
            var onlineStatus = obj.response.players[0].personastate; 
        }

        if (obj.response.playing[0].response.playingStatus == "false"){
            var gameStatus = false
        } else {
            var gameStatus = obj.response.players[0].gameid;
            var gameName = obj.response.players[0].gameextrainfo;
            var lastLogOff = new Date(obj.response.players[0].lastlogoff);
            var currentTime = new Date(Math.round(Date.now()/1000))
            var timeDifference = (currentTime.getTime() - lastLogOff.getTime());
            var differenceDate = new Date(timeDifference*1000);
            var diffHours = differenceDate.getUTCHours();
            var diffMinutes = differenceDate.getUTCMinutes();
            var games = obj.response.playing[0].response.games;
            var results = [];
        }
        
        var isPlaying = obj.response.playing[0].response.listening[0].isPlaying;
        var songName = obj.response.playing[0].response.listening[0].songName;
        var artists = obj.response.playing[0].response.listening[0].artists;
        var albumUri = obj.response.playing[0].response.listening[0].albumUri;
        var songUri	 = obj.response.playing[0].response.listening[0].songUri;
        var artistsFormatted = ""


        // if (diffHours == 0){
        //     lastLoggedOff.innerText = "for " + diffMinutes + " min(s) ";
        // } else  {
        //     lastLoggedOff.innerText = "for " + diffHours + " hour(s) " + diffMinutes + " min(s) ";
        // }


        function amIOnlineText(){
            onlineCheckLoading.style.display = "none";
            if (onlineStatus == 1){
                console.log("I am online");
                iAmBlank.innerText = "IM ONLINE ✔"
                iAmBlank.className = '';
                iAmBlank.className = "online";
            } else if(onlineStatus == 2 || onlineStatus == 3){
                console.log("I am away")
                iAmBlank.innerText = "IM AWAY ⌚"
                iAmBlank.className = '';
                iAmBlank.className = "away";
                lastLoggedOff.style.display = "none";
                
            } else if(onlineStatus == "rateLimited"){
                console.log("I am rate limited")
                iAmBlank.innerText = "RATE LIMITED"
                iAmBlank.className = '';
                iAmBlank.className = "rateLimit";
                lastLoggedOff.style.display = "none";
                onlineCheckBox.style.display = "none";
            } else{
                console.log("I am offline")
                iAmBlank.innerText = "IM OFFLINE ❌"
                iAmBlank.className = '';
                iAmBlank.className = "offline";
                lastLoggedOff.style.display = "none";
            };
    
        }
    
        function achievementsGet(){
            var url = "https://achievement.argil.dev"
            var numbersOfAchievementsUnlocked = 0;
            fetch(url)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(obj => {
                var obj = JSON.parse(JSON.stringify(obj.body))
                var achievementGames = obj.response.games
                var achievementResults = [];
                var achievementStatus = false
                

                for (var i=0; i < achievementGames.length; i++){
                    if (achievementGames[i]["appid"] == gameStatus){
                        achievementResults.push(achievementGames[i])
                    }
                }

                var totalAchievements = achievementResults[0].total_achievements;

                if (!totalAchievements){
                    achievementStatus = false 
                } else{
                    achievementStatus = true
                }

                if (achievementStatus == false){
                    playlists[0].setAttribute("id", "doubleScrollablePlaylists")
                    mySetupScrollableSection.setAttribute("class", "scrollable")
                    mySetupDefaultSubtitle.style.display = "none";
                    mySetupSecondSubtitle.style.display = "block";
                    mySetupScrollableIcon.style.display = "block";
                    amIOnlineText()
                    iAmPlaying.style.display = "block";
                    achievements.style.display = "none";
                    achievementBarProgress.style.display = "none";
                } else {
                    numbersOfAchievementsUnlocked = achievementResults[0].achievements.length;
                    var percentageOfAchievementsUnlocked = Math.round(((numbersOfAchievementsUnlocked/totalAchievements)*100)*10)/10
                    achievementsUnlocked.innerText = "I've unlocked "+numbersOfAchievementsUnlocked+"/"+totalAchievements;
                    achievementsUnlockedPercentage.innerText = "("+percentageOfAchievementsUnlocked+"%)"
        
                    achievementBar.style.width = percentageOfAchievementsUnlocked + "%";
                    achievements.style.paddingTop = "3px";
                    playlists[0].setAttribute("id", "doubleScrollablePlaylists")
                    mySetupScrollableSection.setAttribute("class", "scrollable")
                    mySetupDefaultSubtitle.style.display = "none";
                    mySetupSecondSubtitle.style.display = "block";
                    mySetupScrollableIcon.style.display = "block";
                    // gameLink.href = "https://steamcommunity.com/id/argilrants/stats/" + gameStatus;
                    gameLink.href = "./achievements.html"
                    amIOnlineText()
                    iAmPlaying.style.display = "block";
                }
            });
        }
        

        
        if (gameStatus || testData == true){

            gameNameEl.innerText = gameName;
            if (gameName.length >= 16){
                gameNameEl.style.animation = "floatText "+(gameName.length)/3.5+"s infinite linear"
            } else {
                gameNameEl.style.marginLeft = "75px"
            }

            gameArt.src = "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/"+gameStatus+"/library_600x900.jpg";

            gameLink.href = "https://store.steampowered.com/app/" + gameStatus;

            for (var i=0; i < games.length; i++){
                if (games[i]["appid"] == gameStatus){
                    results.push(games[i])
                }
            }

            var playtimeTwoWeeks = results[0].playtime_2weeks; 
            var playtimeForever = results[0].playtime_forever;

            if (gameStatus == "2357570"){
                playtimeForever = playtimeForever + 156000
            }

            if (playtimeTwoWeeks != null){
                weekHrInfo.style.display = "block";
                twoWeekHrs.innerText = Math.round(playtimeTwoWeeks/60);
                onRecordHrs.innerText = Math.round(playtimeForever/60);
            } else{
                onRecordHrs.innerText = Math.round(playtimeForever/60);
            }
            // achievementsGet()
            playlists[0].setAttribute("id", "doubleScrollablePlaylists")
            mySetupScrollableSection.setAttribute("class", "scrollable")
            mySetupDefaultSubtitle.style.display = "none";
            mySetupSecondSubtitle.style.display = "block";
            mySetupScrollableIcon.style.display = "block";
            amIOnlineText()
            iAmPlaying.style.display = "block";
            achievements.style.display = "none";
            achievementBarProgress.style.display = "none";
        } else{
            playlists[0].setAttribute("id", "doubleScrollablePlaylists")
            amIOnlineText();
            iAmPlaying.style.display = "none";
        }

        if (isPlaying == false && testData == false){
            listeningSubtitle.innerHTML = "literally nothing!"
            listeningLoader.innerText = "cancel"
            listeningLoader.style.color = "#ff0000"
            listeningTitle.style.color = "#ff0000"
            listeningBox.style.borderColor = "#ff0000"
            albumArt.style.borderColor = "#ff0000"
            nowPlayingArtist.style.color = "#ff0000";
            nowPlaying.innerText = "Song Name: ☹"
            nowPlayingArtist.innerText = "Artist Names: ☹"

            



            listeningLoader.style.animation = "none"
            setTimeout(function(){
                listeningLoader.style.animation = "dissapear .5s";
                listeningBox.style.animation = "dissapear .5s";
                setTimeout(function(){
                    listeningLoader.style.display = "block";
                    listeningBox.style.display = "none";
                }, 400)
            }, 1000)
            
            console.log("Not listening to anything at the moment")
        } else {
            listeningLoader.innerText = "progress_activity"
            listeningLoader.style.animation = "loading .7s linear infinite"
            listeningLoader.style.display = "inline-block"
            listeningLoader.style.color = ""
            listeningTitle.style.color = ""
            listeningBox.style.borderColor = ""
            albumArt.style.borderColor = ""
            nowPlayingArtist.style.color = "";
            listeningSubtitle.innerHTML = 'updates every <span class="subtitletotitleShine">3 mins</span>';
            nowPlaying.innerText = "track name here"
            nowPlayingArtist.innerText = "artist names here"
            listeningBox.style.display = "block";
            listeningBox.style.animation = "none"
            for (var i=0; i < artists.length; i++){
                artistsFormatted += obj.response.playing[0].response.listening[0].artists[i].name + " & ";
            }
    
            artistsFormatted = artistsFormatted.slice(0, -3)
            var songUrl = "https://open.spotify.com/track/"+songUri.slice(14)
            var songUriFormatted = songUri.slice(14)

            if (artistsFormatted.includes("Sparks")){
                listeningTitle.innerText = "⚡︎ SPARKING TO ⚡︎"
                listeningTitle.className = "sparking"
            }

            if (songName.includes("remix") || songName.includes("Remix")){
                console.log("REMIX TIME")
                // listeningTitle.style.animation = "5s katy infinite"
                listeningTitle.innerText = "♫ REMIXING"
                listeningTitle.className = "remix"
            }

            if (songName.includes("(feat.")){
                console.log("Song name has a featured artist, removing now")
                songName = songName.split('(feat.',1)[0]
            }

            if (songName.includes("[feat.")){
                console.log("Song name has a featured artist, removing now")
                songName = songName.split('[feat.',1)[0]
            }

            if (songName.includes("(with")){
                console.log("Song name has a featured artist, removing now")
                songName = songName.split('(with',1)[0]
            }

            if (songName.includes("(w/")){
                console.log("Song name has a featured artist, removing now")
                songName = songName.split('(w/',1)[0]
            }

            if (songName.includes("(Taylor's Version)")){
                console.log("Taylors Version detected, abbrivating")
                songName = songName.split("(Taylor's Version)",1)[0]
                songName = songName + " (TV)"
                albumArt.className = ""
            }
            
            if (albumUri == "spotify:album:0W5woeQnfOZmVLSbggRRlR" || albumUri == "spotify:album:3ThlxfLSy4bfKzxWqmC7VN" || albumUri == "spotify:album:36P07bti6xD99o7S1acmin"){
                if (songName.includes("featuring")){
                    console.log("Song name has a featured artist, removing now")
                    songName = songName.split('featuring',1)[0]
                }
            }

           

            nowplaying.innerText = songName;
            nowPlayingArtist.innerText = artistsFormatted;
            songLink.setAttribute("href", songUrl);
            // songLink.setAttribute("href", songUri);


            if (songName.length >= 15){
                console.log("Song name too long, animating")
                var songAnimLength = Math.round((songName.split(' ').length))
                if (songAnimLength > 12 || songName.length > 30){
                    songAnimLength = 12;
                } 
                if (songAnimLength < 6 || songName.length < 20){
                    songAnimLength = 6;
                }
                nowplaying.style.animation = "floatText "+(songAnimLength)+"s infinite linear"
            };

            if (artistsFormatted.length >= 15){
                console.log("Artist name too long, animating")
                var artistAnimLength = Math.round((artists.length))
                if (artistAnimLength > 12 || artistsFormatted.length > 30){
                    artistAnimLength = 12;
                } 
                if (artistAnimLength < 6 || artistsFormatted.length < 20){
                    artistAnimLength = 6;
                }
                if (artistsFormatted.length > 100 || artists.length > 10){
                    artistAnimLength = artists.length
                }
                nowPlayingArtist.style.animation = "floatText "+(artistAnimLength)+"s infinite linear"
            };

            spotifyAlbumArt(songUriFormatted);

            listeningLoader.innerText = "check_circle"
            listeningLoader.style.animation = "none"
            setTimeout(function(){
                listeningLoader.style.animation = "dissapear .5s";
                setTimeout(function(){
                    listeningLoader.style.display = "none";
                }, 400)
            }, 1000);
        }        
    });

}


fetchOnlineInfo(false);
