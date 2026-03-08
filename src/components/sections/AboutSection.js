import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { useContentful } from '../../hooks/useContentful';
import { optimizeImageUrl } from '../../lib/imageUrl';
import SectionHeading from '../ui/SectionHeading';
import AnimatedReveal from '../ui/AnimatedReveal';
import '../../styles/about.css';

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
  },
  renderText: (text) =>
    text.split('\n').reduce((acc, segment, i) => {
      if (i === 0) return [segment];
      return [...acc, <br key={i} />, segment];
    }, []),
};

const fallbackSkills = [
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'Node.js',
  'Python',
  'Swift',
  'Three.js',
  'PostgreSQL',
  'GCP',
  'AWS',
  'Docker',
  'Git',
];

const fallbackText =
  "Hello! I'm Robin, a software engineer who enjoys building things that live on the internet and in your pocket. I develop exceptional websites, mobile applications, and everything in between. My goal is to always build products that provide pixel-perfect, performant experiences.";

export default function AboutSection() {
  const { data } = useContentful('aboutMe');
  const content = data?.[0]?.fields || null;

  const bio = content?.description;
  const skills = content?.skills || fallbackSkills;
  const photoUrl = optimizeImageUrl(content?.profileImage?.fields?.file?.url, { width: 560 });

  return (
    <section className="about-section" id="about-section">
      <AnimatedReveal>
        <SectionHeading number="01" title="About Me" />

        <div className="about-grid">
          <div className="about-text">
            {bio ? (
              documentToReactComponents(bio, richTextOptions)
            ) : (
              <p>{fallbackText}</p>
            )}

            <div className="about-skills">
              <p className="about-skills-label">Technologies I work with:</p>
              <ul className="about-skills-list">
                {skills.map((skill) => (
                  <li className="about-skill-tag" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="about-photo-wrapper">
            <div className="about-photo-border">
              {photoUrl ? (
                <img
                  className="about-photo"
                  src={photoUrl}
                  alt="Robin Xia"
                />
              ) : (
                <div className="about-photo-placeholder" />
              )}
            </div>
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
}
