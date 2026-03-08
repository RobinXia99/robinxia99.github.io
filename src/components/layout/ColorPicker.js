import { useTheme } from '../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../../styles/sidebar.css';

const ACCENT_COLORS = [
  { color: '#4cc2d9', label: 'Cyan' },
  { color: '#e34b6c', label: 'Pink' },
  { color: '#ffffff', label: 'White' },
  { color: '#6b49c9', label: 'Purple' },
  { color: '#2cd938', label: 'Green' },
];

function ColorPicker() {
  const { mode, accentColor, setAccentColor, toggleMode } = useTheme();

  return (
    <div className="color-picker">
      <ul className="color-picker__list">
        {ACCENT_COLORS.map(({ color, label }) => {
          const displayColor = color === '#ffffff'
            ? (mode === 'dark' ? '#ffffff' : '#000000')
            : color;
          return (
            <li key={color}>
              <button
                className={`color-picker__swatch ${accentColor === color ? 'color-picker__swatch--active' : ''}`}
                style={{ '--swatch-color': displayColor }}
                data-cursor="pointer"
                onClick={() => setAccentColor(color === '#ffffff' ? displayColor : color)}
                aria-label={`Set accent color to ${label}`}
              />
            </li>
          );
        })}
      </ul>
      <div className="color-picker__line" />
      <button
        className="color-picker__mode-toggle"
        data-cursor="pointer"
        onClick={toggleMode}
        aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      >
        <FontAwesomeIcon icon={mode === 'dark' ? faSun : faMoon} />
      </button>
    </div>
  );
}

export default ColorPicker;
