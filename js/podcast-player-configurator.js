(() => {
  const defaults = {
    layout: "default",
    skin: "default",
    theme: "system",
    language: "pl",
    feedUrl: "",
    mode: "audio",
    allowModeSwitch: true,
    minimal: false,
    showDescriptions: false,
    showEpisodeList: true,
    showSeasonFilter: false,
    showEpisodeLoadMore: true,
    showPlaylistThumbnails: true,
    compactPlaylist: true,
    showWaveform: true,
    alwaysShowWaveform: true
  };
  const booleanKeys = Object.keys(defaults).filter(key => typeof defaults[key] === "boolean");
  const form = document.getElementById("settingsForm");
  const frame = document.getElementById("previewFrame");
  const mobileFrame = document.getElementById("mobilePreviewFrame");
  const output = document.getElementById("configOutput");
  const shareUrl = document.getElementById("shareUrl");
  const toast = document.getElementById("toast");
  const waveformInput = form.elements.namedItem("showWaveform");
  const alwaysShowWaveformInput = form.elements.namedItem("alwaysShowWaveform");
  const waveformHint = document.getElementById("waveformHint");
  const seasonFilterInput = form.elements.namedItem("showSeasonFilter");
  const seasonFilterHint = document.getElementById("seasonFilterHint");
  let feedWaveformAvailable = true;
  let feedHasMultipleSeasons = false;
  let feedCheckId = 0;
  let waveformPreference = defaults.showWaveform;
  let alwaysShowWaveformPreference = defaults.alwaysShowWaveform;
  let seasonFilterPreference = defaults.showSeasonFilter;
  let toastTimer;

  function readParams() {
    const params = new URLSearchParams(location.search);
    const values = { ...defaults };
    if (["default", "hero"].includes(params.get("layout"))) values.layout = params.get("layout");
    if (["default", "onet", "wp", "spotify", "youtube", "telegraph"].includes(params.get("skin"))) values.skin = params.get("skin");
    if (["system", "light", "dark"].includes(params.get("theme"))) values.theme = params.get("theme");
    if (["audio", "video"].includes(params.get("mode"))) values.mode = params.get("mode");
    values.feedUrl = params.get("feedUrl")?.trim() || "";
    values.language = window.podcastPlayerI18n.normalize(params.get("language"));
    booleanKeys.forEach(key => {
      if (params.has(key)) values[key] = params.get(key) === "true";
    });
    return values;
  }

  function writeForm(values) {
    Object.entries(values).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field.type === "checkbox") field.checked = value;
      else field.value = value;
    });
  }

  function readForm() {
    return Object.fromEntries(Object.keys(defaults).map(key => {
      const field = form.elements.namedItem(key);
      return [key, field.type === "checkbox" ? field.checked : field.value];
    }));
  }

  function toParams(values) {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "feedUrl" || value.trim()) params.set(key, String(value));
    });
    return params;
  }

  function syncDependencies(values) {
    const feedLocksWaveform = Boolean(values.feedUrl) && !feedWaveformAvailable;
    document.querySelectorAll(".dependent-list input").forEach(input => {
      input.disabled = !values.showEpisodeList;
    });
    seasonFilterInput.disabled = !values.showEpisodeList || !feedHasMultipleSeasons;
    waveformInput.disabled = feedLocksWaveform;
    document.querySelectorAll(".dependent-waveform input").forEach(input => {
      input.disabled = feedLocksWaveform || !values.showWaveform || values.minimal;
    });
  }

  function setWaveformHint(key) {
    waveformHint.dataset.i18n = key;
    waveformHint.textContent = window.podcastPlayerI18n.translate(key);
  }

  function setSeasonFilterHint(key) {
    seasonFilterHint.dataset.i18n = key;
    seasonFilterHint.textContent = window.podcastPlayerI18n.translate(key);
  }

  function hasInlinePeaks(item) {
    const element = [...item.children].find(child => ["waveform", "peaks"].includes(child.localName));
    if (!element) return false;
    const value = element.getAttribute("peaks") || element.textContent;
    let peaks;
    try { peaks = JSON.parse(value); }
    catch { peaks = value.split(/[\s,]+/); }
    return Array.isArray(peaks) && peaks.map(Number).filter(Number.isFinite).length > 1;
  }

  async function inspectFeedCapabilities(feedUrl) {
    const unavailable = { waveform: false, multipleSeasons: false };
    const response = await fetch(feedUrl);
    if (!response.ok) return unavailable;
    const document = new DOMParser().parseFromString(await response.text(), "application/xml");
    if (document.querySelector("parsererror")) return unavailable;
    const items = [...document.querySelectorAll("channel > item")].filter(item => {
      const enclosure = [...item.children].find(child => child.localName === "enclosure");
      const type = enclosure?.getAttribute("type") || "audio/mpeg";
      return enclosure?.getAttribute("url") && type.startsWith("audio/");
    });
    const seasons = new Set(items.map(item =>
      [...item.children].find(child => child.localName === "season")?.textContent.trim()
    ).filter(Boolean));
    return {
      waveform: items.length > 0 && items.every(hasInlinePeaks),
      multipleSeasons: seasons.size > 1
    };
  }

  async function syncFeedCapabilities(feedUrl) {
    const requestId = ++feedCheckId;
    const url = feedUrl.trim();
    if (!url) {
      feedWaveformAvailable = true;
      feedHasMultipleSeasons = false;
      waveformInput.checked = waveformPreference;
      alwaysShowWaveformInput.checked = alwaysShowWaveformPreference;
      seasonFilterInput.checked = false;
      setWaveformHint("config.waveformHint");
      setSeasonFilterHint("config.seasonFilterHint");
      render();
      return;
    }

    feedWaveformAvailable = false;
    feedHasMultipleSeasons = false;
    waveformInput.checked = false;
    alwaysShowWaveformInput.checked = false;
    seasonFilterInput.checked = false;
    setWaveformHint("config.feedWaveformChecking");
    setSeasonFilterHint("config.feedSeasonsChecking");
    render();

    let capabilities = { waveform: false, multipleSeasons: false };
    try { capabilities = await inspectFeedCapabilities(url); }
    catch {}
    if (requestId !== feedCheckId) return;

    feedWaveformAvailable = capabilities.waveform;
    feedHasMultipleSeasons = capabilities.multipleSeasons;
    if (capabilities.waveform) {
      waveformInput.checked = waveformPreference;
      alwaysShowWaveformInput.checked = alwaysShowWaveformPreference;
      setWaveformHint("config.waveformHint");
    } else {
      setWaveformHint("config.feedWaveformUnavailable");
    }
    seasonFilterInput.checked = capabilities.multipleSeasons && seasonFilterPreference;
    setSeasonFilterHint(capabilities.multipleSeasons
      ? "config.seasonFilterHint"
      : "config.feedSeasonsUnavailable");
    render();
  }

  function render() {
    const values = readForm();
    values.language = window.podcastPlayerI18n.normalize(values.language);
    window.podcastPlayerI18n.apply(document, values.language);
    const params = toParams(values);
    const config = Object.fromEntries(Object.entries(values).filter(([key]) => key !== "theme"));
    const query = params.toString();
    const url = `${location.pathname}?${query}`;

    history.replaceState(null, "", url);
    frame.src = `podcast-player-preview.html?${query}`;
    mobileFrame.src = `podcast-player-preview.html?${query}&device=ios`;
    output.textContent = `window.podcastPlayerConfig = ${JSON.stringify(config, null, 2)};`;
    shareUrl.value = location.href;
    syncDependencies(values);
  }

  async function copy(text, message) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const input = document.createElement("textarea");
      input.value = text;
      document.body.append(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("visible");
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 1800);
  }

  form.addEventListener("change", event => {
    if (event.target === waveformInput) waveformPreference = waveformInput.checked;
    if (event.target === alwaysShowWaveformInput) alwaysShowWaveformPreference = alwaysShowWaveformInput.checked;
    if (event.target === seasonFilterInput) seasonFilterPreference = seasonFilterInput.checked;
    if (event.target.name === "feedUrl") syncFeedCapabilities(event.target.value);
    else render();
  });
  document.getElementById("resetBtn").addEventListener("click", () => {
    writeForm(defaults);
    waveformPreference = defaults.showWaveform;
    alwaysShowWaveformPreference = defaults.alwaysShowWaveform;
    seasonFilterPreference = defaults.showSeasonFilter;
    syncFeedCapabilities("");
  });
  document.getElementById("copyConfigBtn").addEventListener("click", () => {
    copy(output.textContent, window.podcastPlayerI18n.translate("config.configCopied")).catch(() => {});
  });
  document.getElementById("copyUrlBtn").addEventListener("click", () => {
    copy(shareUrl.value, window.podcastPlayerI18n.translate("config.urlCopied")).catch(() => {});
  });
  addEventListener("message", event => {
    const target = [frame, mobileFrame].find(item => event.source === item.contentWindow);
    if (!target || event.data?.type !== "podcast-preview-height") return;
    const height = Number(event.data.height);
    if (!Number.isFinite(height)) return;
    if (target === mobileFrame) return;
    target.style.height = `${Math.min(3000, Math.max(560, height))}px`;
  });

  const initialValues = readParams();
  writeForm(initialValues);
  waveformPreference = initialValues.showWaveform;
  alwaysShowWaveformPreference = initialValues.alwaysShowWaveform;
  seasonFilterPreference = initialValues.showSeasonFilter;
  syncFeedCapabilities(initialValues.feedUrl);
})();
