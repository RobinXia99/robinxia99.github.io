import { otherProjects } from "../files/globals";
import "../styles/main_flow.css";
import "../styles/about_me.css";
import { FeaturedProjects, OtherProject } from "./Projects";
import AboutMe from "./aboutMe";
import Experience from "./experience";

export default function MainFlow({
  viewport,
  aboutRef,
  experienceRef,
  projectsRef,
}) {
  window.addEventListener("scroll", reveal);

  function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (const reveal of reveals) {
      var revealTop = reveal.getBoundingClientRect().top;
      var revealPoint = 150;

      if (revealTop < viewport.height - revealPoint) {
        reveal.classList.add("active");
      }
    }
  }

  return (
    <div className="main_container">
      {/* <AlertBar /> */}
      <section className="section">
        <div className="name_section">
          <h1>
            Hi,
            <br />
            I'm <span className="r_style">Robin</span>,
            <br />
            <span className="profession">I build mobile apps.</span>
            <br />
            <p>
              Mobile - Web - Fullstack
              <br />
            </p>
          </h1>

          <a
            href="mailto: robin_99@live.se"
            className="contact_me_btn slide_right"
          >
            Contact me
          </a>
        </div>
      </section>

      <section className="section">
        <div
          className="section_headline reveal"
          id="about_section"
          ref={aboutRef}
        >
          <span>- 01 -</span>
          <span>Who am I?</span>
          <div className="headline_divider" />
        </div>

        <AboutMe />
      </section>

      <section className="section">
        <div
          className="section_headline reveal"
          id="skills_section"
          ref={experienceRef}
        >
          <span>- 02 -</span>
          <span>Experience</span>
          <div className="headline_divider" />
        </div>
        <div className="reveal">
          <Experience />
        </div>
      </section>

      <section className="section">
        <div className="project_container reveal">
          <div
            className="section_headline"
            id="project_section"
            ref={projectsRef}
          >
            <span>- 03 -</span>
            <span>Featured Projects</span>
            <div className="headline_divider" />
          </div>
          <FeaturedProjects />

          <div className="more_projects_section reveal">
            <span>
              <h3>Other projects</h3>
            </span>
            <div className="more_projects_container">
              {otherProjects.map((project) => (
                <OtherProject project={project} key={project.title} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
