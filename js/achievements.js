const body = document.body;

const basicpage = document.getElementById("basicpage")
const achievementLoading = document.getElementById("achievementLoading")


// You never know when you might use theseee
const perfectGamesBox = document.getElementById("perfectGamesBox")
const inProgressBox = document.getElementById("inProgressBox")
const gamesBox = document.getElementById("gamesBox")
const achievementOverviewBox = document.querySelectorAll("#achievementOverviewBoxes")

// Inside the box divs
const perfectGames = document.getElementById("perfectGames")
const perfectGamesDropped = document.getElementById("perfectGamesDropped")
const inProgress = document.getElementById("inProgress")
const inProgressDropped = document.getElementById("inProgressDropped")
const games = document.getElementById("games")
const achievementOverview = document.getElementById("achievementOverview")
const onlineGame = document.getElementById("onlineGame")
const achievementOverviewAchievementsP = document.getElementById("achievementOverviewAchievements")
const achievementOverviewPerfectGamesP = document.getElementById("achievementOverviewPerfectGames")
const achievementOverviewPercentageAvgP = document.getElementById("achievementOverviewPercentageAvg")
const overviewText = document.getElementById("overviewText")

// h2s
const achievementOverviewH2 = document.getElementById("achievementOverviewH2")
const perfectGamesH2 = document.getElementById("perfectGamesH2")
const inProgressH2 = document.getElementById("inProgressH2")
const gamesH2 = document.getElementById("gamesH2")


// Links
var gameInfoLink = "https://games.argil.dev/"
var achievementInfoLink = "https://achievement.argil.dev/"
var onlineInfoLink = "https://online.argil.dev/"

// broken images (i have no other way to fix, i have to hardcode it)
const brokenImages = [652980,676430,642560,461840,858760,797430,441380]

// perfectGames
const perfectGamesList = []
var numberOfPerfectGameEntries = 0

// inProgressGames
var numberOfInProgressGameEntries = 0

// link to award svg
const award = "./img/achievements_completed.svg"

// online stuff
const currentlyPlayingBox = document.getElementById("currentlyPlaying")
const onRecordHrs = document.getElementById("onRecordHrs")
const twoWeekHrs = document.getElementById("twoWeekHrs")
const weekHrInfo = document.getElementById("weekHrInfo")
const gameArt = document.getElementById("gameArt");
const gameNameEl = document.getElementById("gameName");
const gameLink = document.getElementById("gameLink")
const achievements = document.getElementById('achievements')
const achievementsUnlocked = document.getElementById('achievementsUnlocked')
const achievementsUnlockedPercentage = document.getElementById('achievementsUnlockedPercentage')
const achievementBar = document.getElementById("achievementBar")


