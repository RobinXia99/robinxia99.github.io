import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCursor } from '../../context/CursorContext';
import { useTheme } from '../../context/ThemeContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import '../../styles/cursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const { isHovering, onHover, onLeave } = useCursor();
  const { mode, accentColor } = useTheme();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const cursorBaseColor = mode === 'dark' ? '#ffffff' : '#000000';

  // GSAP quickTo refs — persist across renders
  const xTo = useRef(null);
  const yTo = useRef(null);

  /* ── hide native cursor on desktop ── */
  useEffect(() => {
    if (isMobile) return;
    document.documentElement.style.cursor = 'none';
    return () => {
      document.documentElement.style.cursor = '';
    };
  }, [isMobile]);

  /* ── set up quickTo + mousemove listener ── */
  useEffect(() => {
    if (isMobile) return;
    const el = cursorRef.current;
    if (!el) return;

    const onMouseMove = (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [isMobile]);

  /* ── delegated hover detection on body ── */
  useEffect(() => {
    if (isMobile) return;

    const handleOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        onHover();
      }
    };

    const handleOut = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        onLeave();
      }
    };

    document.body.addEventListener('mouseover', handleOver);
    document.body.addEventListener('mouseout', handleOut);

    return () => {
      document.body.removeEventListener('mouseover', handleOver);
      document.body.removeEventListener('mouseout', handleOut);
    };
  }, [isMobile, onHover, onLeave]);

  /* ── animate size / border on hover state change ── */
  useEffect(() => {
    if (isMobile) return;
    const el = cursorRef.current;
    if (!el) return;

    if (isHovering) {
      gsap.to(el, {
        width: 50,
        height: 50,
        borderColor: accentColor,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(el, {
        width: 20,
        height: 20,
        borderColor: cursorBaseColor,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovering, isMobile, accentColor, cursorBaseColor]);

  if (isMobile) return null;

  return <div ref={cursorRef} className="custom-cursor" />;
}
