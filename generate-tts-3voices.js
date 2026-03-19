const fs = require("fs");
const path = require("path");

const API_KEY = "AIzaSyByp7w1f_CCSH8ZlAhY0kfVl3txNSdezAI";
const TTS_MODEL = "gemini-2.5-pro-preview-tts";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

// === PART 1: Couple excited about their jewelry experience ===
const coupleScript = `
請用自然、興奮但不誇張的語氣演繹這段對話。兩人是一對情侶，剛從 ÉTERNEL 珠寶店出來，邊走邊聊。

角色設定：
- 男生（Alex）：聲音低沉溫暖，說話沉穩但帶著開心，像是一個三十歲的成熟男人
- 女生（Mia）：聲音甜美自然，帶著被感動的幸福感

對話內容（自然口語化，像真的在聊天）：

Mia: 天啊，我到現在手還在抖。你剛剛看到那個皇冠系列了嗎？

Alex: 看到了。說真的，我本來以為珠寶店就那樣，但 ÉTERNEL 完全不一樣。

Mia: 對，卜先生一拿出那條項鍊的時候，我整個人都呆住了。那個光澤……不是那種很刺眼的閃，是一種很溫柔的光。

Alex: 他說那是因為他們鑲嵌的角度都是手工一顆一顆調過的，讓光線自然散開，不是那種機器切割的死板感。

Mia: 而且你知道我最感動的是什麼嗎？卜先生說他每一件作品都要花好幾個月，如果不滿意就重做。他不趕工。

Alex: 我覺得這才是真正的奢華——不是價格多高，而是有人願意為了一件作品投入那麼多心血。

Mia: 你剛剛偷偷在看那個戒指對不對？

Alex: 被你發現了。但我不會告訴你是哪一個。

Mia: 哈哈哈！好啦好啦，反正我相信你的眼光。ÉTERNEL，永恆之愛。我覺得這個名字就已經是最好的承諾了。

Alex: 嗯，有些東西值得等待，也值得親自走一趟。
`;

// === PART 2: Host/designer introducing the brand formally ===
const hostScript = `
請用專業、沉穩、有磁性的廣播主持人語氣念這段獨白。語速稍慢，每句之間有自然停頓，像深夜電台節目主持人。

角色設定：
- 主持人（Host）：聲音低沉有磁性，專業但溫暖
- 設計師（Designer）：聲音成熟穩重，像一個資深珠寶設計師在分享見解

對話內容：

Host: 剛才那對情侶的反應，其實就是很多第一次走進 ÉTERNEL 的人的真實感受。今天我們很榮幸邀請到一位資深珠寶設計師，來聊聊他眼中的 ÉTERNEL。

Designer: 謝謝。我在珠寶這個行業快二十年了，看過太多品牌。但 ÉTERNEL 讓我印象很深刻的是，他們不跟潮流。

Host: 怎麼說？

Designer: 現在很多品牌追求量產、追求翻新速度，三個月就要出一個新系列。但 ÉTERNEL 的卜先生不是這樣的人。他每一件作品都是先有一個情感的故事，再去設計。所以你看到的每一件珠寶，背後都有一段關於愛的敘事。

Host: 這在業界確實很少見。

Designer: 而且他堅持天然寶石、手工鑲嵌。這些在業界都是成本最高的選擇。但他說，既然品牌叫永恆，那作品本身也要經得起時間考驗。

Host: 說得太好了。如果你也想親自感受 ÉTERNEL 的魅力，他們就在台中市西區。

Designer: 台中是一座很有生活品味的城市，ÉTERNEL 在這裡扎根，我覺得非常適合。

Host: 想預約諮詢的朋友，可以撥打電話 0978-001-151。或是上他們的官網先看看作品。卜先生會親自為您服務，不管是上午、下午還是晚上，都歡迎聯繫。

Designer: 有些珠寶，值得你專程走一趟。ÉTERNEL，永恆之愛，奢華典藏。
`;

async function generatePart(script, speakers, outputName) {
  console.log(`Generating: ${outputName}...`);

  const response = await fetch(
    `${API_BASE}/models/${TTS_MODEL}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: script }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            multiSpeakerVoiceConfig: {
              speakerVoiceConfigs: speakers,
            },
          },
        },
      }),
    },
  );

  if (response.ok === false) {
    const errText = await response.text();
    console.error(`TTS Error for ${outputName}:`, response.status, errText);
    return null;
  }

  const result = await response.json();

  if (result.candidates && result.candidates[0]) {
    const parts = result.candidates[0].content.parts;
    for (const part of parts) {
      if (part.inlineData) {
        const audioData = Buffer.from(part.inlineData.data, "base64");
        const outPath = path.join(__dirname, outputName);
        fs.writeFileSync(outPath, audioData);
        const sizeMB = (audioData.length / 1024 / 1024).toFixed(1);
        console.log(`Saved: ${outputName} (${sizeMB} MB)`);
        return outPath;
      }
    }
  }

  console.log(`No audio in response for ${outputName}`);
  return null;
}

async function main() {
  console.log("=== ÉTERNEL 3-Voice Broadcast Generator ===\n");

  // Part 1: Couple (Charon = deep male, Aoede = female)
  const part1 = await generatePart(
    coupleScript,
    [
      {
        speaker: "Alex",
        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Charon" } },
      },
      {
        speaker: "Mia",
        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
      },
    ],
    "broadcast-part1-couple.wav",
  );

  if (part1 === null) {
    console.error("Part 1 failed, aborting.");
    process.exit(1);
  }

  // Small delay between API calls
  console.log("\nWaiting 3s before Part 2...\n");
  await new Promise((r) => setTimeout(r, 3000));

  // Part 2: Host + Designer (Orus = mature male host, Fenrir = deep male designer)
  const part2 = await generatePart(
    hostScript,
    [
      {
        speaker: "Host",
        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Orus" } },
      },
      {
        speaker: "Designer",
        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Fenrir" } },
      },
    ],
    "broadcast-part2-host.wav",
  );

  if (part2 === null) {
    console.error("Part 2 failed, aborting.");
    process.exit(1);
  }

  console.log("\n=== Both parts generated successfully ===");
  console.log("Next: use ffmpeg to concatenate with transition + BGM");
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
