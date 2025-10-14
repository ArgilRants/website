const whatTime = document.getElementById("whatTime")
const recentlyReadTbody = document.getElementById("recentlyReadTbody")
const immyNameImg = document.getElementById("immyNameImg")
const container = document.getElementById("container")



var DateTime = luxon.DateTime;

createRecentlyReadEntry("./img/yuqingtangs/THYOL.png", "Three Hundred Years of Longing", "", "")
createRecentlyReadEntry("./img/yuqingtangs/jyif.png", "jun you ji fou", "", "")
createRecentlyReadEntry("./img/yuqingtangs/mtsf.png", "mtsf", "married thrice to salted fish", "")
createRecentlyReadEntry("./img/yuqingtangs/yuwuv4.png", "yuwu vol. 4", "", "")




function updateTime(){
    var currentTime = DateTime.now().setZone('Europe/London')

    var hour = currentTime.hour
    var minute = currentTime.minute

    whatTime.innerText = "Current time: " + addLeading(hour, 2) + ":" + addLeading(minute, 2)

}


function addLeading(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}


let ageEl = document.getElementById("age");

setInterval(() => {
	let time = (new Date() - new Date(1127588400000)) / (1000 * 60 * 60 * 24 * 365.25); // milliseconds per year
	ageEl.innerText = time.toString().substring(0, 2);
}, 50);




function createRecentlyReadEntry(img, title, subtitle, description){
    var recentlyReadTableRow = document.createElement("tr")
    var recentlyReadTableHeaderImg = document.createElement("th")
    var recentlyReadImg = document.createElement("img")
    var recentlyReadTableHeaderDesc = document.createElement("th")
    var recentlyReadTitle = document.createElement("h2")
    var recentlyReadSubtitle = document.createElement("h3")
    var recentlyReadDesc = document.createElement("p")

    recentlyReadTableRow.id = title

    recentlyReadImg.setAttribute("src", img)
    recentlyReadImg.id = "zoom"
    recentlyReadTitle.innerText = title

    if (subtitle == undefined){
        recentlyReadSubtitle.innerText = ""
    } else {
        recentlyReadSubtitle.innerText = subtitle
    }

    if (description == undefined){
        recentlyReadDesc.innerText = ""
    } else {
        recentlyReadDesc.innerText = description
    }

    recentlyReadTableHeaderImg.appendChild(recentlyReadImg)

    recentlyReadTableHeaderDesc.appendChild(recentlyReadTitle)
    recentlyReadTableHeaderDesc.appendChild(recentlyReadSubtitle)
    recentlyReadTableHeaderDesc.appendChild(recentlyReadDesc)

    recentlyReadTableRow.appendChild(recentlyReadTableHeaderImg)
    recentlyReadTableRow.appendChild(recentlyReadTableHeaderDesc)

    recentlyReadTbody.appendChild(recentlyReadTableRow)
}

async function orangeRain(){

    var emojis = ["🍊", "🍌", "🍒", "🍓"]

    immyNameImg.style.animation = "none"

    await delay(10)

    immyNameImg.style.animation = ".5s spin ease-in-out"
    for(let i = 0; i < 80; i++){
        var emoji = document.createElement("div")
        emoji.classList.add("emoji")
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)]
        emoji.style.left = Math.random()*70+"vw"
        emoji.style.right = Math.random()*70+"vw"
        emoji.style.top = Math.random()*60+"px"
        emoji.fontSize = (Math.random() * 2 + 2) + "rem"
        container.appendChild(emoji)
    }

    await delay(2100)
    var justInCaseEmojis = document.querySelectorAll(".emoji")

    for(let i = 0; i < justInCaseEmojis.length; i++){
        if (getComputedStyle(justInCaseEmojis[i]).opacity == 0){
            justInCaseEmojis[i].remove()
        }
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

setInterval(updateTime, 30000);


updateTime()


var zoomDefault = mediumZoom('#zoom', {
    margin: 5,
    background: ""
})

