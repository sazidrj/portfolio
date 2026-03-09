# Sazid Ali — Portfolio

A fully modularized React + Vite portfolio with interactive project demos.

## ⚡ Getting Started (Vite)

```bash
npm install
npm start        # dev server at http://localhost:5173
npm run build    # production build → dist/
```

> **Note:** Do NOT run `npm audit fix --force` — it will break Vite.

---

## 📁 Project Structure

```
portfolio/
├── index.html                         ← Vite entry HTML
├── vite.config.js                     ← Vite config
├── public/
│   └── projects/
│       ├── jpeg/                      ← ★ Put your JPEG images here
│       └── morphing/                  ← ★ Put your morphing GIFs here
└── src/
    ├── App.jsx
    ├── index.js
    ├── styles/globals.css             ← CSS variables & base styles
    ├── data/portfolioData.js          ← ★ ALL content lives here
    ├── hooks/
    │   ├── useReveal.js               ← Scroll reveal animation
    │   └── useScrollSpy.js            ← Active nav link tracking
    └── components/
        ├── ui/        → Reveal, Terminal, GridBackground
        ├── layout/    → Navbar, Footer
        ├── sections/  → Hero, Experience, Skills, Projects, Education, Contact
        └── projects/
            ├── ProjectModal.jsx       ← Full-screen modal on click
            ├── JpegDemo.jsx           ← Grid thumbnails + drag slider
            ├── MorphingDemo.jsx       ← Auto-loop GIF viewer
            └── HighlightsDemo.jsx     ← Text highlights fallback
```

---

## 🖼️ Adding Your JPEG Images

1. Copy your images into `/public/projects/jpeg/`
2. Open `src/data/portfolioData.js`, find `projects[1].media.examples`
3. Update like this:

```js
{
  label: "Portrait",
  original: "/projects/jpeg/portrait_original.jpg",  // ← your original
  encoded:  "/projects/jpeg/portrait_q50.jpg",        // ← your encoded/decoded
  quality: 50,
  compressionRatio: "8.2x",   // update with your actual value
  psnr: "34.1 dB",            // update with your actual value
  placeholder: "Portrait — Q50",
},
```

The UI will show a **3-image thumbnail grid** (click to select) + a **drag-to-compare slider**.

---

## 🎞️ Adding Your Morphing GIFs

1. Copy your GIF(s) into `/public/projects/morphing/`
2. Open `src/data/portfolioData.js`, find `projects[2].media.gifs`
3. Update like this:

```js
{
  src: "/projects/morphing/face_morph.gif",   // ← your GIF path
  fromLabel: "Face A",                         // label for source image
  toLabel: "Face B",                           // label for target image
  frames: 30,
  duration: "3s",
},
```

The GIF will **auto-loop** with a pipeline diagram below it.

---

## ✏️ Editing Content

Everything is in **`src/data/portfolioData.js`** — update it and the entire site updates:
- `personalInfo` — name, email, LinkedIn, GitHub
- `experience` — work history
- `skills` — skill groups & tags
- `stats` — LeetCode, Codeforces, etc.
- `projects` — all project cards & modals
- `education` — degrees
