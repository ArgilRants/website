var dataLink = "https://online.argil.dev"
const themeBody = document.body;
var albumArt = document.getElementById("albumArt")
var songLink = document.getElementById("songLink")
var spotifyDot = document.getElementById("spotifyDot")
var themeSelectElm = document.getElementById("themeSelect")
var nav = document.getElementById("nav")
var menuButton = document.getElementById("menu")
var hiddenMenu = document.getElementById("hiddenMenu")
var vinyl = document.getElementById("vinyl")
var container = document.getElementById("container")
var spotifySocial = document.getElementById("spotifySocial")
var titleSubtitle = document.getElementById("titleSubtitle")
var diary = document.getElementById("diary")
var yPosition = 0
const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");
const currentTheme = localStorage.getItem("theme");
const playlistsID = document.getElementById("playlistsID")
const preImg = "../img/playlistCovers/"
var playlistArray = []
var gameLink = document.getElementById("gameLink")
var gameImg = document.getElementById("gameImg")
var gameName = document.getElementById("gameName")
var twoWeekHrs = document.getElementById("twoWeekHrs")
var onRecordHrs = document.getElementById("onRecordHrs")
var weekHrInfo = document.getElementById("weekHrInfo")
var playing = document.getElementById("playing")

setInterval(function() {
    if ( document.hasFocus() ) {
        fetchOnlineInfo()
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
            albumArt.src = "../img/simpleIcons/spotify.svg4";
        } else {
            albumArt.src = albumUrl;
        }
    });
}

function fetchOnlineInfo(){
    fetch(dataLink)
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
        var obj = JSON.parse(JSON.stringify(obj.body))
        var isPlaying = obj.response.playing[0].response.listening[0].isPlaying;
        if (obj.response.players[0].onlineStatus == "false"){
            var onlineStatus = "rateLimited"
        } else {
            var onlineStatus = obj.response.players[0].personastate; 
            if (onlineStatus == 1){
                console.log("I am online");
                titleSubtitle.innerText = "I'm Online!"
            } else if(onlineStatus == 2 || onlineStatus == 3){
                console.log("I am away")
                titleSubtitle.innerText = "I'm Away!"
            } else if(onlineStatus == "rateLimited"){
                titleSubtitle.style.display = ""
            } else{
                console.log("I am offline")
                titleSubtitle.innerText = "I'm Offline!"
            };
        }
        if (obj.response.playing[0].response.playingStatus == "false"){
            var gameStatus = false
            playing.style.display = ""
        } else {
            var gameStatus = obj.response.players[0].gameid;
            if(gameStatus){
                playing.style.display = "block"
                var currentGameName = obj.response.players[0].gameextrainfo;
                var gameHref = "https://store.steampowered.com/app/" + gameStatus;
                var gameArt = "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/"+gameStatus+"/library_600x900.jpg";
                var games = obj.response.playing[0].response.games;
                var results = [];
                for (var i=0; i < games.length; i++){
                    if (games[i]["appid"] == gameStatus){
                        results.push(games[i])
                    }
                }
                var playtimeTwoWeeks = results[0].playtime_2weeks; 
                var playtimeForever = results[0].playtime_forever;
                gameLink.href = gameHref
                gameImg.src = gameArt
                gameName.innerText = currentGameName
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
            }
        }
        if (isPlaying){
            var songName = obj.response.playing[0].response.listening[0].songName;
            var artists = obj.response.playing[0].response.listening[0].artists;
            var albumUri = obj.response.playing[0].response.listening[0].albumUri;
            var songUri	 = obj.response.playing[0].response.listening[0].songUri;
            var songUrl = "https://open.spotify.com/track/"+songUri.slice(14)
            var songUriFormatted = songUri.slice(14)
            songLink.setAttribute("href", songUrl)
            spotifyAlbumArt(songUriFormatted);
            vinyl.style.display = ""
        } else{
            vinyl.style.display = "none"
        }
    })
}

function fetchLetterboxdData(){
    fetch('https://diary.argil.dev/')
    .then(response => response.json())
    .then(data => {
        for (var i=0; i < data.length; i++){
            var diaryEntryData = data[i]
            if (i > 10){

            } else {
                dataEntryParse(diaryEntryData)
            }
        }})   
}

