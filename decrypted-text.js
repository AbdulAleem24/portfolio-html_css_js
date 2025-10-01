/**
 * DecryptedText - Vanilla JS implementation
 * A text scrambling/decryption effect
 */

class DecryptedText {
  constructor(element, options = {}) {
    this.element = element;
    this.originalText = element.textContent;
    
    // Options
    this.speed = options.speed || 50;
    this.maxIterations = options.maxIterations || 10;
    this.sequential = options.sequential !== undefined ? options.sequential : false;
    this.revealDirection = options.revealDirection || 'start'; // 'start', 'end', 'center'
    this.useOriginalCharsOnly = options.useOriginalCharsOnly || false;
    this.characters = options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
    this.animateOn = options.animateOn || 'hover'; // 'hover', 'view', 'both'
    this.encryptedClass = options.encryptedClass || 'encrypted';
    this.revealedClass = options.revealedClass || 'revealed';
    
    // State
    this.isAnimating = false;
    this.revealedIndices = new Set();
    this.currentIteration = 0;
    this.interval = null;
    this.hasAnimated = false;
    
    this.init();
  }
  
  init() {
    // Wrap each character in a span
    this.wrapCharacters();
    
    // Set up event listeners based on animateOn option
    if (this.animateOn === 'hover' || this.animateOn === 'both') {
      this.element.addEventListener('mouseenter', () => this.startAnimation());
      this.element.addEventListener('mouseleave', () => this.stopAnimation());
    }
    
    if (this.animateOn === 'view' || this.animateOn === 'both') {
      this.setupIntersectionObserver();
    }
  }
  
  wrapCharacters() {
    const chars = this.originalText.split('');
    this.element.innerHTML = '';
    
    this.charSpans = chars.map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.dataset.index = index;
      span.dataset.original = char;
      
      if (char === ' ') {
        span.classList.add('space');
      }
      
      this.element.appendChild(span);
      return span;
    });
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.startAnimation();
            this.hasAnimated = true;
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
    
    observer.observe(this.element);
  }
  
  getNextIndex() {
    const textLength = this.originalText.length;
    
    switch (this.revealDirection) {
      case 'start':
        return this.revealedIndices.size;
        
      case 'end':
        return textLength - 1 - this.revealedIndices.size;
        
      case 'center': {
        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(this.revealedIndices.size / 2);
        const nextIndex = this.revealedIndices.size % 2 === 0 
          ? middle + offset 
          : middle - offset - 1;
        
        if (nextIndex >= 0 && nextIndex < textLength && !this.revealedIndices.has(nextIndex)) {
          return nextIndex;
        }
        
        // Fallback: find first unrevealed
        for (let i = 0; i < textLength; i++) {
          if (!this.revealedIndices.has(i)) return i;
        }
        return 0;
      }
      
      default:
        return this.revealedIndices.size;
    }
  }
  
  getAvailableChars() {
    if (this.useOriginalCharsOnly) {
      return Array.from(new Set(this.originalText.split('')))
        .filter(char => char !== ' ');
    }
    return this.characters.split('');
  }
  
  shuffleText() {
    const availableChars = this.getAvailableChars();
    
    if (this.useOriginalCharsOnly) {
      // Get all non-space, non-revealed characters
      const nonSpaceChars = this.originalText
        .split('')
        .filter((char, i) => char !== ' ' && !this.revealedIndices.has(i));
      
      // Shuffle them
      for (let i = nonSpaceChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
      }
      
      let charIndex = 0;
      this.charSpans.forEach((span, i) => {
        const originalChar = span.dataset.original;
        
        if (originalChar === ' ') {
          span.textContent = ' ';
        } else if (this.revealedIndices.has(i)) {
          span.textContent = originalChar;
          span.classList.add(this.revealedClass);
          span.classList.remove(this.encryptedClass);
        } else {
          span.textContent = nonSpaceChars[charIndex++] || originalChar;
          span.classList.add(this.encryptedClass);
          span.classList.remove(this.revealedClass);
        }
      });
    } else {
      this.charSpans.forEach((span, i) => {
        const originalChar = span.dataset.original;
        
        if (originalChar === ' ') {
          span.textContent = ' ';
        } else if (this.revealedIndices.has(i)) {
          span.textContent = originalChar;
          span.classList.add(this.revealedClass);
          span.classList.remove(this.encryptedClass);
        } else {
          const randomChar = availableChars[Math.floor(Math.random() * availableChars.length)];
          span.textContent = randomChar;
          span.classList.add(this.encryptedClass);
          span.classList.remove(this.revealedClass);
        }
      });
    }
  }
  
  startAnimation() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.currentIteration = 0;
    this.revealedIndices.clear();
    
    this.interval = setInterval(() => {
      if (this.sequential) {
        // Sequential reveal
        if (this.revealedIndices.size < this.originalText.length) {
          const nextIndex = this.getNextIndex();
          this.revealedIndices.add(nextIndex);
          this.shuffleText();
        } else {
          this.completeAnimation();
        }
      } else {
        // Random scramble with iterations
        this.shuffleText();
        this.currentIteration++;
        
        if (this.currentIteration >= this.maxIterations) {
          this.completeAnimation();
        }
      }
    }, this.speed);
  }
  
  stopAnimation() {
    if (this.animateOn === 'view') return; // Don't stop if it's view-based
    
    this.completeAnimation();
  }
  
  completeAnimation() {
    clearInterval(this.interval);
    this.isAnimating = false;
    
    // Reveal all characters
    this.charSpans.forEach((span) => {
      span.textContent = span.dataset.original;
      span.classList.add(this.revealedClass);
      span.classList.remove(this.encryptedClass);
    });
  }
  
  destroy() {
    clearInterval(this.interval);
    this.element.textContent = this.originalText;
  }
}

// Auto-initialize elements with data-decrypted attribute
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-decrypted]');
  
  elements.forEach((element) => {
    const options = {
      speed: parseInt(element.dataset.speed) || 50,
      maxIterations: parseInt(element.dataset.maxIterations) || 10,
      sequential: element.dataset.sequential === 'true',
      revealDirection: element.dataset.revealDirection || 'start',
      useOriginalCharsOnly: element.dataset.useOriginalCharsOnly === 'true',
      animateOn: element.dataset.animateOn || 'hover',
      encryptedClass: element.dataset.encryptedClass || 'encrypted',
      revealedClass: element.dataset.revealedClass || 'revealed'
    };
    
    new DecryptedText(element, options);
  });
});

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DecryptedText;
}
