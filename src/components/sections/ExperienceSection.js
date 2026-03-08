import { useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { useContentful } from '../../hooks/useContentful';
import { optimizeImageUrl } from '../../lib/imageUrl';
import SectionHeading from '../ui/SectionHeading';
import AnimatedReveal from '../ui/AnimatedReveal';
import '../../styles/experience.css';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatDate(dateStr) {
  if (!dateStr) return 'Now';
  const d = new Date(dateStr);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function calcDuration(startStr, endStr) {
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : new Date();
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 1) months = 1;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'Year' : 'Years'}`);
  if (rem > 0) parts.push(`${rem} ${rem === 1 ? 'Month' : 'Months'}`);
  return parts.join(' ');
}

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

const fallbackExperience = [
  {
    fields: {
      company: 'Company One',
      role: 'Software Engineer',
      startDate: '2023-01-01',
      description: null,
    },
  },
];

export default function ExperienceSection() {
  const { data } = useContentful('experience', { order: 'fields.order' });
  const experiences = data?.length ? data : fallbackExperience;

  const [activeTab, setActiveTab] = useState(0);
  const detailsRef = useRef(null);

  const handleTabClick = useCallback(
    (index) => {
      if (index === activeTab) return;

      const el = detailsRef.current;
      if (!el) {
        setActiveTab(index);
        return;
      }

      gsap.to(el, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setActiveTab(index);
          gsap.fromTo(
            el,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        },
      });
    },
    [activeTab]
  );

  const current = experiences[activeTab]?.fields;

  return (
    <section className="experience-section" id="experience-section">
      <AnimatedReveal>
        <SectionHeading number="02" title="Experience" />

        <div className="experience-layout">
          <div className="experience-tabs" role="tablist">
            {experiences.map((exp, i) => (
              <button
                key={exp.fields.company}
                className={`experience-tab ${i === activeTab ? 'experience-tab--active' : ''}`}
                onClick={() => handleTabClick(i)}
                role="tab"
                aria-selected={i === activeTab}
                data-cursor="pointer"
              >
                {exp.fields.company}
              </button>
            ))}
            <div
              className="experience-tab-indicator"
              style={{
                '--tab-count': experiences.length,
                '--active-tab': activeTab,
              }}
            />
          </div>

          <div className="experience-details" ref={detailsRef} role="tabpanel">
            {current && (
              <>
                <div className="experience-header">
                  {current.logo?.fields?.file?.url && (
                    <img
                      className="experience-logo"
                      src={optimizeImageUrl(current.logo.fields.file.url, { width: 96 })}
                      alt={`${current.company} logo`}
                      loading="lazy"
                    />
                  )}
                  <div>
                    <h3 className="experience-role">
                      {current.role}{' '}
                      {current.companyUrl ? (
                        <a
                          href={current.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="experience-company"
                          data-cursor="pointer"
                        >
                          @ {current.company}
                        </a>
                      ) : (
                        <span className="experience-company">@ {current.company}</span>
                      )}
                    </h3>
                    <p className="experience-dates">
                      {formatDate(current.startDate)} — {formatDate(current.endDate)}
                      <span className="experience-duration"> · {calcDuration(current.startDate, current.endDate)}</span>
                    </p>
                  </div>
                </div>
                {current.description && (
                  <div className="experience-description">
                    {documentToReactComponents(current.description, richTextOptions)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
}
