ImageArray = new Array();
ImageArray[0] = '1.gif';
ImageArray[1] = '2.gif';
ImageArray[2] = '3.gif';
ImageArray[3] = '4.gif';
ImageArray[4] = '5.gif';
ImageArray[5] = '6.gif';
ImageArray[6] = '7.gif';
ImageArray[7] = '8.gif';
ImageArray[8] = '9.gif';
ImageArray[9] = '10.gif';
ImageArray[10] = '11.gif';
ImageArray[11] = '12.gif';
ImageArray[12] = '13.gif';
ImageArray[13] = '14.gif';
ImageArray[14] = '15.gif';
ImageArray[15] = '16.gif';

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