document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const sound = document.getElementById("clickSound");
  sound.volume = 0.1;

  if (!nav || !sound) return;

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

  // Clear text so we can type it out
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
    // Start audio immediately
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