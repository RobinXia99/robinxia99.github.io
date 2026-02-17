# Portfolio Website — Robin Xia

## Project Overview
React 18 portfolio site with Three.js 3D graphics, GSAP animations, and GitHub Pages deployment.

## Tech Stack
- React 18 (Create React App)
- Three.js + React Three Fiber + Drei (3D graphics)
- GSAP (animations)
- React Router DOM v6
- FontAwesome icons
- Deployed via `gh-pages`

## Commands
- `npm start` — dev server
- `npm run build` — production build
- `npm run deploy` — deploy to GitHub Pages
- `npm test` — run tests

## Project Structure
- `src/components/` — React components
- `src/styles/` — component CSS files
- `src/files/globals.js` — shared data/config
- `src/images/` — image assets
- `public/texture_abstract/` — 3D textures

## Conventions
- Functional components only
- CSS files in `src/styles/` matching component names
- Mobile breakpoint at 700px (see `App.js`)
- Branch: `portfoliov2` (main dev branch), `master` (production)

---

## Agent Team

Specialized agents are defined in `.claude/agents/`. Delegate work using the Task tool based on the type of task:

| Agent | File | Use For |
|---|---|---|
| Development | `.claude/agents/development.md` | React components, styling, animations, 3D graphics — all code changes |
| Deploy/Config | `.claude/agents/deploy-config.md` | Build, deployment, dependencies, git workflow |
