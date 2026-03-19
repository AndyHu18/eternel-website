/* ÉTERNEL Podcast Player */
(function () {
  const audio = document.getElementById("podcastAudio");
  const playBtn = document.getElementById("podcastPlayBtn");
  const iconPlay = playBtn.querySelector(".podcast-icon-play");
  const iconPause = playBtn.querySelector(".podcast-icon-pause");
  const progressFill = document.getElementById("podcastProgressFill");
  const timeCurrent = document.getElementById("podcastTimeCurrent");
  const timeTotal = document.getElementById("podcastTimeTotal");
  const progressBar = playBtn
    .closest(".podcast-controls")
    .querySelector(".podcast-progress-bar");
  const waveContainer = document.getElementById("podcastWave");

  // Generate wave bars
  const BAR_COUNT = 32;
  for (let i = 0; i < BAR_COUNT; i++) {
    const bar = document.createElement("span");
    bar.style.height = Math.random() * 10 + 4 + "px";
    waveContainer.appendChild(bar);
  }

  // Web Audio analyser
  let audioCtx = null;
  let analyser = null;
  let source = null;
  let animId = null;

  const initAudioContext = () => {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.75;
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
  };

  const formatTime = (s) => {
    if (isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ":" + (sec < 10 ? "0" : "") + sec;
  };

  // Play / Pause
  playBtn.addEventListener("click", () => {
    initAudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();

    if (audio.paused) {
      audio.play();
      iconPlay.style.display = "none";
      iconPause.style.display = "block";
      playBtn.classList.add("playing");
      waveContainer.classList.add("active");
      startWaveAnimation();
    } else {
      audio.pause();
      iconPlay.style.display = "block";
      iconPause.style.display = "none";
      playBtn.classList.remove("playing");
      waveContainer.classList.remove("active");
      cancelAnimationFrame(animId);
    }
  });

  // Time update
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = pct + "%";
      timeCurrent.textContent = formatTime(audio.currentTime);
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    timeTotal.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("ended", () => {
    iconPlay.style.display = "block";
    iconPause.style.display = "none";
    playBtn.classList.remove("playing");
    waveContainer.classList.remove("active");
    progressFill.style.width = "0%";
    cancelAnimationFrame(animId);
  });

  // Seek
  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audio.duration) {
      audio.currentTime = pct * audio.duration;
    }
  });

  // Wave animation
  let lastWaveUpdate = 0;
  const startWaveAnimation = () => {
    const bars = waveContainer.querySelectorAll("span");
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = (ts) => {
      if (audio.paused) return;
      animId = requestAnimationFrame(animate);

      if (ts - lastWaveUpdate < 50) return; // throttle ~20fps
      lastWaveUpdate = ts;

      analyser.getByteFrequencyData(dataArray);
      const step = Math.floor(dataArray.length / BAR_COUNT);

      bars.forEach((bar, i) => {
        const val = dataArray[i * step] || 0;
        const h = (val / 255) * 22 + 3;
        bar.style.height = h + "px";
      });
    };

    animId = requestAnimationFrame(animate);
  };
})();
