# Podcast Player

A responsive podcast player supporting audio, video, waveforms, incremental episode loading, persisted playback state, and interchangeable skins.

## Running Locally

The project requires no dependency installation. Start a local server from the project directory:

```sh
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080/podcast-player-videojs.html` - player
- `http://localhost:8080/podcast-player-configurator.html` - configurator with desktop and mobile previews
- `http://localhost:8080/podcast-player-preview.html` - standalone preview controlled through URL parameters

The playback library and demo media are loaded from external servers, so the player requires internet access.

## GitHub Pages

The repository includes GitHub Actions workflows for validation and versioned GitHub Pages deployments. CI runs on pushes and pull requests. Enable GitHub Pages in the repository settings with **Source: GitHub Actions**.

Releases use SemVer tags with a `v` prefix:

```sh
git tag v0.0.1
git push origin main --follow-tags
```

For each release tag, the workflow publishes the tagged version at the site root and keeps every SemVer tag in the version archive:

- `https://corapoid.github.io/playloom/` - latest deployed version
- `https://corapoid.github.io/playloom/versions/` - version index
- `https://corapoid.github.io/playloom/versions/0.0.1/` - a specific version

To release a new version, update `CHANGELOG.md`, commit the changes, create a tag such as `v0.0.2`, and push the commit with its tag. The workflow rebuilds the archive from all available release tags, so previous versions remain available.

## Configuration

Set `window.podcastPlayerConfig` before loading `js/podcast-player-videojs.js`:

```html
<script>
  window.podcastPlayerConfig = {
    skin: "default",
    mode: "audio",
    allowModeSwitch: true,
    showEpisodeList: true,
    showEpisodeLoadMore: true,
    showPlaylistThumbnails: true,
    compactPlaylist: true,
    showDescriptions: false,
    showWaveform: true,
    alwaysShowWaveform: true
  };
</script>
<script src="js/podcast-player-videojs.js"></script>
```

With `showEpisodeLoadMore: true`, the list initially displays four episodes and reveals additional batches through the load-more button.

## Project Structure

```text
.
├── css/
│   ├── podcast-player-configurator.css
│   ├── podcast-player-videojs.css
│   └── skins/
├── js/
│   ├── podcast-player-configurator.js
│   ├── podcast-player-preview.js
│   └── podcast-player-videojs.js
├── scripts/build-pages.sh
├── .github/workflows/deploy-pages.yml
├── CHANGELOG.md
├── .opencode/skills/site-player-skin/
├── podcast-player-configurator.html
├── podcast-player-preview.html
└── podcast-player-videojs.html
```

## Skin Generation

The project includes the `site-player-skin` OpenCode skill. Given a website URL, it analyzes colors, typography, spacing, components, and responsive behavior, then creates a matching skin in `css/skins/`.

Restart OpenCode after adding or changing the skill so the configuration is reloaded.
