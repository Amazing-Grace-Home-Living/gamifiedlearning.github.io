# Site Map — Gamified Learning

Live URL: **https://nicholaimadias.github.io/gamifiedlearning.github.io/**

---

## Working Pages

| URL | File | Description |
|-----|------|-------------|
| `/` | `index.html` | Main app — Match Maker game + Matrix of Conscience |
| `/Admin.html` | `Admin.html` | Admin console with mini-game and GitHub Activity log |

---

## Folder Structure

```
gamifiedlearning.github.io/
│
├── index.html              ← Entry point (Match Maker + Matrix of Conscience)
├── Admin.html              ← Admin console (mini-game, GitHub log)
│
├── main.js                 ← App entry: initialises Match Maker, wires restart button
├── match-maker-ui.js       ← Match Maker UI (grid rendering, swap logic)
├── matchMakerState.js      ← Match Maker game state (grid, scoring, gravity)
├── badges.js               ← Badge / achievement system
│
├── _config.yml             ← Jekyll configuration (title, exclusions)
│
├── README.md               ← Repository documentation
├── agent.yaml              ← CNAME validation GitHub Action
│
└── .github/
    ├── dependabot.yml                        ← Automated dependency updates
    └── workflows/
        └── jekyll-gh-pages.yml               ← Build & deploy to GitHub Pages
```

---

## Deployment Pipeline

```
Push to main
    │
    ▼
jekyll-gh-pages.yml
    │
    ├── build job
    │     ├── actions/checkout@v4
    │     ├── actions/configure-pages@v5
    │     ├── actions/jekyll-build-pages@v1   ← builds ./_site
    │     └── actions/upload-pages-artifact@v3
    │
    └── deploy job (needs: build)
          └── actions/deploy-pages@v5         ← publishes to github-pages environment
```

---

## Previously Broken — Fixed in This Branch

| Issue | Fix |
|-------|-----|
| `jekyll-docker.yml` built the site but never deployed it (no upload/deploy step) | Replaced with `jekyll-gh-pages.yml` which uses `actions/upload-pages-artifact` + `actions/deploy-pages` |
| `.github/workflow.yml` — corrupted file in wrong directory (not `workflows/`), containing mixed CI YAML + Dependabot config + HTML + Docker snippet | Deleted; Dependabot config extracted to `.github/dependabot.yml` |
| No `_config.yml` — Jekyll lacked title, exclusions, and base-URL settings | Added `_config.yml` with title and exclusions |
| `concurrency: cancel-in-progress: false` allowed deployment queue pile-ups | Changed to `cancel-in-progress: true` |
