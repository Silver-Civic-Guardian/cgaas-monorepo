# Work Plan: Web Demo Integration & Localization

## 🎯 Objective
Integrate the standalone `web-demo` React application into the `cloudflare-dist` static site bundle. This requires setting up the `web-demo` to build into a subdirectory (`cloudflare-dist/demo`), adopting the exact same `civic-guardian-lang` localStorage key for seamless i18n switching, and adding links to the demo from the main landing page hub.

## 🏗️ Target Architecture Overview
```text
cloudflare-dist/
├── index.html            # Hub (now links to ./demo/)
├── hub.js                # Hub logic (added demo button translations)
├── ... (static site concepts)
└── demo/                 # The compiled web-demo Vite build
    ├── index.html
    └── assets/
        └── *.js / *.css

web-demo/
├── src/
│   ├── hooks/
│   │   └── useTranslation.js # Syncs with localStorage 'civic-guardian-lang'
│   └── config/
│       └── i18n.js           # Translation dictionaries for the demo
└── vite.config.js            # Configured with `base: './'`
```

## 📋 Execution Plan

### Phase 1: Localizing the Web Demo
- [x] **Task 1.1: Extract Strings & Create Dictionary**
  - **Action**: Create `web-demo/src/config/i18n.js`.
  - **Details**: Create a `translations` object covering the hardcoded strings in the demo (e.g., "Civic Guardian Web Demo", "The Scam Link", "The Health Rumor", "The Admin Dashboard", "Back to Menu", "Next Step"). Support at least `en` and placeholder/translated versions for `zh-TW` (Traditional Chinese) as it's the primary alternate language in the notes.
- [x] **Task 1.2: Implement `useTranslation` Hook**
  - **Action**: Create `web-demo/src/hooks/useTranslation.js`.
  - **Details**: The hook should read `localStorage.getItem('civic-guardian-lang')` on mount (defaulting to `'en'`). It should provide a `t(key)` function that looks up the key in `translations[currentLang]`. It should also listen for the `storage` window event to react if the user changes the language on a different tab. Add a `changeLanguage(lang)` function that updates state and localStorage.
- [x] **Task 1.3: Refactor React Components & Fix Bug**
  - **Action**: Update `web-demo/src/App.jsx`, `DemoLayout.jsx`, `ExplainerSidebar.jsx`, `MessageBubble.jsx` and `scenarios.js`.
  - **Details**: 
    - Replace hardcoded UI strings with `t('key')` calls. 
    - Keep `scenarios.js` pure (no hooks); export objects with translation *keys* (e.g., `titleKey: 'scam.step1'`), and call `t()` in the React components that render them. 
    - Include a simple language dropdown `<select>` in the `DemoLayout` header.
    - **CRITICAL BUG FIX**: `scenarios.js` uses `{ role: 'user', content: '...' }` but `MessageBubble.jsx` expects `msg.sender` and `msg.text`. Fix `scenarios.js` to use `sender` and `text` to match the component.

### Phase 2: Build Pipeline Integration
- [x] **Task 2.1: Update Vite Config**
  - **Action**: Edit `web-demo/vite.config.js`.
  - **Details**: Add `base: './'` to the `defineConfig` object. This is critical for the built assets to load correctly when accessed via a subfolder like `https://domain.com/demo/`.
- [x] **Task 2.2: Add Build Script**
  - **Action**: Edit the root `package.json`.
  - **Details**: Add a `"build:demo"` script: `"npm run build --prefix web-demo && rm -rf frontend/public/civic-guardian/demo && cp -r web-demo/dist frontend/public/civic-guardian/demo && rm -rf cloudflare-dist/* && cp -r frontend/public/civic-guardian/* cloudflare-dist/"`.

### Phase 3: Linking from the Static Hub (Source of Truth)
- [x] **Task 3.1: Add Demo Button to Hub HTML**
  - **Action**: Edit `frontend/public/civic-guardian/index.html`.
  - **Details**: Inside the `<section id="concepts">` or similar area, add a prominent button linking to `./demo/index.html`. Add a `data-i18n="navDemo"` attribute to it.
- [x] **Task 3.2: Add Demo Button Translations**
  - **Action**: Edit `frontend/public/civic-guardian/hub.js`.
  - **Details**: Add `"navDemo": "Interactive Web Demo"` to the `en` dictionary, and the translated equivalents to the other languages (e.g., `zh-TW`).

## Final Verification Wave
- [x] **End-to-End Build and Sync Test**
  - Run `npm run build:demo` in the root.
  - Write a Playwright script `test-integration.js` that:
    1. Serves the `cloudflare-dist` folder locally (e.g., using `npx serve cloudflare-dist` or python's `http.server`).
    2. Navigates to the hub. Verifies the language dropdown is set to English.
    3. Clicks the "Interactive Web Demo" button to navigate to the demo.
    4. Verifies the demo loads without missing asset errors (thanks to `base: './'`).
    5. Verifies the demo is in English. Changes the language in the demo's dropdown to `zh-TW`. Verifies the demo translates.
    6. Hits the browser "Back" button to return to the hub. Verifies the hub is *also* now in `zh-TW` (proving localStorage sync works).
  - Execute the script and ensure it passes.