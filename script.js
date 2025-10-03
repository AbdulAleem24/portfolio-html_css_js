const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const timelineCards = document.querySelectorAll(".timeline-animate");
const serviceItems = document.querySelectorAll(".service-animate");
const connectCards = document.querySelectorAll(".connect-animate");
const mainEl = document.querySelector("main");

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-horizontal-item a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetHref = link.getAttribute('href');
    if (!targetHref || !targetHref.startsWith('#')) {
      return;
    }

    e.preventDefault();

    if (targetHref === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetSection = document.querySelector(targetHref);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Remove persistent focus when activated via mouse/touch, but keep it for keyboard users
    if (e.detail > 0) {
      requestAnimationFrame(() => link.blur());
    }
  });
});

// Active section highlighting in navigation
const navElement = document.querySelector('.nav-horizontal');
let navHeight = navElement ? navElement.offsetHeight : 0;

const navSectionEntries = Array.from(navLinks)
  .map((link) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return null;

    const targetSection = href === '#'
      ? document.querySelector('#home')
      : document.querySelector(href);

    if (!targetSection) return null;

    return {
      link,
      section: targetSection,
      id: targetSection.id || 'home',
    };
  })
  .filter(Boolean);

const managedLinks = navSectionEntries.map((entry) => entry.link);

const sectionOrder = [];
navSectionEntries.forEach(({ section }) => {
  if (!sectionOrder.includes(section)) {
    sectionOrder.push(section);
  }
});

let activeLink = null;
function setActiveSection(id) {
  if (!id) return;

  const entry = navSectionEntries.find((item) => item.id === id);
  if (!entry) return;

  if (activeLink === entry.link) return;

  managedLinks.forEach((link) => link.classList.remove('active'));
  entry.link.classList.add('active');
  activeLink = entry.link;
}

const sectionVisibility = new Map();
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      sectionVisibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
    });

    const visibleSection = [...sectionVisibility.entries()]
      .filter(([, ratio]) => ratio > 0)
      .sort((a, b) => b[1] - a[1])[0];

    if (visibleSection) {
      setActiveSection(visibleSection[0]);
      return;
    }

    const scrollPosition = window.scrollY + navHeight + 1;
    let fallbackId = sectionOrder[0]?.id || 'home';

    sectionOrder.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        fallbackId = section.id || fallbackId;
      }
    });

    setActiveSection(fallbackId);
  },
  {
    rootMargin: '-45% 0px -45% 0px',
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
  }
);

sectionOrder.forEach((section) => {
  if (section.id) {
    sectionVisibility.set(section.id, 0);
    sectionObserver.observe(section);
  }
});

window.addEventListener('resize', () => {
  navHeight = navElement ? navElement.offsetHeight : navHeight;
});

setActiveSection(sectionOrder[0]?.id || 'home');

// Animating work instances on scroll

workImgs.forEach((workImg) => workImg.classList.add("transform"));
timelineCards.forEach((card) => card.classList.add("transform"));
serviceItems.forEach((item) => item.classList.add("transform"));
connectCards.forEach((card) => card.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const [textbox, picture] = Array.from(entry.target.children);
      if (entry.isIntersecting) {
        // Remove transform from both picture and animations at the same time
        picture.classList.remove("transform");
        Array.from(textbox.children).forEach(
          (el) => (el.style.animationPlayState = "running")
        );
      }
    });
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Animating timeline cards on scroll
let timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("transform");
        const children = Array.from(entry.target.children);
        children.forEach((el) => {
          if (el.style) {
            el.style.animationPlayState = "running";
          }
        });
      }
    });
  },
  { threshold: 0.3 }
);

timelineCards.forEach((card) => {
  timelineObserver.observe(card);
});

// Animating service items on scroll
let servicesObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("transform");
        const children = Array.from(entry.target.children);
        children.forEach((child) => {
          // Animate all children recursively
          const allElements = child.querySelectorAll('*');
          allElements.forEach((el) => {
            if (el.style) {
              el.style.animationPlayState = "running";
            }
          });
          if (child.style) {
            child.style.animationPlayState = "running";
          }
        });
      }
    });
  },
  { threshold: 0.2 }
);

serviceItems.forEach((item) => {
  servicesObserver.observe(item);
});

// Animating connect cards on scroll
let connectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("transform");
        const children = Array.from(entry.target.children);
        children.forEach((child) => {
          const allElements = child.querySelectorAll('*');
          allElements.forEach((el) => {
            if (el.style) {
              el.style.animationPlayState = "running";
            }
          });
          if (child.style) {
            child.style.animationPlayState = "running";
          }
        });
      }
    });
  },
  { threshold: 0.2 }
);

connectCards.forEach((card) => {
  connectObserver.observe(card);
});

// Dynamic header text color based on background
function updateHeaderTextColor() {
  const header = document.querySelector('.header');
  const navHorizontal = document.querySelector('.nav-horizontal');
  const sections = document.querySelectorAll('section, .header');
  
  // Get the position of the navigation bar
  const navRect = navHorizontal.getBoundingClientRect();
  const navCenter = navRect.top + navRect.height / 2;
  
  // Find which section is behind the header
  let currentSection = null;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= navCenter && rect.bottom >= navCenter) {
      currentSection = section;
    }
  });
  
  if (!currentSection) return;
  
  // Get the computed background color of the current section
  const bgColor = window.getComputedStyle(currentSection).backgroundColor;
  
  // Function to calculate luminance from rgb color
  function getLuminance(rgbString) {
    // Parse RGB values
    const rgb = rgbString.match(/\d+/g);
    if (!rgb) return 1; // Default to light if can't parse
    
    const [r, g, b] = rgb.map(val => {
      const normalized = val / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });
    
    // Calculate relative luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  
  const luminance = getLuminance(bgColor);
  
  // If luminance is high (light background), use dark text
  // If luminance is low (dark background), use light text
  if (luminance > 0.5) {
    navHorizontal.classList.add('on-light-bg');
    navHorizontal.classList.remove('on-dark-bg');
  } else {
    navHorizontal.classList.add('on-dark-bg');
    navHorizontal.classList.remove('on-light-bg');
  }
}

// Run on scroll and on load
window.addEventListener('scroll', updateHeaderTextColor);
window.addEventListener('load', updateHeaderTextColor);
updateHeaderTextColor();
