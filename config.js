/* =====================================================================
   EDIT THIS FILE ONLY.
   This is the single place with your names, date, photos, quote, song
   and links. Everything else (index.html, style.css, script.js) is
   layout/logic and you shouldn't need to touch it.
   ===================================================================== */

window.SITE_CONFIG = {

  // ---- Couple ----
  names: "Zurin & Tarek",

  // Start date & time of your relationship, in your local time.
  // Format: "YYYY-MM-DDTHH:MM:SS"
  startDate: "2025-08-22T00:00:00",

  // ---- Photos ----
  // Put your own images in assets/photos/ and list them here.
  // Each photo can have its own short caption/story, shown when you
  // click the centered photo to expand it. Leave caption empty to skip it.
  photos: [
    { src: "assets/photos/8.jpg", caption: "most beautiful angry face" },
    { src: "assets/photos/0.jpg", caption: "the beginning" },
    { src: "assets/photos/1.jpg", caption: "our most favorite place" },
    { src: "assets/photos/2.jpg", caption: "very first photo of her that i captured" },
    { src: "assets/photos/3.jpg", caption: "her most favourite photo" },
    { src: "assets/photos/4.jpg", caption: "our very first snacks together" },
    { src: "assets/photos/5.jpg", caption: "first lunch we had together" },
    { src: "assets/photos/6.jpg", caption: "our very first rickshaw ride" },
    { src: "assets/photos/7.jpg", caption: "happy her" },

  ],

  // ---- Quote ----
  // Write your own words here — keep it personal and yours.
  quote: "Love isn't something you find, it's something you build — one ordinary day at a time, one small choice after another. Somewhere in all those ordinary days, I found the piece that completes me. I can't picture my life without your laugh, your eyes, or the quiet feeling of home you carry with you.",

  // ---- Today's note ----
  // A message that only appears on a matching date — e.g. wish her a
  // happy birthday and it'll show up on the site only on that day.
  // Add as many entries as you like:
  //   title:   heading, e.g. "Happy Birthday"
  //   date:    "MM-DD" to repeat every year (birthdays, anniversaries),
  //            or "YYYY-MM-DD" for a one-off date
  //   photo:   optional, path to an image in assets/ (leave "" to skip)
  //   message: what you want to say
  // On any day with no match, this section is simply empty.
  notes: [
    { title: "", date: "", photo: "", message: "" },
    { title: "It all started today, back in 2025", date: "08-22", photo: "assets/photos/0.jpg", message: "We knew each other since 2021. I liked you back then, but never had the courage to say it because I didn't know what you felt about me.\nThen, on 21 August 2025, I got my first job and decided it was finally time to tell you.\nThe next day, 22 August, you posted a story with your passport. I simply asked, 'baire cole jaccho naki?'\nThat little message changed everything.\nFrom that day, we started talking every day. And somehow, one conversation turned into a journey that brought us here—married, together, and building a life of our own.\nLooking back, I realize how grateful I am that I sent that message, that you replied, and that life gave us this beautiful chance.\nFrom 'baire cole jaccho naki?' to 'my wife.'\n\nWhat a journey. 🤍" },
    { title: "No messages on this day back in 2025", date: "08-23", photo: "", message: "You didn't upload any stories, and I didn't get a chance to message you.😐\n\nWhy didn’t you upload anything?😒" },
    { title: "Life Wrote Us", date: "08-25", photo: "assets/photos/9.jpg", message: "Life gave me you, and somehow, 250 kilometers never felt too far./nI can travel from Chattogram to Dhaka week after week with the same excitement, just because I know you’re there waiting for me. And maybe you’re at home thinking the clock is moving painfully slow, waiting for your husband to finally arrive./nOh yeah… we’re husband and wife now. How beautiful does that sound? 🤍/nA year ago today, we were just two people who started talking, with absolutely no idea what life had planned for us. And look at us now—one year later, with a story I wouldn’t trade for anything./nI’m just grateful for everything life has given us so far, and even more excited for everything that’s still waiting ahead./nBecause whatever comes next, I want to discover it all with you. ❤️" },
  ],

  // ---- Optional background song ----
  // 1. Drop your song file into the assets/ folder, e.g. assets/song.mp3
  // 2. Set src below to that path, and fill in title/artist.
  // 3. Only use music you own the rights to, or leave src empty to hide
  //    the player entirely.
  song: {
    title: "Her Most Favourite Song",
    artist: "Singer: Rishbh Tiwari",
    src: "assets/song.mp3" // e.g. "assets/song.mp3"
  },

  // ---- Milestones ----
  // Add as many as you want, in any order — they'll show up left to
  // right. Each one:
  //   title:     what it was, e.g. "First Talk"
  //   date:      "YYYY-MM-DD" (optional — leave "" if you don't want
  //              to show a date/countdown for it)
  //   tag:       a short label shown above the title, e.g. "Day 1"
  //              (optional)
  //   completed: true once it's happened, false if it's still ahead
  //              (an upcoming milestone with a date shows a countdown;
  //              without a date it just shows "Not yet")
  milestones: [
    { title: "Conversation Started", tag: "", date: "2025-08-22", completed: true },
    { title: "Confessed Her", tag: "", date: "2025-08-30", completed: true },
    { title: "First Date", tag: "", date: "2025-10-10", completed: true },
    { title: "Formal Proposal To Her Family", tag: "", date: "2025-02-06", completed: true },
    { title: "Got Married", tag: "", date: "2026-05-15", completed: true },
    { title: "Honeymoon", tag: "", date: "2026-05-22", completed: true },
    { title: "Paper Anniversary", tag: "", date: "2027-05-15", completed: false },
    { title: "Cotton Anniversary", tag: "", date: "2028-05-15", completed: false },
    { title: "Wheat Anniversary", tag: "", date: "2029-05-15", completed: false },
    { title: "Flowers Anniversary", tag: "", date: "2030-05-15", completed: false },
    { title: "Wood Anniversary", tag: "", date: "2031-05-15", completed: false },
    { title: "Perfume Anniversary", tag: "", date: "2032-05-15", completed: false },
    { title: "Wool Anniversary", tag: "", date: "2033-05-15", completed: false },
    { title: "Clay Anniversary", tag: "", date: "2034-05-15", completed: false },
    { title: "Tin Anniversary", tag: "", date: "2036-05-15", completed: false },
    { title: "Crystal Anniversary", tag: "", date: "2041-05-15", completed: false },
    { title: "Porcelain Anniversary", tag: "", date: "2046-05-15", completed: false },
    { title: "Silver Anniversary", tag: "", date: "2051-05-15", completed: false },
    { title: "Pearl Anniversary", tag: "", date: "2056-05-15", completed: false },
    { title: "Gold Anniversary", tag: "", date: "2076-05-15", completed: false },
    { title: "Diamond Anniversary", tag: "", date: "2101-05-15", completed: false },
  ],

};
