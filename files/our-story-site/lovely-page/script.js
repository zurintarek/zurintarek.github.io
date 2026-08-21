/* ============================================================
   ✏️  EDIT EVERYTHING BELOW TO MAKE THIS PAGE YOURS
   This is the only section you need to touch.
   ============================================================ */
const CONFIG = {

  // The two names shown in the hero
  partnerOne: "Ava",
  partnerTwo: "Leo",

  // When your story began — used to power the live counter.
  // Format: "YYYY-MM-DDTHH:MM:SS" (24h clock, local time)
  startDate: "2023-02-14T00:00:00",

  // Your letter. Use \n\n for a new paragraph.
  message:
    "If someone told me a single afternoon could change everything, " +
    "I don't think I would have believed them.\n\n" +
    "But that was before you. Before the inside jokes, the terrible " +
    "playlists, the late-night phone calls that turned into sunrises.\n\n" +
    "Every day on this counter is one I'd choose again, in any order, " +
    "in any lifetime.",

  // Photos for the album. Put your own files in assets/photos/
  // and list them here. Caption is optional.
  photos: [
    { src: "https://picsum.photos/seed/lovely-1/600/600", caption: "the beginning" },
    { src: "https://picsum.photos/seed/lovely-2/600/600", caption: "that summer" },
    { src: "https://picsum.photos/seed/lovely-3/600/600", caption: "your favorite spot" },
    { src: "https://picsum.photos/seed/lovely-4/600/600", caption: "silly faces" },
    { src: "https://picsum.photos/seed/lovely-5/600/600", caption: "the trip" },
    { src: "https://picsum.photos/seed/lovely-6/600/600", caption: "just us" },
  ],

  // Background song. Put an mp3 in assets/music/ and reference it here.
  // Leave empty ("") to hide the music button entirely.
  song: "",

  // The final URL where this page will live, e.g.
  // "https://yourusername.github.io/your-repo/"
  // Used to generate the QR code at the bottom. Leave empty to auto-use
  // the page's current URL (handy for local testing).
  siteUrl: "",
};

/* ============================================================
   Everything past this point is display logic.
   No need to edit unless you want to change behavior.
   ============================================================ */
(function () {
  const $ = (sel) => document.querySelector(sel);

  const dateLabelFmt = new Intl.DateTimeFormat(undefined, {
    year: "numeric", month: "long", day: "numeric",
  });

  function init() {
    // Names
    document.title = `${CONFIG.partnerOne} & ${CONFIG.partnerTwo} — Our Story`;
    $("#name1").textContent = CONFIG.partnerOne;
    $("#name2").textContent = CONFIG.partnerTwo;
    $("#name1b").textContent = CONFIG.partnerOne;
    $("#name2b").textContent = CONFIG.partnerTwo;

    // Start date label
    const start = new Date(CONFIG.startDate);
    $("#startDateLabel").textContent = isNaN(start) ? "—" : dateLabelFmt.format(start);

    // Letter
    $("#message").textContent = CONFIG.message;

    // Gallery
    renderGallery();

    // Counter
    if (!isNaN(start)) {
      updateCounter(start);
      setInterval(() => updateCounter(start), 1000);
    }

    // Music
    setupMusic();

    // QR
    renderQR();

    // Lightbox
    setupLightbox();
  }

  function pad(n, len = 2) {
    return String(Math.max(0, n)).padStart(len, "0");
  }

  function updateCounter(start) {
    const now = new Date();
    let diff = Math.max(0, now - start) / 1000; // seconds

    const days = Math.floor(diff / 86400);
    diff -= days * 86400;
    const hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    const mins = Math.floor(diff / 60);
    diff -= mins * 60;
    const secs = Math.floor(diff);

    $("#c-days").textContent = pad(days, 4);
    $("#c-hours").textContent = pad(hours);
    $("#c-mins").textContent = pad(mins);
    $("#c-secs").textContent = pad(secs);
  }

  function renderGallery() {
    const wrap = $("#polaroids");
    wrap.innerHTML = "";
    CONFIG.photos.forEach((photo, i) => {
      const fig = document.createElement("figure");
      fig.className = "polaroid";
      fig.setAttribute("role", "button");
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("aria-label", `Open photo: ${photo.caption || "photo " + (i + 1)}`);

      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.caption || `Photo ${i + 1}`;
      img.loading = "lazy";
      fig.appendChild(img);

      if (photo.caption) {
        const cap = document.createElement("figcaption");
        cap.textContent = photo.caption;
        fig.appendChild(cap);
      }

      fig.addEventListener("click", () => openLightbox(photo));
      fig.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(photo); }
      });

      wrap.appendChild(fig);
    });
  }

  function setupLightbox() {
    const box = $("#lightbox");
    const closeBtn = $("#lightboxClose");
    closeBtn.addEventListener("click", closeLightbox);
    box.addEventListener("click", (e) => { if (e.target === box) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  function openLightbox(photo) {
    const box = $("#lightbox");
    $("#lightboxImg").src = photo.src;
    $("#lightboxImg").alt = photo.caption || "";
    $("#lightboxCaption").textContent = photo.caption || "";
    box.classList.add("open");
    box.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    const box = $("#lightbox");
    box.classList.remove("open");
    box.setAttribute("aria-hidden", "true");
  }

  function setupMusic() {
    const btn = $("#musicToggle");
    const audio = $("#bgm");
    const label = $("#musicToggleLabel");

    if (!CONFIG.song) {
      btn.style.display = "none";
      return;
    }
    audio.src = CONFIG.song;

    btn.addEventListener("click", () => {
      const playing = btn.getAttribute("aria-pressed") === "true";
      if (playing) {
        audio.pause();
        btn.setAttribute("aria-pressed", "false");
        label.textContent = "play our song";
      } else {
        audio.play().catch(() => {});
        btn.setAttribute("aria-pressed", "true");
        label.textContent = "pause our song";
      }
    });
  }

  function renderQR() {
    const target = CONFIG.siteUrl || window.location.href;
    const holder = $("#qrcode");
    if (window.QRCode) {
      new QRCode(holder, {
        text: target,
        width: 176,
        height: 176,
        colorDark: "#170B14",
        colorLight: "#F6ECE4",
        correctLevel: QRCode.CorrectLevel.M,
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
