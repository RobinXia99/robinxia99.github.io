import { useContentful } from '../../hooks/useContentful';
import SectionHeading from '../ui/SectionHeading';
import AnimatedReveal from '../ui/AnimatedReveal';
import ProjectCard from './ProjectCard';
import '../../styles/projects.css';

const fallbackProjects = [
  {
    fields: {
      title: 'Portfolio Website',
      description:
        'A personal portfolio website built with React, Three.js, and GSAP animations featuring interactive 3D elements and smooth transitions.',
      technologies: ['React', 'Three.js', 'GSAP', 'CSS'],
      images: [
        'https://picsum.photos/seed/proj1a/800/500',
        'https://picsum.photos/seed/proj1b/800/500',
        'https://picsum.photos/seed/proj1c/800/500',
      ],
      repoUrl: 'https://github.com/robinxia99/robinxia99.github.io',
      liveUrl: 'https://robinxia99.github.io',
      featured: true,
      order: 1,
    },
  },
  {
    fields: {
      title: 'Mobile App',
      description:
        'A cross-platform mobile application built with React Native and Expo, featuring real-time data syncing and push notifications.',
      technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
      images: [
        'https://picsum.photos/seed/proj2a/800/500',
        'https://picsum.photos/seed/proj2b/800/500',
        'https://picsum.photos/seed/proj2c/800/500',
      ],
      repoUrl: 'https://github.com/robinxia99',
      featured: true,
      order: 2,
    },
  },
  {
    fields: {
      title: 'API Service',
      description:
        'A RESTful API service built with Node.js and Express, featuring authentication, rate limiting, and comprehensive documentation.',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
      repoUrl: 'https://github.com/robinxia99',
      featured: false,
      order: 3,
    },
  },
  {
    fields: {
      title: 'CLI Tool',
      description:
        'A command-line tool for automating development workflows, built with Python and published to PyPI.',
      technologies: ['Python', 'Click', 'PyPI'],
      repoUrl: 'https://github.com/robinxia99',
      featured: false,
      order: 4,
    },
  },
  {
    fields: {
      title: 'Data Dashboard',
      description:
        'An interactive data visualization dashboard built with D3.js and React for monitoring real-time metrics.',
      technologies: ['React', 'D3.js', 'WebSocket'],
      repoUrl: 'https://github.com/robinxia99',
      featured: false,
      order: 5,
    },
  },
];

export default function ProjectsSection() {
  const { data } = useContentful('project', { order: 'fields.order' });
  const projects = data?.length ? data : fallbackProjects;

  const featured = projects.filter((p) => p.fields.featured);
  const other = projects.filter((p) => !p.fields.featured);

  return (
    <section className="projects-section" id="projects-section">
      <AnimatedReveal>
        <SectionHeading number="03" title="Projects" />

        <div className="projects-featured">
          {featured.map((project) => {
            const f = project.fields;
            return (
              <ProjectCard
                key={f.title}
                title={f.title}
                description={f.description}
                technologies={f.tags || f.technologies || []}
                repoUrl={f.githubUrl || f.repoUrl}
                liveUrl={f.liveUrl}
                images={f.images}
                featured
              />
            );
          })}
        </div>

        {other.length > 0 && (
          <div className="projects-other">
            <h3 className="projects-other-heading">Other Notable Projects</h3>
            <div className="projects-other-grid">
              {other.map((project) => {
                const f = project.fields;
                return (
                  <ProjectCard
                    key={f.title}
                    title={f.title}
                    description={f.description}
                    technologies={f.tags || f.technologies || []}
                    repoUrl={f.githubUrl || f.repoUrl}
                    liveUrl={f.liveUrl}
                    featured={false}
                  />
                );
              })}
            </div>
          </div>
        )}
      </AnimatedReveal>
    </section>
  );
}
