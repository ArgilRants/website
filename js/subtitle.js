const greetingsArray = [
    'Listening to <a href="https://open.spotify.com/user/m4dw1kj1irhq2sc223ud92fov?si=d84d6163c890491d">music</a> constantly',
    'Automating a 5 minute task',
    'Watching the same shows on repeat',
    'Writing scripts and playlist titles',
    'Probably eating something',
    'Stressed and constantly overdressed',
    'Playing overwatch, uhhh red flag!!',
    'Playing satisfactory ... all the time',
    'Playing modded minecraft',
    'Playing valorant ... NOT',
    'Playing stardew ... occasionally',
    'Trying to speedrun PVZ',
    "oh helll NAHHH",
    "thank you to beyonce for making this possible",
    "its yugeee",
    'Resident technology bastard',
    '100%ing every lego game',
    'press ctrl+shift+u to make boxes draggable',
    'buying another lego set',
    'playing balatro gold stake',
    'obsessing over sparks (the band)',
    'thinking about making a game..'
];



function subtitleGenerate(){
    var myDate = new Date();
    var hrs = myDate.getHours();
    var previousGreet;
    var greet; 

    function randomGenerate(){
        var randomNumber = Math.floor(Math.random() * (greetingsArray.length));
        var randomNumber2 = Math.floor(Math.random() * 11);
        if (randomNumber2 ==  10){
            if (hrs < 12 && hrs >= 5)
                greet = 'Good Morning';
            else if (hrs >= 12 && hrs < 17)
                greet = 'Good Afternoon';
            else if (hrs >= 17 && hrs < 20)
                greet = 'Good Evening';
            else
                greet = 'Good Night';
        } else {
            greet = greetingsArray[Math.round(randomNumber)];
        }
        return greet;
    };

    randomGenerate();
    
    previousGreet = greet;
    if (greet == previousGreet){
        for (var i=0; i < greetingsArray.length+1; i++){
            randomGenerate();
            if (greet == previousGreet){
            } else {
                document.getElementById('subtitleMain').innerHTML = greet;
            }
        };
    } else { 
        document.getElementById('subtitleMain').innerHTML = greet;
    }

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
            });
        });
    });
};



subtitleGenerate();
