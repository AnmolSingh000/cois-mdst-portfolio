// Initialize AOS with continuous animation on scroll
AOS.init({
  duration: 800,
  once: false, // re-trigger animations each time you scroll into view
  offset: 100,
});

// DOM Elements
const body = document.body;
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const colorBlindToggle = document.getElementById("colorBlindToggle");
const colorBlindIcon = document.getElementById("color-blind-icon");
const contrastToggle = document.getElementById("contrastToggle");
const contrastIcon = document.getElementById("contrast-icon");
const cookieBanner = document.getElementById("cookieBanner");
const acceptCookiesBtn = document.getElementById("acceptCookies");
const privacyModal = document.getElementById("privacyModal");
const openPrivacyModal = document.getElementById("openPrivacyModal");
const closePrivacyModal = document.getElementById("closePrivacyModal");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const contactForm = document.getElementById("contactForm");
const scrollLinks = document.querySelectorAll(".scroll-link");

// ---------------------- Course Details Slider Logic ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const courseSlider = document.getElementById("courseSlider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentSlide = 0; // track the current card index
  const totalSlides = 4; // you have 4 slides

  function updateSlidePosition() {
    // The container width is 400%, so each slide is 25%.
    const offsetPercentage = currentSlide * 25;
    courseSlider.style.transform = `translateX(-${offsetPercentage}%)`;
  }

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlidePosition();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlidePosition();
    }
  });

  // Initialize to first slide
  updateSlidePosition();
});

// Pointer Glow for data-glow
document.body.addEventListener("pointermove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  // Update CSS variables so each card can reference them for the glow
  document.documentElement.style.setProperty("--px", x + "px");
  document.documentElement.style.setProperty("--py", y + "px");
});

// ---------------------- QUIZ Data & Logic ----------------------
const quizData = [
  {
    question: "Which software is commonly used for video editing?",
    options: ["Microsoft Word", "Adobe Premiere Pro", "Adobe XD", "Notepad"],
    correct: 1,
  },
  {
    question: "What is essential for building web layouts?",
    options: ["Python", "CSS", "Java", "C++"],
    correct: 1,
  },
  {
    question: "Which principle focuses on making features easy to discover?",
    options: [
      "Feature Hiding",
      "Feature Discoverability",
      "Feature Complexity",
      "Feature Security",
    ],
    correct: 1,
  },
  {
    question: "What type of assets are used in 3D design?",
    options: ["Text Files", "Image Files", "Mesh Files", "Audio Files"],
    correct: 2,
  },
];

let currentQuestion = 0;
let score = 0;

function initializeQuiz() {
  showQuestion();
}

function showQuestion() {
  const question = quizData[currentQuestion];
  const quizContent = document.getElementById("quiz-content");

  const questionHTML = `
    <div class="quiz-question">${question.question}</div>
    <div class="quiz-options">
      ${question.options
        .map(
          (option, index) => `
        <div class="quiz-option" onclick="selectOption(${index})">
          ${option}
        </div>
      `
        )
        .join("")}
    </div>
  `;

  quizContent.innerHTML = questionHTML;

  // Update buttons
  document.getElementById("prev-btn").disabled = currentQuestion === 0;
  document.getElementById("next-btn").style.display =
    currentQuestion === quizData.length - 1 ? "none" : "block";
  document.getElementById("submit-btn").style.display =
    currentQuestion === quizData.length - 1 ? "block" : "none";
}

window.selectOption = function (selected) {
  const options = document.querySelectorAll(".quiz-option");
  const correct = quizData[currentQuestion].correct;

  options.forEach((option) =>
    option.classList.remove("selected", "correct", "wrong")
  );
  options[selected].classList.add("selected");

  if (selected === correct) {
    options[selected].classList.add("correct");
    score++;
  } else {
    options[selected].classList.add("wrong");
    options[correct].classList.add("correct");
  }

  // Disable further clicks
  options.forEach((option) => (option.style.pointerEvents = "none"));
};

document.getElementById("prev-btn")?.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

document.getElementById("next-btn")?.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
  }
});

document.getElementById("submit-btn")?.addEventListener("click", () => {
  const quizContent = document.getElementById("quiz-content");
  const result = document.getElementById("quiz-result");

  quizContent.style.display = "none";
  document.querySelector(".quiz-controls").style.display = "none";

  let message = `<h3>Quiz Complete!</h3>
    <p>You scored ${score} out of ${quizData.length}!</p>`;
  if (score === quizData.length) {
    message += `<p class="congrats" data-aos="bounce">🎉🎊 Congratulations! Perfect Score! 🎊🎉</p>`;
  }
  message += `<button onclick="resetQuiz()" class="quiz-btn">Try Again</button>`;

  result.innerHTML = message;
  result.style.display = "block";
});

window.resetQuiz = function () {
  currentQuestion = 0;
  score = 0;
  const quizContent = document.getElementById("quiz-content");
  const result = document.getElementById("quiz-result");

  quizContent.style.display = "block";
  document.querySelector(".quiz-controls").style.display = "flex";
  result.style.display = "none";

  showQuestion();
};

