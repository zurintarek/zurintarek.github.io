(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};

  /* ---------------- Hero ---------------- */
  document.getElementById("names").textContent = cfg.names || "Name & Name";

  var start = new Date(cfg.startDate);
var startValid = !isNaN(start.getTime());
document.getElementById("startDateLabel").textContent = startValid 
  ? `TOGETHER SINCE ${start.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}`
  : "Set startDate in config.js";

  document.getElementById("quoteText").textContent = "\u201C" + (cfg.quote || "Write your own words in config.js.") + "\u201D";

  /* ---------------- Lightbox ---------------- */
  var lightbox = {
    el: document.getElementById("lightbox"),
    img: document.getElementById("lightboxImg"),
    caption: document.getElementById("lightboxCaption"),
    open: function (src, caption) {
      lightbox.img.src = src;
      lightbox.img.alt = caption || "";
      lightbox.caption.textContent = caption || "";
      lightbox.el.hidden = false;
      document.body.classList.add("no-scroll");
      document.getElementById("lightboxClose").focus();
    },
    close: function () {
      lightbox.el.hidden = true;
      document.body.classList.remove("no-scroll");
    }
  };
  document.getElementById("lightboxClose").addEventListener("click", lightbox.close);
  lightbox.el.addEventListener("click", function (e) {
    if (e.target === lightbox.el) lightbox.close(); // click outside the photo
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.el.hidden) lightbox.close();
  });

  /* ---------------- Photo fan ---------------- */
  (function initFan() {
    var stage = document.getElementById("fanStage");
    // Photos can be plain strings or { src, caption } objects.
    var photos = (cfg.photos || []).filter(Boolean).map(function (p) {
      return typeof p === "string" ? { src: p, caption: "" } : { src: p.src, caption: p.caption || "" };
    });
    var section = document.getElementById("fan");
    var prevBtn = document.getElementById("fanPrev");
    var nextBtn = document.getElementById("fanNext");
    if (!photos.length) { section.hidden = true; return; }

    var n = photos.length;
    var current = Math.min(1, n - 1); // start on the middle photo when 3+

    // Build every image ONCE and keep the elements around. Sliding then
    // only updates transforms on existing nodes, so CSS transitions
    // actually have something to animate from instead of re-creating
    // the DOM (which was snapping instantly with no motion).
    // A clean inline placeholder — shown if a photo file can't be found,
    // instead of the browser's default broken-image glyph.
    var FALLBACK_SRC = "data:image/svg+xml," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500">' +
      '<rect width="100%" height="100%" fill="#241118"/>' +
      '<text x="50%" y="46%" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#e0637a">&#9825;</text>' +
      '<text x="50%" y="56%" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#a8898c">Add a photo</text>' +
      '</svg>'
    );

    var imgs = photos.map(function (photo, i) {
      var img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.caption || "";
      img.className = "fan__photo";
      img.onerror = function () {
        img.onerror = null; // avoid loops if the fallback itself ever fails
        img.src = FALLBACK_SRC;
      };
      img.addEventListener("click", function () {
        if (i === current) {
          // Centered photo: expand it.
          lightbox.open(img.src, photo.caption);
        } else {
          // Side photo: bring it to the center instead of expanding.
          current = i;
          layout();
        }
      });
      stage.appendChild(img);
      return img;
    });

    // Shortest signed circular distance from `current` to `i`, so the
    // fan wraps around smoothly instead of a photo vanishing at the ends.
    function circularOffset(i) {
      var raw = ((i - current) % n + n) % n; // 0..n-1
      if (raw > n / 2) raw -= n;
      return raw;
    }

    function layout() {
      imgs.forEach(function (img, i) {
        var offset = circularOffset(i);
        var visible = Math.abs(offset) <= 1;
        var isCenter = offset === 0;
        var rotate = offset * 10;
        var translate = offset * 92;
        var z = 10 - Math.abs(offset);
        var scale = isCenter ? 1 : 0.9;
        var opacity = visible ? (isCenter ? 1 : 0.75) : 0;
        img.style.transform = "translateX(calc(-50% + " + translate + "px)) rotate(" + rotate + "deg) scale(" + scale + ")";
        img.style.zIndex = z;
        img.style.opacity = opacity;
        img.style.pointerEvents = visible ? "auto" : "none";
        img.classList.toggle("fan__photo--center", isCenter);
      });
    }
    layout();

    if (n < 2) {
      prevBtn.hidden = true;
      nextBtn.hidden = true;
    } else {
      prevBtn.addEventListener("click", function () {
        current = (current - 1 + n) % n;
        layout();
      });
      nextBtn.addEventListener("click", function () {
        current = (current + 1) % n;
        layout();
      });
      section.setAttribute("tabindex", "0");
      section.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { prevBtn.click(); }
        if (e.key === "ArrowRight") { nextBtn.click(); }
      });
    }
  })();

  /* ---------------- Live timer ---------------- */
  var els = {
    years: document.getElementById("tYears"),
    months: document.getElementById("tMonths"),
    days: document.getElementById("tDays"),
    hours: document.getElementById("tHours"),
    minutes: document.getElementById("tMinutes"),
    seconds: document.getElementById("tSeconds"),
    total: document.getElementById("totalHours"),
    happyDays: document.getElementById("happyDays")
  };

  function diffParts(from, to) {
    var years = to.getFullYear() - from.getFullYear();
    var months = to.getMonth() - from.getMonth();
    var days = to.getDate() - from.getDate();
    var hours = to.getHours() - from.getHours();
    var minutes = to.getMinutes() - from.getMinutes();
    var seconds = to.getSeconds() - from.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
      var prevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
      days += prevMonth; months--;
    }
    if (months < 0) { months += 12; years--; }
    return { years: years, months: months, days: days, hours: hours, minutes: minutes, seconds: seconds };
  }

  function tick() {
    if (!startValid) return;
    var now = new Date();
    var p = diffParts(start, now);
    els.years.textContent = Math.max(0, p.years);
    els.months.textContent = Math.max(0, p.months);
    els.days.textContent = Math.max(0, p.days);
    els.hours.textContent = String(Math.max(0, p.hours)).padStart(2, "0");
    els.minutes.textContent = String(Math.max(0, p.minutes)).padStart(2, "0");
    els.seconds.textContent = String(Math.max(0, p.seconds)).padStart(2, "0");

    var totalMs = now - start;
    var totalHours = Math.max(0, Math.floor(totalMs / 3600000));
    var totalDays = Math.max(0, Math.floor(totalMs / 86400000));
    els.total.textContent = "A total of " + totalHours.toLocaleString() + " hours";
    els.happyDays.textContent = totalDays.toLocaleString() + " days";
  }

  /* ---------------- Today's note ----------------
     Fully driven by cfg.notes in config.js. Each note has a `date`:
       "MM-DD"      matches every year on that month/day (birthdays,
                    anniversaries — recurring)
       "YYYY-MM-DD" matches only that exact date (one-off)
     Only notes whose date matches *today* are shown; on any other day
     the section stays empty/hidden.
  */
  (function renderTodayNotes() {
    var section = document.getElementById("todaySection");
    var list = document.getElementById("todayList");
    var notes = (cfg.notes || []).filter(Boolean);
    if (!notes.length) return;

    var now = new Date();
    var mm = String(now.getMonth() + 1).padStart(2, "0");
    var dd = String(now.getDate()).padStart(2, "0");
    var yyyy = String(now.getFullYear());
    var monthDay = mm + "-" + dd;
    var fullDate = yyyy + "-" + mm + "-" + dd;

    var matches = notes.filter(function (n) {
      if (!n.date) return false;
      return n.date === monthDay || n.date === fullDate;
    });
    if (!matches.length) return;

    list.innerHTML = "";
    matches.forEach(function (n) {
      var card = document.createElement("div");
      card.className = "today__card";

      var title = document.createElement("div");
      title.className = "today__title";
      title.textContent = n.title || "";
      card.appendChild(title);

      var dateEl = document.createElement("div");
      dateEl.className = "today__date";
      dateEl.textContent = now.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
      card.appendChild(dateEl);

      if (n.photo) {
        var img = document.createElement("img");
        img.className = "today__photo";
        img.src = n.photo;
        img.alt = n.title || "";
        card.appendChild(img);
      }

      if (n.message) {
        var msg = document.createElement("p");
        msg.className = "today__message";
        msg.textContent = n.message;
        card.appendChild(msg);
      }

      list.appendChild(card);
    });

    section.hidden = false;
  })();

  if (startValid) {
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- Milestones ----------------
     Fully driven by cfg.milestones in config.js — add as many as you
     want (first talk, first date, proposal, wedding day, ...) and mark
     each one `completed: true` when it happens. A `date` is optional:
     with one, an upcoming (not-yet-completed) milestone shows a
     countdown; without one it just shows "Not yet".
  */
  (function buildMilestones() {
    var section = document.querySelector(".milestones");
    var track = document.getElementById("milestonesTrack");
    var list = (cfg.milestones || []).filter(Boolean);
    if (!list.length) { section.hidden = true; return; }

    var now = new Date();
    track.innerHTML = "";

    list.forEach(function (m) {
      var hasDate = !!m.date;
      var target = hasDate ? new Date(m.date) : null;
      var validDate = hasDate && !isNaN(target.getTime());
      var done = !!m.completed;

      var meta;
      if (done) {
        meta = validDate
          ? target.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
          : "Reached";
      } else if (validDate) {
        var daysLeft = Math.ceil((target - now) / 86400000);
        meta = daysLeft > 0 ? daysLeft + " days to go" : "Any day now";
      } else {
        meta = "Not yet";
      }

      var card = document.createElement("div");
      card.className = "milestone" + (done ? " milestone--done" : "");
      card.innerHTML =
        '<div class="milestone__ring">' + (done ? "\u2713" : "\u23F3") + "</div>" +
        (m.tag ? '<div class="milestone__pill">' + m.tag + "</div>" : "") +
        '<div class="milestone__name"></div>' +
        '<div class="milestone__meta"></div>';
      card.querySelector(".milestone__name").textContent = m.title || "Untitled milestone";
      card.querySelector(".milestone__meta").textContent = meta;
      track.appendChild(card);
    });

    // Scroll to the first not-yet-completed milestone.
    var firstUpcoming = track.querySelector(".milestone:not(.milestone--done)");
    if (firstUpcoming) {
      requestAnimationFrame(function () {
        track.scrollLeft = Math.max(0, firstUpcoming.offsetLeft - 16);
      });
    }
  })();

  document.getElementById("happyHeading").textContent = "Being Happy";

  /* ---------------- Player ---------------- */
  (function initPlayer() {
    var song = cfg.song || {};
    if (!song.src) return; // stays hidden until you set song.src in config.js
    var player = document.getElementById("player");
    var audio = document.getElementById("playerAudio");
    var toggle = document.getElementById("playerToggle");
    var iconPlay = document.getElementById("iconPlay");
    var iconPause = document.getElementById("iconPause");
    var seek = document.getElementById("playerSeek");
    var curEl = document.getElementById("playerCurrent");
    var durEl = document.getElementById("playerDuration");

    player.hidden = false;
    document.getElementById("playerTitle").textContent = song.title || "Untitled";
    document.getElementById("playerArtist").textContent = song.artist || "";
    audio.src = song.src;

    function fmt(sec) {
      if (!isFinite(sec) || sec < 0) sec = 0;
      var m = Math.floor(sec / 60);
      var s = Math.floor(sec % 60);
      return m + ":" + String(s).padStart(2, "0");
    }

    var seeking = false; // true while the user is dragging the slider

    // Browsers refuse to autoplay audio WITH sound before the visitor
    // has interacted with the page — that's a hard platform rule, not
    // something a site can turn off. What they do always allow is
    // autoplaying MUTED. So we start the song muted the instant the
    // page loads (it's genuinely playing, just silent), and unmute it
    // on the very first tap/scroll/key press anywhere on the page —
    // which on a phone is usually within a second of opening the link.
    audio.muted = true;
    audio.play().catch(function () {});

    var unmuteOnInteract = function () {
      audio.muted = false;
      if (audio.paused) audio.play().catch(function () {});
      ["pointerdown", "keydown", "touchstart", "scroll"].forEach(function (evt) {
        document.removeEventListener(evt, unmuteOnInteract);
      });
    };
    ["pointerdown", "keydown", "touchstart", "scroll"].forEach(function (evt) {
      document.addEventListener(evt, unmuteOnInteract, { once: true, passive: true });
    });

    toggle.addEventListener("click", function () {
      if (player.classList.contains("is-broken")) return;
      audio.muted = false;
      if (audio.paused) {
        audio.play().catch(function () {
          // Blocked or file missing — surface it instead of doing nothing.
          player.classList.add("is-broken");
          document.getElementById("playerTitle").textContent = "Couldn't load song";
        });
      } else {
        audio.pause();
      }
    });

    audio.addEventListener("play", function () {
      player.classList.add("is-playing");
      iconPlay.hidden = true; iconPause.hidden = false;
      toggle.setAttribute("aria-label", "Pause song");
    });
    audio.addEventListener("pause", function () {
      player.classList.remove("is-playing");
      iconPlay.hidden = false; iconPause.hidden = true;
      toggle.setAttribute("aria-label", "Play song");
    });

    audio.addEventListener("loadedmetadata", function () {
      seek.max = audio.duration || 0;
      durEl.textContent = fmt(audio.duration);
    });
    audio.addEventListener("timeupdate", function () {
      if (seeking) return;
      seek.value = audio.currentTime;
      curEl.textContent = fmt(audio.currentTime);
    });
    seek.addEventListener("input", function () {
      seeking = true;
      curEl.textContent = fmt(Number(seek.value));
    });
    seek.addEventListener("change", function () {
      audio.currentTime = Number(seek.value);
      seeking = false;
    });
    audio.addEventListener("error", function () {
      player.classList.add("is-broken");
      document.getElementById("playerTitle").textContent = "Song file not found";
      document.getElementById("playerArtist").textContent = song.src;
    });
  })();


})();
