/**
 * Agent Demo Animation Engine — ÉTERNEL Luxury Jewelry Edition
 * Call runAgentDemo(container) to start; returns a cleanup function.
 */

// ===== ICONS =====
const IC = {
  style:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  match:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/></svg>',
  budget:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
};

// ===== AGENT DATA =====
const AGENTS = [
  {
    id: "style",
    name: "風格診斷代理",
    icon: IC.style,
    color: "var(--agd-style)",
    glow: "rgba(201,169,110,0.06)",
    colorHex: "#c9a96e",
    cover: "images/agent-demo/agent-style.jpg",
    ingest: [
      { src: "客戶問卷", desc: "分析佩戴場合、個人風格偏好、膚色調性" },
      { src: "社群足跡", desc: "掃描 Instagram 風格標籤、收藏珠寶類型" },
      { src: "趨勢資料庫", desc: "比對 2025 婚戒趨勢與奢華珠寶潮流" },
    ],
    reasoning: [
      { op: "辨識", text: "場合 = 求婚＋日常佩戴（雙用途需求）" },
      {
        op: "分析",
        text: "偏好極簡線條、暖色調金屬、不喜繁複設計",
        cls: "indent",
      },
      {
        op: "判斷",
        text: "膚色 = 暖白調，適合黃金 / 玫瑰金",
        cls: "indent highlight",
      },
      { op: "掃描", text: "IG 收藏：82% 為 solitaire 類設計、圓形明亮式切割" },
      {
        op: "評估",
        text: "日常適用性需求高 → 排除大克拉高冠設計",
        cls: "indent",
      },
      {
        op: "計算",
        text: "風格匹配度 = 場合×0.3 + 偏好×0.35 + 趨勢×0.2 + 膚色×0.15",
      },
      {
        op: "產出",
        text: "風格定位 = 優雅極簡・經典永恆（匹配度 96%）",
        cls: "highlight",
      },
    ],
    confidence: [
      { label: "風格判讀", pct: 96, color: "#c9a96e" },
      { label: "場合適配", pct: 92, color: "#a8874d" },
      { label: "趨勢吻合", pct: 88, color: "#7a9e7e" },
    ],
    results: [
      {
        label: "風格定位",
        value: "優雅極簡",
        sub: "經典永恆",
        color: "#c9a96e",
      },
      {
        label: "金屬推薦",
        value: "18K 玫瑰金",
        sub: "暖膚調",
        color: "#c9a96e",
      },
      {
        label: "切割偏好",
        value: "圓形明亮",
        sub: "火光最強",
        color: "#a8874d",
      },
      {
        label: "適用場合",
        value: "雙場合",
        sub: "求婚＋日常",
        color: "#7a9e7e",
      },
    ],
    rec: {
      title: "風格診斷結論",
      text: "客戶偏好優雅極簡風格，暖膚調適合玫瑰金或黃金材質。\n圓形明亮式切割為首選（火光表現最佳），需兼顧日常佩戴的舒適度。\n建議低冠包鑲設計，減少勾到衣物的風險。",
    },
    commOut: { to: "珠寶匹配代理", msg: "傳送風格分析報告與偏好特徵" },
  },
  {
    id: "match",
    name: "珠寶匹配代理",
    icon: IC.match,
    color: "var(--agd-match)",
    glow: "rgba(139,105,20,0.06)",
    colorHex: "#8b6914",
    cover: "images/agent-demo/agent-match.jpg",
    ingest: [
      { src: "風格代理", desc: "接收風格分析報告＋偏好特徵" },
      { src: "鑽石資料庫", desc: "載入 GIA 認證鑽石 4C 規格庫" },
      { src: "設計圖庫", desc: "搜尋匹配風格的戒台設計 → 找到 12 款" },
    ],
    reasoning: [
      {
        op: "載入",
        text: "12 款候選戒台：6 款 solitaire / 4 款 halo / 2 款 three-stone",
      },
      {
        op: "篩選",
        text: "排除 halo 和 three-stone → 不符合極簡需求",
        cls: "indent",
      },
      {
        op: "匹配",
        text: "低冠六爪鑲 + 纖細戒圈 = 最高日常適用性",
        cls: "indent highlight",
      },
      { op: "比對", text: "鑽石 4C 最佳平衡：0.7ct / E / VS1 / Excellent" },
      {
        op: "計算",
        text: "肉眼效果 = 0.7ct E VS1 ≈ 視覺等同 0.9ct（因切割優異）",
        cls: "indent",
      },
      {
        op: "評分",
        text: "適配度 = 風格×0.35 + 4C×0.3 + 設計×0.2 + 舒適度×0.15",
      },
      {
        op: "產出",
        text: "最佳推薦 = Eternal Solitaire 系列（適配度 94%）",
        cls: "highlight",
      },
    ],
    confidence: [
      { label: "款式適配", pct: 94, color: "#c9a96e" },
      { label: "鑽石品質", pct: 91, color: "#8b6914" },
      { label: "佩戴舒適", pct: 96, color: "#7a9e7e" },
    ],
    results: [
      {
        label: "推薦系列",
        value: "Eternal",
        sub: "經典六爪鑲",
        color: "#c9a96e",
      },
      { label: "適配度", value: "94%", sub: "最佳匹配", color: "#8b6914" },
      { label: "鑽石規格", value: "0.7ct E", sub: "VS1 3EX", color: "#c9a96e" },
      {
        label: "戒台材質",
        value: "18K 玫瑰金",
        sub: "低冠設計",
        color: "#7a9e7e",
      },
    ],
    rec: {
      title: "珠寶推薦方案",
      text: "主推：Eternal Solitaire 六爪低冠鑲嵌\n鑽石：0.7ct / E色 / VS1 / 3EX 切工\n戒台：18K 玫瑰金纖細戒圈（寬 1.8mm）\n附贈：GIA 證書 + 終身免費清潔保養",
    },
    commOut: { to: "預算規劃代理", msg: "傳送推薦方案與鑽石規格" },
  },
  {
    id: "budget",
    name: "預算規劃代理",
    icon: IC.budget,
    color: "var(--agd-budget)",
    glow: "rgba(122,158,126,0.06)",
    colorHex: "#7a9e7e",
    cover: "images/agent-demo/agent-budget.jpg",
    ingest: [
      { src: "匹配代理", desc: "接收推薦方案 + 鑽石規格" },
      { src: "市場行情庫", desc: "載入同規格鑽戒國際市場價格" },
      { src: "保值模型", desc: "匯入鑽石保值率與二手市場數據" },
    ],
    reasoning: [
      {
        op: "載入",
        text: "方案總價 = NT$128,000（鑽石 $88K + 戒台 $35K + 鑲工 $5K）",
      },
      {
        op: "比對",
        text: "同規格品牌專櫃行情：Tiffany $280K / 周大福 $180K",
        cls: "indent",
      },
      {
        op: "計算",
        text: "相比國際品牌省 54%，相比連鎖品牌省 29%",
        cls: "indent highlight",
      },
      {
        op: "計算",
        text: "相比電商裸鑽省 8%（含鑲嵌 + GIA + 售後）",
        cls: "indent",
      },
      { op: "模擬", text: "3 年保值率：鑽石 85% + 黃金升值 → 預估保值 88%" },
      {
        op: "計算",
        text: "每日佩戴成本 = $128K ÷ 3650天 = $35/天",
        cls: "indent",
      },
      { op: "優化", text: "可選方案：降至 0.5ct 省 $30K，或升至 1ct 加 $85K" },
      {
        op: "產出",
        text: "預算 NT$128,000 | 省 29~54% | 保值率 88%",
        cls: "highlight",
      },
    ],
    confidence: [
      { label: "預算評估", pct: 96, color: "#7a9e7e" },
      { label: "行情比對", pct: 93, color: "#c9a96e" },
      { label: "保值預測", pct: 85, color: "#8b6914" },
    ],
    results: [
      { label: "總預算", value: "$128K", sub: "含全套服務", color: "#7a9e7e" },
      {
        label: "市場省幅",
        value: "29~54%",
        sub: "vs 品牌專櫃",
        color: "#7a9e7e",
      },
      { label: "保值率", value: "88%", sub: "3 年預估", color: "#c9a96e" },
      { label: "日均成本", value: "$35", sub: "10 年佩戴", color: "#8b6914" },
    ],
    rec: {
      title: "預算規劃建議",
      text: "推薦方案：NT$128,000（鑽石 + 戒台 + 鑲嵌 + GIA 證書）\n替代方案 A：0.5ct 入門款 NT$98,000（適合預算有限）\n替代方案 B：1.0ct 旗艦款 NT$213,000（更強視覺效果）\n附加服務：終身清潔保養 + 改圍一次 + 年度檢查",
    },
    commOut: null,
  },
];

