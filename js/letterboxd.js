const letterboxdDiaryEntries = document.getElementById("letterboxdDiaryEntries")
const letterboxdLoading = document.getElementById("letterboxdLoading")
const letterboxdDiaryExample1 = document.getElementById("letterboxdDiaryExample1")
const letterboxdDiaryExample2 = document.getElementById("letterboxdDiaryExample2")
const letterboxdDiaryExample3 = document.getElementById("letterboxdDiaryExample3")


setInterval(function() {

    if ( document.hasFocus() ) {
        fetchLetterboxdData();
    };

  
}, 1800000);//30 min

function fetchLetterboxdData(){

    letterboxdLoading.innerText = "progress_activity"
    letterboxdLoading.style.animation = "loading .7s linear infinite"
    letterboxdLoading.style.display = "inline-block"

    fetch('https://diary.argil.dev/')
    .then(response => response.json())
    .then(data => {
        for (var i=0; i < data.length; i++){
            var diaryEntryData = data[i]
            if (i > 10){
                letterboxdLoading.innerText = "check_circle"
                letterboxdLoading.style.animation = "none"
                letterboxdDiaryExample1.style.display = "none"
                letterboxdDiaryExample2.style.display = "none"
                letterboxdDiaryExample3.style.display = "none"
                setTimeout(function(){
                    letterboxdLoading.style.animation = "dissapear .5s";
                    setTimeout(function(){
                        letterboxdLoading.style.display = "none";
                    }, 400)
                }, 1000);
                var watchedDate = new Date(1122669000000).toLocaleDateString("en-UK");
                createDiaryEntry(watchedDate, "My Other Entries", "2024", "./img/movieposterclaygolem.png", "★ ★ ★ ★ ★", "Check out all my Letterboxd diary entries by clicking here", "https://letterboxd.com/argilrants/films/diary/")
                return
            } else {
                dataEntryParse(diaryEntryData)
            }
        }
        letterboxdLoading.innerText = "check_circle"
        letterboxdLoading.style.animation = "none"
        letterboxdDiaryExample1.style.display = "none"
        letterboxdDiaryExample2.style.display = "none"
        letterboxdDiaryExample3.style.display = "none"
        setTimeout(function(){
            letterboxdLoading.style.animation = "dissapear .5s";
            setTimeout(function(){
                letterboxdLoading.style.display = "none";
            }, 400)
        }, 1000);
    });
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
    var ratingScore = ratingScoreRaw.replaceAll("★", "★ ");

    if (reviewRaw.length >= 100){
        var review = truncateString(reviewRaw, 100) + " [...]"
    }else {
        var review = truncateString(reviewRaw, 100)
    }

    createDiaryEntry(watchedDate, filmTitleRaw, filmYearRaw, imgRaw, ratingScore, review, urlRaw)
}

function createDiaryEntry(watchedDate, filmTitle, filmYear, img, ratingScore, review, url){
    var diaryEntryDiv = document.createElement("div")
    var diaryEntryInfoDiv = document.createElement("div")
    var filmTitleAndYearDiv = document.createElement("div")
    var reviewTextWrapperDiv = document.createElement("div")
    var urlWrapper = document.createElement("a")
    var filmTitleH2 = document.createElement("h2")
    var filmYearH3 = document.createElement("h3")
    var watchedH3 = document.createElement("h3")
    var ratingScoreH3 = document.createElement("h3")
    var reviewP = document.createElement("p")
    var filmImg = document.createElement("img")


    diaryEntryDiv.id = filmTitle;
    diaryEntryDiv.className = "diaryEntry"
    diaryEntryInfoDiv.className = "diaryEntryInfo"
    filmTitleAndYearDiv.className = "filmTitleAndYear"
    reviewTextWrapperDiv.className = "reviewTextWrapper"
    urlWrapper.className = "filmUrlWrapper";
    filmTitleH2.className = "filmTitle";
    filmYearH3.className = "filmYear";
    watchedH3.className = "watchedDate";
    ratingScoreH3.className = "ratingScore";
    reviewP.className = "reviewText";
    filmImg.className = "filmImg";

    urlWrapper.setAttribute("href", url);
    filmTitleH2.innerText = filmTitle;
    filmYearH3.innerText = filmYear;
    watchedH3.innerText = watchedDate;
    ratingScoreH3.innerText = ratingScore;
    reviewP.innerText = review;
    filmImg.setAttribute("src", img);

    filmTitleAndYearDiv.appendChild(filmTitleH2);
    filmTitleAndYearDiv.appendChild(filmYearH3);

    if (review.length >= 1){
        reviewTextWrapperDiv.appendChild(reviewP);
    } 

    diaryEntryInfoDiv.appendChild(filmTitleAndYearDiv);
    diaryEntryInfoDiv.appendChild(reviewTextWrapperDiv);
    diaryEntryInfoDiv.appendChild(watchedH3);
    diaryEntryInfoDiv.appendChild(ratingScoreH3);

    urlWrapper.appendChild(filmImg);
    urlWrapper.appendChild(diaryEntryInfoDiv)

    diaryEntryDiv.appendChild(urlWrapper);

    letterboxdDiaryEntries.appendChild(diaryEntryDiv);

}



fetchLetterboxdData();