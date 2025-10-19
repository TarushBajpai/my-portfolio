/* ================= TYPING EFFECT ================= */
const text = "Software Engineer | Java • Python • Web Development | Robotics Projects";
const typingEl = document.getElementById("typing");
let i = 0;

function typeWriter() {
  if (i < text.length) {
    typingEl.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}
typeWriter();

/* ================= PARTICLE BACKGROUND ================= */
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 80; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

initParticles();
animateParticles();

/* ================= NAVBAR ACTIVE LINK ON SCROLL ================= */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });

  showProjectCards();
});

/* ================= PROJECT CARDS FADE-IN ON SCROLL ================= */
const projectCards = document.querySelectorAll(".project-card");

function showProjectCards() {
  const triggerBottom = window.innerHeight / 5 * 4;
  projectCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add("show");
    }
  });
}

// Trigger on page load
window.addEventListener("load", showProjectCards);

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent! (This is a demo, no backend connected)");
  contactForm.reset();
});

document.getElementById("portfolio-link").addEventListener("click", (e) => {
  e.preventDefault();
  // Scroll to hero section
  document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
  // Show message
  setTimeout(() => {
    alert("You're already viewing the portfolio project!");
  }, 700);
});

