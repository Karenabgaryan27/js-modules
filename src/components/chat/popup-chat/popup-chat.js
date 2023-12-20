function PopupChat({ chat, chatLog, input, sendBtn, closeBtn, toggleBtn, callback, chatInner }) {
    this.chat = chat;
    this.chatLog = chatLog;
    this.input = input;
    this.sendBtn = sendBtn;
    this.isTyping = false;
    this.callback = callback || this.localRequest;
    this.closeBtn = closeBtn;
    this.toggleBtn = toggleBtn;
    this.chatInner = chatInner;
    this.messages = [
        { message: "Hello there!", sender: "ChatBot", date: this.getDate() },
        { message: "What brings you here today?", sender: "ChatBot", date: this.getDate() },
    ];
}

PopupChat.prototype = {
    constructor: PopupChat,
    localRequest() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("bot response");
            }, 2000);
        });
    },
    getDate() {
        let date = new Date();

        let seconds = date.getSeconds();
        let minutes = date.getMinutes();
        let hour = date.getHours();

        let year = date.getFullYear();
        let month = date.getMonth(); // beware: January = 0; February = 1, etc.
        let day = date.getDate();

        let dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, etc.
        let milliSeconds = date.getMilliseconds();

        return `${hour}:${minutes}`;
    },
    async createBotMessage() {
        const response = await this.callback(this.messages);
        return { message: response, sender: "ChatBot", date: this.getDate() };
    },
    createUserMessage() {
        return { message: this.input.value, sender: "user", date: this.getDate() };
    },

    bouncingDotsLoader() {
        return `
        <div class="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>`;
    },

    message({ message, sender, date }) {
        return `
        <div class="message position-${sender === "user" ? "right" : "left"}">
            <div class="details">
                <div class="details-identity">${sender}</div>
                <div class="details-date">${date}</div>
            </div>
            <div class="message-text">${message}</div>
        </div>`;
    },

    updateChatLog() {
        let content = "";
        this.messages.forEach((item) => (content += this.message(item)));
        content += this.isTyping ? this.bouncingDotsLoader() : "";
        this.chatLog.innerHTML = content;
    },

    handleChange() {
        this.sendBtn.disabled = this.input.value.length ? false : true;
    },

    async handleSend() {
        const userMessage = this.createUserMessage();
        this.messages = [...this.messages, userMessage];
        this.isTyping = true;
        this.updateChatLog();
        this.chatLog.scrollTop = this.chatLog.scrollHeight;

        this.input.value = "";
        this.sendBtn.disabled = true;

        const botMessage = await this.createBotMessage();
        this.messages = [...this.messages, botMessage];
        this.isTyping = false;
        this.updateChatLog();
        this.chatLog.scrollTop = this.chatLog.scrollHeight;
    },

    handleKeyDown(e) {
        if (e.key !== "Enter") return;
        // e.target.blur()
        this.handleSend();
    },

    setEvents() {
        this.sendBtn.addEventListener("click", () => this.handleSend());
        this.input.addEventListener("input", () => this.handleChange());
        this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));
        this.closeBtn.addEventListener("click", () => this.hideChat());
        this.toggleBtn.addEventListener("click", () => this.showChat());
        this.chatInner.addEventListener("transitionend", (e) => e.stopPropagation());
    },

    showChat() {
        this.chat.style.display = "block";
        setTimeout(() => this.chat.classList.add("show"), 0);
    },
    hideChat() {
        this.chat.classList.remove("show");
        this.chat.addEventListener(
            "transitionend",
            () => {
                if (!this.chat.classList.contains("show")) this.chat.style.display = "none";
            },
            { once: true }
        );
    },
};

const PopupChatExampleState = {
    chat: document.querySelector("#popup-chat-example"),
    chatLog: document.querySelector("#popup-chat-example .chat-log"),
    input: document.querySelector("#popup-chat-example input"),
    sendBtn: document.querySelector("#popup-chat-example .send-btn"),
    closeBtn: document.querySelector("#popup-chat-example .close-btn"),
    toggleBtn: document.querySelector("[data-target=popup-chat-example"),
    chatInner: document.querySelector("#popup-chat-example .popup-chat-inner"),
    // CALLBACK | include the fetch.js script to get access to getChatGPTMessage function
    callback: async (newMessages) => {
        const apiMessages = newMessages.map((item) => {
            const role = item.sender.toLowerCase() === "chatbot" ? "assistant" : "user";
            return { role, content: item.message };
        });

        const data = await Fetch.getChatGPTMessage(undefined, apiMessages);
        return data.choices[0].message.content;
    },
};

const popupChatExample = new PopupChat(PopupChatExampleState);
if (popupChatExample.chat) {
    popupChatExample.updateChatLog();
    popupChatExample.setEvents();
}
