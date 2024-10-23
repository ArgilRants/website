var myDate = new Date();
    var hrs = myDate.getHours();

    

    var greetingsArray = [
        'Listening to <a href="https://open.spotify.com/user/m4dw1kj1irhq2sc223ud92fov?si=d84d6163c890491d">music</a> constantly',
        'Automating a 5 minute task',
        'Watching the same shows on repeat',
        'Watching the same shows in repeat',
        'Writing scripts and playlist titles',
        'Probably eating something',
        'Stressed and constantly overdressed',
        'Playing overwatch, uhhh red flag!!',
        'Playing satisfactory ... all the time',
        'Playing modded minecraft',
        'Playing valorant ... NOT',
        'Playing stardew ... occasionally',
        'Trying to speedrun PVZ',
        'Resident technology bastard'  
    ];

    var randomNumber = Math.floor(Math.random() * (greetingsArray.length));
    var randomNumber2 = Math.floor(Math.random() * 10)
    if (randomNumber2 ==  10){
        if (hrs < 12 && hrs >= 4)
            greet = 'Good Morning';
        else if (hrs >= 12 && hrs < 17)
            greet = 'Good Afternoon';
        else if (hrs >= 17 && hrs < 20)
            greet = 'Good Evening';
        else
            greet = 'Good Night';
    } else {
    var greet = greetingsArray[Math.round(randomNumber)];
    }



    document.getElementById('subtitleMain').innerHTML =
        greet;



    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});