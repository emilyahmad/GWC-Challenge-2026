document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const sound = document.getElementById("clickSound");
  if (!nav || !sound) return;
  sound.volume = 0.1;

  nav.addEventListener("click", (e) => {
    const clickedInsideNav = e.target.closest(".nav");
    if (!clickedInsideNav) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const h2 = document.querySelector(".dashboard h2");
  const h3 = document.querySelector(".dashboard h3");
  const audio = document.getElementById("loadingAudio");

  if (!h2 || !h3 || !audio) return;

  const h2Text = h2.textContent.trim();
  const h3Text = h3.textContent.trim();

  h2.textContent = "";
  h3.textContent = "";
  h2.style.visibility = "visible";
  h3.style.visibility = "visible";

  const speed = 8;
  const typingDelayMs = 150;
  const startVolume = 0.12;

  audio.volume = startVolume;

  function typeInto(el, text, done) {
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) {
        clearInterval(timer);
        done?.();
      }
    }, speed);
  }

  function fadeOutAndStop() {
    const fade = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - 0.01);
      if (audio.volume <= 0) {
        clearInterval(fade);
        audio.pause();
        audio.currentTime = 0;
        audio.volume = startVolume;
      }
    }, 30);
  }

  function startSequence() {
    audio.currentTime = 0;
    audio.play().catch(() => {
      document.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }, { once: true });
    });

    setTimeout(() => {
      typeInto(h2, h2Text, () => {
        typeInto(h3, h3Text, () => {
          fadeOutAndStop();
        });
      });
    }, typingDelayMs);
  }

  startSequence();
});

document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("panel");
  const title = document.getElementById("panelTitle");
  const text = document.getElementById("panelText");

  const mapping = {
    Detect: {
      title: "Detect",
      text: "Upload an image to start detection."
    },
    Hash: {
      title: "Hash",
      text: "Paste text and generate a secure hash."
    },
    Predict: {
      title: "Predict",
      text: "Select a model and run a prediction."
    },
    History: {
      title: "History",
      text: "View recent analyses and logs."
    }
  };

  document.querySelector(".nav")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-button, .nav-button1, .nav-button2");
    if (!btn) return;

    const label = btn.querySelector("h3")?.textContent?.trim();
    if (!label) return;

    const data = mapping[label] || { title: label, text: "Loading..." };

    document.body.classList.add("panel-open");

    title.textContent = data.title;
    text.textContent = data.text;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const back = document.getElementById("navBack");
  const sound = document.getElementById("clickSound");

  if (!back || !sound) return;

  sound.volume = 0.1;

  back.addEventListener("click", (e) => {
    // Always stop it from bubbling up to .nav click handlers
    e.stopPropagation();

    // Only do anything when panel is open
    if (!document.body.classList.contains("panel-open")) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});

    document.body.classList.remove("panel-open");
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const next = document.getElementById("navNext");

  if (!nav || !next) return;

  const buttons = Array.from(
    nav.querySelectorAll(".nav-button1, .nav-button, .nav-button2")
  );

  let index = 0;

  next.addEventListener("click", (e) => {
    e.stopPropagation();

    index = (index + 1) % buttons.length;
    buttons[index].click();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const back = document.getElementById("navBack");
  const next = document.getElementById("navNext");

  if (!back || !next) return;

  document.addEventListener("keydown", (e) => {
    // Don't hijack arrow keys while typing in inputs/textareas
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea") return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      back.click();   // same as clicking <<
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      next.click();   // same as clicking >>
    }
  });
});
