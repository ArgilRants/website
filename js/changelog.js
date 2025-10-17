const desktopVersions = ["1.5","1.4"]
const mobileVersions = ["2.0", "1.2"]
const desktopDirectory = "./changelog/desktop/"
const mobileDirectory = "./changelog/mobile/"
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

const latestMobile = document.getElementById("latestMobile")
const latestMobileH2 = document.getElementById("latestMobileH2")
const latestMobileDate = document.getElementById("latestMobileDate")
const latestMobileAdditions = document.getElementById("latestMobileAdditions")
const latestMobileRemovals = document.getElementById("latestMobileRemovals")
const latestMobileWIP = document.getElementById("latestMobileWIP")
const latestMobileIssues = document.getElementById("latestMobileIssues")
const latestMobileFixes = document.getElementById("latestMobileFixes")

const latestMobileAdditionsUl = document.getElementById("latestMobileAdditionsUl")
const latestMobileRemovalsUl = document.getElementById("latestMobileRemovalsUl")
const latestMobileWIPUl = document.getElementById("latestMobileWIPUl")
const latestMobileIssuesUl = document.getElementById("latestMobileIssuesUl")
const latestMobileFixesUl = document.getElementById("latestMobileFixesUl")


const previousChangeLogs = document.getElementById("previousChangeLogs")

const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/
const footerVersion = document.getElementById("version")
const footerVersionMobile = document.getElementById("mobileVersion")
const olderLastUpdatedDate = document.getElementById("olderLastUpdatedDate")
const lastUpdatedDate = document.getElementById("lastUpdatedDate")

const changelogToday = new Date().toLocaleDateString("en-GB")


