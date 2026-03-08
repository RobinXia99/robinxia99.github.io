import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArtstation, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../../styles/footer.css';

const SOCIAL_LINKS = [
  { icon: faLinkedinIn, href: 'https://linkedin.com/in/robin-xia-98a1881b5/', label: 'LinkedIn' },
  { icon: faGithub, href: 'https://github.com/RobinXia99', label: 'GitHub' },
  { icon: faArtstation, href: 'https://artstation.com/voyance', label: 'ArtStation' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__socials">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            data-cursor="pointer"
            aria-label={social.label}
          >
            <FontAwesomeIcon icon={social.icon} />
          </a>
        ))}
      </div>
      <p className="footer__credit">
        Designed & Built by Robin Xia
      </p>
    </footer>
  );
}

export default Footer;
