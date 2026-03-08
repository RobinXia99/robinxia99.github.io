import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useContentful } from "../../hooks/useContentful";
import "../../styles/hero.css";

const fallback = {
  heading: "Robin Xia",
  subtitle: "I build full-stack web & mobile applications.",
  description:
    "I'm a full-stack engineer who loves turning ideas into polished products. I work across web and mobile — from Next.js frontends to React Native apps — backed by cloud infrastructure on GCP. Lately, I've been exploring agentic AI workflows to supercharge how I build apps.",
};

export default function HeroSection() {
  const { data, loading } = useContentful("siteSettings");
  const ready = !loading;
  const content = data?.[0]?.fields || fallback;

  const greetRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!ready) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      greetRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
    )
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      );

    return () => tl.kill();
  }, [ready]);

  const scrollToProjects = () => {
    const el = document.getElementById("projects-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section" id="hero-section">
      <div className="hero-content">
        <p className="hero-greet" ref={greetRef}>
          Hi, I'm
        </p>
        <h1 className="hero-name" ref={nameRef}>
          {content.title || content.heading || fallback.heading}
          <span className="hero-name-accent">.</span>
        </h1>
        <h2 className="hero-subtitle" ref={subtitleRef}>
          {content.subtitle || fallback.subtitle}
        </h2>
        <p className="hero-description" ref={descRef}>
          {content.bio?.content?.[0]?.content?.[0]?.value || content.description || fallback.description}
        </p>
        <button
          className="hero-cta"
          ref={ctaRef}
          onClick={scrollToProjects}
          data-cursor="pointer"
        >
          View My Work
        </button>
      </div>
    </section>
  );
}
