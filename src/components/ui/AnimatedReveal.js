import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DIRECTION_MAP = {
  up: { y: 60, x: 0 },
  left: { y: 0, x: -60 },
  right: { y: 0, x: 60 },
};

function AnimatedReveal({ children, direction = 'up', delay = 0, style, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { x, y } = DIRECTION_MAP[direction] || DIRECTION_MAP.up;

    gsap.set(el, { opacity: 0, x, y });

    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, delay]);

  return (
    <div ref={ref} className={className} style={{ ...style, willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}

export default AnimatedReveal;
