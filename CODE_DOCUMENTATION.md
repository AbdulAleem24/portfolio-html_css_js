# Portfolio Website - Complete Code Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [HTML Architecture](#html-architecture)
4. [CSS Styling System](#css-styling-system)
5. [JavaScript Functionality](#javascript-functionality)
6. [Animation System](#animation-system)

---

## Project Overview

A modern, responsive portfolio website featuring:
- **Dark mode design** with gradient accents
- **Scroll-based animations** for content reveal
- **Interactive text decryption effect** for name display
- **Dynamic navigation** with background-aware color switching
- **Responsive layout** optimized for all screen sizes

**Technologies**: HTML5, CSS3 (Custom Properties), Vanilla JavaScript, Intersection Observer API

---

## File Structure

```
portfolio-template/
├── index.html              # Main HTML structure
├── style.css               # Complete styling (all sections)
├── script.js               # Main interactions & animations
├── decrypted-text.js       # Text encryption effect library
├── AbdulAleemResume.pdf    # Resume download
└── assets/
    ├── fonts/
    │   └── Mona-Sans.woff2 # Custom font
    └── images/             # All images & icons
```

---

## HTML Architecture

### Document Head
```html
<head>
  <!-- SEO Meta Tags -->
  - Charset, viewport, IE compatibility
  - Description: Full-stack developer portfolio
  - Open Graph tags (Facebook, Twitter)
  - Itemprop for Google indexing
  
  <!-- Performance -->
  - Font preloading for Mona-Sans
  - Deferred script loading
  
  <!-- Files -->
  - style.css: All styling
  - decrypted-text.js: Text animation
  - script.js: Main functionality
</head>
```

**Key Features:**
- **Meta robots**: `index, follow` for SEO
- **Open Graph**: Social media preview cards
- **Font preload**: Reduces layout shift on load

### Body Structure

#### 1. **Dark Mode Script** (Inline)
```javascript
document.body.classList.add("dark");
```
- Immediately adds dark mode before page render
- Prevents flash of wrong theme

#### 2. **Horizontal Navigation Bar**
```html
<nav class="nav-horizontal">
  - Fixed position, sticky header
  - Backdrop blur effect
  - Dynamic text color (light/dark backgrounds)
  - Resume download button with icon
  - Links: Home, Experience, Services, Projects, Contact
</nav>
```

**Navigation Features:**
- **Smooth scroll**: JavaScript handles anchor clicks
- **Background detection**: Nav text adapts to section behind it
- **Responsive**: Adjusts spacing on mobile

#### 3. **Header Section**
```html
<header class="header">
  <h1 class="header-name">
    <span data-decrypted>abdul</span>
    <span data-decrypted>aleem</span>
  </h1>
  <p class="header-subtitle">Developer titles</p>
  <div class="header-description">
    Two-paragraph introduction
  </div>
</header>
```

**Header Highlights:**
- **Grid layout**: 3:2 ratio (name vs description)
- **Decrypted text**: Name animates with encryption effect
- **Responsive**: Stacks vertically on mobile
- **Large typography**: 4.5-8rem for name (clamp function)

#### 4. **Timeline Section** (Experience/Education)
```html
<section class="timeline">
  - Vertical timeline with center line
  - Alternating left/right cards
  - 4 experience/education entries
  - Animated on scroll
</section>
```

**Timeline Structure:**
- **Visual line**: Center vertical divider
- **Markers**: Circular dots at timeline points
- **Cards**: Background, border, rounded corners
- **Content**: Heading, meta (date/company), description

#### 5. **Services Section** (Skills)
```html
<section class="services">
  Three service items:
  01 - Programming Languages
  02 - Tech Stack & Cloud
  03 - Certifications
</section>
```

**Layout:**
- **Grid**: Header + list layout (1:2 ratio on desktop)
- **Icons**: SVG icons for each skill
- **Links**: Certification cards link to Credly badges

#### 6. **Work Section** (Projects)
```html
<section class="work">
  Three projects:
  - InvestLink (AI investment platform)
  - Finovo (Finance manager)
  - TalentSwipe (Job matching)
  
  Each with:
  - Image screenshot
  - Description
  - Technology tags
  - Live/GitHub links
</section>
```

**Work Box Layout:**
- **Flexbox**: 49% image, 49% text
- **Images**: 785px max width, 450px height
- **Animations**: Staggered entrance on scroll

#### 7. **Connect Section** (Contact)
```html
<section class="connect">
  Four contact cards:
  - GitHub
  - LinkedIn  
  - Email
  - Phone
  
  Grid layout with hover effects
</section>
```

**Card Features:**
- **Gradient accent**: Top border on hover
- **Transform**: Lift effect (-8px)
- **Arrow animation**: Slides right on hover

---

## CSS Styling System

### CSS Custom Properties (Variables)

```css
:root {
  /* Typography Scale */
  --h1: 3.5rem;
  --h2: 3rem;
  --h3: 2.145rem;
  --text-large: 1.6rem;
  --text-medium: 1.275rem;
  --text-small: 1.125rem;
  
  /* Spacing System */
  --gutter-nano: 0.5rem;
  --gutter-micro: 1rem;
  --gutter-small: 2rem;
  --gutter-medium: 2.5rem;
  --gutter-large: 3rem;
  --gutter-x-large: 6rem;
  --gutter-huge: 12rem;
  
  /* Colors (Dark Theme) */
  --bg-color-primary: #0c0a0a;
  --bg-color-secondary: #161211;
  --important: #fff;
  --sub: #c3c3c3;
  --body: #989898;
  --border: #c0c0c015;
  
  /* Layout */
  --site-max-width: 1280px;
  --radius: 140px;
  --scroll-padding: 4.375rem;
  
  /* Effects */
  --gradient-brand: radial-gradient(...);
  --easing: cubic-bezier(0.86, 0, 0.07, 1);
}
```

### Typography System

**Font Family:**
```css
@font-face {
  font-family: "Mona Sans";
  /* Variable font: weight 200-900, stretch 75-125% */
}
```

**Responsive Typography:**
- Uses `clamp()` function for fluid scaling
- Breakpoints: 1200px, 845px, 700px, 545px, 485px
- Font size reduces 10-20% at each breakpoint

**Heading Hierarchy:**
```css
h1 { font-size: var(--h1); }  /* 3.5rem → 2.145rem mobile */
h2 { font-size: var(--h2); }  /* 3rem → 1.875rem mobile */
h3 { font-size: var(--h3); }  /* 2.145rem → 1.6rem mobile */
```

### Layout System

**Container Pattern:**
```css
.container {
  max-inline-size: var(--site-max-width);  /* 1280px */
  margin-inline: auto;  /* Center */
  padding-inline: var(--gutter-small);  /* Responsive padding */
}
```

**Section Spacing:**
```css
section:not(:first-child) {
  padding-block-start: var(--gutter-x-large);  /* 6rem */
}
```

**Main Content:**
```css
main {
  border-top-left-radius: var(--radius);   /* 140px → 45px mobile */
  border-top-right-radius: var(--radius);
  transform: translateY(calc(-1 * var(--radius)));  /* Overlap with header */
}
```

### Component Styles

#### Navigation Bar
```css
.nav-horizontal {
  position: fixed;              /* Sticky at top */
  backdrop-filter: blur(10px);  /* Glass effect */
  border-bottom: 1px solid var(--border);
  z-index: 1000;
}
```

**Dynamic Colors:**
- `.on-light-bg`: Dark text on light background
- `.on-dark-bg`: Light text on dark background
- Detected via JavaScript luminance calculation

**Resume Button:**
```css
.nav-resume-btn {
  background: rgba(0,0,0,0.9);  /* Inverted on hover */
  border-radius: 6px;
  /* Transform + shadow on hover */
}
```

#### Header Section
```css
.header {
  min-block-size: calc(100vh + var(--radius));  /* Full viewport + overlap */
  background-color: #fff9f0;  /* Light cream */
}

.header-content {
  grid-template-columns: 3fr 2fr;  /* Name:Description ratio */
  gap: 4rem;
}

.header-name {
  font-size: clamp(4.5rem, 9vw, 8rem);  /* Massive name */
  letter-spacing: -0.05em;  /* Tight */
}
```

#### Timeline
```css
.timeline-content::before {
  /* Vertical center line */
  position: absolute;
  left: 50%;
  width: 2px;
  background: var(--border-dark);
}

.timeline-item {
  /* Alternating left/right */
  .timeline-left { justify-content: flex-end; }
  .timeline-right { justify-content: flex-start; }
}

.timeline-marker {
  /* Circular dots */
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: white;
}
```

**Mobile Adaptation:**
- Timeline shifts to left-aligned at 900px
- Center line moves to left (20px from edge)

#### Work Section
```css
.work-box {
  display: flex;
  justify-content: space-between;
  gap: var(--gutter-medium);
}

.work-img {
  flex-basis: 49%;
  border-radius: var(--gutter-small);
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.work-img img {
  height: 450px;  /* Fixed height */
  object-fit: cover;  /* Crop to fill */
}
```

**Animation States:**
```css
.work-img.transform {
  transform: translateY(45px);
  opacity: 0;
}

/* Children animate sequentially */
.work-textbox h3 { animation-delay: 0s; }
.work-text { animation-delay: 0.2s; }
.work-technologies { animation-delay: 0.3s; }
.work-links { animation-delay: 0.4s; }
```

#### Connect Cards
```css
.connect-card {
  background: var(--bg-color-secondary);
  border: 1px solid var(--border);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.connect-card::before {
  /* Gradient top border */
  background: var(--gradient-brand);
  transform: scaleX(0);  /* Hidden by default */
}

.connect-card:hover {
  transform: translateY(-8px);  /* Lift */
  box-shadow: 0 12px 24px rgba(0,0,0,0.3);
}

.connect-card:hover::before {
  transform: scaleX(1);  /* Reveal gradient */
}
```

### Animation Definitions

```css
@keyframes slide-up {
  from {
    transform: translateY(45px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

/* Applied with paused state, runs on scroll */
animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
animation-play-state: paused;
```

### Responsive Breakpoints

1. **1375px**: Container width reduced
2. **1200px**: Base font size → 90%
3. **1045px**: Work boxes stack vertically
4. **900px**: Timeline → left-aligned
5. **768px**: Navigation spacing reduced
6. **645px**: Base font size → 80%
7. **550px**: Navigation → compact
8. **485px**: Typography scales down further

---

## JavaScript Functionality

### script.js - Main Interactions

#### 1. **Element Selection**
```javascript
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const timelineCards = document.querySelectorAll(".timeline-animate");
const serviceItems = document.querySelectorAll(".service-animate");
const connectCards = document.querySelectorAll(".connect-animate");
```

#### 2. **Smooth Scroll Navigation**
```javascript
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (targetHref.startsWith('#')) {
      e.preventDefault();
      
      if (targetHref === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.querySelector(targetHref)
          .scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
```

**Purpose:** Smooth animated scrolling for anchor links

#### 3. **Scroll Animation Setup**
```javascript
// Add transform class to hide elements initially
workImgs.forEach((workImg) => workImg.classList.add("transform"));
timelineCards.forEach((card) => card.classList.add("transform"));
serviceItems.forEach((item) => item.classList.add("transform"));
connectCards.forEach((card) => card.classList.add("transform"));
```

**CSS Transform Class:**
```css
.transform {
  transform: translateY(6rem);
  opacity: 0;
}
```

#### 4. **Intersection Observer - Work Section**
```javascript
let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const [textbox, picture] = Array.from(entry.target.children);
        
        // Remove transform from image
        picture.classList.remove("transform");
        
        // Start text animations
        Array.from(textbox.children).forEach(
          (el) => (el.style.animationPlayState = "running")
        );
      }
    });
  },
  { threshold: 0.3 }  // Trigger when 30% visible
);

workEls.forEach((workEl) => observer.observe(workEl));
```

**How it Works:**
1. Observes each work box
2. When 30% enters viewport → trigger
3. Removes `.transform` (opacity/position)
4. Starts CSS animations (paused → running)

#### 5. **Timeline Observer**
```javascript
let timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("transform");
        
        // Animate all children
        const children = Array.from(entry.target.children);
        children.forEach((el) => {
          el.style.animationPlayState = "running";
        });
      }
    });
  },
  { threshold: 0.3 }
);

timelineCards.forEach((card) => timelineObserver.observe(card));
```

**Purpose:** Same pattern for timeline cards

#### 6. **Services & Connect Observers**
```javascript
let servicesObserver = new IntersectionObserver(/* ... */);
let connectObserver = new IntersectionObserver(/* ... */);

// Both use recursive child animation:
const allElements = child.querySelectorAll('*');
allElements.forEach((el) => {
  el.style.animationPlayState = "running";
});
```

**Difference:** Animates nested elements recursively

#### 7. **Dynamic Navigation Color**
```javascript
function updateHeaderTextColor() {
  const navHorizontal = document.querySelector('.nav-horizontal');
  const sections = document.querySelectorAll('section, .header');
  
  // Find section behind navigation
  const navRect = navHorizontal.getBoundingClientRect();
  const navCenter = navRect.top + navRect.height / 2;
  
  let currentSection = null;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= navCenter && rect.bottom >= navCenter) {
      currentSection = section;
    }
  });
  
  // Calculate luminance
  const bgColor = window.getComputedStyle(currentSection).backgroundColor;
  const luminance = getLuminance(bgColor);
  
  // Apply appropriate class
  if (luminance > 0.5) {
    navHorizontal.classList.add('on-light-bg');
  } else {
    navHorizontal.classList.add('on-dark-bg');
  }
}

window.addEventListener('scroll', updateHeaderTextColor);
```

**Luminance Calculation:**
```javascript
function getLuminance(rgbString) {
  const rgb = rgbString.match(/\d+/g);
  const [r, g, b] = rgb.map(val => {
    const normalized = val / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
```

**Purpose:** Uses WCAG luminance formula to determine if background is light/dark

---

### decrypted-text.js - Text Animation Library

#### Class Structure
```javascript
class DecryptedText {
  constructor(element, options = {}) {
    this.element = element;
    this.originalText = element.textContent;
    
    // Configuration
    this.speed = options.speed || 50;
    this.maxIterations = options.maxIterations || 10;
    this.sequential = options.sequential || false;
    this.revealDirection = options.revealDirection || 'start';
    
    // State
    this.isAnimating = false;
    this.revealedIndices = new Set();
    this.currentIteration = 0;
  }
}
```

#### Key Methods

**1. wrapCharacters()**
```javascript
wrapCharacters() {
  const chars = this.originalText.split('');
  this.element.innerHTML = '';
  
  this.charSpans = chars.map((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.dataset.index = index;
    span.dataset.original = char;
    this.element.appendChild(span);
    return span;
  });
}
```
**Purpose:** Wraps each character in `<span>` for individual animation

**2. startAnimation()**
```javascript
startAnimation() {
  if (this.isAnimating) return;
  
  this.isAnimating = true;
  this.currentIteration = 0;
  this.revealedIndices.clear();
  
  this.interval = setInterval(() => {
    if (this.sequential) {
      // Reveal one character at a time
      const nextIndex = this.getNextIndex();
      this.revealedIndices.add(nextIndex);
      this.shuffleText();
    } else {
      // Random scramble
      this.shuffleText();
      this.currentIteration++;
      
      if (this.currentIteration >= this.maxIterations) {
        this.completeAnimation();
      }
    }
  }, this.speed);
}
```

**3. shuffleText()**
```javascript
shuffleText() {
  const availableChars = this.getAvailableChars();
  
  this.charSpans.forEach((span, i) => {
    if (span.dataset.original === ' ') {
      span.textContent = ' ';
    } else if (this.revealedIndices.has(i)) {
      span.textContent = span.dataset.original;
      span.classList.add('revealed');
    } else {
      const randomChar = availableChars[
        Math.floor(Math.random() * availableChars.length)
      ];
      span.textContent = randomChar;
      span.classList.add('encrypted');
    }
  });
}
```

**Purpose:** Randomizes unrevealed characters each frame

**4. getNextIndex()** - Sequential Reveal
```javascript
getNextIndex() {
  switch (this.revealDirection) {
    case 'start':
      return this.revealedIndices.size;
      
    case 'end':
      return textLength - 1 - this.revealedIndices.size;
      
    case 'center':
      const middle = Math.floor(textLength / 2);
      const offset = Math.floor(this.revealedIndices.size / 2);
      return this.revealedIndices.size % 2 === 0 
        ? middle + offset 
        : middle - offset - 1;
  }
}
```

**Reveal Patterns:**
- **start**: Left to right
- **end**: Right to left
- **center**: Expand from middle

**5. setupIntersectionObserver()**
```javascript
setupIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startAnimation();
        }
      });
    },
    { threshold: 0.1 }
  );
  
  observer.observe(this.element);
}
```

**Purpose:** Auto-trigger when element enters viewport

**6. Event Listeners**
```javascript
// Hover trigger
this.element.addEventListener('mouseenter', () => this.startAnimation());

// Click/keyboard trigger
this.element.addEventListener('click', () => {
  if (this.isAnimating) {
    this.completeAnimation();
    setTimeout(() => this.startAnimation(), 30);
  } else {
    this.startAnimation();
  }
});

// Keyboard accessibility
this.element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    // Restart animation
  }
});
```

#### Auto-Initialization
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-decrypted]');
  
  elements.forEach((element) => {
    const options = {
      speed: parseInt(element.dataset.speed) || 50,
      sequential: element.dataset.sequential === 'true',
      animateOn: element.dataset.animateOn || 'hover',
      // ... more options from data attributes
    };
    
    new DecryptedText(element, options);
  });
});
```

**HTML Usage:**
```html
<span data-decrypted 
      data-speed="50" 
      data-sequential="true"
      data-animate-on="view">
  abdul
