# Tangent

An infinite-scroll feed of random Wikipedia articles, built with Expo Router and React Native. Open the app and keep swiping through the world's knowledge, one random article at a time — think "TikTok, but for Wikipedia."

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [How the feed works](#how-the-feed-works)
- [Database schema](#database-schema)
- [Data source (Wikipedia API)](#data-source-wikipedia-api)
- [Building an APK for testing](#building-an-apk-for-testing)
- [Building for iOS](#building-for-ios)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)
- [Known limitations / roadmap](#known-limitations--roadmap)
- [Contributing](#contributing)
- [License](#license)

## Overview

Tangent is a mobile-first content discovery app. Instead of searching for what you want to read, you scroll a feed of randomly surfaced Wikipedia summaries — tap "Read more" on anything that catches your eye to open the full article in your browser. The app caches whatever it fetches locally, so re-opening it later the same day doesn't re-hit the network or show a blank loading screen.

The internal package name is `xikipedia`; the public-facing app name is **Tangent**.

## Features

- **Infinite feed** of random Wikipedia articles with smooth, threshold-based pagination (`onEndReached` fires at 80% scroll depth)
- **Local SQLite caching** — articles fetched today are stored on-device, so relaunching the app the same day loads instantly from cache instead of hitting the network
- **Prefetch buffer** — while you're reading the current batch, the next batch is already being fetched in the background, so scrolling to the bottom feels instant instead of triggering a visible loading spinner every time
- **Bounded memory usage** — the in-memory feed is capped (currently 1000 articles) and trims the oldest entries once the cap is hit, so long scrolling sessions don't balloon memory
- **Light/dark mode** support throughout, driven by the device's color scheme
- **Tap to read more** — opens the full Wikipedia article in the system browser via `Linking.openURL`
- **Haptic tab feedback** on navigation (via `expo-haptics`)

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) SDK 54 |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing) + `@react-navigation/bottom-tabs` |
| Runtime | React Native 0.81, React 19, New Architecture enabled |
| Local storage | [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) |
| Data source | Wikipedia public REST API (`en.wikipedia.org/api/rest_v1`) |
| Language | TypeScript |
| Animations | `react-native-reanimated` + `react-native-worklets` |
| List rendering | `react-native` `FlatList` |
| Icons | `@expo/vector-icons`, `expo-symbols` |
| Linting | ESLint (`eslint-config-expo`) |

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm
- The [Expo Go](https://expo.dev/go) app on your phone, **or** an Android/iOS emulator/simulator set up locally

### Installation

```bash
git clone <your-repo-url>
cd Tangent
npm install
```

### Running the app

```bash
npx expo start
```

This starts the Expo dev server and opens the Expo CLI dashboard in your terminal. From there you can launch the app on:

- **Expo Go** — scan the QR code shown in the terminal with your phone's camera (Android) or the Expo Go app (iOS)
- **Android emulator** — press `a` in the terminal, or run `npm run android`
- **iOS simulator** (macOS only) — press `i` in the terminal, or run `npm run ios`
- **Web browser** — press `w` in the terminal, or run `npm run web`

No environment variables or API keys are required — the app talks to Wikipedia's public, unauthenticated REST API directly.

## Project structure

```
Tangent/
├── app/                        Screens and navigation (Expo Router file-based routing)
│   ├── (tabs)/
│   │   ├── _layout.tsx         Tab navigator (Home / Explore)
│   │   ├── index.tsx           Home screen — the main article feed
│   │   └── explore.tsx         Explore screen — default Expo starter content
│   ├── _layout.tsx             Root layout: theme provider, DB init, stack navigator
│   └── modal.tsx                Example modal screen
├── components/
│   ├── ArticleCard.tsx          Renders a single article (title, summary, read-more link)
│   ├── external-link.tsx        Wrapper for opening links in the system browser
│   ├── haptic-tab.tsx           Tab bar button with haptic feedback
│   ├── hello-wave.tsx           Starter animation example
│   ├── parallax-scroll-view.tsx Scroll view with parallax header (used by Explore)
│   ├── themed-text.tsx / themed-view.tsx   Light/dark-aware primitives
│   └── ui/                     Icon and collapsible UI primitives
├── db/
│   ├── database.ts              Opens the SQLite DB and creates the `articles` table
│   └── articles.ts              Insert/query helpers for cached articles
├── services/
│   ├── wikipedia.ts             Fetches random articles from Wikipedia's REST API
│   ├── feed.ts                  Feed pagination logic — checks cache, falls back to fetch
│   └── types/article.ts         Shared `Article` type
├── hooks/                       Color-scheme and theme hooks
├── constants/theme.ts           Color and font tokens
├── utils/date.ts                Date formatting helper (used as the cache key)
├── backend/                     Standalone Express server (currently unused by the app)
├── assets/images/               App icons, splash screen, logo
├── app.json                     Expo app config (name, icons, plugins, bundle IDs)
├── eas.json                     EAS Build profiles (development / preview / production)
└── package.json
```

## How the feed works

1. On mount, the Home screen (`app/(tabs)/index.tsx`) requests two batches of articles in parallel: one to display immediately, and one to hold in reserve as a **buffer**.
2. Each request goes through `getInitialFeed()` in `services/feed.ts`, which first checks the local SQLite cache for today's date. If enough cached articles exist, it returns those; otherwise it fetches fresh random articles from Wikipedia and saves them to the cache.
3. As the user scrolls near the end of the list (80% threshold), `loadAnotherArticle()` appends the buffered batch to the visible feed and immediately kicks off fetching the *next* buffer in the background — so there's rarely a visible loading gap.
4. The visible feed is capped at `MAX_ARTICLES` (1000); once exceeded, the oldest articles are dropped from the in-memory list (the SQLite cache itself is not pruned).

## Database schema

A single SQLite database (`tangent.db`) with one table:

```sql
CREATE TABLE IF NOT EXISTS articles (
  pageid INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  image TEXT,
  url TEXT,
  cached_date TEXT NOT NULL,
  bookmarked INTEGER DEFAULT 0
);
```

- `pageid` is the Wikipedia page ID and serves as the primary key, so re-fetching the same article overwrites rather than duplicates it (`INSERT OR REPLACE`).
- `cached_date` (format `YYYY-MM-DD`) is used to scope "today's" feed — this is what lets the app skip network calls on same-day relaunches.
- `bookmarked` exists in the schema but isn't currently surfaced in the UI — see [Known limitations](#known-limitations--roadmap).

## Data source (Wikipedia API)

Articles come from Wikipedia's public REST API, specifically:

```
GET https://en.wikipedia.org/api/rest_v1/page/random/summary
```

This endpoint requires no API key and returns a single random article summary per call (title, extract, thumbnail, and canonical URL). To fetch a batch, the app fires `count` parallel requests via `Promise.allSettled` and discards any that fail, so a few dropped requests won't break the whole batch — though note this also means duplicate articles within the same batch are possible, since nothing currently de-duplicates by `pageid` before display.

## Building an APK for testing

This project ships with an `eas.json` already configured, so the fastest path to an installable Android build is [EAS Build](https://docs.expo.dev/build/introduction/) — Expo's cloud build service. No local Android SDK is required.

1. **Install and log in to the EAS CLI:**
```bash
   npm install -g eas-cli
   eas login
```
2. **Make sure the `preview` profile builds a raw `.apk`** rather than a Play Store `.aab`. In `eas.json`:
```json
   "preview": {
     "distribution": "internal",
     "android": { "buildType": "apk" }
   }
```
3. **Link the project to your EAS account** (only needed if the `projectId` in `app.json` doesn't already belong to you):
```bash
   eas init
```
4. **Kick off the build:**
```bash
   eas build -p android --profile preview
```
   This uploads your project to Expo's build servers and compiles it into a native Android app. It typically takes 5–15 minutes.
5. **Download the APK** — once the build finishes, EAS prints a download link and QR code in the terminal. Open the link directly on your Android device, or run:
```bash
   eas build:download
```
6. **Install on device** — enable "install unknown apps" for your browser or file manager in Android Settings, then open the downloaded `.apk` file and tap Install.

### Building locally (no EAS cloud service)

If you'd rather build entirely on your own machine:

```bash
npx expo prebuild -p android
cd android
./gradlew assembleDebug
```

This requires Android Studio (or at least the Android SDK/build tools) and a JDK installed locally. The resulting APK lands at `android/app/build/outputs/apk/debug/app-debug.apk`.

## Building for iOS

iOS builds require a paid Apple Developer account and can only be produced via EAS Build (or a local macOS + Xcode setup) — there's no local-simulator equivalent to a sideloadable `.apk`. Run:

```bash
eas build -p ios --profile preview
```

and follow the prompts to set up or reuse existing Apple credentials.

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the Expo dev server |
| `npm run android` | Start and open on a connected Android device/emulator |
| `npm run ios` | Start and open on an iOS simulator |
| `npm run web` | Start and open in a web browser |
| `npm run lint` | Run ESLint |
| `npm run reset-project` | Reset to a blank starter app (moves current code to `app-example/`) |

## Troubleshooting

- **Blank feed / stuck on loading:** Check your network connection — if every random-article request fails, the feed silently renders empty. Check the console/Metro logs for fetch errors.
- **SQLite errors on first launch:** Make sure `initializeDatabase()` runs before any queries — it's called once from the root layout on mount.
- **Build fails on EAS:** Run `eas build --clear-cache` to rule out a stale dependency cache, and double check `app.json`'s `android.package` / iOS bundle identifier are unique if you've forked this project.
- **Duplicate articles in the feed:** Wikipedia's random endpoint can occasionally return the same article twice within one batch — see limitations below.

## Known limitations / roadmap

- No de-duplication of `pageid` within a single fetched batch — the same article can theoretically appear twice in a row.
- The SQLite `articles` table grows indefinitely; there's no cleanup of old `cached_date` rows.
- The `bookmarked` column exists in the schema but has no UI yet — a natural next feature (bookmark button on `ArticleCard`, a "Saved" tab).
- `backend/` contains a small Express server (`GET /api/random`) that isn't currently called by the app — the feed talks to Wikipedia directly. Either remove this or wire it in if the plan is to proxy/rate-limit requests server-side.
- The Explore tab still contains Expo's default starter content and hasn't been customized yet.
- No retry/error UI for the user when all article fetches fail — currently fails silently to an empty list.

## Contributing

Issues and pull requests are welcome. Please run `npm run lint` before submitting a PR.

## License

Add your preferred license here (e.g. MIT).