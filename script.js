// ===============================
// SCROLL SUAVE PARA LINKS INTERNOS
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ===================================
// ANIMAÇÃO AO ENTRAR NA TELA (OBSERVE)
// ===================================
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // anima só uma vez
            }
        });
    },
    { threshold: 0.2 }
);

document
    .querySelectorAll(".card, .hero-box, .titulo")
    .forEach(element => observer.observe(element));


// ==========================
// EFEITO PULSE NO WHATSAPP
// ==========================
const whatsappBtn = document.querySelector(".whatsapp-float");

if (whatsappBtn) {
    setInterval(() => {
        whatsappBtn.classList.toggle("pulse");
    }, 1200);
}


// =====================
// FEEDBACK DE CLIQUE
// =====================
document.querySelectorAll(".btn, .card").forEach(element => {
    element.addEventListener("click", () => {
        element.style.transform = "scale(0.96)";

        setTimeout(() => {
            element.style.transform = "";
        }, 150);
    });
});
