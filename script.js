// Initialize AOS with continuous animation on scroll
AOS.init({
  duration: 800,
  once: false, // re-trigger animations each time you scroll into view
  offset: 100
});

// DOM Elements
const body = document.body;
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const privacyModal = document.getElementById('privacyModal');
const openPrivacyModal = document.getElementById('openPrivacyModal');
const closePrivacyModal = document.getElementById('closePrivacyModal');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contactForm');
const scrollLinks = document.querySelectorAll('.scroll-link');





// ---------------------- Course Details Slider Logic ----------------------
// Course Details Slider
document.addEventListener('DOMContentLoaded', () => {
  const courseSlider = document.getElementById('courseSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentSlide = 0; // track the current card index
  const totalSlides = 4; // you have 4 slides

  function updateSlidePosition() {
    // The container width is 400%, so each slide is 25%. 
    // currentSlide * 25 => the percentage offset for the transform
    const offsetPercentage = currentSlide * 25;
    courseSlider.style.transform = `translateX(-${offsetPercentage}%)`;
  }

  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlidePosition();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlidePosition();
    }
  });

  // Initialize to first slide
  updateSlidePosition();
});

// Pointer Glow for data-glow
document.body.addEventListener('pointermove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  // Update CSS variables so each card can reference them for the glow
  document.documentElement.style.setProperty('--px', x + 'px');
  document.documentElement.style.setProperty('--py', y + 'px');
});











// Quiz Data
const quizData = [
  {
    question: "Which software is commonly used for video editing?",
    options: ["Microsoft Word", "Adobe Premiere Pro", "Adobe XD", "Notepad"],
    correct: 1
  },
  {
    question: "What is essential for building web layouts?",
    options: ["Python", "CSS", "Java", "C++"],
    correct: 1
  },
  {
    question: "Which principle focuses on making features easy to discover?",
    options: ["Feature Hiding", "Feature Discoverability", "Feature Complexity", "Feature Security"],
    correct: 1
  },
  {
    question: "What type of assets are used in 3D design?",
    options: ["Text Files", "Image Files", "Mesh Files", "Audio Files"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

// Initialize Quiz
function initializeQuiz() {
  showQuestion();
}

// Show Question
function showQuestion() {
  const question = quizData[currentQuestion];
  const quizContent = document.getElementById('quiz-content');
  
  const questionHTML = `
    <div class="quiz-question">${question.question}</div>
    <div class="quiz-options">
      ${question.options.map((option, index) => `
        <div class="quiz-option" onclick="selectOption(${index})">
          ${option}
        </div>
      `).join('')}
    </div>
  `;
  
  quizContent.innerHTML = questionHTML;
  
  // Update buttons
  document.getElementById('prev-btn').disabled = currentQuestion === 0;
  document.getElementById('next-btn').style.display = currentQuestion === quizData.length - 1 ? 'none' : 'block';
  document.getElementById('submit-btn').style.display = currentQuestion === quizData.length - 1 ? 'block' : 'none';
}

// Select Option
window.selectOption = function(selected) {
  const options = document.querySelectorAll('.quiz-option');
  const correct = quizData[currentQuestion].correct;
  
  options.forEach(option => option.classList.remove('selected', 'correct', 'wrong'));
  options[selected].classList.add('selected');
  
  if (selected === correct) {
    options[selected].classList.add('correct');
    score++;
  } else {
    options[selected].classList.add('wrong');
    options[correct].classList.add('correct');
  }
  
  options.forEach(option => option.style.pointerEvents = 'none');
};

// Navigation
document.getElementById('prev-btn')?.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

document.getElementById('next-btn')?.addEventListener('click', () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
  }
});

document.getElementById('submit-btn')?.addEventListener('click', () => {
  const quizContent = document.getElementById('quiz-content');
  const result = document.getElementById('quiz-result');
  
  quizContent.style.display = 'none';
  document.querySelector('.quiz-controls').style.display = 'none';
  
  let message = `<h3>Quiz Complete!</h3>
    <p>You scored ${score} out of ${quizData.length}!</p>`;
  if (score === quizData.length) {
    message += `<p class="congrats" data-aos="bounce">🎉🎊 Congratulations! Perfect Score! 🎊🎉</p>`;
  }
  message += `<button onclick="resetQuiz()" class="quiz-btn">Try Again</button>`;
  
  result.innerHTML = message;
  result.style.display = 'block';
});

// Reset Quiz
window.resetQuiz = function() {
  currentQuestion = 0;
  score = 0;
  const quizContent = document.getElementById('quiz-content');
  const result = document.getElementById('quiz-result');
  
  quizContent.style.display = 'block';
  document.querySelector('.quiz-controls').style.display = 'flex';
  result.style.display = 'none';
  
  showQuestion();
};

// Mobile Menu Toggle
mobileMenuBtn?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Theme Toggle with Icon Animation
function updateThemeIcon() {
  if (body.classList.contains('dark-mode')) {
    // In dark mode, show sun icon
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
  // Add a smooth rotate animation
  themeIcon.classList.add('rotate');
  setTimeout(() => {
    themeIcon.classList.remove('rotate');
  }, 300);
}

// Set initial icon based on saved preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
  body.classList.add('dark-mode');
}
updateThemeIcon();

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
  updateThemeIcon();
});

// Cookie Banner
const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
if (cookiesAccepted && cookieBanner) {
  cookieBanner.style.display = 'none';
}

acceptCookiesBtn?.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'true');
  cookieBanner.style.display = 'none';
});

// Privacy Modal
openPrivacyModal?.addEventListener('click', (e) => {
  e.preventDefault();
  privacyModal.style.display = 'block';
});

closePrivacyModal?.addEventListener('click', () => {
  privacyModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === privacyModal) {
    privacyModal.style.display = 'none';
  }
});

// Terms of Use Modal Elements
const termsModal = document.getElementById('termsModal');
const openTermsModal = document.getElementById('openTermsModal');
const closeTermsModal = document.getElementById('closeTermsModal');

// Open Terms Modal
openTermsModal?.addEventListener('click', (e) => {
  e.preventDefault();
  termsModal.style.display = 'block';
});

// Close Terms Modal
closeTermsModal?.addEventListener('click', () => {
  termsModal.style.display = 'none';
});

// Close Terms Modal if user clicks outside
window.addEventListener('click', (e) => {
  if (e.target === termsModal) {
    termsModal.style.display = 'none';
  }
});


// Scroll to Top
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Contact Form
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent successfully!');
  contactForm.reset();
});

// Smooth Scroll for Nav Links
scrollLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetID = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if (!targetSection) return;
    
    window.scrollTo({
      top: targetSection.offsetTop - 0,
      behavior: 'smooth'
    });

    // Close mobile menu if open
    navLinks.classList.remove('active');
  });
});

// Initialize Quiz & Swiper on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initializeQuiz();

  // Initialize Swiper with a coverflow effect
  const swiper = new Swiper('.mySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto', 
    coverflowEffect: {
      rotate: 0,        // No rotation
      stretch: 0,       // Distance between slides
      depth: 250,       // 3D depth
      modifier: 1,
      slideShadows: false,
    },
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Make center slide bigger & side slides blurred
  swiper.on('slideChangeTransitionStart', () => {
    swiper.slides.forEach((slide) => {
      slide.style.transform = 'scale(0.9)';
      slide.style.filter = 'blur(2px) brightness(0.8)';
    });
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
      activeSlide.style.transform = 'scale(1.05)';
      activeSlide.style.filter = 'none';
    }
  });

  // Trigger initial state
  swiper.emit('slideChangeTransitionStart');
});
