/* SCROLL SUAVE */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* ANIMAÇÃO AO APARECER NA TELA */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".card, .hero-box, .titulo")
  .forEach(el => observer.observe(el));

/* EFEITO PULSE NO WHATSAPP */
setInterval(() => {
  const btn = document.querySelector(".whatsapp-float");
  if(btn){
    btn.classList.toggle("pulse");
  }
}, 1200);

/* FEEDBACK DE CLIQUE */
document.querySelectorAll(".btn, .card").forEach(el => {
  el.addEventListener("click", () => {
    el.style.transform = "scale(0.96)";
    setTimeout(() => {
      el.style.transform = "";
    }, 150);
  });
});
