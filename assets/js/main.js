"use strict";

/* ---- Configuration du projet (à modifier) ----
   Laissez une valeur vide ("") pour masquer le bouton. */
const CONFIG = {
  project: {
    github: "",  // ex. "https://github.com/votre-compte/pointage-biometrique"
    demo: ""     // ex. "https://votre-demo.vercel.app"
  }
};

/* ---- Menu mobile ---- */
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ---- Apparition des sections au défilement ---- */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add("in"));
}

/* ---- Lien actif dans la navigation ---- */
const links = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));

/* ---- Pipeline Code → Debug → Deploy → Secure (une seule animation) ---- */
const steps = [...document.querySelectorAll("#pipeline li")];
if (steps.length && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let i = 0;
  const t = setInterval(() => {
    i += 1;
    if (i >= steps.length) { clearInterval(t); return; }
    steps[i].classList.add("on");
  }, 700);
} else {
  steps.forEach(s => s.classList.add("on"));
}

/* ---- Liens du projet ---- */
const { github, demo } = CONFIG.project;
const box = document.getElementById("project-links");
function addLink(href, text, primary) {
  if (!href) return;
  const a = document.createElement("a");
  a.href = href; a.textContent = text;
  a.className = "btn" + (primary ? " primary" : "");
  a.target = "_blank"; a.rel = "noopener noreferrer";
  box.appendChild(a);
}
addLink(demo, "Voir la démo", true);
addLink(github, "Code sur GitHub", false);

/* ---- Logos : masquer proprement ceux qui ne se chargent pas ---- */
document.addEventListener("error", e => {
  if (e.target.classList && e.target.classList.contains("ic")) e.target.remove();
}, true);

/* ---- Puces : ordre d'apparition ---- */
document.querySelectorAll(".tags").forEach(ul =>
  [...ul.children].forEach((li, i) => li.style.setProperty("--i", i)));

/* ---- Barre de progression ---- */
const bar = document.getElementById("progress");
function progress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
}
addEventListener("scroll", progress, { passive: true }); progress();

/* ---- Inclinaison 3D légère des cartes (souris uniquement) ---- */
if (matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
  document.querySelectorAll(".group, .project").forEach(card => {
    const amp = card.classList.contains("project") ? 1.5 : 5;
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = "perspective(900px) rotateY(" + x * amp + "deg) rotateX(" + -y * amp + "deg)";
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

/* ---- Agrandissement des captures ---- */
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
document.querySelectorAll(".shot").forEach(b => b.addEventListener("click", () => {
  lbImg.src = b.dataset.full; lbImg.alt = b.dataset.alt; lb.showModal();
}));
document.getElementById("lb-close").addEventListener("click", () => lb.close());
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });

document.getElementById("year").textContent = new Date().getFullYear();
