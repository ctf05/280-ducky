//Funny variables
var willSmith = new Audio('audio/will_smith.mp3');




function getBotResponse(input) {
    //rock paper scissors
    if (input == "rock") {
        return "paper";
    } else if (input == "paper") {
        return "scissors";
    } else if (input == "scissors") {
        return "rock";
    }
    else if (input == "tell me a joke" || input == "Tell me a joke") {
        return "How do robots eat guacamole? With computer chips!";
    }
    else if (input == "will smith") {
        willSmith.play();
        return "";
    }
    // Simple responses
    if (input == "hello" || input == "hi") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else {
        return "Try asking something else!";
    }

    
}