const PLAN = [
  {
    time: "第 1 天",
    desc: "風格諮詢 + 鑽石挑選",
    tag: "諮詢",
    color: "var(--agd-style)",
  },
  {
    time: "第 3 天",
    desc: "3D 戒指建模 + 設計確認",
    tag: "設計",
    color: "var(--agd-match)",
  },
  {
    time: "第 10 天",
    desc: "鑽石鑲嵌 + 戒台製作",
    tag: "製作",
    color: "var(--agd-budget)",
  },
  {
    time: "第 14 天",
    desc: "品質檢驗 + GIA 核對",
    tag: "品管",
    color: "var(--agd-match)",
  },
  {
    time: "交付日",
    desc: "精裝禮盒 + 證書交付",
    tag: "交付",
    color: "var(--agd-style)",
  },
];

// ===== SPARK PATTERNS =====
const SPARK_PATTERNS = {
  風格定位: [3, 5, 6, 7, 8, 9, 9, 10, 10, 10],
  金屬推薦: [5, 6, 7, 7, 8, 8, 9, 9, 10, 10],
  切割偏好: [4, 5, 6, 7, 8, 8, 9, 9, 10, 10],
  適用場合: [6, 7, 7, 8, 8, 9, 9, 10, 10, 10],
  推薦系列: [5, 6, 7, 8, 8, 9, 9, 10, 10, 10],
  適配度: [4, 5, 6, 7, 8, 8, 9, 9, 10, 10],
  鑽石規格: [7, 7, 8, 8, 9, 9, 9, 10, 10, 10],
  戒台材質: [6, 7, 7, 8, 8, 9, 9, 9, 10, 10],
  總預算: [7, 7, 7, 6, 6, 5, 5, 4, 4, 4],
  市場省幅: [4, 5, 6, 7, 7, 8, 8, 9, 9, 10],
  保值率: [5, 6, 7, 7, 8, 8, 9, 9, 9, 10],
  日均成本: [10, 8, 6, 5, 4, 3, 3, 2, 2, 2],
};

