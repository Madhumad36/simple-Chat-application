window.onload = loadChat;

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const messageText = input.value.trim();

    if (messageText === "") return;

    addMessage(messageText, "user");
    input.value = "";

    setTimeout(() => {
        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            const botReply = getBotResponse(messageText);
            addMessage(botReply, "bot");
        }, 1000);

    }, 400);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message", sender);
    messageDiv.innerText = text;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    saveChat();
}

function showTypingIndicator() {
    const chatMessages = document.getElementById("chatMessages");
    const typingDiv = document.createElement("div");

    typingDiv.classList.add("message", "bot");
    typingDiv.id = "typing";
    typingDiv.innerText = "Bot is typing...";

    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello")) {
        return "Heyy 👋 What’s up?";
    }

    if (msg.includes("how are you")) {
        return "I’m vibing smoothly 😄 What about you?";
    }

    if (msg.includes("project")) {
        return "Ooo 👀 Is it frontend, backend, or ML?";
    }

    if (msg.includes("can you") || msg.includes("help")) {
        return "I can help with ideas, code, debugging, and panic 😌";
    }

    if (msg.includes("thank")) {
        return "Always 🫶";
    }

    if (msg.includes("bye")) {
        return "Bye Madhu 🌙 Don’t ghost me!";
    }

    return "Hmm 🤔 tell me a bit more.";
}

function clearChat() {
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML =
        '<div class="message bot">Hi Madhu 👋 How can I help you?</div>';
    localStorage.removeItem("chat");
}

function saveChat() {
    const chatMessages = document.getElementById("chatMessages").innerHTML;
    localStorage.setItem("chat", chatMessages);
}

function loadChat() {
    const savedChat = localStorage.getItem("chat");
    if (savedChat) {
        document.getElementById("chatMessages").innerHTML = savedChat;
    }
}
