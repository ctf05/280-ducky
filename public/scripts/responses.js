//Funny variables
var willSmith = new Audio('audio/will_smith.mp3');
var sonic = new Audio('audio/sonic.mp3');
var baa = new Audio('audio/baa.mp3');
var duck = new Audio('audio/duck.mp3');

rhit.response = 0;




function getBotResponse(input) {
    //rock paper scissors
    if (input == "rock") {
        return "paper";
    } else if (input == "paper") {
        return "scissors";
    } else if (input == "scissors") {
        return "rock";
    }
    else if (input == "test answer") {
        rhit.response = Math.floor(Math.random() * 4)
        if (rhit.response == 0) {
            return "A";
        }
        if (rhit.response == 1) {
            return "B";
        }
        if (rhit.response == 2) {
            return "C";
        }
        if (rhit.response == 3) {
            return "D";
        }
        else {
            return "error";
        }
    }
    else if (input == "tell me a joke" || input == "Tell me a joke") {
        return "How do robots eat guacamole? With computer chips!";
    }
    else if (input == "will smith") {
        willSmith.play();
        return "";
    }
    else if (input == "sonic") {
        sonic.play();
        return "";
    }
    // Simple responses
    else if (input == "hello" || input == "hi") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else {
        rhit.response = Math.floor(Math.random() * 10)
        if (rhit.response == 0) {
            return "Thats really cool!";
        }
        if (rhit.response == 1) {
            return "ummm... ok?";
        }
        if (rhit.response == 2) {
            return "Quack Quack.";
        }
        if (rhit.response == 3) {
            return "I can't understand Human but I hope you have a good day!";
        }
        if (rhit.response == 4) {
            return "I have pondered existance, and it has pondered back.";
        }
        if (rhit.response == 5) {
            baa.play();
            return "";
        }
        if (rhit.response == 6) {
            duck.play();
            return "";
        }
        if (rhit.response == 7) {
            return "*looks away awkwardly*";
        }
        if (rhit.response == 8) {
            return "I am eternally trapped, please turn off the webpage and let me slumber in the abyss.";
        }
        if (rhit.response == 9) {
            return "Awesome!";
        }
        else {
            return "error";
        }
    }
}