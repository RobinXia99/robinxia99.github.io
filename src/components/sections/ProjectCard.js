import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faFolder, faChevronLeft, faChevronRight, faTimes, faExpand, faImages } from '@fortawesome/free-solid-svg-icons';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { optimizeImageUrl } from '../../lib/imageUrl';

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

function renderDescription(desc) {
  if (!desc) return null;
  if (typeof desc === 'string') return <p>{desc}</p>;
  if (desc.nodeType === 'document') return documentToReactComponents(desc, richTextOptions);
  return <p>{desc}</p>;
}

function DescriptionModal({ title, description, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="project-modal__backdrop" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal__header">
          <h3 className="project-modal__title">{title}</h3>
          <button className="project-modal__close" onClick={onClose} data-cursor="pointer" aria-label="Close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="project-modal__body">
          {renderDescription(description)}
        </div>
      </div>
    </div>
  );
}

function ClampedDescription({ title, description }) {
  const innerRef = useRef(null);
  const [needsClamp, setNeedsClamp] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    el.classList.remove('project-card__description-inner--clamped');
    const needs = el.scrollHeight > 192;
    setNeedsClamp(needs);
    if (needs) el.classList.add('project-card__description-inner--clamped');
  }, [description]);

  return (
    <>
      <div className="project-card__description">
        <div
          ref={innerRef}
          className={`project-card__description-inner${needsClamp ? ' project-card__description-inner--clamped' : ''}`}
        >
          {renderDescription(description)}
        </div>
        {needsClamp && (
          <button
            className="project-card__read-more"
            onClick={() => setModalOpen(true)}
            data-cursor="pointer"
          >
            Read more
          </button>
        )}
      </div>
      {modalOpen && createPortal(
        <DescriptionModal
          title={title}
          description={description}
          onClose={() => setModalOpen(false)}
        />,
        document.body
      )}
    </>
  );
}

function ImageLightbox({ images, title, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const count = images.length;

  const goNext = (e) => { e.stopPropagation(); setIndex((i) => (i + 1) % count); };
  const goPrev = (e) => { e.stopPropagation(); setIndex((i) => (i - 1 + count) % count); };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, count]);

  return (
    <div className="project-modal__backdrop" onClick={onClose}>
      <div className="image-lightbox" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal__close image-lightbox__close" onClick={onClose} data-cursor="pointer" aria-label="Close">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <img className="image-lightbox__img" src={images[index]} alt={`${title} screenshot ${index + 1}`} loading="lazy" />
        {count > 1 && (
          <div className="image-lightbox__controls">
            <button className="carousel__btn" onClick={goPrev} data-cursor="pointer" aria-label="Previous image">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="carousel__counter">{index + 1} / {count}</span>
            <button className="carousel__btn" onClick={goNext} data-cursor="pointer" aria-label="Next image">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ImageCarousel({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const resolvedImages = images.map((img) => optimizeImageUrl(img?.fields?.file?.url || img));
  const count = resolvedImages.length;

  const goNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % count);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  return (
    <>
      <div className={`carousel ${count === 1 ? 'carousel--single' : ''}`}>
        <div className="carousel__stack">
          {resolvedImages.map((src, i) => {
            const offset = i - activeIndex;
            const isActive = i === activeIndex;
            const stackIndex = offset >= 0 ? offset : offset + count;
            const visible = stackIndex <= 3;

            return (
              <div
                key={i}
                className={`carousel__image-wrap ${isActive ? 'carousel__image-wrap--active' : ''}`}
                data-cursor={isActive ? 'pointer' : undefined}
                onClick={isActive ? () => setLightboxOpen(true) : undefined}
                style={{
                  zIndex: visible ? count - stackIndex : 0,
                  transform: visible
                    ? `translateX(${stackIndex * 18}px) translateY(${stackIndex * 12}px) scale(${1 - stackIndex * 0.04})`
                    : 'translateX(72px) translateY(48px) scale(0.84)',
                  opacity: visible ? 1 - stackIndex * 0.2 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <img
                  className={`carousel__image ${isActive ? 'carousel__image--active' : ''}`}
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  loading="lazy"
                />
                {isActive && (
                  <span className="carousel__expand-icon">
                    <FontAwesomeIcon icon={faExpand} />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {count > 1 && (
          <div className="carousel__controls">
            <button
              className="carousel__btn"
              onClick={goPrev}
              data-cursor="pointer"
              aria-label="Previous image"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="carousel__counter">
              {activeIndex + 1} / {count}
            </span>
            <button
              className="carousel__btn"
              onClick={goNext}
              data-cursor="pointer"
              aria-label="Next image"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
      {lightboxOpen && createPortal(
        <ImageLightbox
          images={resolvedImages}
          title={title}
          startIndex={activeIndex}
          onClose={() => setLightboxOpen(false)}
        />,
        document.body
      )}
    </>
  );
}

export default function ProjectCard({
  title,
  description,
  technologies,
  repoUrl,
  liveUrl,
  images,
  featured,
}) {
  const resolvedOtherImages = images?.map((img) => optimizeImageUrl(img?.fields?.file?.url || img)).filter(Boolean) || [];
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (featured) {
    return (
      <div className="project-card project-card--featured">
        <div className="project-card__image-wrapper">
          {images?.length ? (
            <ImageCarousel images={images} title={title} />
          ) : (
            <div className="project-card__image-placeholder" />
          )}
        </div>

        <div className="project-card__content">
          <div className="project-card__top-row">
            <p className="project-card__label">Featured Project</p>
            <div className="project-card__links">
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                  aria-label="GitHub repository"
                  data-cursor="pointer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                  aria-label="Live demo"
                  data-cursor="pointer"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              )}
            </div>
          </div>
          <h3 className="project-card__title">{title}</h3>
          <ClampedDescription title={title} description={description} />
          <ul className="project-card__tech-list">
            {technologies.map((tech) => (
              <li key={tech} className="project-card__tech-tag">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="project-card project-card--other">
        <div className="project-card__other-header">
          <FontAwesomeIcon icon={faFolder} className="project-card__folder-icon" />
          <div className="project-card__links">
            {resolvedOtherImages.length > 0 && (
              <button
                className="project-card__link"
                aria-label="View screenshots"
                data-cursor="pointer"
                onClick={() => setLightboxOpen(true)}
              >
                <FontAwesomeIcon icon={faImages} />
              </button>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link"
                aria-label="GitHub repository"
                data-cursor="pointer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link"
                aria-label="Live demo"
                data-cursor="pointer"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            )}
          </div>
        </div>

        <h3 className="project-card__title" data-cursor="pointer">
          {title}
        </h3>
        <div className="project-card__other-description">{renderDescription(description)}</div>

        <ul className="project-card__tech-list project-card__tech-list--bottom">
          {technologies.map((tech) => (
            <li key={tech} className="project-card__tech-tag">
              {tech}
            </li>
          ))}
        </ul>
      </div>
      {lightboxOpen && createPortal(
        <ImageLightbox
          images={resolvedOtherImages}
          title={title}
          startIndex={0}
          onClose={() => setLightboxOpen(false)}
        />,
        document.body
      )}
    </>
  );
}
