const favShow = document.getElementById('favShow');
const favFilm = document.getElementById('favFilm');

const showArray = [
    'How to Get Away with Murder',
    'Silent Witness',
    'Criminal Minds',
    'American Dad',
    "Grey's Anatomy",
    "Abbot Elementary",
    'Only Murders in the Building'
];

const filmArray = [
    'Monsters vs. Aliens',
    'Over the Hedge',
    'Saw 3',
    'Scream (1996)',
    "The Menu",
    'Shortbus'
];

function favShowFunc(){
    var randShowNum = Math.floor(Math.random() * (showArray.length));
    var show = showArray[Math.round(randShowNum)];
    favShow.innerText = show;
}

function favFilmFunc(){
    var randFilmNum = Math.floor(Math.random() * (filmArray.length));
    var film = filmArray[Math.round(randFilmNum)];
    favFilm.innerText = film;
}

function favFilmAndShow(){
    favShowFunc()
    favFilmFunc()
}

favFilmAndShow();