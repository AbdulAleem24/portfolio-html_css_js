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
    e.preventDefault();
    const targetId = link.getAttribute('href');
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Animating work instances on scroll

workImgs.forEach((workImg) => workImg.classList.add("transform"));
timelineCards.forEach((card) => card.classList.add("transform"));
serviceItems.forEach((item) => item.classList.add("transform"));
connectCards.forEach((card) => card.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
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

// Rotating logos animation

const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
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