// ===== HELPERS =====
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const makeEl = (tag, cls, html) => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html) el.innerHTML = html;
  return el;
};

const showEl = async (el, delay = 200) => {
  await wait(delay);
  el.classList.add("visible");
};

const makeMeaningfulSparkline = (label, color, count = 8) => {
  const pattern = SPARK_PATTERNS[label];
  let html = "";
  for (let i = 0; i < count; i++) {
    const h = pattern ? pattern[i] * 1.8 + 2 : Math.random() * 18 + 4;
    html +=
      '<div class="spark-bar" style="background:' +
      color +
      ";height:" +
      h +
      "px;animation-delay:" +
      i * 60 +
      'ms"></div>';
  }
  return html;
};

// ===== CHART BUILDERS =====

// Radar chart — Diamond 4C Analysis
const RADAR_DIMS = [
  { label: "克拉", value: 70 },
  { label: "顏色", value: 90 },
  { label: "淨度", value: 85 },
  { label: "切工", value: 98 },
  { label: "火光", value: 95 },
];

const buildRadarChartHTML = () => {
  const cx = 60,
    cy = 60,
    R = 44,
    n = RADAR_DIMS.length;
  const color = "#c9a96e";
  const startAngle = -Math.PI / 2;
  const toXY = (a, r) => ({
    x: +(cx + r * Math.cos(a)).toFixed(1),
    y: +(cy + r * Math.sin(a)).toFixed(1),
  });

  let gridHTML = "";
  for (const scale of [0.33, 0.66, 1]) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const { x, y } = toXY(startAngle + (i * 2 * Math.PI) / n, R * scale);
      pts.push(x + "," + y);
    }
    gridHTML +=
      '<polygon points="' +
      pts.join(" ") +
      '" fill="none" stroke="rgba(201,169,110,0.15)" stroke-width="0.5"/>';
  }

  let axesHTML = "";
  for (let i = 0; i < n; i++) {
    const { x, y } = toXY(startAngle + (i * 2 * Math.PI) / n, R);
    axesHTML +=
      '<line x1="' +
      cx +
      '" y1="' +
      cy +
      '" x2="' +
      x +
      '" y2="' +
      y +
      '" stroke="rgba(201,169,110,0.15)" stroke-width="0.5"/>';
  }

  const dataPts = [];
  let dotsHTML = "";
  for (let i = 0; i < n; i++) {
    const { x, y } = toXY(
      startAngle + (i * 2 * Math.PI) / n,
      (R * RADAR_DIMS[i].value) / 100,
    );
    dataPts.push(x + "," + y);
    dotsHTML +=
      '<circle cx="' +
      x +
      '" cy="' +
      y +
      '" r="2.5" fill="' +
      color +
      '" class="agd-radar-dot" style="animation-delay:' +
      i * 120 +
      'ms"/>';
  }

  let labelsHTML = "";
  for (let i = 0; i < n; i++) {
    const a = startAngle + (i * 2 * Math.PI) / n;
    const { x, y } = toXY(a, R + 14);
    const cosA = Math.cos(a),
      sinA = Math.sin(a);
    const anchor =
      Math.abs(cosA) < 0.15 ? "middle" : cosA > 0 ? "start" : "end";
    const dy = sinA > 0.3 ? "1em" : sinA < -0.3 ? "-0.2em" : "0.35em";
    labelsHTML +=
      '<text x="' +
      x +
      '" y="' +
      y +
      '" text-anchor="' +
      anchor +
      '" dy="' +
      dy +
      '" class="agd-radar-label">' +
      RADAR_DIMS[i].label +
      "</text>";
  }

  let legendHTML = "";
  RADAR_DIMS.forEach((d) => {
    legendHTML +=
      '<div class="agd-radar-item"><span class="agd-radar-dim">' +
      d.label +
      '</span><span class="agd-radar-val" style="color:' +
      color +
      '">' +
      d.value +
      "</span></div>";
  });

  return (
    '<div class="agd-chart-block"><div class="agd-chart-hdr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="' +
    color +
    '" stroke-width="2"><path d="M6 3h12l4 6-10 13L2 9z"/></svg><span class="agd-chart-title" style="color:' +
    color +
    '">鑽石 4C + 火光分析</span></div><div class="agd-radar-row"><svg class="agd-radar-svg" viewBox="0 0 120 120">' +
    gridHTML +
    axesHTML +
    '<polygon points="' +
    dataPts.join(" ") +
    '" class="agd-radar-area"/>' +
    dotsHTML +
    labelsHTML +
    '</svg><div class="agd-radar-legend">' +
    legendHTML +
    "</div></div></div>"
  );
};

