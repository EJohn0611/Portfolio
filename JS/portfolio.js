class SectionAnimationController {
  constructor() {
    this.currentSection = null;
    this.sections = document.querySelectorAll('section');
    this.isMobile = window.matchMedia('(max-width: 768px)').matches; // Detect mobile
    this.init();
  }

  init() {
    const threshold = this.isMobile ? 0.1 : 0.3; // Lower threshold for mobile
    const rootMargin = this.isMobile ? '0px 0px -35% 0px' : '-50px 0px -50px 0px';
    // Observer setup
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateIn(entry.target);
          this.currentSection = entry.target;
        } else {
          // On mobile, do NOT fade-out
          if (!this.isMobile) {
            this.animateOut(entry.target);
          }
        }
      });
    }, {
      threshold,
      rootMargin
    });

    // Observe all
    this.sections.forEach(section => {
      this.observer.observe(section);
    });

    // Initial state: all hidden
    this.sections.forEach(section => {
      const elements = section.querySelectorAll('.fade-element');
      elements.forEach(el => {
        el.classList.remove('fade-in');
        el.classList.add('fade-out');
      });
    });
  }

  animateIn(section) {
    const elements = section.querySelectorAll('.fade-element');
    elements.forEach((element, index) => {
      // Remove fade-out class and add fade-in with staggered delay
      setTimeout(() => {
        element.classList.remove('fade-out');
        element.classList.add('fade-in');
      }, index * 150);
    });
  }

  animateOut(section) {
    const elements = section.querySelectorAll('.fade-element');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.remove('fade-in');
        element.classList.add('fade-out');
      }, index * 50);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SectionAnimationController();
  
  // Close menu when clicking outside on mobile
  document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');
    const mobileBtn = document.querySelector('.mobileVIew');
    
    if (window.innerWidth <= 768 && 
        !nav.contains(e.target) && 
        !mobileBtn.contains(e.target)) {
      nav.classList.remove('active');
      mobileBtn.classList.remove('active');
    }
  });
});

function copyValue(element) {
  const phoneNumber = element.getAttribute('data-value');
  navigator.clipboard.writeText(phoneNumber).then(() => {
    const originalTooltip = element.getAttribute('data-tooltip');
    element.setAttribute('data-tooltip', 'Copied!');
    setTimeout(() => {
      element.setAttribute('data-tooltip', originalTooltip);
    }, 2000);
  });
}