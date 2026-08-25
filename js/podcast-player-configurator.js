(() => {
  const defaults = {
    layout: "default",
    skin: "default",
    theme: "system",
    language: "pl",
    minimal: false,
    showDescriptions: false,
    showEpisodeList: true,
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
  let toastTimer;

  function readParams() {
    const params = new URLSearchParams(location.search);
    const values = { ...defaults };
    if (["default", "hero"].includes(params.get("layout"))) values.layout = params.get("layout");
    if (["default", "onet", "wp", "spotify", "youtube", "telegraph"].includes(params.get("skin"))) values.skin = params.get("skin");
    if (["system", "light", "dark"].includes(params.get("theme"))) values.theme = params.get("theme");
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
    Object.entries(values).forEach(([key, value]) => params.set(key, String(value)));
    return params;
  }

  function syncDependencies(values) {
    document.querySelectorAll(".dependent-list input").forEach(input => {
      input.disabled = !values.showEpisodeList;
    });
    document.querySelectorAll(".dependent-waveform input").forEach(input => {
      input.disabled = !values.showWaveform || values.minimal;
    });
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

  form.addEventListener("change", render);
  document.getElementById("resetBtn").addEventListener("click", () => {
    writeForm(defaults);
    render();
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

  writeForm(readParams());
  render();
})();