function selectElement(id, valueToSelect) {    
  let element = document.getElementById(id);
  if (element == null){
    console.log(id + " doesn't exist")
  } else{
    element.value = valueToSelect;
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

if (currentTheme == null){
  themeBody.className = "";
} else if(currentTheme == "auto"){
  themeBody.className = "";
} else {
  themeBody.className = "";
  themeBody.className = currentTheme;
};

if (currentTheme == null){
    if (prefersLightScheme.matches){
        selectElement("themeSelect", "auto");
    } else {
        selectElement("themeSelect", "auto");
    }
} else if(currentTheme == "auto"){
    selectElement("themeSelect", "auto");
} else {
    selectElement("themeSelect", themeBody.className);
}

function menu(){
    if (nav.style.backdropFilter == "blur(3px)"){
        nav.style.backdropFilter = "none"
        nav.style.backgroundColor = "var(--bg-color)"
        menuButton.innerText = "close"
        menuButton.style.color = "#ff0000"
        menuButton.style.outline = "solid 2px var(--box-border-color)"
        menuButton.style.backgroundColor = "color-mix(in srgb, var(--box-color) 80%, #ff0000)"
        nav.style.justifyContent=  ""
        yPosition = window.pageYOffset
        window.scrollTo(0,0)
        container.style.display = "none"
        hiddenMenu.style.display = "flex"
        titleSubtitle.style.display = "flex"
    } else {
        nav.style.backdropFilter = "blur(3px)"
        nav.style.backgroundColor = ""
        menuButton.innerText = "menu"
        menuButton.style.color = ""
        menuButton.style.outline = ""
        menuButton.style.backgroundColor = ""
        nav.style.height=  ""
        nav.style.justifyContent=  ""
        container.style.display = ""
        hiddenMenu.style.display = ""
        titleSubtitle.style.display = ""
        window.scrollTo({top: yPosition, left: 0});
    }
}

function truncateString(yourString, maxLength) {
    // get the index of space after maxLength
    const index = yourString.indexOf(" ", maxLength);
    return index === -1 ? yourString : yourString.substring(0, index)
}

function dataEntryParse(diaryEntryData) {
    var watchedUnix = diaryEntryData.date.watched;
    var filmTitleRaw = diaryEntryData.film.title;
    var filmYearRaw = diaryEntryData.film.year;
    var imgRaw = diaryEntryData.film.image.large;
    var ratingScoreRaw = diaryEntryData.rating.text; 
    var reviewRaw = diaryEntryData.review;
    var urlRaw = diaryEntryData.uri;
    var watchedDate = new Date(watchedUnix).toLocaleDateString("en-UK");
    var watchedDateJS = new Date(watchedUnix)
    var ratingScore = ratingScoreRaw.replaceAll("★", "★ ");
    if (reviewRaw.length >= 100){
        var review = truncateString(reviewRaw, 100) + " [...]"
    }else {
        var review = truncateString(reviewRaw, 100)
    }
    newEntry(urlRaw, imgRaw, filmTitleRaw, filmYearRaw, review, watchedDate, ratingScore)
}

function newEntry(filmLink, filmImg, filmTitle, filmYear, diaryEntry, diaryDate, rating){
    var entry = document.createElement('div')
    var link = document.createElement('a')
    var img = document.createElement('img')
    var topDiary = document.createElement('div')
    var title = document.createElement('span')
    var year = document.createElement('span')
    var bottomDiary = document.createElement('div')
    var review = document.createElement('span')
    var date = document.createElement('span')
    var stars = document.createElement('span')
    entry.className = "entry"
    entry.id = filmTitle
    link.href = filmLink
    link.className - "filmLink"
    link.id = "filmLink"
    img.className = "filmImg"
    img.id = "filmImg"
    img.src = filmImg
    topDiary.className = "topDiary"
    title.className = "filmTitle"
    title.id = "filmTitle"
    title.innerText = filmTitle
    year.className = "filmYear"
    year.id = "filmYear"
    year.innerText = filmYear
    bottomDiary.className = "bottomDiary"
    review.className = "diaryEntry"
    review.id = "diaryEntry"
    review.innerText = diaryEntry
    date.className = "diaryDate"
    date.id = "diaryDate"
    date.innerText = diaryDate
    stars.className = "rating"
    stars.id = "rating"
    stars.innerText = rating
    link.appendChild(img)
    topDiary.appendChild(title)
    topDiary.appendChild(year)
    link.appendChild(topDiary)
    bottomDiary.appendChild(review)
    bottomDiary.appendChild(date)
    bottomDiary.appendChild(stars)
    link.appendChild(bottomDiary)
    entry.appendChild(link)
    diary.appendChild(entry)
}

playlistArray.push({link: "https://open.spotify.com/playlist/4qjLQUqNWPhblkXEOQBkbv?si=5a14314363de43b8", img: "The Top Sparks Songs Ranked by Me.jpg", title: "The Top Sparks Songs Ranked by Me", description: "Top 5 songs ranked by me by studio albums by year"})
playlistArray.push({link: "https://open.spotify.com/playlist/2icqUWKP0oawWKfZgBzIlO?si=028c5676f18d47cb", img: "the best cover art.jpg", title: "the BEST cover art", description: "An extensive updating playlist filled with the BEST cover art."})
playlistArray.push({link: "https://open.spotify.com/playlist/5OG98tYyMIN9lvupvIl32S?si=42c49f8b2e14461e", img: "my personal s tier katy songs.png", title: "my personal s tier katy songs", description: "My favorite Katy Perry songs. I love katy so much"})
playlistArray.push({link: "https://open.spotify.com/playlist/62sDOWwfhDyA3Xl0CFQDWQ?si=7ac4da214a2e43aa", img: "bad songs, but like they still serve a little.png", title: "bad songs, but like they still serve a little", description: "Songs I think are cringe / bad but serve."})
playlistArray.push({link: "https://open.spotify.com/playlist/4DfSHhpcbr08wwpV36FFCw?si=084cf7406c9247c8", img: "my personal s tier gaga songs.jpg", title: "my personal s tier gaga songs", description: "My favorite Gaga songs. Obsessed with 'Disease'"})
playlistArray.push({link: "https://open.spotify.com/playlist/5UzTTzBsusy5c1mfo4OHg7?si=5a3243d751fc4028", img: "who up gooning they rock .png", title: "who up gooning they rock", description: "uhhh not Meeeee..  How 'bout yall?  nvm forget i asked"})
playlistArray.push({link: "https://open.spotify.com/playlist/39T7ZdXL7cZq34hhU3Bm3W?si=e37781b0d1a84d85", img: "songs i think john kramer would enjoy if he was a 2020s catboy.png", title: "songs i think john kramer would enjoy if he was a 2020s catboy", description: "catboy kramer be like: do yo-uwu wanna play a game"})
playlistArray.push({link: "https://open.spotify.com/playlist/3W5wwYCPcvTmOqfIowjVIA?si=c09ce9c5a05545b6", img: "The Top Missy Songs Ranked by Me.png", title: "The Top Missy Songs Ranked by Me", description: "Top 5 songs ranked by me by studio albums by year"})
playlistArray.push({link: "https://open.spotify.com/playlist/6QVZfdwMMiwr5M5CRsDKBK?si=3cfe6cb95d9d4645", img: "The Top Taylor Swift Songs Ranked by Me.png", title: "The Top Taylor Swift Songs Ranked by Me", description: "Top 5 songs ranked by me by studio albums by year"})
playlistArray.push({link: "https://open.spotify.com/playlist/0mQRv0EBHtLNULoqApdQ9y?si=30ee793d576341d0", img: "welcome to story mountain.webp", title: "welcome to story mountain", description: "One of the very few ordered playlist that aren't rankings"})
playlistArray.push({link: "https://open.spotify.com/playlist/294wQVW0DpdHY0MpF7gdaw?si=fc874484f7524c08", img: "The Top Nickelback Songs Ranked by Me.jpg", title: "The Top Nickelback Songs Ranked by Me", description: "Top 5 songs ranked by me by studio albums by year"})
playlistArray.push({link: "https://open.spotify.com/playlist/5sOyJGs2ZV1IuHRaPvxqyM?si=DvH3jKJwSk2JMEq9cY3jiw", img: "the sexybacks through the years.jpg", title: "The Sexybacks throughout the 2000s", description: "i picked the sexyback of the year for each year since 2000"})

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
shuffle(playlistArray)
for (var i=0; i < playlistArray.length; i++){
    var link = playlistArray[i].link
    var img = playlistArray[i].img
    var title = playlistArray[i].title
    var description = playlistArray[i].description
    newPlaylist(link, img, title, description)
}

function newPlaylist(link, img, title, description){
    var linkWrapper = document.createElement("a")
    var playlist = document.createElement("div")
    var playlistImgWrapper = document.createElement("div")
    var playlistImg = document.createElement("img")
    var playlistPlayIcon = document.createElement("div")
    var playlistPlayIconBackground = document.createElement("div")
    var playlistTitle = document.createElement("marquee")
    var playlistDescription = document.createElement("p")
    linkWrapper.className = "linkWrapper"
    linkWrapper.id = "playlistLink"
    linkWrapper.setAttribute("target", "_blank")
    playlist.className = "playlist"
    playlistImgWrapper.className = "playlistImgWrapper"
    playlistImg.className = "playlistImg"
    playlistPlayIcon.className = "playlistPlayIcon"
    playlistPlayIconBackground.className = "playlistPlayIconBackground"
    playlistPlayIconBackground.innerText = "▶"
    playlistTitle.className = "playlistTitle"
    playlistTitle.setAttribute("scrollamount", "6")
    playlistTitle.setAttribute("hspace", "-10px")
    playlistDescription.className = "playlistDescription"
    linkWrapper.setAttribute("href", link)
    img = preImg + img
    playlistImg.setAttribute("src", img)
    playlistTitle.innerText = title
    playlistDescription.innerText = description
    playlistPlayIcon.appendChild(playlistPlayIconBackground)
    playlistImgWrapper.appendChild(playlistImg)
    playlistImgWrapper.appendChild(playlistPlayIcon)
    playlist.appendChild(playlistImgWrapper)
    playlist.appendChild(playlistTitle)
    playlist.appendChild(playlistDescription)
    linkWrapper.appendChild(playlist)
    playlistsID.appendChild(linkWrapper)
}

fetchOnlineInfo()
fetchLetterboxdData()