// Gauge chart — Style Match Score
const buildGaugeChartHTML = () => {
  const score = 96,
    color = "#c9a96e";
  const cx = 60,
    cy = 55,
    r = 40;
  const semiC = Math.PI * r;
  const fillLen = (score / 100) * semiC;
  const arcPath =
    "M " +
    (cx - r) +
    " " +
    cy +
    " A " +
    r +
    " " +
    r +
    " 0 0 1 " +
    (cx + r) +
    " " +
    cy;
  const needleAngle = (score / 100) * 180;

  return (
    '<div class="agd-chart-block"><div class="agd-chart-hdr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="' +
    color +
    '" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><span class="agd-chart-title" style="color:' +
    color +
    '">風格匹配度</span><span class="agd-chart-val" style="color:' +
    color +
    '">' +
    score +
    '<small>/100</small></span></div><svg class="agd-gauge-svg" viewBox="0 0 120 70"><defs><linearGradient id="agd-gauge-grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#a8874d"/><stop offset="50%" stop-color="#c9a96e"/><stop offset="100%" stop-color="#7a9e7e"/></linearGradient></defs><path d="' +
    arcPath +
    '" fill="none" stroke="rgba(201,169,110,0.1)" stroke-width="10" stroke-linecap="round"/><path d="' +
    arcPath +
    '" fill="none" stroke="url(#agd-gauge-grad)" stroke-width="10" stroke-linecap="round" class="agd-gauge-fill" stroke-dasharray="0 ' +
    semiC.toFixed(1) +
    '" data-target="' +
    fillLen.toFixed(1) +
    " " +
    (semiC - fillLen).toFixed(1) +
    '"/><g class="agd-gauge-needle-g" data-angle="' +
    needleAngle.toFixed(1) +
    '"><line x1="' +
    cx +
    '" y1="' +
    cy +
    '" x2="' +
    (cx - r + 8) +
    '" y2="' +
    cy +
    '" stroke="#c9a96e" stroke-width="2" stroke-linecap="round"/></g><circle cx="' +
    cx +
    '" cy="' +
    cy +
    '" r="4" fill="' +
    color +
    '"/><text x="' +
    (cx - r) +
    '" y="' +
    (cy + 14) +
    '" class="agd-gauge-label" text-anchor="middle">0</text><text x="' +
    cx +
    '" y="' +
    (cy - r - 4) +
    '" class="agd-gauge-label" text-anchor="middle">50</text><text x="' +
    (cx + r) +
    '" y="' +
    (cy + 14) +
    '" class="agd-gauge-label" text-anchor="middle">100</text></svg></div>'
  );
};

