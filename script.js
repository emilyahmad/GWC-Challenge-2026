document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const sound = document.getElementById("clickSound");
  sound.volume = 0.4;

  if (!nav || !sound) return;

  nav.addEventListener("click", (e) => {
    // Only trigger if a child of .nav was clicked
    const clickedInsideNav = e.target.closest(".nav");
    if (!clickedInsideNav) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
  });
});
