import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/main_flow.css";

export function FeaturedProjects() {
  return (
    <>
      <div className="project reveal">
        <h3>Rymla</h3>
        <div className="project_preview_container">
          <aside>
            <i />
            <i />
            <i />
          </aside>
          <div>
            <img
              className="project_preview_img"
              src="/rymlapics.png"
              alt="Rymla"
            />
          </div>
        </div>
        <div className="project_description_container">
          <p>
            Rymla is an app for renting parking spots. As a user you can publish
            your own ads or book a spot for yourself.
            <br />
            <br />
            The app uses automated emails when sending a creation, booking and
            unbooking request. The info is then handled within contentful.
          </p>
          <a href="https://rymla.com/" target={"_blank"} rel="noreferrer">
            Source
          </a>
        </div>
        <div className="project_tools">
          <span>React Native</span>
          <span>Contentful</span>
          <span>Google Maps</span>
          <span>Firebase</span>
          <span>Tanstack Query</span>
        </div>
      </div>

      <div className="project mid reveal">
        <h3>Seniora</h3>
        <div className="project_description_container mid">
          <p>
            Seniora is a mobile application that tackles issues within the
            current state of elderly care.
            <br />
            <br />
            Seniora aims to make communication between caregiver and elderly in
            need of care, more efficient and transparent, for both parties.
            <br />
            <br />
            There are different app-flows depending on user role. User,
            relative, employee. This project also has an admin panel build using
            NextJS.
          </p>
          <a
            href="https://apps.apple.com/se/app/seniora/id6447169853"
            target={"_blank"}
            rel="noreferrer"
          >
            Source
          </a>
        </div>
        <div className="project_preview_container mid">
          <aside>
            <i />
            <i />
            <i />
          </aside>
          <div>
            <img
              className="project_preview_img"
              src="/axpics.png"
              alt="Seniora"
            />
          </div>
        </div>

        <div className="project_tools mid">
          <span>React Native</span>
          <span>NestJS</span>
          <span>Redux</span>
          <span>Firebase</span>
          <span>Google Cloud Platform</span>
          <span>Google Analytics</span>
        </div>
      </div>

      <div className="project reveal">
        <h3>Evify</h3>
        <div className="project_preview_container">
          <aside>
            <i />
            <i />
            <i />
          </aside>
          <div>
            <img
              className="project_preview_img"
              src="/evifypics.png"
              alt="Evify"
            />
          </div>
        </div>
        <div className="project_description_container">
          <p>
            Evify, an electric vehicle charging app with integrated third party
            api, Enode.
            <br />
            <br />
            Evify aims to make everything about EV's easier. Handling your
            vehicle and your charger through your phone, to setting charging
            schedules and smart schedules with the goal of saving money and
            time.
          </p>
          <a href="https://www.evify.se/" target={"_blank"} rel="noreferrer">
            Source
          </a>
        </div>
        <div className="project_tools">
          <span>React Native</span>
          <span>Express</span>
          <span>Redux</span>
          <span>Contentful</span>
          <span>Enode</span>
        </div>
      </div>
    </>
  );
}

export function OtherProject({ project }) {
  return (
    <div className="other_project">
      <div className="other_project_inner">
        <span className="other_project_links_container">
          <a href={project.source[0]} target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="other_project_link" icon={faGithub} />
          </a>

          {project.source.length > 1 ? (
            <a href={project.source[1]} target="_blank" rel="noreferrer">
              <FontAwesomeIcon
                className="other_project_link"
                icon={faUpRightFromSquare}
              />
            </a>
          ) : null}
        </span>
        <h3 className="other_project_title">{project.title}</h3>
        <p>{project.desc}</p>
        <div className="other_project_tools">
          {project.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
