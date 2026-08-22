# Our Story — couple countdown page

A single-page site with a live "time together" counter, a photo fan, a
quote, anniversary milestones, and a share/QR card. Pure HTML/CSS/JS —
no build step, so it works as-is on GitHub Pages.

## 1. Edit your content

Open **`config.js`** — that's the only file you need to touch:

- `names`, `startDate` — your names and the date/time you got together
- `photos` — each entry is `{ src, caption }`. `src` is the file in
  `assets/photos/`, `caption` is a short line shown when that photo is
  clicked while centered (leave `caption: ""` to skip it)
- `quote` — your own words
- `notes` — dated messages that only appear on a matching day (e.g. a
  birthday wish that shows up automatically every year on that date)
- `song` — optional background track (only use audio you have rights to;
  drop the file in `assets/` and point `song.src` at it). Leave `src`
  empty to hide the player entirely.
- `milestones` — your own list of moments (first talk, first date,
  proposal, wedding day, etc). Each has a `title`, an optional `date`
  and `tag`, and `completed: true/false`.

Replace the placeholder images in `assets/photos/` with your own photos
(same filenames, or update the list in `config.js`).

## 2. Preview locally (optional)

Any static server works, e.g. from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## 3. Publish on GitHub Pages

1. Create a new repository on GitHub (public), e.g. `our-story`.
2. Push these files to it:
   ```bash
   git init
   git add .
   git commit -m "Our story site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/our-story.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch**,
   pick `main` and `/ (root)`, then Save.
4. Your site goes live at:
   `https://<your-username>.github.io/our-story/`

   (If you name the repo `<your-username>.github.io`, it's served at
   the root of that URL instead.)

## Files

```
index.html    layout (edit only if you want to change structure)
style.css     visual design
script.js     countdown, photo fan, milestones, share/QR logic
config.js     <- your content goes here
assets/       photos and optional song
```

## Notes

- The "today's note" section only shows a card when one of your
  `notes` entries matches the current date — perfect for a birthday
  wish that appears automatically each year, then disappears the rest
  of the time.
- Milestones are entirely your own list (set in `config.js`), not
  auto-generated — add whichever moments matter to you two and mark
  each `completed: true` as it happens.
- Click the centered photo in the fan to expand it full-screen with its
  caption; click a side photo to bring it to the center. Esc, the X, or
  clicking outside the photo all close the expanded view.
