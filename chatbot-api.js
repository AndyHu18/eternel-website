/**
 * ÉTERNEL — Chatbot API 通訊模組
 *
 * @module chatbot-api
 * @version 1.0.0
 * @dependencies chatbot-config.js
 * @exports ChatbotAPI (全域)
 */

const ChatbotAPI = {
  async fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeout);
    }
  },

  async fetchWithRetry(url, options) {
    let lastError;
    for (let attempt = 0; attempt < API_CONFIG.MAX_RETRIES; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, options);
        if (
          response.ok ||
          !API_CONFIG.RETRYABLE_STATUS.includes(response.status)
        ) {
          return response;
        }
        lastError = new Error(`HTTP ${response.status}`);
      } catch (error) {
        lastError = error;
      }
      if (attempt < API_CONFIG.MAX_RETRIES - 1) {
        const delay = API_CONFIG.RETRY_DELAYS[attempt] || 4000;
        await new Promise((r) => setTimeout(r, delay));
      }
    }
    throw lastError || new Error("所有重試均失敗");
  },

  async sendToGeminiDirect(requestBody, apiKey) {
    const url = `${API_CONFIG.GEMINI_API_URL}?key=${apiKey}`;
    const response = await this.fetchWithRetry(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `API Error: ${response.status}`,
      );
    }
    return response.json();
  },

  async sendToWorker(requestBody) {
    const url = `${API_CONFIG.WORKER_URL}${API_CONFIG.CHAT_ENDPOINT}`;
    const response = await this.fetchWithRetry(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },
};

window.ChatbotAPI = ChatbotAPI;