function fetchAchievementData(){
    var achievementOverviewAchievements = 0
    var achievementOverviewTotalAchievements = 0
    var achievementOverviewTotalAchievements = 0
    var achievementOverviewPerfectGames = 0
    var inProgress = 0
    var notStarted = 0
    var achievementOverviewPercentageAvg = []


    fetch(achievementInfoLink)
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
        var obj = JSON.parse(JSON.stringify(obj.body))
        if (obj.status == false){
            gameInfoLink = "./gamesOldData.json"
            achievementInfoLink = "./achievementOldData.json"
            onlineInfoLink = "./onlineOldData.json"
        } else {
            var achievementGames = obj.response.games

            for (var i=0; i < achievementGames.length; i++){
                if (!achievementGames[i].total_achievements){
                    // console.log(achievementGames[i].appid + " total_achievements are undefined")
                    achievementGames[i].total_achievements = 0
                }
                if (!achievementGames[i].achievements){
                    // console.log(achievementGames[i].appid + " achievements are undefined")
                    achievementGames[i].achievements = [] 
                }
                var numAchievementsCompleted = achievementGames[i].achievements.length
                var numTotalAchievements = achievementGames[i].total_achievements
                var percentage_of_achievements = Math.round(((numAchievementsCompleted/numTotalAchievements)*100)*10)/10
                if (achievementGames[i].achievements.length == 0){
                    achievementGames[i].percentage_of_achievements = 0
                } else {
                    achievementGames[i].percentage_of_achievements = percentage_of_achievements
                }
                
            }
            sortPercentageAchievements(achievementGames)
            fetchGameInfo()
            fetchOnlineInfo()
        }
        

        function fetchGameInfo(){
            fetch(gameInfoLink)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(obj => {
                var obj = JSON.parse(JSON.stringify(obj.body))
                var games = obj.response.games
                for (var i=0; i < achievementGames.length; i++){
                    var game = games.find(({ appid }) => appid === achievementGames[i].appid)
                    var appid = game.appid
                    var gameName = game.name
                    var lastPlayedEpoc = game.rtime_last_played 
                    var lastPlayedUnepoc = new Date(Date.UTC(1970, 0, 1))
                    lastPlayedUnepoc.setUTCSeconds(lastPlayedEpoc)
                    var lastPlayed = lastPlayedUnepoc.toDateString()
                    var playtimeMins = game.playtime_forever
                    
                    if (game.appid == "2357570"){
                        playtimeMins = playtimeMins + 156000
                    }

                    var playtime = Math.round(playtimeMins/60)
                    var url = "https://steamcommunity.com/id/argilrants/stats/"+appid
                    var img = "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/"+appid+"/library_600x900.jpg";
                    // var img = "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/"+appid+"/portrait.png";


                    var numAchievementsCompleted = achievementGames[i].achievements.length
                    var numTotalAchievements = achievementGames[i].total_achievements
                    achievementOverviewAchievements = achievementOverviewAchievements + numAchievementsCompleted
                    achievementOverviewTotalAchievements = achievementOverviewTotalAchievements + numTotalAchievements
                    if (numAchievementsCompleted == 0){
                        var percentageOfAchievements = 0
                    } else {
                        var percentageOfAchievements = Math.round(((numAchievementsCompleted/numTotalAchievements)*100)*10)/10
                        achievementOverviewPercentageAvg.push(percentageOfAchievements)
                    }
                    var perfect = 0
                    if (numTotalAchievements > 0){
                        if (numAchievementsCompleted == numTotalAchievements){
                            perfect = 1
                            perfectGamesList.push(game)
                            perfectGamesList[achievementOverviewPerfectGames].numAchievementsCompleted = numAchievementsCompleted
                            perfectGamesList[achievementOverviewPerfectGames].numTotalAchievements = numTotalAchievements
                            perfectGamesList[achievementOverviewPerfectGames].percentageOfAchievements = percentageOfAchievements
                            perfectGamesList[achievementOverviewPerfectGames].lastPlayed = lastPlayed
                            perfectGamesList[achievementOverviewPerfectGames].gameName = gameName
                            perfectGamesList[achievementOverviewPerfectGames].url = url
                            perfectGamesList[achievementOverviewPerfectGames].img = img
                            perfectGamesList[achievementOverviewPerfectGames].playtime = playtime
                            achievementOverviewPerfectGames = achievementOverviewPerfectGames + 1
                        } else if (percentageOfAchievements > 0) {
                            perfect = 2
                            createGameEntry(lastPlayed, gameName, url, img, numAchievementsCompleted, numTotalAchievements, percentageOfAchievements, playtime, perfect, appid)
                            inProgress = inProgress + 1
                        } else {
                            perfect = 3
                            createGameEntry(lastPlayed, gameName, url, img, numAchievementsCompleted, numTotalAchievements, percentageOfAchievements, playtime, perfect, appid)
                            notStarted = notStarted + 1
                        }
                    } 
                }
                achievementOverviewAchievementsP.innerText = achievementOverviewAchievements +" / "+achievementOverviewTotalAchievements;
                achievementOverviewPerfectGamesP.innerText = achievementOverviewPerfectGames;
                achievementOverviewPercentageAvgP.innerText = Math.round(achievementOverviewPercentageAvg.reduce((p,c,_,a) => p + c/a.length,0)) +"%"
                perfectGamesH2.append(" - ",achievementOverviewPerfectGames)
                inProgressH2.append(" - ",inProgress)
                gamesH2.append(" - ",notStarted)
                parsePerfectGames();
            })
        };
        
        function fetchOnlineInfo(){
            fetch(onlineInfoLink)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(obj => { 
                var obj = JSON.parse(JSON.stringify(obj.body))
                var online = obj.response.players[0]
                var status = obj.response.players[0].gameid;
                var onlineResult = []
                if (status != undefined){
                    for (var i=0; i < achievementOverviewBox.length; i++){
                        achievementOverviewBox[i].style.display = "";
                        achievementOverviewBox[i].style.width = "100%";
                        achievementOverview.style.display = "inline-block";
                        achievementOverview.style.verticalAlign = "top";
                    }
                    var gameid = online.gameid
                    var game = achievementGames.find(({ appid }) => appid === parseInt(gameid))
                    var gameName = online.gameextrainfo
                    var onlineGames = obj.response.playing[0].response.games

                    for (var i=0; i < onlineGames.length; i++){
                        if (onlineGames[i]["appid"] == status){
                            onlineResult.push(onlineGames[i])
                        }
                    }
                    
                    var lastPlayedEpoc = onlineResult.rtime_last_played 
                    var lastPlayedUnepoc = new Date(Date.UTC(1970, 0, 1))
                    lastPlayedUnepoc.setUTCSeconds(lastPlayedEpoc)
                    var lastPlayed = lastPlayedUnepoc.toDateString()
                    var playtimeMins = onlineResult[0].playtime_forever

                    if (gameid == "2357570"){
                        playtimeMins = playtimeMins + 156000
                    }

                    var playtime = Math.round(playtimeMins/60)
                    var url = "https://steamcommunity.com/id/argilrants/stats/"+gameid
                    var img = "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/"+gameid+"/library_600x900.jpg";
                    // var img = "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/"+appid+"/portrait.png";


                    var numAchievementsCompleted = game.achievements.length
                    var numTotalAchievements = game.total_achievements
                    achievementOverviewAchievements = achievementOverviewAchievements + numAchievementsCompleted
                    achievementOverviewTotalAchievements = achievementOverviewTotalAchievements + numTotalAchievements
                    if (numAchievementsCompleted == 0){
                        var percentageOfAchievements = 0
                    } else {
                        var percentageOfAchievements = Math.round(((numAchievementsCompleted/numTotalAchievements)*100)*10)/10
                        achievementOverviewPercentageAvg.push(percentageOfAchievements)
                    }
                    var perfect = 4
                    if (numTotalAchievements == 0){
                        url = "https://store.steampowered.com/app/" + gameid
                    }
                    
                    achievementOverviewH2.innerHTML = "<span id='h2icon'>☰</span> Achievement Overview <a href='"+url+"'>"+"<span id='iconBadge'>Playing "+gameName+"</span></a>"
                    overviewText.style.display = "inline-block"
                    onlineGame.style.display = "inline-block"
                    createGameEntry(lastPlayed, gameName, url, img, numAchievementsCompleted, numTotalAchievements, percentageOfAchievements, playtime, perfect, gameid)

                }
                basicpage.style.display = "block"
                achievementLoading.style.display = "none"


            })
        }

    }   
)
}


