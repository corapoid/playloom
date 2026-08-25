---
name: site-player-skin
description: Generates a podcast player skin from a supplied website URL. Use when asked to analyze a site's UI, colors, typography, spacing, or components and add the closest matching skin to this player.
---

# Site Player Skin

Create one evidence-based skin for the podcast player from the URL supplied by the user.

## Analyze

1. Open the live URL at desktop and mobile widths. Inspect a representative homepage and, when useful, one article or content page.
2. Record computed or visually verified values for:
   - canvas, surface, text, muted, border, soft-state, and accent colors;
   - font categories, weights, title scale, and metadata scale;
   - corner radii, borders, shadows, spacing rhythm, and density;
   - primary controls, hover/focus states, active list rows, and dark mode.
3. Prefer computed styles and screenshots over assumptions. If access is blocked, use an accessible first-party page or recent archive and state that limitation.
4. Reproduce visual language, not branding. Do not copy logos, proprietary fonts, illustrations, or trademark-only shapes. Use system font equivalents.

## Implement

1. Read `css/podcast-player-videojs.css`, `css/skins/default.css`, and one contrasting existing skin before editing.
2. Add only `css/skins/<site-slug>.css`. Scope every rule beneath `.podcast-shell[data-skin="<site-slug>"]` except explicit theme wrappers.
3. Reuse the base player layout. Override tokens and the few components that establish the site's visual language; do not duplicate the base stylesheet.
4. Support light and dark preview modes when the source site supports them. If it is intentionally dark-only, keep the shell dark in both preview modes.
5. Add the slug to the skin allowlists in:
   - `js/podcast-player-videojs.js`
   - `js/podcast-player-preview.js`
   - `js/podcast-player-configurator.js`
6. Add the option to `podcast-player-configurator.html` and the stylesheet link to both player HTML files.

## Verify

1. Run `node --check` for all three JavaScript files.
2. Open the preview with `?skin=<site-slug>` at desktop and mobile widths.
3. Check audio and video modes, the first four episode rows, “Zobacz więcej”, focus visibility, light/dark rendering, clipping, and horizontal overflow.
4. Check the browser console. Fix errors before reporting completion.

Return the source URL, the implemented slug, a one-line summary of the borrowed visual language, and any access limitation.
