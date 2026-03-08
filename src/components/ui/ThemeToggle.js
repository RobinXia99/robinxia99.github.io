import { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  const iconRef = useRef(null);

  const handleToggle = () => {
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { rotation: 0, scale: 0.5 },
        { rotation: 360, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
    toggleMode();
  };

  return (
    <button
      className="theme-toggle"
      data-cursor="pointer"
      onClick={handleToggle}
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--text-primary)',
        fontSize: '1.15rem',
        cursor: 'pointer',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color var(--transition-fast)',
      }}
    >
      <span ref={iconRef} style={{ display: 'inline-flex' }}>
        <FontAwesomeIcon icon={mode === 'dark' ? faSun : faMoon} />
      </span>
    </button>
  );
}

export default ThemeToggle;