// ---------------------- Mobile Menu Toggle ----------------------
mobileMenuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ---------------------- Dark Mode Toggle ----------------------
function updateThemeIcon() {
  if (body.classList.contains("dark-mode")) {
    // In dark mode, show sun icon
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
  // Add rotate animation
  themeIcon.classList.add("rotate");
  setTimeout(() => {
    themeIcon.classList.remove("rotate");
  }, 300);
}

// Check localStorage for dark mode preference
const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
  body.classList.add("dark-mode");
}
updateThemeIcon();

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
  updateThemeIcon();
});

// ---------------------- Color-Blind Mode Toggle ----------------------
function updateColorBlindIcon() {
  // Add a rotate animation
  colorBlindIcon.classList.add("rotate");
  setTimeout(() => {
    colorBlindIcon.classList.remove("rotate");
  }, 300);
}

// Check localStorage for color-blind mode
const isColorBlindMode = localStorage.getItem("colorBlindMode") === "true";
if (isColorBlindMode) {
  body.classList.add("color-blind-mode");
}
colorBlindToggle?.addEventListener("click", () => {
  body.classList.toggle("color-blind-mode");
  localStorage.setItem(
    "colorBlindMode",
    body.classList.contains("color-blind-mode")
  );
  updateColorBlindIcon();
});

// ---------------------- High Contrast Mode Toggle ----------------------
function updateContrastIcon() {
  // Add a rotate animation
  contrastIcon.classList.add("rotate");
  setTimeout(() => {
    contrastIcon.classList.remove("rotate");
  }, 300);
}

// Check localStorage for high-contrast mode
const isHighContrastMode = localStorage.getItem("highContrastMode") === "true";
if (isHighContrastMode) {
  body.classList.add("high-contrast-mode");
}
contrastToggle?.addEventListener("click", () => {
  body.classList.toggle("high-contrast-mode");
  localStorage.setItem(
    "highContrastMode",
    body.classList.contains("high-contrast-mode")
  );
  updateContrastIcon();
});

// ---------------------- Cookie Banner ----------------------
const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";
if (cookiesAccepted && cookieBanner) {
  cookieBanner.style.display = "none";
}

acceptCookiesBtn?.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "true");
  cookieBanner.style.display = "none";
});

// ---------------------- Privacy Modal ----------------------
openPrivacyModal?.addEventListener("click", (e) => {
  e.preventDefault();
  privacyModal.style.display = "block";
});

closePrivacyModal?.addEventListener("click", () => {
  privacyModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === privacyModal) {
    privacyModal.style.display = "none";
  }
});

// ---------------------- Terms of Use Modal ----------------------
const termsModal = document.getElementById("termsModal");
const openTermsModal = document.getElementById("openTermsModal");
const closeTermsModal = document.getElementById("closeTermsModal");

openTermsModal?.addEventListener("click", (e) => {
  e.preventDefault();
  termsModal.style.display = "block";
});

closeTermsModal?.addEventListener("click", () => {
  termsModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === termsModal) {
    termsModal.style.display = "none";
  }
});

// ---------------------- Scroll to Top ----------------------
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ---------------------- Contact Form ----------------------
/**
 * Basic Input Sanitization & Front-End Validation
 * 1. Strips out HTML tags to prevent simple script injection.
 * 2. Ensures no empty fields.
 * 3. Checks basic email format.
 */
function sanitizeInput(value) {
  return value.replace(/<[^>]*>/g, "").trim();
}

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  // Grab fields
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const subjectField = document.getElementById("subject");
  const messageField = document.getElementById("message");

  // Sanitize inputs
  const nameValue = sanitizeInput(nameField.value);
  const emailValue = sanitizeInput(emailField.value);
  const subjectValue = sanitizeInput(subjectField.value);
  const messageValue = sanitizeInput(messageField.value);

  // Check for empty fields
  if (!nameValue || !emailValue || !subjectValue || !messageValue) {
    alert("Please fill in all required fields.");
    return;
  }

  // Simple email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailValue)) {
    alert("Please enter a valid email address.");
    return;
  }

  // If everything is valid, pretend to send
  alert("Message sent successfully!");
  contactForm.reset();
});

// ---------------------- Smooth Scroll for Nav Links ----------------------
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetID = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetID);
    if (!targetSection) return;

    window.scrollTo({
      top: targetSection.offsetTop - 0,
      behavior: "smooth",
    });

    // Close mobile menu if open
    navLinks.classList.remove("active");
  });
});

// ---------------------- Initialize Quiz & Swiper on DOM Load ----------------------
document.addEventListener("DOMContentLoaded", () => {
  initializeQuiz();

  // Initialize Swiper with a coverflow effect
  const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 250,
      modifier: 1,
      slideShadows: false,
    },
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Make center slide bigger & side slides blurred
  swiper.on("slideChangeTransitionStart", () => {
    swiper.slides.forEach((slide) => {
      slide.style.transform = "scale(0.9)";
      slide.style.filter = "blur(2px) brightness(0.8)";
    });
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
      activeSlide.style.transform = "scale(1.05)";
      activeSlide.style.filter = "none";
    }
  });

  // Trigger initial state
  swiper.emit("slideChangeTransitionStart");
});

// ---------------------- Navbar Overlay on Hero Scroll ----------------------
const heroSection = document.getElementById("home");
const navBar = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  const heroRect = heroSection.getBoundingClientRect();
  // If the hero is still on screen (bottom > 0), apply "hero-overlay"
  if (heroRect.bottom > 0) {
    navBar.classList.add("hero-overlay");
  } else {
    navBar.classList.remove("hero-overlay");
  }
});
