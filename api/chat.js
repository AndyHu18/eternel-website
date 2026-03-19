/**
 * ÉTERNEL — Vercel Serverless Function for AI Chat
 * Receives Gemini-format requests from frontend, proxies to Claude API.
 * Converts between Gemini <-> Claude formats so frontend JS stays unchanged.
 *
 * Environment variable required: ANTHROPIC_API_KEY
 */

const CLAUDE_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-haiku-4-5-20251001";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const { system_instruction, contents, generationConfig } = req.body;

    // Extract system prompt from Gemini format
    const systemText = system_instruction?.parts?.[0]?.text || "";

    // Convert Gemini messages to Claude format
    const messages = (contents || []).map((msg) => ({
      role: msg.role === "model" ? "assistant" : "user",
      content: msg.parts?.[0]?.text || "",
    }));

    const claudeBody = {
      model: CLAUDE_MODEL,
      max_tokens: generationConfig?.maxOutputTokens || 1024,
      system: systemText,
      messages,
    };

    const response = await fetch(CLAUDE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(claudeBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.error?.message || "Claude API error" });
    }

    // Convert Claude response back to Gemini format (frontend expects this)
    const text = data.content?.[0]?.text || "抱歉，我暫時無法回應。";

    const geminiResponse = {
      candidates: [
        {
          content: {
            parts: [{ text }],
            role: "model",
          },
        },
      ],
    };

    return res.status(200).json(geminiResponse);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
