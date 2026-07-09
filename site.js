const translations = {
  en: {
    heroHeading: "CREATIVE STUDIO",
    heroPrimary:
      "We shape visual worlds for projects meant to be felt, remembered, and made unmistakably unique.",
    heroSupport1:
      "From concept to final production, we develop visual worlds that connect with audiences and make every project feel one of a kind.",
    heroSupport2:
      "We create art direction, characters, assets, animation, and digital content for brands, studios, and projects that need a powerful visual identity.",
    ourWorkTitle: "OUR WORK",
    ourWorkFocus: "Games · Animation · Visual Development",
    ourWorkParagraph1:
      "We collaborate with games, animation projects and creative teams to transform ideas into visual worlds, production systems and experiences.",
    ourWorkParagraph2:
      "Every project begins differently. Our work is to understand what it needs to become.",
    animationTitleWhite: "ANIMATION THAT BRINGS",
    animationTitleYellow: "YOUR IDEAS TO LIFE",
    processTitleWhite: "WHERE DOES THE MAGIC IN",
    processTitleYellow: "OUR WORK HAPPEN?",
    processParagraph1:
      "At every stage, we turn the invisible into the visible. With structure, ingenuity, and efficiency, ideas are given form.",
    processParagraph2:
      "It makes ideas visible — so they can be understood, valued, and remembered. We give shape to what does not yet exist.",
    contactTitle: "LET'S TALK!",
    contactText: "Share your idea. We'll shape it from concept to motion.",
  },
  es: {
    heroHeading: "ESTUDIO CREATIVO",
    heroPrimary:
      "Damos forma a mundos visuales para proyectos pensados para sentirse, recordarse y volverse inconfundibles.",
    heroSupport1:
      "Desde el concepto hasta la producción final, desarrollamos mundos visuales que conectan con las audiencias y hacen que cada proyecto se sienta único.",
    heroSupport2:
      "Creamos dirección de arte, personajes, assets, animación y contenido digital para marcas, estudios y proyectos que necesitan una identidad visual potente.",
    ourWorkTitle: "NUESTRO TRABAJO",
    ourWorkFocus: "Juegos · Animación · Desarrollo visual",
    ourWorkParagraph1:
      "Colaboramos con juegos, proyectos de animación y equipos creativos para transformar ideas en mundos visuales, sistemas de producción y experiencias.",
    ourWorkParagraph2:
      "Cada proyecto comienza de una manera distinta. Nuestro trabajo es entender en qué necesita convertirse.",
    animationTitleWhite: "ANIMACIÓN QUE DA VIDA",
    animationTitleYellow: "A TUS IDEAS",
    processTitleWhite: "¿DÓNDE OCURRE LA MAGIA DE",
    processTitleYellow: "NUESTRO TRABAJO?",
    processParagraph1:
      "En cada etapa, convertimos lo invisible en visible. Con estructura, ingenio y eficiencia, damos forma a las ideas.",
    processParagraph2:
      "Hacemos visibles las ideas para que puedan ser comprendidas, valoradas y recordadas. Damos forma a lo que todavía no existe.",
    contactTitle: "¡HABLEMOS!",
    contactText:
      "Comparte tu idea. La llevaremos desde el concepto hasta el movimiento.",
  },
};

const languageStorageKey = "othalart-language";

function setLanguage(language) {
  const activeLanguage = translations[language] ? language : "en";

  document.documentElement.lang = activeLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = translations[activeLanguage][key];

    if (value) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.language === activeLanguage
    );
  });

  localStorage.setItem(languageStorageKey, activeLanguage);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem(languageStorageKey) || "en";

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.language);
    });
  });

  setLanguage(savedLanguage);

  const videos = document.querySelectorAll(
    ".work-project-video, .demo-reel-video, .process-video"
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