</span>
```

---

## Animation System

### CSS Animation Flow

**1. Initial State**
```css
.transform {
  transform: translateY(6rem);
  opacity: 0;
}
```

**2. Animation Definition**
```css
@keyframes slide-up {
  from {
    transform: translateY(45px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
```

**3. Applied Animation (Paused)**
```css
.work-textbox h3 {
  animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-play-state: paused;
}
```

**4. JavaScript Trigger**
```javascript
element.style.animationPlayState = "running";
```

### Animation Timing

**Easing Function:**
```css
cubic-bezier(0.16, 1, 0.3, 1)
```
- Slow start, fast middle, smooth end
- Creates natural, bouncy feel

**Staggered Delays:**
```css
.work-text { animation-delay: 0.2s; }
.work-technologies { animation-delay: 0.3s; }
.work-links { animation-delay: 0.4s; }
```

**Purpose:** Creates cascading entrance effect

### Intersection Observer Thresholds

```javascript
{ threshold: 0.3 }  // Work section (30%)
{ threshold: 0.2 }  // Services/Connect (20%)
{ threshold: 0.1 }  // Decrypted text (10%)
```

**Lower threshold** = Triggers earlier (better for slower reveals)

---

## Performance Optimizations

1. **Font Preloading**
   ```html
   <link rel="preload" href="assets/fonts/Mona-Sans.woff2" as="font">
   ```

2. **Deferred Scripts**
   ```html
   <script src="script.js" defer></script>
   ```

3. **Lazy Image Loading**
   ```html
   <img loading="lazy" src="...">
   ```

4. **CSS Containment**
   ```css
   main {
     isolation: isolate;  /* Creates stacking context */
     overflow: hidden;     /* Prevents layout shifts */
   }
   ```

5. **Transform-based Animations**
   - Uses `transform` and `opacity` (GPU-accelerated)
   - Avoids layout-triggering properties

6. **Efficient Observers**
   - Single observer per section type
   - Observes only necessary elements
   - Unobserves after animation (could be added)

---

## Accessibility Features

1. **Semantic HTML**
   - `<header>`, `<main>`, `<section>`, `<nav>`
   - Proper heading hierarchy (h1 → h2 → h3)

2. **Keyboard Navigation**
   - Decrypted text: `tabindex="0"`, Enter/Space triggers
   - All links focusable with visible focus states

3. **ARIA Attributes**
   ```html
   <span tabindex="0" role="button">
   ```

4. **Color Contrast**
   - Dynamic nav text color for readability
   - WCAG-compliant luminance calculations

5. **Responsive Text**
   - `clamp()` ensures readable sizes on all devices
   - No text below 0.75rem

6. **Scroll Padding**
   ```css
   html {
     scroll-padding-top: 4.375rem;  /* Accounts for fixed nav */
   }
   ```

---

## Browser Compatibility

**Modern Features Used:**
- CSS Custom Properties (IE11+)
- CSS Grid (IE11+ with -ms- prefix)
- Intersection Observer (IE11 needs polyfill)
- Variable Fonts (IE11 fallback needed)
- Backdrop Filter (Not in Firefox < 103)

**Fallbacks Included:**
- Base font family: `"Segoe UI", Arial, sans-serif`
- Graceful degradation for animations

---

## Customization Guide

### Change Color Scheme
```css
:root {
  --bg-color-primary: #yourColor;
  --important: #yourTextColor;
  --gradient-brand: radial-gradient(...);
}
```

### Adjust Animation Speed
```javascript
// In script.js, change threshold:
{ threshold: 0.5 }  // Trigger sooner

// In CSS, change duration:
animation-duration: 1s;  // Slower
```

### Modify Text Effect
```html
<span data-decrypted 
      data-speed="100"          <!-- Slower -->
      data-sequential="false"   <!-- Random scramble -->
      data-animate-on="hover">  <!-- On hover only -->
```

---

## Conclusion

This portfolio demonstrates modern web development practices:
- **Component-based architecture** (reusable observers, classes)
- **Performance-first** (lazy loading, GPU animations)
- **Accessibility** (keyboard support, semantic HTML)
- **Responsive design** (fluid typography, flexible layouts)
- **Progressive enhancement** (works without JS)

Total code: ~1100 lines CSS, ~300 lines JS, clean and maintainable.
