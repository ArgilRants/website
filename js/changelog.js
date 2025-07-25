const desktopVersions = ["1.4"]
const mobileVersions = []
const directory = "./changelog/"
const desktopFiles = []
const mobileFIles = []

const latestDesktop = document.getElementById("latestDesktop")
const latestDesktopH2 = document.getElementById("latestDesktopH2")
const latestDesktopDate = document.getElementById("latestDesktopDate")
const latestDesktopAdditions = document.getElementById("latestDesktopAdditions")
const latestDesktopRemovals = document.getElementById("latestDesktopRemovals")
const latestDesktopWIP = document.getElementById("latestDesktopWIP")
const latestDesktopIssues = document.getElementById("latestDesktopIssues")
const latestDesktopFixes = document.getElementById("latestDesktopFixes")

const latestDesktopAdditionsUl = document.getElementById("latestDesktopAdditionsUl")
const latestDesktopRemovalsUl = document.getElementById("latestDesktopRemovalsUl")
const latestDesktopWIPUl = document.getElementById("latestDesktopWIPUl")
const latestDesktopIssuesUl = document.getElementById("latestDesktopIssuesUl")
const latestDesktopFixesUl = document.getElementById("latestDesktopFixesUl")

const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/
const footerVersion = document.getElementById("version")
const footerVersionMobile = document.getElementById("mobileVersion")
const olderLastUpdatedDate = document.getElementById("olderLastUpdatedDate")
const lastUpdatedDate = document.getElementById("lastUpdatedDate")

const changelogToday = new Date().toLocaleDateString("en-GB")


for (var i=0; i < desktopVersions.length; i++){
    file = directory + "desktop_" + desktopVersions[i] + ".json"

    if (i == 0){
        if (latestDesktop == undefined){
            date(file)
        } else {
            parse(file, false, true)
        }
    } else {
        if (latestDesktop != undefined){
            parse(file, false, false)
        }
    }
}

for (var i=0; i < mobileVersions; i++){
    file = directory + "desktop_" + mobileVersions[i] + ".json"
    if (i == 0){
        parse(file, true, true)
    } else {
        parse(file, true, false)
    }
}

function parse(file, mobile, latest){
    fetch(file)
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => { 
        var changeLog = obj.body
        var version = changeLog.version
        var date = changeLog.date
        var day = changeLog.date.day
        var month = changeLog.date.month
        var year = changeLog.date.year

        var additions = changeLog.additions
        var removals = changeLog.removals
        var wip = changeLog.wip
        var issues = changeLog.issues
        var fixes = changeLog.fixes

        var latestDateFormatted = month + " " + ordinal(day) + " | " + year
        var dateFormatted = month + " " + ordinal(day) + " " + year
        var dateFormattedForJava = new Date(day + "/" + month + "/" + year).toLocaleDateString("en-GB")

        if (latest == true){
            if(mobile == true){
                latestMobileH2.innerText = "Version " + version + ' [✔ Mobile] <span id="releaseBadge">Latest</span>' 
                html.setProperty("--mobileVersion", version)
            } else {
                latestDesktopH2.innerHTML = "Version " + version + ' [⏻ Desktop] ' + '<span id="releaseBadge">Latest</span>'
                latestDesktopDate.innerHTML = latestDateFormatted

                if (changelogToday == dateFormattedForJava){
                    olderLastUpdatedDate.innerHTML = "today!"
                    lastUpdatedDate.innerHTML = "today!"
                } else{ 
                    olderLastUpdatedDate.innerHTML = dateFormatted
                    lastUpdatedDate.innerHTML = dateFormatted
                }

                

                forItem(additions, latestDesktopAdditionsUl)
                forItem(removals, latestDesktopRemovalsUl)
                forItem(wip, latestDesktopWIPUl)
                forItem(issues, latestDesktopIssuesUl)
                forItem(fixes, latestDesktopFixesUl)


                
                
            }
        } else {
           
        }
        

    })
}

function date(file){
    fetch(file)
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => { 
        var changeLog = obj.body
        var version = changeLog.version
        var date = changeLog.date
        var day = changeLog.date.day
        var month = changeLog.date.month
        var year = changeLog.date.year
        var latestDateFormatted = month + " " + ordinal(day) + " | " + year
        var dateFormatted = month + " " + ordinal(day) + " " + year
        var dateFormattedForJava = new Date(day + "/" + month + "/" + year).toLocaleDateString("en-GB")

        if (changelogToday == dateFormattedForJava){
            latestDesktopDate.innerHTML = "today!"
        } else{ 
            latestDesktopDate.innerHTML = dateFormatted
        }




    })
}

function addLi(location, text){
    var li = document.createElement("li")
    li.innerHTML = text
    if(location != null){
        location.appendChild(li)
    } else {
        return li
    }
}

function addUl(location, id){
    var ul = document.createElement("ul")
    ul.id = id
    if(location != null){
        location.appendChild(ul)
    } else {
        return ul
    }
}

function addLink(location, id, link){
    var a = document.createElement("a")
    a.id = id
    a.setAttribute("href", link)
    if (location != null){
        location.appendChild(a)
    } else {
        return a
    }
}


function forItem(items, location){
    var itemsLength = Object.keys(items).length
    for (var i=0; i < itemsLength; i++){
        var title = items[i].title

        title = getLinks(title)
        addLi(location, title)

        if(items[i].description){
            descriptionAdd(location, title, items, i)
        }
    }
}


function descriptionAdd(location, title, items, i){
    addUl(location, title)
    var ul = document.getElementById(title)
    var description = items[i].description
    var descriptionLength = Object.keys(items[i].description).length
    

    for (var i=0; i < descriptionLength; i++){
        description[i] = getLinks(description[i])
        addLi(ul, description[i])
    }
}

function ordinal(i) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "<sup>st</sup>";
    }
    if (j === 2 && k !== 12) {
        return i + "<sup>nd</sup>";
    }
    if (j === 3 && k !== 13) {
        return i + "<sup>rd</sup>";
    }
    return i + "<sup>th</sup>";
}

function getLinks(text){
    let elements = text.match(/\[.*?\)/g);
    if( elements != null && elements.length > 0){
        for(el of elements){
            let txt = el.match(/\[(.*?)\]/)[1];//get only the txt
            let url = el.match(/\((.*?)\)/)[1];//get only the link
            text = text.replace(el,'<a href="'+url+'">'+txt+'</a>')
            return text
        }
    } else {
        return text
    }
}