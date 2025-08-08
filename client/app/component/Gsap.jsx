'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function Gsap() {
  useEffect(() => {
    const animatedElements = new Set(); // prevent re-animating same nodes

    const animations = {
      'gsap-fade-in': {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
      },
      'gsap-slide-up': {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1 },
      },
      'gsap-zoom-in': {
        from: { scale: 0.8, opacity: 0 },
        to: { scale: 1, opacity: 1 },
      },
      'gsap-from-left': {
        from: { x: -100, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      'gsap-from-right': {
        from: { x: 100, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
    };

    const animate = (className, elements) => {
      const targets = Array.from(elements).filter(
        (el) => !animatedElements.has(el)
      );
      if (!animations[className] || targets.length === 0) return;

      gsap.fromTo(
        targets,
        animations[className].from,
        {
          ...animations[className].to,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
        }
      );

      targets.forEach((el) => animatedElements.add(el));
    };

    // Run animation for all types on first load
    Object.keys(animations).forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      animate(className, elements);
    });

    // Observe for dynamic additions
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;

          Object.keys(animations).forEach((className) => {
            if (node.classList?.contains(className)) {
              animate(className, [node]);
            }

            const nested = node.querySelectorAll?.(`.${className}`) || [];
            if (nested.length > 0) {
              animate(className, nested);
            }
          });
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
