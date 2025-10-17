const playlistsID = document.getElementById("playlistsID")
const preImg = "./img/playlistCovers/"
var playlistArray = []

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
    playlistPlayIconBackground.setAttribute("onclick", "playlistPlayIcon(this)")
    playlistPlayIconBackground.innerText = "▶"
    playlistTitle.className = "playlistTitle"
    playlistTitle.setAttribute("scrollamount", "6")
    playlistTitle.setAttribute("hspace", "-10px")
    playlistTitle.setAttribute("onmouseover", "marqueeStop(this)")
    playlistTitle.setAttribute("onmouseout", "this.start()")
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