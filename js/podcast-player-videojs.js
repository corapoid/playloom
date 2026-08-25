(async () => {
    const queryLanguage = new URLSearchParams(location.search).get("language");
    const playerConfig = {
      language: queryLanguage || "pl",
      feedUrl: "",
      showDescriptions: false,
      showEpisodeList: true,
      showSeasonFilter: false,
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
    const i18n = window.podcastPlayerI18n;
    playerConfig.language = i18n.normalize(playerConfig.language);
    i18n.apply(document, playerConfig.language);
    const t = (key, values) => i18n.translate(key, values);

    const defaultEpisodes = [
      {
        no: 42,
         title: {
           pl: "Dlaczego dobre produkty zaczynają się od ograniczeń",
           en: "Why Great Products Start with Constraints"
         },
         description: {
           pl: "O tym, dlaczego ograniczenia pomagają zespołom podejmować lepsze decyzje i budować produkty, które są prostsze w użyciu i łatwiejsze w rozwijaniu.",
           en: "Why constraints help teams make better decisions and build products that are simpler to use and easier to evolve."
         },
         date: "2026-08-21",
         guest: "Anna Kowalska",
         category: "product",
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
         title: {
           pl: "Interfejs, który nie przeszkadza użytkownikowi",
           en: "An Interface That Stays Out of the User's Way"
         },
         description: {
           pl: "Rozmawiamy o projektowaniu interfejsów, które prowadzą użytkownika bez nadmiaru komunikatów, elementów i decyzji do podjęcia.",
           en: "A conversation about designing interfaces that guide users without overwhelming them with messages, elements, or decisions."
         },
         date: "2026-08-14",
         guest: "Michał Rosiński",
         category: "design",
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
         title: {
           pl: "Co naprawdę znaczy „prosty” produkt",
           en: "What Does a \"Simple\" Product Really Mean"
         },
         description: {
           pl: "Przyglądamy się temu, skąd bierze się prawdziwa prostota produktu i dlaczego usuwanie funkcji bywa trudniejsze niż ich dodawanie.",
           en: "A look at where true product simplicity comes from and why removing features can be harder than adding them."
         },
         date: "2026-08-07",
         guest: "Julia Wrona",
         category: "strategy",
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
         title: {
           pl: "AI w zespole: mniej demo, więcej procesu",
           en: "AI on the Team: Less Demo, More Process"
         },
         description: {
           pl: "Praktycznie o tym, gdzie AI rzeczywiście pomaga zespołowi, jak włączyć je do codziennego procesu i czego nie warto automatyzować.",
           en: "A practical look at where AI truly helps teams, how to bring it into daily workflows, and what not to automate."
         },
         date: "2026-07-31",
         guest: "Paweł Domański",
         category: "ai",
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
         title: {
           pl: "Jak podejmować decyzje, gdy danych jest za dużo",
           en: "How to Make Decisions When There Is Too Much Data"
         },
         description: {
           pl: "O podejmowaniu decyzji w świecie pełnym dashboardów, raportów i metryk oraz o tym, jak rozpoznać dane, które naprawdę mają znaczenie.",
           en: "Making decisions in a world full of dashboards, reports, and metrics, and recognizing which data truly matters."
         },
         date: "2026-07-24",
         guest: "Marta Lis",
         category: "work",
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
         title: {
           pl: "Kiedy roadmapa przestaje pomagać",
           en: "When a Roadmap Stops Helping"
         },
         description: {
           pl: "O planowaniu, które zostawia miejsce na zmianę kierunku, i sygnałach pokazujących, że roadmapa zaczęła ograniczać zespół.",
           en: "Planning that leaves room to change direction, and the signals that a roadmap has started to limit the team."
         },
         date: "2026-07-17",
         guest: "Tomasz Bury",
         category: "product",
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
         title: {
           pl: "Badania bez laboratorium",
           en: "Research Without a Lab"
         },
         description: {
           pl: "Jak prowadzić lekkie badania produktu w codziennej pracy i szybciej wychwytywać błędne założenia.",
           en: "How to run lightweight product research in everyday work and spot false assumptions sooner."
         },
         date: "2026-07-10",
         guest: "Karolina Mazur",
         category: "research",
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
         title: {
           pl: "Dług technologiczny bez dramatów",
           en: "Technical Debt Without the Drama"
         },
         description: {
           pl: "Praktyczne podejście do długu technologicznego: kiedy go spłacać, jak o nim rozmawiać i czego nie mierzyć.",
           en: "A practical approach to technical debt: when to pay it down, how to discuss it, and what not to measure."
         },
         date: "2026-07-03",
         guest: "Łukasz Cichy",
         category: "technology",
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
         title: {
           pl: "Jak mówić nie dobrym pomysłom",
           en: "How to Say No to Good Ideas"
         },
         description: {
           pl: "O priorytetach, kosztach alternatywnych i komunikowaniu decyzji bez rozmywania odpowiedzialności.",
           en: "Priorities, opportunity costs, and communicating decisions without blurring accountability."
         },
         date: "2026-06-26",
         guest: "Natalia Serafin",
         category: "leadership",
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

    const directChild = (node, name, namespace) => [...(node?.children || [])].find(element =>
      element.localName === name && (!namespace || element.namespaceURI?.includes(namespace))
    );
    const childText = (node, name, namespace) => directChild(node, name, namespace)?.textContent.trim() || "";

    function plainText(value) {
      const body = new DOMParser().parseFromString(`<body>${value || ""}</body>`, "text/html").body;
      return body.textContent.replace(/\s+/g, " ").trim();
    }

    function durationLabel(value) {
      const duration = String(value || "").trim();
      if (/^\d{1,3}:\d{2}(?::\d{2})?$/.test(duration)) return duration;
      const seconds = Number(duration);
      if (!Number.isFinite(seconds) || seconds < 0) return "—:—";
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainder = Math.floor(seconds % 60);
      return hours
        ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`
        : `${minutes}:${String(remainder).padStart(2, "0")}`;
    }

    function feedError(code) {
      return Object.assign(new Error(code), { code });
    }

    function inlinePeaks(item) {
      const element = [...item.children].find(child => ["waveform", "peaks"].includes(child.localName));
      if (!element) return null;
      const value = element.getAttribute("peaks") || element.textContent;
      let peaks;
      try { peaks = JSON.parse(value); }
      catch { peaks = value.split(/[\s,]+/); }
      const normalized = Array.isArray(peaks) ? peaks.map(Number).filter(Number.isFinite) : [];
      return normalized.length > 1 ? normalized : null;
    }

    async function loadPodcastFeed(feedUrl) {
      let url;
      try { url = new URL(feedUrl); }
      catch { throw feedError("invalidUrl"); }
      if (!["http:", "https:"].includes(url.protocol)) throw feedError("invalidUrl");

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      let response;
      try {
        response = await fetch(url, { signal: controller.signal });
      } catch (error) {
        throw feedError(error.name === "AbortError" ? "timeout" : "network");
      } finally {
        clearTimeout(timeout);
      }
      if (!response.ok) throw feedError("http");

      const declaredSize = Number(response.headers.get("content-length"));
      if (Number.isFinite(declaredSize) && declaredSize > 5_000_000) throw feedError("tooLarge");
      const xml = await response.text();
      if (xml.length > 5_000_000) throw feedError("tooLarge");

      const document = new DOMParser().parseFromString(xml, "application/xml");
      if (document.querySelector("parsererror")) throw feedError("invalidXml");
      const channel = document.querySelector("rss > channel, channel");
      if (!channel) throw feedError("invalidXml");

      const channelImage = directChild(channel, "image", "itunes")?.getAttribute("href")
        || childText(directChild(channel, "image"), "url");
      const channelCategory = directChild(channel, "category", "itunes")?.getAttribute("text")
        || childText(channel, "category");
      const channelAuthor = childText(channel, "author", "itunes") || childText(channel, "author");
      const items = [...channel.children].filter(element => element.localName === "item");
      const parsedEpisodes = items.map((item, index) => {
        const enclosure = directChild(item, "enclosure");
        const src = enclosure?.getAttribute("url")?.trim();
        const type = enclosure?.getAttribute("type")?.trim() || "audio/mpeg";
        if (!src || (!type.startsWith("audio/") && enclosure?.getAttribute("type"))) return null;

        const published = new Date(childText(item, "pubDate"));
        const episodeNumber = Number(childText(item, "episode", "itunes"));
        const itemCategory = directChild(item, "category")?.getAttribute("text")
          || childText(item, "category")
          || channelCategory;
        const image = directChild(item, "image", "itunes")?.getAttribute("href")
          || directChild(item, "thumbnail", "search.yahoo.com")?.getAttribute("url")
          || channelImage;

        return {
          id: childText(item, "guid") || src,
          no: Number.isInteger(episodeNumber) && episodeNumber > 0 ? episodeNumber : null,
          listNo: index + 1,
          title: childText(item, "title", "itunes") || childText(item, "title"),
          description: plainText(childText(item, "summary", "itunes") || childText(item, "description")),
          date: Number.isNaN(published.getTime()) ? "" : published.toISOString().slice(0, 10),
          guest: childText(item, "author", "itunes") || childText(item, "author") || channelAuthor,
          category: itemCategory,
          season: childText(item, "season", "itunes"),
          durationLabel: durationLabel(childText(item, "duration", "itunes")),
          src,
          type,
          peaks: inlinePeaks(item),
          image,
          cover: "linear-gradient(145deg,#111 0%,#353531 55%,#8d8d84 100%)"
        };
      }).filter(episode => episode?.title);

      if (!parsedEpisodes.length) throw feedError("empty");
      return {
        podcast: {
          title: childText(channel, "title") || new URL(feedUrl).hostname,
          author: channelAuthor,
          category: channelCategory,
          image: channelImage,
          language: childText(channel, "language")
        },
        episodes: parsedEpisodes
      };
    }

    let episodes = defaultEpisodes;
    let podcast = {
      title: t("player.showTitle"),
      author: "",
      category: "",
      image: ""
    };

    function getEpisodeContent(ep) {
      const categoryKey = `categories.${ep.category}`;
      const translatedCategory = t(categoryKey);
      return {
        title: i18n.localize(ep.title),
        description: i18n.localize(ep.description),
        date: ep.date ? i18n.formatDate(ep.date) : "",
        guest: ep.guest,
        category: translatedCategory === categoryKey ? ep.category : translatedCategory
      };
    }

    const els = {
      pageTitle: document.querySelector("title"),
      showTitle: document.querySelector("h1"),
      eyebrow: document.querySelector(".eyebrow"),
      coverBrand: document.querySelector(".cover-brand"),
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
      episodeMeta: document.querySelector(".episode-meta"),
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
      controls: document.querySelector(".controls"),
      timeline: document.querySelector(".timeline-row"),
      episodeList: document.getElementById("episodeList"),
      listCount: document.getElementById("listCount")
    };

    const feedUrl = String(playerConfig.feedUrl || "").trim();
    if (feedUrl) {
      els.status.dataset.state = "loading";
      els.statusText.dataset.i18n = "player.feedLoading";
      els.statusText.textContent = t("player.feedLoading");
      try {
        const feed = await loadPodcastFeed(feedUrl);
        podcast = feed.podcast;
        episodes = feed.episodes;
        els.podcastShell.dataset.contentSource = "rss";
        els.pageTitle.removeAttribute("data-i18n");
        els.showTitle.removeAttribute("data-i18n");
        els.coverBrand.removeAttribute("data-i18n");
        els.eyebrow.removeAttribute("data-i18n");
        els.pageTitle.textContent = podcast.title;
        els.showTitle.textContent = podcast.title;
        els.coverBrand.textContent = podcast.title;
        els.eyebrow.textContent = podcast.author || podcast.category || t("player.feedEyebrow");
        els.statusText.dataset.i18n = "player.ready";
      } catch (error) {
        const errorKey = `player.feedErrors.${error.code || "network"}`;
        els.status.dataset.state = "paused";
        els.statusText.dataset.i18n = "player.feedLoadFailed";
        els.statusText.textContent = t("player.feedLoadFailed");
        els.episodeTitle.textContent = t("player.feedErrorTitle");
        els.episodeDescription.textContent = t(errorKey);
        els.episodeMeta.hidden = true;
        els.controls.hidden = true;
        els.timeline.hidden = true;
        els.mediaSwitch.hidden = true;
        els.podcastShell.dataset.showEpisodeList = "false";
        els.retryBtn.dataset.i18n = "player.feedRetry";
        els.retryBtn.textContent = t("player.feedRetry");
        els.retryBtn.hidden = false;
        els.retryBtn.addEventListener("click", () => location.reload());
        console.error(t(errorKey), error);
        return;
      }
    }

    const supportsVideo = episodes.some(episode => episode.video);
    const seasons = [...new Set(episodes.map(episode => episode.season).filter(Boolean))]
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
    const showSeasonFilter = Boolean(playerConfig.showSeasonFilter && seasons.length > 1);
    const supportsFeedWaveform = !feedUrl || episodes.every(episode => Array.isArray(episode.peaks) && episode.peaks.length > 1);
    if (!supportsFeedWaveform) {
      playerConfig.showWaveform = false;
      playerConfig.alwaysShowWaveform = false;
    }
    const mediaMode = playerConfig.mode === "video" && supportsVideo ? "video" : "audio";
    const allowModeSwitch = Boolean(playerConfig.allowModeSwitch && supportsVideo);
    const STORAGE_KEY = feedUrl
      ? `podcast-player-state-v1:${encodeURIComponent(feedUrl)}`
      : "podcast-player-state-v1";
    const savedState = (() => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
      catch { return {}; }
    })();

    els.backBtn.setAttribute("aria-label", t("player.skipBack", { seconds: playerConfig.skipBackSeconds }));
    els.backBtn.title = t("player.skipBack", { seconds: playerConfig.skipBackSeconds });
    els.forwardBtn.setAttribute("aria-label", t("player.skipForward", { seconds: playerConfig.skipForwardSeconds }));
    els.forwardBtn.title = t("player.skipForward", { seconds: playerConfig.skipForwardSeconds });
    els.wave.style.setProperty("--waveform-error-message", JSON.stringify(t("player.waveformUnavailable")));

    els.podcastShell.dataset.showDescriptions = String(playerConfig.showDescriptions);
    els.podcastShell.dataset.showEpisodeList = String(playerConfig.showEpisodeList);
    els.podcastShell.dataset.showSeasonFilter = String(showSeasonFilter);
    els.podcastShell.dataset.showEpisodeLoadMore = String(playerConfig.showEpisodeLoadMore);
    els.podcastShell.dataset.showPlaylistThumbnails = String(playerConfig.showPlaylistThumbnails);
    els.podcastShell.dataset.compactPlaylist = String(playerConfig.compactPlaylist);
    els.podcastShell.dataset.showWaveform = String(playerConfig.showWaveform && !playerConfig.minimal);
    els.podcastShell.dataset.alwaysShowWaveform = String(playerConfig.alwaysShowWaveform && !playerConfig.minimal);
    els.podcastShell.dataset.minimal = String(playerConfig.minimal);
    els.podcastShell.dataset.allowModeSwitch = String(allowModeSwitch);
    els.podcastShell.dataset.layout = playerConfig.layout === "hero" ? "hero" : "default";
    els.podcastShell.dataset.mediaMode = mediaMode;
    els.mediaSwitch.hidden = !allowModeSwitch;
    els.podcastShell.dataset.skin = ["default", "onet", "wp", "spotify", "youtube", "telegraph"].includes(playerConfig.skin)
      ? playerConfig.skin
      : "default";
    Object.entries(playerConfig.customProperties).forEach(([property, value]) => {
      if (/^--[a-z0-9-]+$/i.test(property) && typeof value === "string") {
        els.podcastShell.style.setProperty(property, value);
      }
    });

    const savedEpisodeIndex = savedState.episodeId
      ? episodes.findIndex(episode => episode.id === savedState.episodeId)
      : savedState.currentIndex;
    let currentIndex = Number.isInteger(savedEpisodeIndex) && savedEpisodeIndex >= 0 && savedEpisodeIndex < episodes.length
      ? savedEpisodeIndex
      : 0;
    let resumeAfterSourceChange = false;
    let currentDuration = 0;
    let timeMode = "duration";
    const speeds = playerConfig.playbackSpeeds;
    let speedIndex = Math.max(0, speeds.indexOf(Number(savedState.playbackRate || 1)));
    els.speedBtn.setAttribute("aria-label", t("player.playbackSpeedValue", { rate: speeds[speedIndex] }));
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
    loadMoreEpisodesBtn.textContent = t("player.loadMore");
    loadMoreEpisodesBtn.setAttribute("aria-controls", "episodeList");
    episodeLoadMore.append(loadMoreEpisodesBtn);
    els.episodeList.parentElement.append(episodeLoadMore);

    let selectedSeason = "all";
    const seasonSelect = document.createElement("select");
    seasonSelect.className = "season-select";
    seasonSelect.setAttribute("aria-label", t("player.seasonFilter"));
    seasonSelect.append(new Option(t("player.allSeasons"), "all"));
    seasons.forEach(season => seasonSelect.append(new Option(t("player.season", { season }), season)));
    if (showSeasonFilter) els.listCount.before(seasonSelect);

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
      mobileMediaSwitchSlot.hidden = !useMobileSlot || !allowModeSwitch;
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
      if (!allowModeSwitch || mode === currentMediaMode) return;
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
          episodeId: episodes[currentIndex].id,
          currentTime: Number(player.currentTime()) || 0,
          volume: player.volume(),
          muted: player.muted(),
          playbackRate: player.playbackRate()
        }));
      } catch {}
    }

    function updateMediaSession(ep) {
      if (!("mediaSession" in navigator)) return;
      const content = getEpisodeContent(ep);
      navigator.mediaSession.metadata = new MediaMetadata({
        title: content.title,
        artist: content.guest,
        album: podcast.title,
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
        timeMode === "remaining"
          ? t("player.timeRemaining", { time: formatTime(remaining) })
          : t("player.episodeDuration", { time: formatTime(duration) })
      );
    }

    const waveformCache = new Map();
    let waveformRequestId = 0;

    function renderWaveHeights(heights, animate = false) {
      const markup = heights.map((h, i) =>
        `<span class="bar" style="--h:${h};--i:${i}" aria-hidden="true"></span>`
      ).join("");
      els.wave.dataset.waveAnimate = String(animate);
      els.wave.style.setProperty("--waveform-error-message", JSON.stringify(t("player.waveformUnavailable")));
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
        console.info(t("player.waveformLog"), error);

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
      els.wave.setAttribute("aria-valuetext", t("player.timeProgress", {
        current: formatTime(pct * currentDuration),
        duration: formatTime(currentDuration)
      }));
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
      const filteredEpisodes = episodes
        .map((episode, index) => ({ episode, index }))
        .filter(({ episode }) => selectedSeason === "all" || episode.season === selectedSeason);
      if (showSeasonFilter) {
        filteredEpisodes.sort((a, b) => selectedSeason === "all"
          ? b.episode.date.localeCompare(a.episode.date) || b.episode.listNo - a.episode.listNo
          : (a.episode.no ?? Infinity) - (b.episode.no ?? Infinity)
            || a.episode.date.localeCompare(b.episode.date)
            || a.episode.listNo - b.episode.listNo);
      }
      const end = loadMore ? Math.min(visibleEpisodeCount, filteredEpisodes.length) : filteredEpisodes.length;
      const visibleEpisodes = filteredEpisodes.slice(0, end);

      els.listCount.textContent = loadMore && end < filteredEpisodes.length
        ? t("player.visibleEpisodeCount", { visible: end, total: filteredEpisodes.length })
        : t("player.episodeCount", { count: filteredEpisodes.length });
      episodeLoadMore.hidden = !loadMore || end >= filteredEpisodes.length;

      els.episodeList.replaceChildren(...visibleEpisodes.map(({ episode: ep, index: i }, offset) => {
        const displayNumber = ep.no ?? ep.listNo ?? i + 1;
        const content = getEpisodeContent(ep);
        const row = document.createElement("li");
        row.className = `episode-row ${i === currentIndex ? "active" : ""}`;
        if (offset >= animateFrom) {
          row.classList.add("episode-row-reveal");
          row.style.setProperty("--reveal-index", offset - animateFrom);
        }
        row.setAttribute("aria-current", i === currentIndex ? "true" : "false");

        const button = document.createElement("button");
        button.className = "episode-row-button";
        button.type = "button";
        button.setAttribute("aria-label", t("player.playEpisode", { number: displayNumber, title: content.title }));
        button.addEventListener("click", () => loadEpisode(i, true));

        const index = document.createElement("span");
        index.className = "episode-index";
        index.textContent = String(displayNumber).padStart(2, "0");

        const thumbnail = document.createElement("img");
        thumbnail.className = "episode-thumbnail";
        thumbnail.src = ep.image || "";
        thumbnail.alt = t("player.episodeThumbnail", { number: displayNumber, title: content.title });
        thumbnail.loading = "lazy";
        thumbnail.hidden = !playerConfig.showPlaylistThumbnails || !ep.image;

        const copy = document.createElement("div");
        copy.className = "row-copy";
        const title = document.createElement("p");
        title.className = "row-title";
        title.textContent = content.title;
        const description = document.createElement("p");
        description.className = "row-description";
        description.textContent = content.description;
        const meta = document.createElement("span");
        meta.className = "row-meta";
        meta.textContent = [content.guest, content.category].filter(Boolean).join(" · ");
        copy.append(title, description, meta);

        const end = document.createElement("div");
        end.className = "row-end";
        const badge = document.createElement("span");
        badge.className = "now-badge";
        badge.textContent = t("player.now");
        const duration = document.createElement("span");
        duration.textContent = ep.durationLabel;
        end.append(badge, duration);

        button.append(index, thumbnail, copy, end);
        row.append(button);
        return row;
      }));
    }

    seasonSelect.addEventListener("change", () => {
      selectedSeason = seasonSelect.value;
      visibleEpisodeCount = playerConfig.showEpisodeLoadMore ? episodeBatchSize : episodes.length;
      renderList();
      els.episodeList.querySelector("button")?.focus();
    });

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
      els.speedBtn.setAttribute("aria-label", t("player.playbackSpeedValue", { rate }));
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
      const content = getEpisodeContent(ep);
      els.coverNo.textContent = ep.no || "";
      els.coverNo.hidden = !ep.no;
      els.cover.style.background = ep.cover;
      els.coverImage.src = ep.image || "";
      els.coverImage.hidden = !ep.image;
      els.coverImage.alt = ep.image ? content.title : "";
      els.episodeKicker.textContent = ep.no ? t("player.episode", { number: ep.no }) : "";
      els.episodeKicker.hidden = !ep.no;
      els.episodeTitle.textContent = content.title;
      els.videoTitle.textContent = content.title;
      els.episodeTitle.title = content.title;
      els.episodeTitle.setAttribute("aria-label", content.title);
      els.episodeDescription.textContent = content.description;
      els.episodeDescription.title = content.description;
      els.episodeDate.textContent = content.date;
      els.episodeDate.hidden = !content.date;
      els.episodeGuest.textContent = content.guest;
      els.episodeGuest.hidden = !content.guest;
      els.episodeCategory.textContent = content.category;
      els.episodeCategory.hidden = !content.category;
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

      setStatus("loading", t("player.loading"));
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
          console.error(t("player.playError"), error);
          setStatus("paused", t("player.playError"));
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
      els.playBtn.setAttribute("aria-label", t(isPlaying ? "player.pause" : "player.play"));
      els.playBtn.innerHTML = isPlaying
        ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.2v13.6L19 12 8 5.2Z"/></svg>`;
    }

    function syncVolumeUI() {
      const muted = player.muted() || player.volume() === 0;
      const volume = player.volume();
      const label = t(muted ? "player.unmute" : "player.mute");
      els.muteBtn.setAttribute("aria-label", label);
      els.muteBtn.title = label;
      els.muteBtn.parentElement.dataset.muted = String(muted);
      els.volumeSlider.value = volume;
      els.volumeSlider.style.setProperty("--volume-level", `${volume * 100}%`);
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

    player.on("loadstart", () => setStatus("loading", t("player.loading")));
    player.on("waiting", () => {
      setStatus("loading", t("player.buffering"));
      stopPlaybackAnimation();
    });
    player.on("playing", () => {
      setStatus("playing", t("player.playing"));
      updatePlayIcon(true);
      startPlaybackAnimation();
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
    });
    player.on("pause", () => {
      if (!player.ended()) setStatus("paused", t("player.paused"));
      updatePlayIcon(false);
      stopPlaybackAnimation();
      saveState();
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    });
    player.on("ended", () => {
      setStatus("paused", t("player.ended"));
      updatePlayIcon(false);
      stopPlaybackAnimation();
      saveState();
      if (currentIndex < episodes.length - 1) loadEpisode(currentIndex + 1, false);
    });
    player.on("error", () => {
      const err = player.error();
      const code = err?.code ? ` · kod ${err.code}` : "";
      console.error("Video.js media error:", err);
      setStatus("paused", t("player.audioError", { code }));
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
        setStatus("paused", t("player.ready"));
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
      els.duration.setAttribute("aria-label", t("player.changeTimeDisplay"));
      els.duration.title = t("player.changeTimeDisplay");
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
})();
