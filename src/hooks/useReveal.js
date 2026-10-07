import { useEffect } from 'react';

/**
 * Fades `[data-reveal]` elements up the first time they scroll into view.
 * Content is only hidden once this runs (the `reveal-ready` class), so nothing
 * stays invisible if JavaScript or IntersectionObserver is missing.
 */
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || !els.length) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }),
      { rootMargin: '0px 0px -12% 0px' },
    );

    document.documentElement.classList.add('reveal-ready');
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
