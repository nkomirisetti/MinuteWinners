var playerID;
var synth = window.speechSynthesis;
var socket;
var speaking = new SpeechSynthesisUtterance();
speaking.pitch = 1.8;

const startGame = function(next_game) {
    switch (next_game){
        case 'tap-quickly':
            tapGame();
            break;
        case 'dance-around':
            danceGame();
            break;
        case 'stay-still':
            stayStillGame();
    }
    // setup game on screen
    // let that game run for a bit
    // stop the game, send up scores
}

const askForPermissions = function(){
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
            .then(response => {
              if (response == 'granted') {
                speaking.text =  'Lets play!';
                synth.speak(speaking);
                $('#rootContainer').empty();
                setupMainPage();
                var snd = new Audio("resources/bensound-happyrock.mp3");
                snd.play();
              }
            })
            .catch(console.error)
        } else {
            // non iOS 13+
            speaking.text =  'Lets play!';
            synth.speak(speaking);
            $('#rootContainer').empty();
            setupMainPage();
        }

        // TODO add code for microphone input
        // start that initial voice over here
}

const setupMainPage = function () {
    // voice setup
    // for (let i = 0; i < window.speechSynthesis.getVoices().length; i++){
    //     if (window.speechSynthesis.getVoices()[i].name.includes('Natural')){
    //         speaking.voice = window.speechSynthesis.getVoices()[i];
    //         break;
    //     }
    // }    
    $('#rootContainer').empty();
    playerID = generatePlayer();
    socket.emit('join', playerID);
    playerID = playerID.id;
    // alert that a player is waiting for a game to start

    socket.on('open-game-room', function (next_game) {
        startGame(next_game);
        $('#rootContainer').empty();
        $('#rootContainer').text(next_game);
    });

    socket.on('open-wait-room', function (update) {
        console.log(update);
        // speaking.text =  'The winner is ERROR with a score of ERROR. ' + 'The next game is ' +
        // update.nextGame + " . Get ready to play!";
        speaking.text = 'the highest score was ' + update.highestScore + '. Your score is now ' + update.playersMap.get(playerID) + '. The next game is  ' +  update.nextGame;
        synth.speak(speaking);
        sleep();
        $('#rootContainer').empty();
        $('#rootContainer').text('wait room');
    });
}


$(document).ready(function () {
    socket = io();
});

// games

// as still as possible points == less movementy
// tap as quickly as possible 
// jump around as much as possible
// jog in place
// karate chop
//      singing game
// 

// text to speech javascript  - kevin
// using accelerometer        - nikhil
// creating the narration (what order things are gonna be said in) - nuran
//     - 
// add visual elements
// displaying narration