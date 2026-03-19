/**
 * ÉTERNEL — Chatbot 提示輪播模組
 *
 * @module chatbot-hints
 * @version 1.0.0
 * @dependencies chatbot-ui.js
 * @exports ChatbotHints (全域)
 */

const HINT_MESSAGES = [
  "珠寶訂製諮詢",
  "了解我們的服務",
  "預約私人鑑賞",
  "為愛挑選永恆",
  "點我開始對話",
];

const ROTATION_INTERVAL = 4000;
const FADE_DURATION = 300;

const ChatbotHints = {
  chatHint: null,
  chatHintText: null,
  currentIndex: 0,
  rotationTimer: null,
  observer: null,

  init() {
    this.chatHint = document.getElementById("chatHint");
    this.chatHintText = document.getElementById("chatHintText");
    const chatToggle = document.getElementById("chatToggle");
    const chatWindow = document.getElementById("chatWindow");
    const chatNotification = document.querySelector(".chat-notification");

    if (!this.chatHint || !this.chatHintText) return;

    this.startRotation();

    this.chatHint.addEventListener("click", () => {
      chatToggle?.click();
    });

    if (chatWindow) {
      this.setupVisibilityObserver(chatWindow, chatNotification);
    }
  },

  startRotation() {
    this.rotationTimer = setInterval(() => {
      this.rotateToNext();
    }, ROTATION_INTERVAL);
  },

  stopRotation() {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
      this.rotationTimer = null;
    }
  },

  rotateToNext() {
    this.currentIndex = (this.currentIndex + 1) % HINT_MESSAGES.length;
    this.chatHintText.style.opacity = "0";
    setTimeout(() => {
      this.chatHintText.textContent = HINT_MESSAGES[this.currentIndex];
      this.chatHintText.style.opacity = "1";
    }, FADE_DURATION);
  },

  setupVisibilityObserver(chatWindow, chatNotification) {
    this.observer = new MutationObserver(() => {
      if (chatWindow.classList.contains("active")) {
        this.hide();
        if (chatNotification) chatNotification.style.display = "none";
      } else {
        this.show();
      }
    });
    this.observer.observe(chatWindow, {
      attributes: true,
      attributeFilter: ["class"],
    });
  },

  hide() {
    if (this.chatHint) this.chatHint.style.display = "none";
  },

  show() {
    if (this.chatHint) this.chatHint.style.display = "block";
  },

  destroy() {
    this.stopRotation();
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  },
};

window.ChatbotHints = ChatbotHints;

document.addEventListener("DOMContentLoaded", () => {
  if (window.ChatbotUI) ChatbotUI.init();
  ChatbotHints.init();
});
