const generatePlayer = function () {
    let playerID = '';
    let length = 5;
    var characters = ['Zebra', 'Lion', 'Owl', 'Shark', 'Bear', 'Dog', 'Cat', 'Monkey'];
        playerID = characters[(Math.floor(Math.random() * characters.length))];
    return playerID
};

const gameInstructions = function (game) {
    let output = '.  For this game, you '
    switch (game) {
        case 'tap-quickly':
            output += ' must tap the screen as many times as you can in one minute!'
            break;
        case 'dance-around':
            output += ' dance around and show us your best moves! The best dancer gets the highest score!'
            break;
        case 'stay-still':
            output += ' have to stay as still as possible! Make sure you dont sneeze!';
            break;
    }

    return output
}