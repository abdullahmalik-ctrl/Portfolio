import React, { useEffect, useRef, useState } from 'react';

export function ScrollReveal({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
  x = 0,
  y = 26,
  repeat = true,
  threshold = 0.2,
  rootMargin = '0px 0px -8% 0px',
  style,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (repeat) {
        setIsVisible(entry.isIntersecting);
        return;
      }

      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    },
    { threshold, rootMargin });

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, repeat]);

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-x': `${x}px`, '--reveal-y': `${y}px`, transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}