function parsePerfectGames(){
    sortPlaytime(perfectGamesList)
    for (var i=0; i < perfectGamesList.length; i++){
        // console.log(perfectGamesList)
        var lastPlayed = perfectGamesList[i].lastPlayed
        var gameName = perfectGamesList[i].name
        var url = perfectGamesList[i].url
        var img = perfectGamesList[i].img
        var numAchievementsCompleted = perfectGamesList[i].numAchievementsCompleted
        var numTotalAchievements = perfectGamesList[i].numTotalAchievements
        var percentageOfAchievements = perfectGamesList[i].percentageOfAchievements
        var playtime = perfectGamesList[i].playtime
        var appid = perfectGamesList[i].appid
        var perfect = 1



        createGameEntry(lastPlayed, gameName, url, img, numAchievementsCompleted, numTotalAchievements, percentageOfAchievements, playtime, perfect, appid)
    }
}


function createGameEntry(lastPlayed, gameName, url, img, numAchievementsCompleted, numTotalAchievements, percentageOfAchievements, playtime, perfect, appid){
    var gameEntryDiv = document.createElement("div")
    var urlWrapper = document.createElement("a")
    var gameNameH2 = document.createElement("h2")
    var lastPlayedH3 = document.createElement("h3")
    var playtimeH3 = document.createElement("h3")
    var currentlyPlayingH3 = document.createElement("h3")
    var numAchievementsCompletedP = document.createElement("p")
    var percentageOfAchievementsP = document.createElement("p")
    var gameImg = document.createElement("img")
    var awardImg = document.createElement("img")

    gameEntryDiv.id = gameName;
    gameEntryDiv.className = "gameEntry"
    urlWrapper.className = "gameUrlWrapper"
    gameNameH2.className = "gameName"
    lastPlayedH3.className = "lastPlayed"
    playtimeH3.className = "totalPlaytime"
    currentlyPlayingH3.className = "currentlyPlayingH3"
    numAchievementsCompletedP.className = "achievementsCompleted"
    percentageOfAchievementsP.className = "percentageOfAchievements"
    gameImg.className = "gameImg"
    awardImg.className = "awardImg"

    urlWrapper.setAttribute("href", url);
    gameNameH2.innerText = gameName;
    lastPlayedH3.innerText = lastPlayed;
    playtimeH3.innerText = playtime + " hrs";
    currentlyPlayingH3.innerText = "Currently Playing"
    numAchievementsCompletedP.innerText = numAchievementsCompleted + "/" + numTotalAchievements;
    percentageOfAchievementsP.innerText = percentageOfAchievements +"% Complete";
    
    if (brokenImages.includes(appid)){
        gameImg.setAttribute("src", "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/"+appid+"/portrait.png");
    } else {
        gameImg.setAttribute("src", img);
    }

    awardImg.setAttribute("src", award);


    

    
    

    urlWrapper.appendChild(gameImg);
    urlWrapper.appendChild(gameNameH2);
    urlWrapper.appendChild(lastPlayedH3);
    urlWrapper.appendChild(playtimeH3);
    urlWrapper.appendChild(numAchievementsCompletedP);
    urlWrapper.appendChild(percentageOfAchievementsP);

    gameEntryDiv.appendChild(urlWrapper)

    if (perfect == 1){
        percentageOfAchievementsP.id = "perfect"
        gameEntryDiv.id = "perfect"
        urlWrapper.appendChild(awardImg)
        numberOfPerfectGameEntries = numberOfPerfectGameEntries + 1
        if (numberOfPerfectGameEntries >= 9){
            perfectGamesDropped.appendChild(gameEntryDiv)
        } else {
            perfectGames.appendChild(gameEntryDiv)
        }
    } else if (perfect == 2){
        var percentageOfAchievementsLeft = 100 - percentageOfAchievements
        percentageOfAchievementsP.style.backgroundImage = "linear-gradient(to left, #3d4450 0%"+percentageOfAchievementsLeft+"%, #1a9fff "+percentageOfAchievementsLeft+"% 100%)"
        numberOfInProgressGameEntries = numberOfInProgressGameEntries + 1
        if (numberOfInProgressGameEntries >= 5){
            inProgressDropped.appendChild(gameEntryDiv)
        } else {
            inProgress.appendChild(gameEntryDiv)
        }
    } else if (perfect == 4){
        urlWrapper.appendChild(currentlyPlayingH3)
        var percentageOfAchievementsLeft = 100 - percentageOfAchievements
        percentageOfAchievementsP.style.backgroundImage = "linear-gradient(to left, #3d4450 0%"+percentageOfAchievementsLeft+"%, #1a9fff "+percentageOfAchievementsLeft+"% 100%)"
        numberOfInProgressGameEntries = numberOfInProgressGameEntries + 1
        if (numTotalAchievements == 0){
            numAchievementsCompletedP.innerText = "No achievements"
            numAchievementsCompletedP.id = "noAchievementsPossible"
            playtimeH3.id = "noAchievementsPossible"
            var noAchievementsPossibleUrl = "https://store.steampowered.com/app/" + appid
            urlWrapper.setAttribute("href", noAchievementsPossibleUrl)
        }
        if (percentageOfAchievementsLeft == 0){
            percentageOfAchievementsP.id = "perfect"
            gameEntryDiv.id = "perfect"
            urlWrapper.appendChild(awardImg)
        }
        onlineGame.prepend(gameEntryDiv)
    }
    else { 
        games.appendChild(gameEntryDiv)
    }
}



function sortAchievements(array){
    array.sort(function(a, b){return b.achievements.length - a.achievements.length})
}

function sortTotalAchievements(array){
    array.sort(function(a, b){return b.total_achievements - a.total_achievements})
}

function sortPercentageAchievements(array){
    array.sort(function(a, b){return b.percentage_of_achievements - a.percentage_of_achievements})
}

function sortLastPlayed(array){
    array.sort(function(a, b){return b.rtime_last_played - a.rtime_last_played})
}

function sortPlaytime(array){
    array.sort(function(a, b){return b.playtime - a.playtime})
}





fetchAchievementData()