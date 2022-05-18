function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage(duckyId) {
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get("name");
    let firstMessage = `Hello, I'm ${name}, how are you today?`
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    firebase.firestore().collection(rhit.FB_COLLECTION_DUCKYS).doc(botId).update({
        chat: firebase.firestore.FieldValue.arrayUnion(firstMessage)
    });

    document.getElementById("userInput").scrollIntoView(false);
}


function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let duckyHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(duckyHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse(duckyId) {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "I love coding!";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

    



    // if (userText != "") {
    //     firebase.firestore().collection(rhit.FB_COLLECTION_CHATBOTS).doc(botId).update({
    //         chatlog: firebase.firestore.FieldValue.arrayUnion(userText)
    //     });

    //     let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    //     $("#textInput").val("");
    //     $("#chatbox").append(userHtml);
    //     document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //     setTimeout(() => {
    //         var urlParams = new URLSearchParams(window.location.search);
    //         var context = urlParams.get("pers");
    //         console.log("context is: " + context);
    //         openAi(userText, context, botId);
    //     }, 1000)
    // }
}

function sendButton() {
    getResponse();
}


$("#textInput").keypress(function (e) {
    if (e.which == 13) { // 13 is keycode for enter
        getResponse();
    }
});


function loadDuckyChat(chat) {
    for (let i = 0; i < chat.length; i++) {
        if (i % 2 == 1) {
            let userHtml = '<p class="userText"><span>' + chat[i] + '</span></p>';
            $("#chatbox").append(userHtml);
        } else {
            let duckyHtml = '<p class="botText"><span>' + chat[i] + '</span></p>';
            $("#chatbox").append(duckyHtml);
        }
    }
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}