# Our Story — a personal digital love letter

A one-page, no-build website inspired by "digital gift" pages like Lovely Lens:
a live counter of time together, a photo album, a handwritten letter, a song,
and a QR code that links back to the page — perfect for printing or texting.

It's plain HTML/CSS/JS, so it's completely free to host on **GitHub Pages**.

## 1. Make it yours

Everything you need to edit lives in **one place**: the `CONFIG` object at the
top of `script.js`.

```js
const CONFIG = {
  partnerOne: "Ava",
  partnerTwo: "Leo",
  startDate: "2023-02-14T00:00:00",   // when your story began
  message: "...",                     // your letter
  photos: [ { src: "...", caption: "..." } ],
  song: "assets/music/our-song.mp3",  // leave "" to hide the music button
  siteUrl: "",                        // fill in after you deploy (step 3)
};
```

- **Photos** — drop your images into `assets/photos/` and point each
  `photos[i].src` at the file, e.g. `"assets/photos/1.jpg"`. Square-ish
  images (roughly 1:1) look best in the polaroid frames. Until you add your
  own, the page shows placeholder photos so you can preview the design.
- **Song** — drop an mp3 into `assets/music/` and set `song` to its path,
  e.g. `"assets/music/our-song.mp3"`. Only use a track you have the rights
  to share. Leave `song: ""` to hide the music button entirely.
- **Message** — write your letter in the `message` field. Use `\n\n`
  wherever you want a new paragraph.

Open `index.html` directly in a browser any time to preview your changes —
no build step, no install.

## 2. Preview locally (optional)

Because the QR code and audio need to run from a server (not a `file://`
path) to behave perfectly in every browser, it helps to preview with a tiny
local server:

```bash
cd lovely-page
python3 -m http.server 8000
# then open http://localhost:8000
```

## 3. Publish it on GitHub Pages

1. Create a new **public** repository on GitHub (e.g. `our-story`).
2. Upload all the files in this folder to the repo, keeping the folder
   structure (`index.html`, `style.css`, `script.js`, `assets/`, `README.md`)
   at the repo root — either via the GitHub web UI ("Add file → Upload
   files") or with git:
   ```bash
   cd lovely-page
   git init
   git add .
   git commit -m "our story"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   choose branch `main` and folder `/ (root)`, then **Save**.
5. GitHub will give you a live URL after a minute or two, usually:
   `https://<your-username>.github.io/<your-repo>/`
6. Paste that exact URL into `siteUrl` in `script.js`, then commit and push
   again so the QR code points at the live page instead of a local one.

That's it — the page is now free to host, shareable, and scannable.

## Notes

- Everything is static (no backend, no database), so it works within
  GitHub Pages' free tier indefinitely.
- The live counter, gallery lightbox, music toggle, and QR code are all
  vanilla JavaScript — no build tools required.
- Fonts (Fraunces, Caveat, Jost) load from Google Fonts; the QR library
  loads from a CDN. Both need an internet connection to load, same as the
  rest of the public web.
