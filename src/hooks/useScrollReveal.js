//useScrollReveal Hook

import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after reveal for performance
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    // Observe el and all .reveal children
    const targets = el.querySelectorAll('.reveal');
    if (el.classList.contains('reveal')) observer.observe(el);
    targets.forEach(t => observer.observe(t));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export default useScrollReveal;
