class SectionAnimationController {
  constructor() {
    this.currentSection = null;
    this.sections = document.querySelectorAll('section');
    this.isMobile = window.matchMedia('(max-width: 768px)').matches; 
    this.init();
  }

  init() {
    const threshold = this.isMobile ? 0.1 : 0.3; 
    const rootMargin = this.isMobile ? '0px 0px -35% 0px' : '-50px 0px -50px 0px';
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateIn(entry.target);
          this.currentSection = entry.target;
        } else {
         
          if (!this.isMobile) {
            this.animateOut(entry.target);
          }
        }
      });
    }, {
      threshold,
      rootMargin
    });

    
    this.sections.forEach(section => {
      this.observer.observe(section);
    });

    
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


document.addEventListener('DOMContentLoaded', () => {
  new SectionAnimationController();
  
  
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

  const sections = document.querySelectorAll('.section-fade');

  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        entry.target.classList.remove('fade-out');
      } else {
        entry.target.classList.remove('fade-in');
        entry.target.classList.add('fade-out');
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => {
    observer.observe(section);
  });

 
  function showSectionFromHash() {
    const hash = window.location.hash || "#about";
    sections.forEach(sec => {
      if ("#" + sec.id === hash) {
        sec.scrollIntoView({ behavior: "smooth" });
        sec.classList.add('fade-in');
        sec.classList.remove('fade-out');
      }
    });
  }

  window.addEventListener('hashchange', showSectionFromHash);

  
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight &&
        section.getBoundingClientRect().bottom > 0) {
      section.classList.add('fade-in');
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