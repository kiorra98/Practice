document.addEventListener("DOMContentLoaded", () => {
  const isSpanish = window.location.pathname.startsWith("/es");
  const activeLang = isSpanish ? "es" : "en";

  document.documentElement.lang = activeLang;

  document.querySelectorAll(".lang-copy").forEach((element) => {
    element.hidden = element.dataset.lang !== activeLang;
  });

  const videos = document.querySelectorAll(
    ".work-project-video, .demo-reel-video"
  );

  if (!("IntersectionObserver" in window)) {
    videos.forEach((video) => {
      video.play().catch(() => {});
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  videos.forEach((video) => {
    observer.observe(video);
  });
});
