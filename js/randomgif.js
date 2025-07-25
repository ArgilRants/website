const numberOfImages = 39

ImageArray = new Array();


for (var i=0; i < numberOfImages; i++){
    ImageArray[i] = i+".gif"
    // console.log(ImageArray)
}

let maxnumber = ImageArray.length
const gif = document.getElementById("randGif");

function getRandomImage() {
    var sound = new Audio('./audio/randgif.wav');
    sound.play();
    var num = Math.floor(Math.random() * maxnumber);
    var img = ImageArray[num];
    var preImg = document.getElementById("randGifSrc").src.split("/").pop().split(".")[0];
    var aftImg = img.split("/").pop().split(".")[0];
    if (preImg == aftImg){
        num = num + 1;
        img = ImageArray[num];
    };
    if (num == maxnumber){
        num = 0;
        img = ImageArray[num];
    }
    gif.innerHTML = ('<img src="' + './img/randomgifs/' + img + '" width="100%" id="randGifSrc">');
}

function onLoadGif() {
    var num = Math.floor( Math.random() * 11);
    var img = ImageArray[num];
    document.getElementById("randGif").innerHTML = ('<img src="' + './img/randomgifs/' + img + '" width="100%" id="randGifSrc">')
}

window.onload = onLoadGif();