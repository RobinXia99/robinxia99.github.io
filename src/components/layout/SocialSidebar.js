import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArtstation, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../../styles/sidebar.css';

const SOCIAL_LINKS = [
  { icon: faLinkedinIn, href: 'https://linkedin.com/in/robin-xia-98a1881b5/', label: 'LinkedIn' },
  { icon: faGithub, href: 'https://github.com/RobinXia99', label: 'GitHub' },
  { icon: faArtstation, href: 'https://artstation.com/voyance', label: 'ArtStation' },
];

function SocialSidebar() {
  return (
    <div className="social-sidebar">
      <ul className="social-sidebar__list">
        {SOCIAL_LINKS.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-sidebar__link"
              data-cursor="pointer"
              aria-label={social.label}
            >
              <FontAwesomeIcon icon={social.icon} />
            </a>
          </li>
        ))}
      </ul>
      <div className="social-sidebar__line" />
    </div>
  );
}

export default SocialSidebar;