for (var i=0; i < desktopVersions.length; i++){
    file = desktopDirectory + desktopVersions[i] + ".json"

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

for (var i=0; i < mobileVersions.length; i++){
    file = mobileDirectory + mobileVersions[i] + ".json"

    if (i == 0){
        if (latestMobile == undefined){
            date(file)
        } else {
            parse(file, true, true)
        }
    } else {
        if (latestMobile != undefined){
            parse(file, true, false)
        }
    }
}

function parse(file, mobile, latest){
    fetch(file)
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => { 
        var changeLog = obj.body
        var version = changeLog.version
        var platform = changeLog.platform
        var date = changeLog.date
        var day = changeLog.date.day
        var month = changeLog.date.month
        var year = changeLog.date.year
        var type = changeLog.type

        var additions = changeLog.additions
        var removals = changeLog.removals
        var wip = changeLog.wip
        var issues = changeLog.issues
        var fixes = changeLog.fixes

        var latestDateFormatted = month + " " + ordinal(day) + " | " + year
        var dateFormatted = month + " " + ordinal(day) + " " + year
        var dateFormattedForJava = new Date(day + "/" + month + "/" + year).toLocaleDateString("en-GB")

        var dropdown = changeLog.dropdown

        var release = ""

        if (latest == true){
            if(mobile == true){
                if(type == "beta"){
                    release = "betaBadge"
                    latestMobileH2.style.backgroundColor = "#df0000"
                } else {
                    release = "releaseBadge" 
                }
                latestMobileH2.innerHTML = "Version " + version + ' [✔ Mobile] <span id="'+release+'">Latest</span>' 

                latestMobileDate.innerHTML = latestDateFormatted

                if (changelogToday == dateFormattedForJava){
                    olderLastUpdatedDate.innerHTML = "today!"
                    lastUpdatedDate.innerHTML = "today!"
                } else{ 
                    olderLastUpdatedDate.innerHTML = dateFormatted
                    lastUpdatedDate.innerHTML = dateFormatted
                }

                

                forItem(additions, latestMobileAdditionsUl)
                forItem(removals, latestMobileRemovalsUl)
                forItem(wip, latestMobileWIPUl)
                forItem(issues, latestMobileIssuesUl)
                forItem(fixes, latestMobileFixesUl)



            } else {
                if(type == "beta"){
                    release = "betaBadge"
                    latestDesktopH2.style.backgroundColor = "#df0000"
                } else {
                    release = "releaseBadge" 
                }
                latestDesktopH2.innerHTML = "Version " + version + ' [⏻ Desktop] ' + '<span id="'+release+'">Latest</span>'
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
            addPreviousBox(platform, version, dropdown, type, latestDateFormatted)
            var additionsUl = version + "_" + platform + "_additions"
            var removalsUl = version + "_" + platform + "_removals"
            var wipUl = version + "_" + platform + "_wip"
            var issuesUl = version + "_" + platform + "_issues"
            var fixesUl = version + "_" + platform + "_fixes"

            additionsUl = document.getElementById(additionsUl)
            removalsUl = document.getElementById(removalsUl)
            wipUl = document.getElementById(wipUl)
            issuesUl = document.getElementById(issuesUl)
            fixesUl = document.getElementById(fixesUl)

            forItem(additions, additionsUl)
            forItem(removals, removalsUl)
            forItem(wip, wipUl)
            forItem(issues, issuesUl)
            forItem(fixes, fixesUl)
            

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

function addPreviousBox(platform, id, dropdown, type, date){
    var version = id    
    var id = id + "_" + platform
    var release = ""
    var badgeText = ""
    var previousChangeLogBox = document.createElement("div")
    var previousChangeLogDrop = document.createElement("div")
    var previousChangeLogButton = '<button class="dropdownBtn dropdownBtnText" id="dropdownBtnId" onclick="dropdown('+dropdown+')"></button>'
    var previousChangeLogH2 = document.createElement("h2")
    var previousChangeLogDate = document.createElement("div")
    var previousChangeLogDropdown = document.createElement("div")

    var previousChangeLogAdditionsH3 = document.createElement("h3")
    var previousChangeLogRemovalsH3 = document.createElement("h3")
    var previousChangeLogWipH3 = document.createElement("h3")
    var previousChangeLogWipSubtitleH3 = document.createElement("h3")
    var previousChangeLogIssuesH3 = document.createElement("h3")
    var previousChangeLogIssuesSubtitleH3 = document.createElement("h3")
    var previousChangeLogFixesH3 = document.createElement("h3")

    var previousChangeLogAdditionsUl = document.createElement("ul")
    var previousChangeLogRemovalsUl = document.createElement("ul")
    var previousChangeLogWipUl = document.createElement("ul")
    var previousChangeLogIssuesUl = document.createElement("ul")
    var previousChangeLogFixesUl = document.createElement("ul")

    previousChangeLogDrop.id = "drop"+dropdown
    previousChangeLogBox.className = "box"
    previousChangeLogBox.id = id
    if(type == "beta"){
        release = "betaBadge"
        badgeText = "Beta"
        previousChangeLogH2.style.backgroundColor = "#df0000"
    } else {
        release = "releaseBadge" 
        badgeText = "Release"
    }
    if (platform == "mobile"){
        previousChangeLogH2.innerHTML = "Version " + version + ' [✔ Mobile]'+ '<span id="'+release+'">'+badgeText+'</span>'
    }else {
        previousChangeLogH2.innerHTML = "Version " + version + ' [⏻ Desktop]'+ '<span id="'+release+'">'+badgeText+'</span>'
    }

    previousChangeLogDate.id = "changeLogDate"
    previousChangeLogDate.innerHTML = date

    previousChangeLogDropdown.id = "dropdown"
    previousChangeLogDropdown.className = "dropdownContent"

    previousChangeLogAdditionsH3.innerText = "New features / Additions:" 
    previousChangeLogRemovalsH3.innerText = "Removed features / Removals:"
    previousChangeLogWipH3.innerText = "Work in progress features:" 
    previousChangeLogWipSubtitleH3.innerText = "All WIPs from the previous version(s) that aren't listed in new features / additions are still being worked on" 
    previousChangeLogWipSubtitleH3.id = "subtitle"
    previousChangeLogIssuesH3.innerText = "Known issues:" 
    previousChangeLogIssuesSubtitleH3.innerText = "If not listed in fixes than all known bugs from previous version(s) are still not fixed" 
    previousChangeLogIssuesSubtitleH3.id = "subtitle"
    previousChangeLogFixesH3.innerText = "Fixes / Other changes:" 

    previousChangeLogAdditionsUl.id = id + "_additions" 
    previousChangeLogRemovalsUl.id = id + "_removals" 
    previousChangeLogWipUl.id = id + "_wip" 
    previousChangeLogIssuesUl.id = id + "_issues" 
    previousChangeLogFixesUl.id = id + "_fixes" 


    previousChangeLogBox.appendChild(previousChangeLogDrop)
    previousChangeLogDrop.innerHTML = previousChangeLogButton
    previousChangeLogDrop.appendChild(previousChangeLogH2)
    previousChangeLogDrop.appendChild(previousChangeLogDate)

    previousChangeLogDropdown.appendChild(previousChangeLogAdditionsH3)
    previousChangeLogDropdown.appendChild(previousChangeLogAdditionsUl)
    previousChangeLogDropdown.appendChild(previousChangeLogRemovalsH3)
    previousChangeLogDropdown.appendChild(previousChangeLogRemovalsUl)
    previousChangeLogDropdown.appendChild(previousChangeLogWipH3)
    previousChangeLogDropdown.appendChild(previousChangeLogWipSubtitleH3)
    previousChangeLogDropdown.appendChild(previousChangeLogWipUl)
    previousChangeLogDropdown.appendChild(previousChangeLogIssuesH3)
    previousChangeLogDropdown.appendChild(previousChangeLogIssuesSubtitleH3)
    previousChangeLogDropdown.appendChild(previousChangeLogIssuesUl)
    previousChangeLogDropdown.appendChild(previousChangeLogFixesH3)
    previousChangeLogDropdown.appendChild(previousChangeLogFixesUl)

    previousChangeLogDrop.appendChild(previousChangeLogDropdown)


    
    previousChangeLogs.prepend(previousChangeLogBox)



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