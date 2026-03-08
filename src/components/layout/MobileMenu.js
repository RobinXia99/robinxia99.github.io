import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faArtstation } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import ThemeToggle from '../ui/ThemeToggle';
import ColorPicker from './ColorPicker';
import '../../styles/header.css';

const SOCIAL_LINKS = [
  { icon: faLinkedinIn, href: 'https://linkedin.com/in/robin-xia-98a1881b5/', label: 'LinkedIn' },
  { icon: faGithub, href: 'https://github.com/RobinXia99', label: 'GitHub' },
  { icon: faArtstation, href: 'https://artstation.com/voyance', label: 'ArtStation' },
];

function MobileMenu({ isOpen, onClose, navLinks, onNavClick }) {
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const socialsRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(menuRef.current, { display: 'flex' });
      gsap.to(menuRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });

      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      );

      if (socialsRef.current) {
        gsap.fromTo(
          socialsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.5 }
        );
      }
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => gsap.set(menuRef.current, { display: 'none' }),
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="mobile-menu" ref={menuRef}>
      <button
        className="mobile-menu__close"
        data-cursor="pointer"
        onClick={onClose}
        aria-label="Close menu"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <nav className="mobile-menu__nav">
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-menu__link"
            data-cursor="pointer"
            ref={(el) => (linksRef.current[i] = el)}
            onClick={(e) => onNavClick(e, link.href)}
          >
            <span className="mobile-menu__link-number">0{i + 1}.</span>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="mobile-menu__footer" ref={socialsRef}>
        <ColorPicker />
        <div className="mobile-menu__socials">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu__social-link"
              data-cursor="pointer"
              aria-label={social.label}
            >
              <FontAwesomeIcon icon={social.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