// Bar chart — Jewelry Plan Comparison
const PLAN_SCORES = [
  { plan: "入門款 0.3ct", score: 45, color: "#b8a99a" },
  { plan: "經典款 0.5ct", score: 72, color: "#a8874d" },
  { plan: "推薦款 0.7ct", score: 94, color: "#c9a96e" },
  { plan: "旗艦款 1.0ct", score: 82, color: "#7a9e7e" },
];

const buildPlanBarChartHTML = () => {
  const color = "#c9a96e";
  let barsHTML = "";
  PLAN_SCORES.forEach((d, i) => {
    const pct = (d.score / 100) * 100;
    barsHTML +=
      '<div class="agd-wp-row" style="animation-delay:' +
      i * 80 +
      'ms"><span class="agd-wp-day">' +
      d.plan +
      '</span><div class="agd-wp-bar-wrap"><div class="agd-wp-bar-fill" style="width:0;background:' +
      d.color +
      '" data-w="' +
      pct +
      '%"></div></div><span class="agd-wp-type" style="color:' +
      d.color +
      '">' +
      d.score +
      '%</span><span class="agd-wp-min">' +
      (d.score >= 90 ? "推薦" : "") +
      "</span></div>";
  });

  return (
    '<div class="agd-chart-block"><div class="agd-chart-hdr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="' +
    color +
    '" stroke-width="2"><path d="M6 3h12l4 6-10 13L2 9z"/></svg><span class="agd-chart-title" style="color:' +
    color +
    '">克拉數方案比較</span></div><div class="agd-wp-bars">' +
    barsHTML +
    "</div></div>"
  );
};

// Donut chart — Budget Breakdown
const buildDonutChartHTML = () => {
  const segs = [
    { label: "鑽石", pct: 69, color: "#c9a96e" },
    { label: "戒台", pct: 27, color: "#a8874d" },
    { label: "鑲工", pct: 4, color: "#7a9e7e" },
  ];
  const r = 40,
    c = 2 * Math.PI * r;
  let offset = 0;
  let circlesHTML = "";
  segs.forEach((s) => {
    const len = (s.pct / 100) * c;
    circlesHTML +=
      '<circle cx="50" cy="50" r="' +
      r +
      '" fill="none" stroke="' +
      s.color +
      '" stroke-width="12" class="agd-donut-seg" stroke-dasharray="0 ' +
      c.toFixed(1) +
      '" stroke-dashoffset="-' +
      offset.toFixed(1) +
      '" data-target="' +
      len.toFixed(1) +
      " " +
      (c - len).toFixed(1) +
      '"/>';
    offset += len;
  });

  let legendHTML = "";
  segs.forEach((s) => {
    legendHTML +=
      '<div class="agd-donut-item"><span class="agd-donut-dot" style="background:' +
      s.color +
      '"></span><span class="agd-donut-label">' +
      s.label +
      '</span><span class="agd-donut-pct" style="color:' +
      s.color +
      '">' +
      s.pct +
      "%</span></div>";
  });

  return (
    '<div class="agd-chart-block"><div class="agd-chart-hdr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a9e7e" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span class="agd-chart-title" style="color:#7a9e7e">預算分配比例</span></div><div class="agd-donut-row"><svg class="agd-donut-svg" viewBox="0 0 100 100">' +
    circlesHTML +
    '</svg><div class="agd-donut-legend">' +
    legendHTML +
    "</div></div></div>"
  );
};

