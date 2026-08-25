    const playerConfig = {
      showDescriptions: false,
      showEpisodeList: true,
      showEpisodeLoadMore: true,
      showPlaylistThumbnails: true,
      compactPlaylist: true,
      minimal: false,
      layout: "default", // "hero" | "default"
      mode: "audio", // "audio" | "video"
      allowModeSwitch: true, // true | false
      skin: "default", // "default" | "onet"
      customProperties: {},
      showWaveform: true,
      alwaysShowWaveform: true,
      autoplay: false,
      defaultVolume: 0.82,
      skipBackSeconds: 15,
      skipForwardSeconds: 30,
      playbackSpeeds: [1, 1.25, 1.5, 1.75, 2],
      ...(window.podcastPlayerConfig || {})
    };

    const STORAGE_KEY = "podcast-player-state-v1";
    const savedState = (() => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
      catch { return {}; }
    })();

    const mediaMode = playerConfig.mode === "video" ? "video" : "audio";

    const episodes = [
      {
        no: 42,
        title: "Dlaczego dobre produkty zaczynają się od ograniczeń",
        description: "O tym, dlaczego ograniczenia pomagają zespołom podejmować lepsze decyzje i budować produkty, które są prostsze w użyciu i łatwiejsze w rozwijaniu.",
        date: "21 sierpnia 2026",
        guest: "Anna Kowalska",
        category: "Produkt",
        durationLabel: "—:—",
        src: "https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/librivox.mp3",
         type: "audio/mpeg",
      video: {
           src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
           type: "video/mp4",
           poster: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1280&q=80"
         },
         image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
         cover: "linear-gradient(145deg,#111 0%,#353531 55%,#8d8d84 100%)"
      },
      {
        no: 41,
        title: "Interfejs, który nie przeszkadza użytkownikowi",
        description: "Rozmawiamy o projektowaniu interfejsów, które prowadzą użytkownika bez nadmiaru komunikatów, elementów i decyzji do podjęcia.",
        date: "14 sierpnia 2026",
        guest: "Michał Rosiński",
        category: "Design",
        durationLabel: "—:—",
        src: "https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/stereo.mp3",
         type: "audio/mpeg",
         video: {
           src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
           type: "video/mp4",
           poster: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1280&q=80"
         },
         image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
         cover: "linear-gradient(145deg,#171b24 0%,#414a5c 52%,#aab1bd 100%)"
      },
      {
        no: 40,
        title: "Co naprawdę znaczy „prosty” produkt",
        description: "Przyglądamy się temu, skąd bierze się prawdziwa prostota produktu i dlaczego usuwanie funkcji bywa trudniejsze niż ich dodawanie.",
        date: "7 sierpnia 2026",
        guest: "Julia Wrona",
        category: "Strategia",
        durationLabel: "—:—",
        src: "https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/mono.mp3",
         type: "audio/mpeg",
         video: {
           src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
           type: "video/mp4",
           poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1280&q=80"
         },
         image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
         cover: "linear-gradient(145deg,#1f1914 0%,#66584a 55%,#c8b89f 100%)"
      },
      {
        no: 39,
        title: "AI w zespole: mniej demo, więcej procesu",
        description: "Praktycznie o tym, gdzie AI rzeczywiście pomaga zespołowi, jak włączyć je do codziennego procesu i czego nie warto automatyzować.",
        date: "31 lipca 2026",
        guest: "Paweł Domański",
        category: "AI",
        durationLabel: "—:—",
        src: "https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/audio.wav",
         type: "audio/wav",
         video: {
           src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
           type: "video/mp4",
           poster: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1280&q=80"
         },
         image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80",
         cover: "linear-gradient(145deg,#17171b 0%,#514c5d 54%,#aaa3bb 100%)"
      },
      {
        no: 38,
        title: "Jak podejmować decyzje, gdy danych jest za dużo",
        description: "O podejmowaniu decyzji w świecie pełnym dashboardów, raportów i metryk oraz o tym, jak rozpoznać dane, które naprawdę mają znaczenie.",
        date: "24 lipca 2026",
        guest: "Marta Lis",
        category: "Praca",
        durationLabel: "—:—",
        src: "https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/demo.wav",
         type: "audio/wav",
         video: {
           src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
           type: "video/mp4",
           poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1280&q=80"
         },
         image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
         cover: "linear-gradient(145deg,#121c18 0%,#3e6356 54%,#a9c0b7 100%)"
      },
      {
        no: 37,
        title: "Kiedy roadmapa przestaje pomagać",
        description: "O planowaniu, które zostawia miejsce na zmianę kierunku, i sygnałach pokazujących, że roadmapa zaczęła ograniczać zespół.",
        date: "17 lipca 2026",
        guest: "Tomasz Bury",
        category: "Produkt",
        durationLabel: "—:—",
        src: "https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/librivox.mp3",
        type: "audio/mpeg",
        video: {
          src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
          type: "video/mp4",
          poster: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1280&q=80"
        },
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
        cover: "linear-gradient(145deg,#171b22 0%,#42516a 54%,#a8b5c9 100%)"
      },
      {
        no: 36,
        title: "Badania bez laboratorium",
        description: "Jak prowadzić lekkie badania produktu w codziennej pracy i szybciej wychwytywać błędne założenia.",
        date: "10 lipca 2026",
        guest: "Karolina Mazur",
        category: "Research",
        durationLabel: "—:—",
        src: "https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/stereo.mp3",
        type: "audio/mpeg",
        video: {
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          type: "video/mp4",
          poster: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1280&q=80"
        },
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
        cover: "linear-gradient(145deg,#201914 0%,#765640 54%,#d3b79f 100%)"
      },
      {
        no: 35,
        title: "Dług technologiczny bez dramatów",
        description: "Praktyczne podejście do długu technologicznego: kiedy go spłacać, jak o nim rozmawiać i czego nie mierzyć.",
        date: "3 lipca 2026",
        guest: "Łukasz Cichy",
        category: "Technologia",
        durationLabel: "—:—",
        src: "https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/mono.mp3",
        type: "audio/mpeg",
        video: {
          src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
          type: "video/mp4",
          poster: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1280&q=80"
        },
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        cover: "linear-gradient(145deg,#16171a 0%,#4b505a 54%,#b5bac4 100%)"
      },
      {
        no: 34,
        title: "Jak mówić nie dobrym pomysłom",
        description: "O priorytetach, kosztach alternatywnych i komunikowaniu decyzji bez rozmywania odpowiedzialności.",
        date: "26 czerwca 2026",
        guest: "Natalia Serafin",
        category: "Przywództwo",
        durationLabel: "—:—",
        src: "https://raw.githubusercontent.com/katspaugh/wavesurfer.js/main/examples/audio/audio.wav",
        type: "audio/wav",
        video: {
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          type: "video/mp4",
          poster: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1280&q=80"
        },
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
        cover: "linear-gradient(145deg,#171511 0%,#675b3f 54%,#c8bc96 100%)"
      }
    ];

    const els = {
      podcastShell: document.querySelector(".podcast-shell"),
      nowPlaying: document.getElementById("nowPlaying"),
      cover: document.getElementById("cover"),
      coverImage: document.getElementById("coverImage"),
      mediaSwitch: document.getElementById("mediaSwitch"),
      mediaModeButtons: document.querySelectorAll("[data-media-mode]"),
      controlsLeft: document.querySelector(".controls-left"),
      engineWrap: document.querySelector(".engine-wrap"),
      videoTitle: document.getElementById("videoTitle"),
      coverNo: document.getElementById("coverNo"),
      status: document.getElementById("status"),
      statusText: document.getElementById("statusText"),
      retryBtn: document.getElementById("retryBtn"),
      episodeKicker: document.getElementById("episodeKicker"),
      episodeTitle: document.getElementById("episodeTitle"),
      episodeDescription: document.getElementById("episodeDescription"),
      episodeDate: document.getElementById("episodeDate"),
      episodeGuest: document.getElementById("episodeGuest"),
      episodeCategory: document.getElementById("episodeCategory"),
      wave: document.getElementById("wave"),
      waveBase: document.getElementById("waveBase"),
      wavePlayed: document.getElementById("wavePlayed"),
      simpleProgressFill: document.getElementById("simpleProgressFill"),
      playhead: document.getElementById("playhead"),
      waveHoverTime: document.getElementById("waveHoverTime"),
      currentTime: document.getElementById("currentTime"),
      duration: document.getElementById("duration"),
      playBtn: document.getElementById("playBtn"),
      backBtn: document.getElementById("backBtn"),
      forwardBtn: document.getElementById("forwardBtn"),
      speedBtn: document.getElementById("speedBtn"),
      speedMenu: document.getElementById("speedMenu"),
      muteBtn: document.getElementById("muteBtn"),
      volumeSlider: document.getElementById("volumeSlider"),
      episodeList: document.getElementById("episodeList"),
      listCount: document.getElementById("listCount")
    };

    els.podcastShell.dataset.showDescriptions = String(playerConfig.showDescriptions);
    els.podcastShell.dataset.showEpisodeList = String(playerConfig.showEpisodeList);
    els.podcastShell.dataset.showEpisodeLoadMore = String(playerConfig.showEpisodeLoadMore);
    els.podcastShell.dataset.showPlaylistThumbnails = String(playerConfig.showPlaylistThumbnails);
    els.podcastShell.dataset.compactPlaylist = String(playerConfig.compactPlaylist);
    els.podcastShell.dataset.showWaveform = String(playerConfig.showWaveform && !playerConfig.minimal);
    els.podcastShell.dataset.alwaysShowWaveform = String(playerConfig.alwaysShowWaveform && !playerConfig.minimal);
    els.podcastShell.dataset.minimal = String(playerConfig.minimal);
    els.podcastShell.dataset.layout = playerConfig.layout === "hero" ? "hero" : "default";
    els.podcastShell.dataset.mediaMode = mediaMode;
    els.mediaSwitch.hidden = !playerConfig.allowModeSwitch;
    els.podcastShell.dataset.skin = ["default", "onet", "wp", "spotify", "youtube", "telegraph"].includes(playerConfig.skin)
      ? playerConfig.skin
      : "default";
    Object.entries(playerConfig.customProperties).forEach(([property, value]) => {
      if (/^--[a-z0-9-]+$/i.test(property) && typeof value === "string") {
        els.podcastShell.style.setProperty(property, value);
      }
    });

    let currentIndex = Number.isInteger(savedState.currentIndex) && savedState.currentIndex >= 0 && savedState.currentIndex < episodes.length
      ? savedState.currentIndex
      : 0;
    let resumeAfterSourceChange = false;
    let currentDuration = 0;
    let timeMode = "duration";
    const speeds = playerConfig.playbackSpeeds;
    let speedIndex = Math.max(0, speeds.indexOf(Number(savedState.playbackRate || 1)));
    let lastVolume = Number.isFinite(savedState.volume) ? savedState.volume : playerConfig.defaultVolume;
    let retrySource = null;
    let currentMediaMode = mediaMode;
    const mobileViewport = matchMedia("(max-width:620px)");
    const episodeBatchSize = 4;
    let visibleEpisodeCount = playerConfig.showEpisodeLoadMore
      ? Math.max(episodeBatchSize, currentIndex + 1)
      : episodes.length;

    const mobileMediaSwitchSlot = document.createElement("div");
    mobileMediaSwitchSlot.className = "mobile-media-switch-slot";
    mobileMediaSwitchSlot.hidden = true;
    els.engineWrap.after(mobileMediaSwitchSlot);

    const episodeLoadMore = document.createElement("div");
    episodeLoadMore.className = "episode-load-more";
    const loadMoreEpisodesBtn = document.createElement("button");
    loadMoreEpisodesBtn.type = "button";
    loadMoreEpisodesBtn.textContent = "Zobacz więcej";
    loadMoreEpisodesBtn.setAttribute("aria-controls", "episodeList");
    episodeLoadMore.append(loadMoreEpisodesBtn);
    els.episodeList.parentElement.append(episodeLoadMore);

    const player = videojs("podcast-engine", {
      controls: false,
      preload: "metadata",
      audioOnlyMode: false,
      responsive: true,
      controlBar: {
        children: [
          "playToggle",
          "volumePanel",
          "progressControl",
          "remainingTimeDisplay",
          "playbackRateMenuButton",
          "fullscreenToggle"
        ]
      }
    });

    function placeMediaSwitch() {
      const useMobileSlot = mobileViewport.matches;
      mobileMediaSwitchSlot.hidden = !useMobileSlot || !playerConfig.allowModeSwitch;
      if (useMobileSlot) mobileMediaSwitchSlot.append(els.mediaSwitch);
      else if (currentMediaMode === "video") player.controlBar.el().prepend(els.mediaSwitch);
      else els.controlsLeft.append(els.mediaSwitch);
    }

    function getMediaSource(ep, mode = currentMediaMode) {
      if (mode === "video" && ep.video) return ep.video;
      if (mode === "audio" && ep.src) return { src: ep.src, type: ep.type || "audio/mpeg" };
      return ep.video || (ep.src ? { src: ep.src, type: ep.type || "audio/mpeg" } : null);
    }

    function setMediaSource(ep, mode = currentMediaMode) {
      const source = getMediaSource(ep, mode);
      if (!source) return false;
      player.poster(mode === "video" ? source.poster || ep.image || "" : "");
      player.src(source);
      return true;
    }

    function updateMediaSwitch() {
      els.podcastShell.dataset.mediaMode = currentMediaMode;
      const isVideo = currentMediaMode === "video";
      const video = player.el()?.querySelector("video");
      player.controls(isVideo);
      els.mediaModeButtons.forEach(button => {
        const active = button.dataset.mediaMode === currentMediaMode;
        button.hidden = !getMediaSource(episodes[currentIndex], button.dataset.mediaMode);
        button.setAttribute("aria-pressed", String(active));
      });
      placeMediaSwitch();
    }

    function switchMediaMode(mode) {
      if (!playerConfig.allowModeSwitch || mode === currentMediaMode) return;
      const source = getMediaSource(episodes[currentIndex], mode);
      if (!source) return;
      const position = Number(player.currentTime()) || 0;
      const wasPlaying = !player.paused();
      currentMediaMode = mode;
      const ep = episodes[currentIndex];
      const duration = player.duration();
      player.one("loadedmetadata", () => {
        if (Number.isFinite(duration) && position < player.duration()) player.currentTime(position);
        if (wasPlaying) player.play().catch(() => {});
      });
      const applyMode = () => {
        player.pause();
        player.controls(mode === "video");
        player.poster(source.poster || ep.image || "");
        player.src(source);
        player.load();
        els.podcastShell.dataset.mediaMode = currentMediaMode;
        updateMediaSwitch();
      };
      const animate = mobileViewport.matches
        && document.startViewTransition
        && !matchMedia("(prefers-reduced-motion:reduce)").matches;
      if (animate) document.startViewTransition(applyMode);
      else applyMode();
      updateMediaSession(ep);
      scheduleWaveformLoad(ep);
      saveState();
    }

    els.mediaModeButtons.forEach(button => {
      button.addEventListener("click", () => switchMediaMode(button.dataset.mediaMode));
    });
    mobileViewport.addEventListener("change", placeMediaSwitch);

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          currentIndex,
          currentTime: Number(player.currentTime()) || 0,
          volume: player.volume(),
          muted: player.muted(),
          playbackRate: player.playbackRate()
        }));
      } catch {}
    }

    function updateMediaSession(ep) {
      if (!("mediaSession" in navigator)) return;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: ep.title,
        artist: ep.guest,
        album: "Rozmowy bez slajdów",
        artwork: ep.image ? [{ src: ep.image }] : []
      });
    }

    function setupMediaSession() {
      if (!("mediaSession" in navigator)) return;
      const actions = {
        play: () => player.play(),
        pause: () => player.pause(),
        seekbackward: () => seekBy(-playerConfig.skipBackSeconds),
        seekforward: () => seekBy(playerConfig.skipForwardSeconds),
      };
      Object.entries(actions).forEach(([action, handler]) => {
        try { navigator.mediaSession.setActionHandler(action, handler); } catch {}
      });
    }

    updateMediaSwitch();

    function setStatus(state, text) {
      els.status.dataset.state = state;
      els.statusText.textContent = text;
      els.nowPlaying.classList.toggle("is-playing", state === "playing");
    }

    function formatTime(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      return h > 0
        ? `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`
        : `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
    }

    function updateDurationDisplay(duration = player.duration(), currentTime = player.currentTime()) {
      if (!Number.isFinite(duration) || duration <= 0) {
        els.duration.textContent = "00:00";
        return;
      }

      const remaining = Math.max(0, duration - (Number.isFinite(currentTime) ? currentTime : 0));
      els.duration.textContent = timeMode === "remaining"
        ? `-${formatTime(remaining)}`
        : formatTime(duration);
      els.duration.setAttribute(
        "aria-label",
        timeMode === "remaining" ? `Pozostało ${formatTime(remaining)}` : `Długość odcinka ${formatTime(duration)}`
      );
    }

    const waveformCache = new Map();
    let waveformRequestId = 0;

    function renderWaveHeights(heights, animate = false) {
      const markup = heights.map((h, i) =>
        `<span class="bar" style="--h:${h};--i:${i}" aria-hidden="true"></span>`
      ).join("");
      els.wave.dataset.waveAnimate = String(animate);
      els.waveBase.innerHTML = markup;
      els.wavePlayed.innerHTML = markup;
      updateWave(player.duration() ? player.currentTime() / player.duration() : 0);

      if (animate) {
        const lastBar = els.waveBase.lastElementChild;
        lastBar?.addEventListener("animationend", () => {
          delete els.wave.dataset.waveAnimate;
        }, { once: true });
      }
    }

    function setWaveState(state) {
      els.wave.dataset.waveState = state;
    }

    function getWaveBarCount() {
      return Math.max(120, Math.min(260, Math.floor(els.wave.clientWidth / 5.5)));
    }

    function renderWavePlaceholder() {
      // Waveform ładuje się w tle. Zwykły progress bar działa niezależnie.
      els.waveBase.innerHTML = "";
      els.wavePlayed.innerHTML = "";
      setWaveState("loading");
    }

    function normalizePeaks(peaks, count = 112) {
      if (!Array.isArray(peaks) || peaks.length === 0) return null;

      const values = peaks.map(Number).filter(Number.isFinite);
      if (!values.length) return null;

      const sampled = Array.from({ length: count }, (_, i) => {
        const start = Math.floor(i * values.length / count);
        const end = Math.max(start + 1, Math.floor((i + 1) * values.length / count));
        let max = 0;
        for (let j = start; j < Math.min(end, values.length); j++) {
          max = Math.max(max, Math.abs(values[j]));
        }
        return max;
      });

      const sorted = [...sampled].sort((a, b) => a - b);
      const ref = sorted[Math.floor(sorted.length * .98)] || 1;

      return sampled.map(value => {
        const normalized = Math.min(1, value / ref);
        return Math.round(10 + Math.pow(normalized, .72) * 88);
      });
    }

    async function decodeAudioPeaks(ep, count = getWaveBarCount()) {
      const cacheKey = `${ep.src}::${count}`;

      if (waveformCache.has(cacheKey)) {
        return waveformCache.get(cacheKey);
      }

      // Najlepszy wariant produkcyjny:
      // {
      //   src: "/audio/episode.mp3",
      //   peaks: [0.02, 0.18, 0.42, ...]
      // }
      const supplied = normalizePeaks(ep.peaks, count);
      if (supplied) {
        waveformCache.set(cacheKey, supplied);
        return supplied;
      }

      // Wariant automatyczny w przeglądarce.
      // Działa tylko dla same-origin albo źródła z poprawnym CORS.
      const response = await fetch(ep.src, {
        mode: "cors",
        credentials: "omit",
        cache: "force-cache"
      });

      if (!response.ok) {
        throw new Error(`Waveform HTTP ${response.status}`);
      }

      const bytes = await response.arrayBuffer();
      const AudioCtx = window.AudioContext || window.webkitAudioContext;

      if (!AudioCtx) {
        throw new Error("Web Audio API unavailable");
      }

      const ctx = new AudioCtx();

      try {
        const audioBuffer = await ctx.decodeAudioData(bytes.slice(0));
        const channels = audioBuffer.numberOfChannels;
        const total = audioBuffer.length;
        const bucketSize = Math.max(1, Math.floor(total / count));
        const raw = new Array(count).fill(0);

        for (let bucket = 0; bucket < count; bucket++) {
          const start = bucket * bucketSize;
          const end = bucket === count - 1
            ? total
            : Math.min(total, start + bucketSize);

          let sumSquares = 0;
          let maxAbs = 0;
          let samples = 0;

          for (let ch = 0; ch < channels; ch++) {
            const data = audioBuffer.getChannelData(ch);
            const step = Math.max(1, Math.floor((end - start) / 1200));

            for (let i = start; i < end; i += step) {
              const value = Math.abs(data[i]);
              sumSquares += value * value;
              maxAbs = Math.max(maxAbs, value);
              samples++;
            }
          }

          const rms = samples ? Math.sqrt(sumSquares / samples) : 0;
          raw[bucket] = rms * .72 + maxAbs * .28;
        }

        const sorted = [...raw].sort((a, b) => a - b);
        const ref = sorted[Math.floor(sorted.length * .98)] || 1;

        const heights = raw.map(value => {
          const normalized = Math.min(1, value / ref);
          return Math.round(10 + Math.pow(normalized, .72) * 88);
        });

        waveformCache.set(cacheKey, heights);
        return heights;
      } finally {
        ctx.close().catch(() => {});
      }
    }

    async function renderRealWave(ep) {
      const requestId = ++waveformRequestId;

      renderWavePlaceholder();

      try {
        const heights = await decodeAudioPeaks(ep);

        // Użytkownik mógł w międzyczasie przełączyć odcinek.
        if (requestId !== waveformRequestId || episodes[currentIndex].src !== ep.src) {
          return;
        }

        els.waveBase.style.removeProperty("opacity");
        els.wavePlayed.style.removeProperty("opacity");
        setWaveState("ready");
         renderWaveHeights(heights, true);
      } catch (error) {
        // To dotyczy wyłącznie analizy waveformu.
        // Nie wolno z tego powodu blokować odtwarzania Video.js.
        console.info(
          "Waveform niedostępny dla tego źródła. Playback pozostaje aktywny. " +
          "Dodaj precomputed `peaks` albo włącz CORS na serwerze audio.",
          error
        );

        if (requestId !== waveformRequestId) return;
        els.waveBase.innerHTML = "";
        els.wavePlayed.innerHTML = "";
        setWaveState("error");
      }
    }

    function scheduleWaveformLoad(ep) {
      // Startujemy natychmiast. Fetch + decodeAudioData są asynchroniczne,
      // więc interfejs i Video.js mogą działać równolegle.
      if (!playerConfig.showWaveform || playerConfig.minimal) {
        els.waveBase.innerHTML = "";
        els.wavePlayed.innerHTML = "";
        setWaveState("disabled");
        return;
      }
      renderWavePlaceholder();
      renderRealWave(ep);
    }

    function updateWave(progress) {
      const pct = Math.max(0, Math.min(100, progress * 100));

      // Obie warstwy waveformu zawsze mają identyczną szerokość i układ.
      // Przycinamy warstwę "played", zamiast ją zwężać. Dzięki temu każdy
      // słupek pozostaje dokładnie nad swoim odpowiednikiem w tle.
      els.wavePlayed.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      els.simpleProgressFill.style.width = pct + "%";
      els.playhead.style.left = pct + "%";
      els.wave.setAttribute("aria-valuenow", Math.round(pct));
      els.wave.setAttribute("aria-valuetext", `${formatTime(pct * currentDuration)} z ${formatTime(currentDuration)}`);
    }

    let playbackFrameId = null;

    function syncPlaybackFrame() {
      playbackFrameId = null;

      const t = player.currentTime();
      const d = player.duration();

      if (Number.isFinite(t)) {
        els.currentTime.textContent = formatTime(t);
      }

      if (Number.isFinite(d) && d > 0) {
        currentDuration = d;
        updateDurationDisplay(d, t);
        updateWave(t / d);
      }

      if (!player.paused() && !player.ended()) {
        playbackFrameId = requestAnimationFrame(syncPlaybackFrame);
      }
    }

    function startPlaybackAnimation() {
      if (playbackFrameId !== null) return;
      playbackFrameId = requestAnimationFrame(syncPlaybackFrame);
    }

    function stopPlaybackAnimation() {
      if (playbackFrameId !== null) {
        cancelAnimationFrame(playbackFrameId);
        playbackFrameId = null;
      }

      // Ostatni dokładny sync po pause/seek/ended.
      const t = player.currentTime();
      const d = player.duration();
      if (Number.isFinite(t)) els.currentTime.textContent = formatTime(t);
      if (Number.isFinite(d) && d > 0) {
        updateDurationDisplay(d, t);
        updateWave(t / d);
      }
    }

    function renderList(animateFrom = Infinity) {
      const loadMore = playerConfig.showEpisodeList && playerConfig.showEpisodeLoadMore;
      const end = loadMore ? Math.min(visibleEpisodeCount, episodes.length) : episodes.length;
      const visibleEpisodes = episodes.slice(0, end);

      els.listCount.textContent = loadMore && end < episodes.length
        ? `${end} z ${episodes.length} odcinków`
        : `${episodes.length} odcinków`;
      episodeLoadMore.hidden = !loadMore || end >= episodes.length;

      els.episodeList.replaceChildren(...visibleEpisodes.map((ep, offset) => {
        const i = offset;
        const row = document.createElement("li");
        row.className = `episode-row ${i === currentIndex ? "active" : ""}`;
        if (i >= animateFrom) {
          row.classList.add("episode-row-reveal");
          row.style.setProperty("--reveal-index", i - animateFrom);
        }
        row.setAttribute("aria-current", i === currentIndex ? "true" : "false");

        const button = document.createElement("button");
        button.className = "episode-row-button";
        button.type = "button";
        button.setAttribute("aria-label", `Odtwórz odcinek ${ep.no}: ${ep.title}`);
        button.addEventListener("click", () => loadEpisode(i, true));

        const index = document.createElement("span");
        index.className = "episode-index";
        index.textContent = String(ep.no).padStart(2, "0");

        const thumbnail = document.createElement("img");
        thumbnail.className = "episode-thumbnail";
        thumbnail.src = ep.image || "";
        thumbnail.alt = `Miniatura odcinka ${ep.no}: ${ep.title}`;
        thumbnail.loading = "lazy";
        thumbnail.hidden = !playerConfig.showPlaylistThumbnails || !ep.image;

        const copy = document.createElement("div");
        copy.className = "row-copy";
        const title = document.createElement("p");
        title.className = "row-title";
        title.textContent = ep.title;
        const description = document.createElement("p");
        description.className = "row-description";
        description.textContent = ep.description;
        const meta = document.createElement("span");
        meta.className = "row-meta";
        meta.textContent = `${ep.guest} · ${ep.category}`;
        copy.append(title, description, meta);

        const end = document.createElement("div");
        end.className = "row-end";
        const badge = document.createElement("span");
        badge.className = "now-badge";
        badge.textContent = "TERAZ";
        const duration = document.createElement("span");
        duration.textContent = ep.durationLabel;
        end.append(badge, duration);

        button.append(index, thumbnail, copy, end);
        row.append(button);
        return row;
      }));
    }

    loadMoreEpisodesBtn.addEventListener("click", () => {
      const firstNewIndex = visibleEpisodeCount;
      visibleEpisodeCount += episodeBatchSize;
      renderList(firstNewIndex);
      els.episodeList.querySelectorAll("button")[firstNewIndex]?.focus();
    });

    function setRetryState(visible, source = null) {
      retrySource = source;
      els.retryBtn.hidden = !visible;
      els.retryBtn.disabled = !visible;
    }

    function setSpeed(rate) {
      speedIndex = Math.max(0, speeds.indexOf(rate));
      player.playbackRate(rate);
      els.speedBtn.textContent = `${rate}×`;
      els.speedBtn.setAttribute("aria-label", `Prędkość odtwarzania ${rate} razy`);
      saveState();
      closeSpeedMenu();
    }

    function closeSpeedMenu() {
      els.speedMenu.hidden = true;
      els.speedBtn.setAttribute("aria-expanded", "false");
    }

    function restoreEpisodeState() {
      if (savedState.currentIndex !== currentIndex || !Number.isFinite(savedState.currentTime)) return;
      player.one("loadedmetadata", () => {
        if (savedState.currentTime > 0 && savedState.currentTime < player.duration()) {
          player.currentTime(savedState.currentTime);
          updateWave(savedState.currentTime / player.duration());
        }
      });
    }

    function syncMeta(ep) {
      els.coverNo.textContent = ep.no;
      els.cover.style.background = ep.cover;
      els.coverImage.src = ep.image || "";
      els.coverImage.hidden = !ep.image;
      els.coverImage.alt = ep.image ? `Okładka odcinka ${ep.no}: ${ep.title}` : "";
      els.episodeKicker.textContent = `Odcinek ${ep.no}`;
      els.episodeTitle.textContent = ep.title;
      els.videoTitle.textContent = ep.title;
      els.episodeTitle.title = ep.title;
      els.episodeTitle.setAttribute("aria-label", ep.title);
      els.episodeDescription.textContent = ep.description;
      els.episodeDescription.title = ep.description;
      els.episodeDate.textContent = ep.date;
      els.episodeGuest.textContent = ep.guest;
      els.episodeCategory.textContent = ep.category;
      updateMediaSession(ep);
      updateMediaSwitch();
      scheduleWaveformLoad(ep);
      renderList();
    }

    function loadEpisode(index, autoplay = false) {
      if (index < 0 || index >= episodes.length) return;

      if (index === currentIndex && player.currentSrc()) {
        if (autoplay && player.paused()) player.play().catch(() => {});
        return;
      }

      resumeAfterSourceChange = autoplay || !player.paused();
      currentIndex = index;
      saveState();
      const ep = episodes[currentIndex];

      setStatus("loading", "Ładowanie odcinka");
      syncMeta(ep);
      els.currentTime.textContent = "00:00";
      els.duration.textContent = ep.durationLabel;
      currentDuration = 0;
      updateWave(0);

      // Ta sama instancja Video.js. Zmieniamy tylko źródło.
      setMediaSource(ep);
      player.load();
    }

    function togglePlay() {
      if (player.paused()) {
        player.play().catch(error => {
          console.error("Nie udało się rozpocząć odtwarzania:", error);
          setStatus("paused", "Nie udało się rozpocząć odtwarzania");
        });
      } else {
        player.pause();
      }
    }

    function seekBy(seconds) {
      const duration = player.duration();
      const target = Math.max(0, Math.min(Number.isFinite(duration) ? duration : Infinity, player.currentTime() + seconds));
      player.currentTime(target);
      saveState();
    }

    function seekToRatio(ratio) {
      const duration = player.duration();
      if (!Number.isFinite(duration) || duration <= 0) return;
      player.currentTime(Math.max(0, Math.min(duration, ratio * duration)));
      saveState();
    }

    function seekFromPointer(clientX) {
      const rect = els.wave.getBoundingClientRect();
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    }

    function updatePlayIcon(isPlaying) {
      els.playBtn.setAttribute("aria-label", isPlaying ? "Pauza" : "Odtwórz");
      els.playBtn.innerHTML = isPlaying
        ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.2v13.6L19 12 8 5.2Z"/></svg>`;
    }

    function syncVolumeUI() {
      const muted = player.muted() || player.volume() === 0;
      els.muteBtn.setAttribute("aria-label", muted ? "Włącz dźwięk" : "Wycisz");
      els.muteBtn.title = muted ? "Włącz dźwięk" : "Wycisz";
      els.muteBtn.parentElement.dataset.muted = String(muted);
    }

    player.ready(() => {
      player.volume(lastVolume);
      player.muted(Boolean(savedState.muted));
      setSpeed(speeds[speedIndex]);
      els.volumeSlider.value = lastVolume;
      syncVolumeUI();
      syncMeta(episodes[currentIndex]);
      setMediaSource(episodes[currentIndex]);
      restoreEpisodeState();
      setupMediaSession();
    });

    player.on("loadstart", () => setStatus("loading", "Ładowanie odcinka"));
    player.on("waiting", () => {
      setStatus("loading", "Buforowanie");
      stopPlaybackAnimation();
    });
    player.on("playing", () => {
      setStatus("playing", "Odtwarzanie");
      updatePlayIcon(true);
      startPlaybackAnimation();
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
    });
    player.on("pause", () => {
      if (!player.ended()) setStatus("paused", "Wstrzymano");
      updatePlayIcon(false);
      stopPlaybackAnimation();
      saveState();
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    });
    player.on("ended", () => {
      setStatus("paused", "Odcinek zakończony");
      updatePlayIcon(false);
      stopPlaybackAnimation();
      saveState();
      if (currentIndex < episodes.length - 1) loadEpisode(currentIndex + 1, false);
    });
    player.on("error", () => {
      const err = player.error();
      const code = err?.code ? ` · kod ${err.code}` : "";
      console.error("Video.js media error:", err);
      setStatus("paused", `Nie udało się wczytać audio${code}`);
      updatePlayIcon(false);
      setRetryState(true, episodes[currentIndex]);
    });

    player.on("loadedmetadata", () => {
      currentDuration = player.duration();
      setRetryState(false);
      if (Number.isFinite(currentDuration)) {
        updateDurationDisplay(currentDuration, player.currentTime());
        episodes[currentIndex].durationLabel = formatTime(currentDuration);
        renderList();
      }
      if (resumeAfterSourceChange) {
        resumeAfterSourceChange = false;
        player.play().catch(() => {});
      } else {
        setStatus("paused", "Gotowy do odtworzenia");
      }
    });

    player.on("timeupdate", () => {
      // timeupdate ma niską, zależną od przeglądarki częstotliwość.
      // Podczas odtwarzania animacją zajmuje się requestAnimationFrame.
      if (playbackFrameId !== null) return;

      const t = player.currentTime();
      const d = player.duration();
      els.currentTime.textContent = formatTime(t);

      if (Number.isFinite(d) && d > 0) {
        currentDuration = d;
        updateDurationDisplay(d, t);
        updateWave(t / d);
      }
      saveState();
    });

    player.on("seeking", () => {
      const d = player.duration();
      if (Number.isFinite(d) && d > 0) {
        updateDurationDisplay(d, player.currentTime());
        updateWave(player.currentTime() / d);
      }
    });

    player.on("seeked", () => {
      const d = player.duration();
      if (Number.isFinite(d) && d > 0) {
        updateDurationDisplay(d, player.currentTime());
        updateWave(player.currentTime() / d);
      }
      if (!player.paused()) startPlaybackAnimation();
    });
    player.on("volumechange", syncVolumeUI);

    els.playBtn.addEventListener("click", togglePlay);
    els.backBtn.addEventListener("click", () => seekBy(-playerConfig.skipBackSeconds));
    els.forwardBtn.addEventListener("click", () => seekBy(playerConfig.skipForwardSeconds));

    function toggleTimeMode() {
      timeMode = timeMode === "duration" ? "remaining" : "duration";
      updateDurationDisplay();
    }

    els.duration.addEventListener("click", () => {
      if (playerConfig.minimal) toggleTimeMode();
    });
    els.duration.addEventListener("keydown", e => {
      if (!playerConfig.minimal) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTimeMode();
      }
    });

    if (playerConfig.minimal) {
      els.duration.setAttribute("role", "button");
      els.duration.setAttribute("tabindex", "0");
      els.duration.setAttribute("aria-label", "Zmień sposób wyświetlania czasu");
      els.duration.title = "Zmień sposób wyświetlania czasu";
    } else {
      els.duration.removeAttribute("role");
      els.duration.removeAttribute("tabindex");
      els.duration.removeAttribute("title");
    }

    els.speedBtn.addEventListener("click", () => {
      els.speedMenu.hidden = !els.speedMenu.hidden;
      els.speedBtn.setAttribute("aria-expanded", String(!els.speedMenu.hidden));
    });
    els.speedMenu.addEventListener("click", e => {
      const button = e.target.closest("[data-rate]");
      if (button) setSpeed(Number(button.dataset.rate));
    });
    document.addEventListener("click", e => {
      if (!e.target.closest(".speed-control")) closeSpeedMenu();
    });

    els.muteBtn.addEventListener("click", () => {
      player.muted(!player.muted());
      saveState();
    });

    els.volumeSlider.addEventListener("input", e => {
      const value = Number(e.target.value);
      player.volume(value);
      player.muted(value === 0);
      lastVolume = value;
      saveState();
    });

    els.wave.addEventListener("click", e => seekToRatio(seekFromPointer(e.clientX)));

    let isSeekingWithPointer = false;

    function seekWithPointer(clientX) {
      const ratio = seekFromPointer(clientX);
      seekToRatio(ratio);
      const duration = Number.isFinite(player.duration()) ? player.duration() : currentDuration;
      els.waveHoverTime.textContent = formatTime(ratio * duration);
      els.waveHoverTime.style.left = `${ratio * 100}%`;
    }

    els.wave.addEventListener("pointerdown", e => {
      if (e.button !== 0 && e.pointerType !== "touch") return;
      e.preventDefault();
      isSeekingWithPointer = true;
      els.wave.dataset.seeking = "true";
      els.wave.setPointerCapture(e.pointerId);
      seekWithPointer(e.clientX);
    });

    els.wave.addEventListener("pointermove", e => {
      if (isSeekingWithPointer) {
        seekWithPointer(e.clientX);
        return;
      }

      const ratio = seekFromPointer(e.clientX);
      const duration = Number.isFinite(player.duration()) ? player.duration() : currentDuration;
      els.waveHoverTime.textContent = formatTime(ratio * duration);
      els.waveHoverTime.style.left = `${ratio * 100}%`;
    });

    function stopPointerSeek(e) {
      if (!isSeekingWithPointer) return;
      isSeekingWithPointer = false;
      els.wave.dataset.seeking = "false";
      if (e?.pointerId !== undefined && els.wave.hasPointerCapture(e.pointerId)) {
        els.wave.releasePointerCapture(e.pointerId);
      }
      saveState();
    }

    els.wave.addEventListener("pointerup", stopPointerSeek);
    els.wave.addEventListener("pointercancel", stopPointerSeek);

    els.wave.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        seekBy(e.shiftKey ? -30 : -5);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        seekBy(e.shiftKey ? 30 : 5);
      }
      if (e.key === "Home") {
        e.preventDefault();
        player.currentTime(0);
        saveState();
      }
      if (e.key === "End" && Number.isFinite(player.duration())) {
        e.preventDefault();
        player.currentTime(player.duration());
        saveState();
      }
    });

    els.retryBtn.addEventListener("click", () => {
      if (!retrySource) return;
      setRetryState(false);
      player.poster(currentMediaMode === "video" ? retrySource.poster || episodes[currentIndex].image || "" : "");
      player.src(retrySource);
      player.load();
    });

    els.wave.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    });

    window.addEventListener("beforeunload", saveState);


    let waveResizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(waveResizeTimer);
      waveResizeTimer = setTimeout(() => {
        if (!playerConfig.showWaveform || playerConfig.minimal || currentMediaMode === "video") return;
        const ep = episodes[currentIndex];
        const cacheKey = `${ep.src}::${getWaveBarCount()}`;
        if (!waveformCache.has(cacheKey)) {
          renderRealWave(ep);
        } else {
          els.waveBase.style.removeProperty("opacity");
          els.wavePlayed.style.removeProperty("opacity");
          setWaveState("ready");
          renderWaveHeights(waveformCache.get(cacheKey));
        }
      }, 160);
    });

    document.addEventListener("keydown", e => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "BUTTON") return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    });
