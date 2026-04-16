# Nexus — Mystery of the Seven Stars

A gamified learning Progressive Web App built with React + Vite.

## Overview

Nexus is a quest-based PWA set in the world of the Seven Stars. Players progress through five
interconnected quests in the Blackwood, solving clues, matching tiles, and performing rituals to
unlock each star.

## Quests

| # | Quest | Mechanic |
|---|-------|----------|
| 1 | Blackwood Ledger | Clue-answer text input |
| 2 | Whispering Pines | Location exploration with clues |
| 3 | Raven's Message | Match-3 tile game |
| 4 | Third Star Altar | Symbol sequence ritual |
| ★ | Library of Still Waters | Wisdom clue gauntlet |

## Getting Started

```bash
cd nexus
npm install
npm run dev
```

## Build

```bash
npm run build
# output in nexus/dist/
```

## Lint

```bash
npm run lint
```

## Project Structure

```
nexus/
├── public/               Static assets (manifest, service-worker, images)
│   └── assets/           PNG assets (blackwood, ui, icons)
├── src/
│   ├── styles/           Global CSS (variables, gradients, shadows, transitions)
│   ├── state/            Quest engine + custom hooks (XP, badges, ministry)
│   ├── game/             Raven's Message match-3 engine
│   ├── components/       React components (ui/, blackwood/, stars/)
│   ├── pages/            Route-level pages (Home, Quest, Stars)
│   ├── lore/             In-world text files
│   ├── App.jsx           Root component with BrowserRouter
│   ├── routes.jsx        Lazy-loaded route definitions
│   └── index.js          Entry point + service worker registration
├── index.html            Vite HTML entry
├── vite.config.js        Vite + React plugin config
└── package.json
```

## CI/CD

The Nexus CI/CD workflow (`.github/workflows/nexus-ci.yml`) runs on every push to `main` or
`staging` and on pull requests. It installs dependencies, lints, builds, and uploads the
`dist/` directory as a build artifact.

## License

See [../LICENSE](../LICENSE).
