/**
 * ÉTERNEL — Chatbot UI 模組
 *
 * @module chatbot-ui
 * @version 1.0.0
 * @dependencies chatbot-core.js
 * @exports ChatbotUI (全域)
 */

const ChatbotUI = {
  chatWindow: null,
  chatToggle: null,
  chatMessages: null,
  _messageIdCounter: 0,

  _generateUniqueId() {
    this._messageIdCounter++;
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return "msg-" + crypto.randomUUID();
    }
    const random = Math.random().toString(36).substring(2, 9);
    return `msg-${Date.now()}-${this._messageIdCounter}-${random}`;
  },

  init() {
    this.chatToggle = document.getElementById("chatToggle");
    this.chatWindow = document.getElementById("chatWindow");
    this.chatMessages = document.getElementById("chatMessages");
    const chatClose = document.getElementById("chatClose");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");

    if (!this.chatToggle || !this.chatWindow) return;

    this.chatToggle.addEventListener("click", () => this.toggleWindow());
    chatClose?.addEventListener("click", () => this.closeWindow());

    chatForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      await this.handleSendMessage(message, chatInput);
    });
  },

  toggleWindow() {
    this.chatWindow.classList.toggle("active");
    this.chatToggle.classList.toggle("active");

    const badge = this.chatToggle.querySelector(".chat-notification");
    if (badge) badge.style.display = "none";

    const hasShownWelcome = sessionStorage.getItem("chatbot_welcome_shown");
    if (this.chatWindow.classList.contains("active") && !hasShownWelcome) {
      sessionStorage.setItem("chatbot_welcome_shown", "true");
      setTimeout(() => {
        this.addMessage(
          "歡迎來到 ÉTERNEL。我是您的專屬顧問，關於珠寶訂製、預約諮詢或品牌服務，都可以在這裡詢問。",
          "bot",
        );
      }, 500);
    }
  },

  closeWindow() {
    this.chatWindow.classList.remove("active");
    this.chatToggle.classList.remove("active");
  },

  async handleSendMessage(message, inputElement) {
    this.addMessage(message, "user");
    inputElement.value = "";

    const loadingId = this.addMessage("思考中...", "bot", true);

    try {
      const response = await ChatbotCore.sendMessage(message);
      this.removeMessage(loadingId);
      this.addMessage(response, "bot");
    } catch (error) {
      this.removeMessage(loadingId);

      let errorMessage;
      if (error.message.includes("尚未配置")) {
        errorMessage =
          "顧問服務正在準備中，請稍後再試。\n\n如需即時協助，歡迎撥打 0978-001-151 或加入 LINE 好友。";
      } else if (
        error.message.includes("Failed to fetch") ||
        error.name === "AbortError"
      ) {
        errorMessage = "網路連線似乎有問題，請檢查網路後再試一次。";
      } else {
        errorMessage =
          "抱歉，系統暫時無法回應。歡迎直接撥打 0978-001-151 與我們聯繫。";
      }

      this.addMessage(errorMessage, "bot");
    }
  },

  addMessage(text, sender, isLoading = false) {
    const messageId = this._generateUniqueId();

    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.id = messageId;
    messageDiv.dataset.msgId = messageId;
    messageDiv.dataset.sender = sender;
    messageDiv.dataset.isLoading = isLoading ? "true" : "false";

    const avatarHtml =
      sender === "bot" ? '<div class="msg-avatar">É</div>' : "";

    if (isLoading) {
      messageDiv.classList.add("loading");
      messageDiv.innerHTML = `${avatarHtml}<div class="message-content"><span class="loading-dots"><span></span><span></span><span></span></span></div>`;
    } else {
      messageDiv.innerHTML = `${avatarHtml}<div class="message-content">${this.formatMessage(text)}</div>`;
    }

    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

    return messageId;
  },

  removeMessage(messageId) {
    let message =
      document.getElementById(messageId) ||
      this.chatMessages.querySelector(`[data-msg-id="${messageId}"]`);

    if (message) {
      message.remove();
      return true;
    }

    const loadingMessages = this.chatMessages.querySelectorAll(
      ".chat-message.loading",
    );
    if (loadingMessages.length > 0) {
      loadingMessages[0].remove();
      return true;
    }
    return false;
  },

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  },

  formatMessage(text) {
    const safe = this.escapeHtml(text);
    return safe.replace(/\n/g, "<br>");
  },

  isWindowOpen() {
    return this.chatWindow?.classList.contains("active") || false;
  },
};

window.ChatbotUI = ChatbotUI;
