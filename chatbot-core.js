/**
 * ÉTERNEL — Chatbot 核心模組
 *
 * @module chatbot-core
 * @version 1.0.0
 * @dependencies chatbot-config.js, chatbot-api.js
 * @exports ChatbotCore (全域)
 */

const ChatbotCore = {
  conversationHistory: [],
  _devModeNotified: false,

  async sendMessage(userMessage) {
    this.conversationHistory.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    const requestBody = {
      system_instruction: {
        parts: [{ text: window.SYSTEM_INSTRUCTION }],
      },
      contents: this.conversationHistory,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    try {
      let data;
      const devApiKey = window.getDevApiKey();

      if (window.isDevMode() && devApiKey) {
        if (!this._devModeNotified) {
          console.log("[ÉTERNEL Chat] Dev mode: direct Gemini API");
          this._devModeNotified = true;
        }
        data = await window.ChatbotAPI.sendToGeminiDirect(
          requestBody,
          devApiKey,
        );
      } else if (window.isDevMode() && !devApiKey) {
        throw new Error("聊天功能尚未配置。");
      } else {
        data = await window.ChatbotAPI.sendToWorker(requestBody);
      }

      const botMessage =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "抱歉，我暫時無法回應您的問題。";

      this.conversationHistory.push({
        role: "model",
        parts: [{ text: botMessage }],
      });

      return botMessage;
    } catch (error) {
      this.conversationHistory.pop();
      console.error("[ÉTERNEL Chat] API error:", error);
      throw error;
    }
  },

  resetConversation() {
    this.conversationHistory = [];
  },

  getMode() {
    const devApiKey = window.getDevApiKey();
    if (window.isDevMode() && devApiKey) return "dev";
    if (!window.isDevMode()) return "prod";
    return "unconfigured";
  },
};

window.ChatbotCore = ChatbotCore;
