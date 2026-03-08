import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useContentful } from '../../hooks/useContentful';
import ThemeToggle from '../ui/ThemeToggle';
import MobileMenu from './MobileMenu';
import '../../styles/header.css';

const NAV_LINKS = [
  { label: 'About', href: '#about-section' },
  { label: 'Experience', href: '#experience-section' },
  { label: 'Projects', href: '#projects-section' },
  { label: 'Contact', href: '#contact-section' },
];

function Header() {
  const { mode } = useTheme(); // eslint-disable-line no-unused-vars
  const isMobile = useMediaQuery('(max-width: 700px)');
  const { data } = useContentful('siteSettings');
  const cvUrl = data?.[0]?.fields?.resume?.fields?.file?.url || data?.[0]?.fields?.resume;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      if (y > 300) {
        setHidden(y > lastScrollY.current);
      } else {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''} ${hidden ? 'header--hidden' : ''}`}>
        <nav className="header__nav">
          <a
            href="#hero-section"
            className="header__logo"
            data-cursor="pointer"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            robin xia
          </a>

          {!isMobile && (
            <ul className="header__links">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="header__link"
                    data-cursor="pointer"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span className="header__link-number">0{i + 1}.</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="header__actions">
            {!isMobile && <ThemeToggle />}
            {!isMobile && cvUrl && (
              <a
                href={cvUrl}
                className="header__cv-btn"
                data-cursor="pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                CV
              </a>
            )}
            {isMobile && (
              <button
                className={`header__hamburger ${menuOpen ? 'header__hamburger--open' : ''}`}
                data-cursor="pointer"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                <span />
                <span />
                <span />
              </button>
            )}
          </div>
        </nav>
      </header>

      {isMobile && (
        <MobileMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          navLinks={NAV_LINKS}
          onNavClick={handleNavClick}
        />
      )}
    </>
  );
}

export default Header;