// ===== ANIMATION FUNCTIONS =====
const smoothScrollTo = (container, el, duration = 600) => {
  const start = container.scrollTop;
  const target = Math.min(
    el.offsetTop - 12,
    container.scrollHeight - container.clientHeight,
  );
  const dist = target - start;
  if (Math.abs(dist) < 2) return;
  let t0 = null;
  const step = (ts) => {
    if (t0 === null) t0 = ts;
    const p = Math.min((ts - t0) / duration, 1);
    const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
    container.scrollTop = start + dist * ease;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const animateFill = (el, ms = 800) => {
  const start = performance.now();
  const run = (now) => {
    const p = Math.min((now - start) / ms, 1);
    el.textContent = Math.round(p * 100) + "%";
    const bar = el.closest(".agd-load-item")?.querySelector(".agd-load-fill");
    if (bar) bar.style.width = Math.round(p * 100) + "%";
    if (p < 1) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
};

// ===== MAIN ENGINE =====
function runAgentDemo(container) {
  let cancelled = false;
  const timers = [];
  const safeWait = (ms) =>
    new Promise((resolve) => {
      const id = setTimeout(resolve, ms);
      timers.push(id);
    });

  const main = container.querySelector(".agd-main");
  const elapsedEl = container.querySelector(".elapsed-time");
  const agentsEl = container.querySelector(".m-agents");
  const confEl = container.querySelector(".m-conf");
  const scrollHint = container.querySelector(".agd-scroll-hint");

  const updateMetric = (el, val) => {
    if (el) el.textContent = val;
  };

  // Timer
  let sec = 0;
  const timerIv = setInterval(() => {
    if (cancelled) return;
    sec++;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    updateMetric(elapsedEl, m + ":" + (s < 10 ? "0" : "") + s);
  }, 1000);
  timers.push(timerIv);

  // Scroll hint hide
  const onScroll = () => {
    if (main.scrollTop > 40 && scrollHint) scrollHint.style.opacity = "0";
  };
  main.addEventListener("scroll", onScroll);

  const run = async () => {
    // === Client intro ===
    const intro = makeEl(
      "div",
      "agent-card",
      '<div class="agent-body" style="display:flex;align-items:center;gap:14px"><div><div class="agd-member-name" style="font-size:18px;font-weight:600;color:var(--agd-primary-light)">張先生 — 求婚戒指諮詢</div><div style="font-size:14px;color:var(--agd-text-dim);margin-top:4px">預算 NT$100K~150K ・ 希望圓形明亮式切割 ・ 玫瑰金偏好</div></div></div>',
    );
    main.appendChild(intro);
    await showEl(intro, 500);
    await safeWait(1500);
    if (cancelled) return;

    let agentCount = 0;

    for (let ai = 0; ai < AGENTS.length; ai++) {
      if (cancelled) return;
      const agent = AGENTS[ai];

      // Phase transition
      if (ai > 0) {
        const phase = makeEl(
          "div",
          "phase-transition",
          '<div class="phase-label">PHASE ' +
            (ai + 1) +
            '</div><div class="phase-flow"><span class="phase-node" style="background:' +
            AGENTS[ai - 1].colorHex +
            '"></span><span class="phase-line" style="background:' +
            AGENTS[ai - 1].colorHex +
            '"></span><span class="phase-node" style="background:' +
            agent.colorHex +
            '"></span></div>',
        );
        main.appendChild(phase);
        await showEl(phase, 400);
        smoothScrollTo(main, phase);
        await safeWait(1200);
      }
      if (cancelled) return;

      // Agent card
      const card = makeEl("div", "agent-card");
      const coverHTML = agent.cover
        ? '<div class="agent-cover"><img src="' +
          agent.cover +
          '" alt="' +
          agent.name +
          '"></div>'
        : "";
      card.innerHTML =
        '<div class="agent-hdr"><div class="agent-icon-box" style="background:' +
        agent.glow +
        ";color:" +
        agent.colorHex +
        '">' +
        agent.icon +
        '</div><span class="agent-name" style="color:' +
        agent.colorHex +
        '">' +
        agent.name +
        '</span><span class="agent-badge run"><span class="spin"></span>分析中</span></div>' +
        coverHTML +
        '<div class="agent-body"></div>';
      main.appendChild(card);
      card.classList.add("agd-processing");
      await showEl(card, 400);
      smoothScrollTo(main, card);
      await safeWait(800);
      if (cancelled) return;

      agentCount++;
      updateMetric(agentsEl, agentCount + " / 3");

      const body = card.querySelector(".agent-body");

      // --- Data Loading ---
      const loadBlock = makeEl("div", "agd-load-block");
      let loadHTML =
        '<div class="agd-load-label"><span class="agd-proc-spin"></span> 資料擷取</div>';
      agent.ingest.forEach((d) => {
        loadHTML +=
          '<div class="agd-load-item"><div class="agd-load-status"><span class="agd-load-icon">◌</span></div><div class="agd-load-info"><div class="agd-load-name">' +
          d.src +
          '</div><div class="agd-load-desc">' +
          d.desc +
          '</div><div class="agd-load-bar"><div class="agd-load-fill" style="background:' +
          agent.colorHex +
          '"></div></div></div><span class="agd-load-pct">0%</span></div>';
      });
      loadBlock.innerHTML = loadHTML;
      body.appendChild(loadBlock);
      await showEl(loadBlock, 200);
      await safeWait(200);

      const items = loadBlock.querySelectorAll(".agd-load-item");
      for (let li = 0; li < items.length; li++) {
        if (cancelled) return;
        items[li].classList.add("active");
        items[li].querySelector(".agd-load-icon").textContent = "◐";
        animateFill(items[li].querySelector(".agd-load-pct"), 1200);
        await safeWait(1400);
        items[li].classList.remove("active");
        items[li].classList.add("done");
        items[li].querySelector(".agd-load-icon").textContent = "✓";
      }
      await safeWait(400);
      loadBlock.classList.add("fade-out");
      await safeWait(500);
      loadBlock.remove();

      // --- Thinking ---
      const thinking = makeEl(
        "div",
        "thinking-row",
        '<div class="thinking-dots"><span class="thinking-dot"></span><span class="thinking-dot"></span><span class="thinking-dot"></span></div><span>正在分析...</span>',
      );
      body.appendChild(thinking);
      await showEl(thinking, 200);
      await safeWait(1200);

      // --- Reasoning ---
      const reasoning = makeEl("div", "reasoning");
      let rHTML =
        '<div class="r-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="' +
        agent.colorHex +
        '" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> 推理鏈</div>';
      agent.reasoning.forEach((r) => {
        rHTML +=
          '<div class="r-step' +
          (r.cls ? " " + r.cls : "") +
          '"><span class="op">' +
          r.op +
          '</span><span class="arrow">→</span><span class="val">' +
          r.text +
          "</span></div>";
      });
      reasoning.innerHTML = rHTML;
      body.appendChild(reasoning);
      await showEl(reasoning, 200);
      smoothScrollTo(main, reasoning);

      const steps = reasoning.querySelectorAll(".r-step");
      for (let si = 0; si < steps.length; si++) {
        if (cancelled) return;
        await safeWait(600);
        steps[si].classList.add("visible");
      }
      await safeWait(800);
      thinking.remove();

      // --- Charts ---
      if (ai === 0) {
        // Style agent: Radar (4C) + Gauge
        const radarEl = makeEl("div", "", buildRadarChartHTML());
        const chartBlock = radarEl.firstElementChild;
        body.appendChild(chartBlock);
        await showEl(chartBlock, 400);
        smoothScrollTo(main, chartBlock);
        await safeWait(600);
        const radarSvg = chartBlock.querySelector(".agd-radar-svg");
        if (radarSvg) radarSvg.classList.add("revealed");
        await safeWait(1200);

        const gaugeEl = makeEl("div", "", buildGaugeChartHTML());
        const gaugeBlock = gaugeEl.firstElementChild;
        body.appendChild(gaugeBlock);
        await showEl(gaugeBlock, 400);
        await safeWait(500);
        const gaugeFill = gaugeBlock.querySelector(".agd-gauge-fill");
        if (gaugeFill)
          gaugeFill.setAttribute("stroke-dasharray", gaugeFill.dataset.target);
        const needleG = gaugeBlock.querySelector(".agd-gauge-needle-g");
        if (needleG)
          needleG.style.transform = "rotate(" + needleG.dataset.angle + "deg)";
        await safeWait(1000);
      } else if (ai === 1) {
        // Match agent: Bar chart
        const barEl = makeEl("div", "", buildPlanBarChartHTML());
        const barBlock = barEl.firstElementChild;
        body.appendChild(barBlock);
        await showEl(barBlock, 400);
        smoothScrollTo(main, barBlock);
        await safeWait(600);
        barBlock.querySelectorAll(".agd-wp-bar-fill").forEach((b) => {
          b.style.width = b.dataset.w;
        });
        await safeWait(1200);
      } else if (ai === 2) {
        // Budget agent: Donut chart
        const donutEl = makeEl("div", "", buildDonutChartHTML());
        const donutBlock = donutEl.firstElementChild;
        body.appendChild(donutBlock);
        await showEl(donutBlock, 400);
        smoothScrollTo(main, donutBlock);
        await safeWait(600);
        donutBlock.querySelectorAll(".agd-donut-seg").forEach((seg) => {
          seg.setAttribute("stroke-dasharray", seg.dataset.target);
        });
        await safeWait(1200);
      }

      // --- Confidence ---
      for (const conf of agent.confidence) {
        if (cancelled) return;
        const row = makeEl(
          "div",
          "confidence-row",
          '<span class="conf-label">' +
            conf.label +
            '</span><div class="conf-bar"><div class="conf-fill" style="background:' +
            conf.color +
            '"></div></div><span class="conf-val" style="color:' +
            conf.color +
            '">' +
            conf.pct +
            "%</span>",
        );
        body.appendChild(row);
        await showEl(row, 300);
        await safeWait(200);
        row.querySelector(".conf-fill").style.width = conf.pct + "%";
      }
      await safeWait(600);
      updateMetric(confEl, agent.confidence[0].pct + "%");

      // --- Results Grid ---
      const grid = makeEl("div", "results-grid");
      agent.results.forEach((r) => {
        grid.innerHTML +=
          '<div class="result-card"><div class="result-label">' +
          r.label +
          '</div><div class="result-value" style="color:' +
          r.color +
          '">' +
          r.value +
          '</div><div class="result-sub">' +
          r.sub +
          '</div><div class="result-spark">' +
          makeMeaningfulSparkline(r.label, r.color) +
          "</div></div>";
      });
      body.appendChild(grid);
      await safeWait(300);
      smoothScrollTo(main, grid);
      const cards = grid.querySelectorAll(".result-card");
      for (let ci = 0; ci < cards.length; ci++) {
        await safeWait(250);
        cards[ci].classList.add("visible");
      }
      await safeWait(800);

      // --- Recommendation ---
      const rec = makeEl(
        "div",
        "rec-block",
        '<div class="rec-content"><div class="rec-title">' +
          agent.rec.title +
          '</div><div class="rec-text">' +
          agent.rec.text +
          "</div></div>",
      );
      rec.style.borderColor = agent.colorHex;
      rec.style.background = agent.glow;
      body.appendChild(rec);
      await showEl(rec, 400);
      smoothScrollTo(main, rec);
      await safeWait(1200);

      // --- Badge done ---
      card.classList.remove("agd-processing");
      const badge = card.querySelector(".agent-badge");
      if (badge) {
        badge.className = "agent-badge done";
        badge.innerHTML = "✓ 完成";
      }

      // --- Communication ---
      if (agent.commOut) {
        const comm = makeEl(
          "div",
          "agent-comm",
          '<span class="comm-from">' +
            agent.name +
            '</span><div class="comm-arrow-box"><span class="comm-dot" style="background:' +
            agent.colorHex +
            '"></span><span class="comm-dot" style="background:' +
            agent.colorHex +
            '"></span><span class="comm-dot" style="background:' +
            agent.colorHex +
            '"></span><span class="comm-dot" style="background:' +
            agent.colorHex +
            '"></span></div><span class="comm-to">' +
            agent.commOut.to +
            '</span><span class="comm-msg">' +
            agent.commOut.msg +
            "</span>",
        );
        main.appendChild(comm);
        await showEl(comm, 400);
        smoothScrollTo(main, comm);
        await safeWait(1000);
      }

      await safeWait(800);
    }

    if (cancelled) return;

    // === Summary ===
    const summary = makeEl("div", "summary-card");
    let sumHTML = '<div class="summary-title">✦ 專屬珠寶方案總覽 ✦</div>';
    PLAN.forEach((p) => {
      sumHTML +=
        '<div class="plan-row"><span class="plan-time" style="color:' +
        p.color +
        '">' +
        p.time +
        '</span><span class="plan-desc">' +
        p.desc +
        '</span><span class="plan-tag" style="background:' +
        p.color +
        ';color:#0a0a0a;opacity:0.9">' +
        p.tag +
        "</span></div>";
    });
    summary.innerHTML = sumHTML;
    main.appendChild(summary);
    await showEl(summary, 500);
    smoothScrollTo(main, summary);

    const planRows = summary.querySelectorAll(".plan-row");
    for (let pi = 0; pi < planRows.length; pi++) {
      await safeWait(400);
      planRows[pi].classList.add("visible");
    }

    // Timer stop
    clearInterval(timerIv);

    // === Replay Overlay ===
    await safeWait(1500);
    if (cancelled) return;
    const overlay = makeEl(
      "div",
      "agd-replay-overlay",
      '<div class="agd-replay-inner"><div class="agd-replay-check"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg></div><div class="agd-replay-label">分析完成</div><div class="agd-replay-sub">3 位 AI 代理已完成您的珠寶諮詢</div><div class="agd-replay-actions"><button class="agd-replay-btn"><svg class="agd-replay-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>重新演示</button><a href="#contact" class="agd-contact-btn">預約諮詢</a></div></div>',
    );
    container.appendChild(overlay);
    await safeWait(100);
    overlay.classList.add("visible");

    overlay.querySelector(".agd-replay-btn")?.addEventListener("click", () => {
      overlay.remove();
      main.innerHTML = "";
      sec = 0;
      updateMetric(elapsedEl, "0:00");
      updateMetric(agentsEl, "0 / 3");
      updateMetric(confEl, "—");
      if (scrollHint) scrollHint.style.opacity = "1";
      run();
    });
  };

  run();

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
    clearInterval(timerIv);
    main.removeEventListener("scroll", onScroll);
  };
}

// ===== AUTO INIT via IntersectionObserver =====
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".agent-demo-section");
  if (!section) return;

  let cleanup = null;
  let hasRun = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          cleanup = runAgentDemo(section);
        }
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(section);
});
