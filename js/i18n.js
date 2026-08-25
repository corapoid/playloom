(() => {
  const formatEpisodeCount = (language, count) => {
    if (language === "en") return `${count} ${count === 1 ? "episode" : "episodes"}`;
    if (count === 1) return "1 odcinek";
    const lastTwo = count % 100;
    const last = count % 10;
    return last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)
      ? `${count} odcinki`
      : `${count} odcinków`;
  };

  const dictionaries = {
    pl: {
      languages: { pl: "Polski", en: "English" },
      config: {
        pageTitle: "Konfigurator Podcast Playera",
        previewTitle: "Podgląd Podcast Playera",
        desktop: "Desktop",
        mobile: "iPhone · 390 × 844",
        desktopPreview: "Desktopowy podgląd skonfigurowanego podcast playera",
        mobilePreview: "Mobilny podgląd skonfigurowanego podcast playera",
        heading: "Konfigurator wyglądu",
        intro: "Ustaw wygląd, skopiuj config albo udostępnij bieżący URL.",
        appearanceOptions: "Opcje wyglądu",
        configurator: "Konfigurator",
        changes: "Zmiany są od razu zapisywane w URL i widoczne w podglądzie.",
        reset: "Resetuj ustawienia",
        layout: "Układ",
        variant: "Wariant",
        defaultLayout: "Domyślny",
        heroLayout: "Hero 16:9",
        skin: "Skórka",
        defaultSkin: "Domyślna",
        previewTheme: "Motyw podglądu",
        systemTheme: "Systemowy",
        lightTheme: "Jasny",
        darkTheme: "Ciemny",
        themeHint: "Motyw nie trafia do configu playera.",
        language: "Język",
        playbackMode: "Tryb odtwarzania",
        audioMode: "Audio",
        videoMode: "Video",
        modeSwitch: "Przełącznik Audio/Video",
        modeSwitchHint: "Pozwala zmienić tryb bezpośrednio w playerze.",
        minimal: "Tryb minimalny",
        minimalHint: "Kompaktowy player bez dodatkowych elementów.",
        content: "Zawartość",
        feedUrl: "URL feedu podcastu",
        feedUrlPlaceholder: "https://example.com/feed.xml",
        feedUrlHint: "Pozostaw puste, aby użyć danych demonstracyjnych. Feed musi zezwalać na CORS.",
        episodeDescription: "Opis odcinka",
        episodeDescriptionHint: "Pokazuje opis pod metadanymi.",
        episodeList: "Lista odcinków",
        episodeListHint: "Wyświetla playlistę pod playerem.",
        seasonFilter: "Filtr sezonów",
        seasonFilterHint: "Pokazuje wybór sezonu, gdy feed zawiera ich więcej niż jeden.",
        feedSeasonsChecking: "Sprawdzanie sezonów w feedzie…",
        feedSeasonsUnavailable: "Feed nie zawiera więcej niż jednego sezonu.",
        loadMore: "Doczytywanie odcinków",
        loadMoreHint: "Pokazuje 4 odcinki i przycisk „Zobacz więcej”.",
        thumbnails: "Miniatury",
        thumbnailsHint: "Okładki na liście odcinków.",
        compactList: "Kompaktowa lista",
        compactListHint: "Mniejsze odstępy między odcinkami.",
        timeline: "Linia czasu",
        waveform: "Waveform",
        waveformHint: "Fala dźwiękowa zamiast prostego paska.",
        feedWaveformChecking: "Sprawdzanie metadanych waveformu w feedzie…",
        feedWaveformUnavailable: "Feed nie zawiera danych waveformu dla wszystkich odcinków.",
        alwaysVisible: "Zawsze widoczny",
        alwaysVisibleHint: "Nie wymaga hovera nad linią czasu.",
        readyToUse: "Gotowe do użycia",
        playerConfig: "Config playera",
        copyConfig: "Kopiuj config",
        shareHint: "Link zachowuje wszystkie ustawienia konfiguratora.",
        shareConfig: "Udostępnij konfigurację",
        configUrl: "URL konfiguracji",
        copyUrl: "Kopiuj URL",
        configCopied: "Config skopiowany",
        urlCopied: "URL skopiowany"
      },
      player: {
        pageTitle: "Podcast Player — Video.js + waveform ładowany w tle",
        showTitle: "Rozmowy bez slajdów",
        eyebrow: "Nowy odcinek co czwartek",
        shellLabel: "Odtwarzacz podcastu",
        ready: "Gotowy do odtworzenia",
        retry: "Spróbuj ponownie",
        feedEyebrow: "Podcast RSS",
        feedLoading: "Wczytywanie feedu podcastu",
        feedLoadFailed: "Nie udało się wczytać feedu",
        feedErrorTitle: "Podcast jest chwilowo niedostępny",
        feedRetry: "Wczytaj ponownie",
        feedErrors: {
          invalidUrl: "Podaj poprawny adres URL rozpoczynający się od http:// lub https://.",
          timeout: "Serwer feedu nie odpowiedział w wymaganym czasie.",
          network: "Nie udało się pobrać feedu. Sprawdź adres i ustawienia CORS serwera.",
          http: "Serwer feedu zwrócił błąd HTTP.",
          tooLarge: "Feed jest zbyt duży. Maksymalny rozmiar to 5 MB.",
          invalidXml: "Plik nie jest poprawnym feedem RSS 2.0.",
          empty: "Feed nie zawiera odcinków z obsługiwanym plikiem audio."
        },
        episode: ({ number }) => `Odcinek ${number}`,
        playbackPosition: "Pozycja odtwarzania",
        episodeVersion: "Wersja odcinka",
        skipBack: ({ seconds }) => `Cofnij o ${seconds} sekund`,
        play: "Odtwórz",
        pause: "Pauza",
        skipForward: ({ seconds }) => `Przewiń o ${seconds} sekund`,
        playbackSpeed: "Prędkość odtwarzania",
        playbackSpeedValue: ({ rate }) => `Prędkość odtwarzania ${rate}×`,
        mute: "Wycisz",
        unmute: "Włącz dźwięk",
        volume: "Głośność",
        episodes: "Odcinki",
        seasonFilter: "Wybierz sezon",
        allSeasons: "Wszystkie sezony",
        season: ({ season }) => `Sezon ${season}`,
        episodeCount: ({ count }) => formatEpisodeCount("pl", count),
        visibleEpisodeCount: ({ visible, total }) => visible < total
          ? `${visible} z ${total} odcinków`
          : formatEpisodeCount("pl", total),
        now: "TERAZ",
        loadMore: "Zobacz więcej",
        waveformUnavailable: "Waveform niedostępny dla tego źródła",
        waveformLog: "Waveform niedostępny dla tego źródła. Playback pozostaje aktywny. Dodaj precomputed `peaks` albo włącz CORS na serwerze audio.",
        timeRemaining: ({ time }) => `Pozostało ${time}`,
        episodeDuration: ({ time }) => `Długość odcinka ${time}`,
        timeProgress: ({ current, duration }) => `${current} z ${duration}`,
        playEpisode: ({ number, title }) => `Odtwórz odcinek ${number}: ${title}`,
        episodeThumbnail: ({ number, title }) => `Miniatura odcinka ${number}: ${title}`,
        episodeCover: ({ number, title }) => `Okładka odcinka ${number}: ${title}`,
        changeTimeDisplay: "Zmień sposób wyświetlania czasu",
        loading: "Ładowanie odcinka",
        buffering: "Buforowanie",
        playing: "Odtwarzanie",
        paused: "Wstrzymano",
        ended: "Odcinek zakończony",
        playError: "Nie udało się rozpocząć odtwarzania",
        audioError: ({ code }) => `Nie udało się wczytać audio${code}`
      },
      categories: {
        product: "Produkt",
        design: "Design",
        strategy: "Strategia",
        ai: "AI",
        work: "Praca",
        research: "Research",
        technology: "Technologia",
        leadership: "Przywództwo"
      }
    },
    en: {
      languages: { pl: "Polish", en: "English" },
      config: {
        pageTitle: "Podcast Player Configurator",
        previewTitle: "Podcast Player Preview",
        desktop: "Desktop",
        mobile: "iPhone · 390 × 844",
        desktopPreview: "Desktop preview of the configured podcast player",
        mobilePreview: "Mobile preview of the configured podcast player",
        heading: "Appearance configurator",
        intro: "Adjust the look, copy the config, or share the current URL.",
        appearanceOptions: "Appearance options",
        configurator: "Configurator",
        changes: "Changes are saved to the URL and shown in the preview immediately.",
        reset: "Reset settings",
        layout: "Layout",
        variant: "Variant",
        defaultLayout: "Default",
        heroLayout: "Hero 16:9",
        skin: "Skin",
        defaultSkin: "Default",
        previewTheme: "Preview theme",
        systemTheme: "System",
        lightTheme: "Light",
        darkTheme: "Dark",
        themeHint: "The theme is not included in the player config.",
        language: "Language",
        playbackMode: "Playback mode",
        audioMode: "Audio",
        videoMode: "Video",
        modeSwitch: "Audio/Video switch",
        modeSwitchHint: "Allows changing the mode directly in the player.",
        minimal: "Minimal mode",
        minimalHint: "Compact player without extra elements.",
        content: "Content",
        feedUrl: "Podcast feed URL",
        feedUrlPlaceholder: "https://example.com/feed.xml",
        feedUrlHint: "Leave empty to use the demo data. The feed must allow CORS.",
        episodeDescription: "Episode description",
        episodeDescriptionHint: "Shows the description below the metadata.",
        episodeList: "Episode list",
        episodeListHint: "Displays the playlist below the player.",
        seasonFilter: "Season filter",
        seasonFilterHint: "Shows a season selector when the feed contains more than one season.",
        feedSeasonsChecking: "Checking the feed for seasons…",
        feedSeasonsUnavailable: "The feed does not contain more than one season.",
        loadMore: "Load more episodes",
        loadMoreHint: "Shows 4 episodes and a “Show more” button.",
        thumbnails: "Thumbnails",
        thumbnailsHint: "Artwork in the episode list.",
        compactList: "Compact list",
        compactListHint: "Smaller gaps between episodes.",
        timeline: "Timeline",
        waveform: "Waveform",
        waveformHint: "Audio waveform instead of a simple progress bar.",
        feedWaveformChecking: "Checking the feed for waveform metadata…",
        feedWaveformUnavailable: "The feed does not provide waveform data for every episode.",
        alwaysVisible: "Always visible",
        alwaysVisibleHint: "Does not require hovering over the timeline.",
        readyToUse: "Ready to use",
        playerConfig: "Player config",
        copyConfig: "Copy config",
        shareHint: "The link preserves all configurator settings.",
        shareConfig: "Share configuration",
        configUrl: "Configuration URL",
        copyUrl: "Copy URL",
        configCopied: "Config copied",
        urlCopied: "URL copied"
      },
      player: {
        pageTitle: "Podcast Player — Video.js + background waveform loading",
        showTitle: "Conversations Without Slides",
        eyebrow: "New episode every Thursday",
        shellLabel: "Podcast player",
        ready: "Ready to play",
        retry: "Try again",
        feedEyebrow: "RSS podcast",
        feedLoading: "Loading podcast feed",
        feedLoadFailed: "Unable to load feed",
        feedErrorTitle: "The podcast is temporarily unavailable",
        feedRetry: "Load again",
        feedErrors: {
          invalidUrl: "Enter a valid URL starting with http:// or https://.",
          timeout: "The feed server did not respond in time.",
          network: "Unable to fetch the feed. Check the address and the server's CORS settings.",
          http: "The feed server returned an HTTP error.",
          tooLarge: "The feed is too large. The maximum size is 5 MB.",
          invalidXml: "The file is not a valid RSS 2.0 feed.",
          empty: "The feed contains no episodes with supported audio files."
        },
        episode: ({ number }) => `Episode ${number}`,
        playbackPosition: "Playback position",
        episodeVersion: "Episode version",
        skipBack: ({ seconds }) => `Skip back ${seconds} seconds`,
        play: "Play",
        pause: "Pause",
        skipForward: ({ seconds }) => `Skip forward ${seconds} seconds`,
        playbackSpeed: "Playback speed",
        playbackSpeedValue: ({ rate }) => `Playback speed ${rate}×`,
        mute: "Mute",
        unmute: "Turn sound on",
        volume: "Volume",
        episodes: "Episodes",
        seasonFilter: "Choose a season",
        allSeasons: "All seasons",
        season: ({ season }) => `Season ${season}`,
        episodeCount: ({ count }) => formatEpisodeCount("en", count),
        visibleEpisodeCount: ({ visible, total }) => visible < total
          ? `${visible} of ${total} episodes`
          : formatEpisodeCount("en", total),
        now: "NOW",
        loadMore: "Show more",
        waveformUnavailable: "Waveform unavailable for this source",
        waveformLog: "Waveform unavailable for this source. Playback remains active. Add precomputed `peaks` or enable CORS on the audio server.",
        timeRemaining: ({ time }) => `Time remaining ${time}`,
        episodeDuration: ({ time }) => `Episode duration ${time}`,
        timeProgress: ({ current, duration }) => `${current} of ${duration}`,
        playEpisode: ({ number, title }) => `Play episode ${number}: ${title}`,
        episodeThumbnail: ({ number, title }) => `Episode thumbnail ${number}: ${title}`,
        episodeCover: ({ number, title }) => `Episode cover ${number}: ${title}`,
        changeTimeDisplay: "Change time display",
        loading: "Loading episode",
        buffering: "Buffering",
        playing: "Playing",
        paused: "Paused",
        ended: "Episode ended",
        playError: "Unable to start playback",
        audioError: ({ code }) => `Unable to load audio${code}`
      },
      categories: {
        product: "Product",
        design: "Design",
        strategy: "Strategy",
        ai: "AI",
        work: "Work",
        research: "Research",
        technology: "Technology",
        leadership: "Leadership"
      }
    }
  };

  let activeLanguage = "pl";

  function normalize(language) {
    return language === "en" ? "en" : "pl";
  }

  function getValue(language, key) {
    return key.split(".").reduce((value, part) => value?.[part], dictionaries[language]);
  }

  function translate(key, values = {}) {
    let value = getValue(activeLanguage, key) ?? getValue("pl", key) ?? key;
    if (typeof value === "function") value = value(values);
    return String(value).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
  }

  function apply(root = document, language = activeLanguage) {
    activeLanguage = normalize(language);
    document.documentElement.lang = activeLanguage;

    root.querySelectorAll("[data-i18n]").forEach(element => {
      element.textContent = translate(element.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
      element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
    });
    root.querySelectorAll("[data-i18n-title]").forEach(element => {
      element.title = translate(element.dataset.i18nTitle);
    });
    root.querySelectorAll("[data-i18n-alt]").forEach(element => {
      element.alt = translate(element.dataset.i18nAlt);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
      element.placeholder = translate(element.dataset.i18nPlaceholder);
    });
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat(activeLanguage === "en" ? "en-US" : "pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(new Date(`${date}T00:00:00Z`));
  }

  function localize(value) {
    if (value && typeof value === "object") return value[activeLanguage] || value.en || value.pl;
    return value;
  }

  window.podcastPlayerI18n = {
    get language() { return activeLanguage; },
    normalize,
    translate,
    apply,
    formatDate,
    localize
  };
})();
