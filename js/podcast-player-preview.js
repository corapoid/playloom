(() => {
  const params = new URLSearchParams(location.search);
  const language = window.podcastPlayerI18n.normalize(params.get("language"));
  const config = { language };
  const booleans = [
    "minimal",
    "showWaveform",
    "alwaysShowWaveform",
    "showDescriptions",
    "showEpisodeList",
    "showEpisodeLoadMore",
    "showPlaylistThumbnails",
    "compactPlaylist"
  ];

  if (["default", "hero"].includes(params.get("layout"))) config.layout = params.get("layout");
  if (["default", "onet", "wp", "spotify", "youtube", "telegraph"].includes(params.get("skin"))) config.skin = params.get("skin");
  booleans.forEach(key => {
    if (params.has(key)) config[key] = params.get(key) === "true";
  });

  const theme = params.get("theme");
  if (["light", "dark"].includes(theme)) document.documentElement.dataset.previewTheme = theme;
  if (params.get("device") === "ios") document.documentElement.dataset.previewDevice = "ios";
  window.podcastPlayerConfig = config;

  addEventListener("DOMContentLoaded", () => {
    window.podcastPlayerI18n.apply(document, language);
    const page = document.querySelector(".page");
    const reportHeight = () => parent.postMessage({
      type: "podcast-preview-height",
      height: Math.ceil(page.getBoundingClientRect().bottom)
    }, "*");

    new ResizeObserver(reportHeight).observe(page);
    reportHeight();
  });
})();
