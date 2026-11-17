# Chandana Priya Kummarigunta — Portfolio

**Live site:** https://k-chandanapriya.github.io/portfolio/

Personal portfolio of an AI & Machine Learning engineer (M.Sc. Applied Computer Science, SRH University Stuttgart), featuring my master's thesis: a **RAG Adaptive Multimodal AI Chatbot for Elderly Care**.

## Sections

- **Hero** — intro loader, letter-by-letter name reveal, parallax portrait
- **About** — profile and animated key numbers
- **Master's thesis** — case study with a scroll-driven walkthrough of the hybrid RAG pipeline (FAISS + BM25 → RRF → cross-encoder → LoRA-tuned Gemini) and its results
- **Projects** — FraudStream, ElderSense AI, DevSecOps pipeline, Satellite Tracker and more
- **Journey** — experience and education timeline
- **Skills** — toolkit grouped by area
- **Contact** — email, LinkedIn, GitHub and CV download

## Tech

React 19 · Vite · GSAP + ScrollTrigger · Lenis smooth scrolling · plain CSS. Respects `prefers-reduced-motion`.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173/portfolio/.

## Update content

All text lives in [`src/data.js`](src/data.js). The photo and CV are in [`public/`](public/).

## Deployment

Every push to `main` builds and deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
