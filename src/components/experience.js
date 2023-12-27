import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/experience.css";
import "../styles/main_flow.css";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Experience = () => {
  let mediaQuery = window.matchMedia("(max-width: 750px)");

  return (
    <div className="main_container resume">
      <div className="experience_column">
        {!mediaQuery.matches && (
          <div className="experience_timeframe">May 2023 - Present</div>
        )}
        <div className="experience_card">
          {mediaQuery.matches && (
            <div className="experience_timeframe">May 2023 - Present</div>
          )}
          <a
            href={"https://www.hackberry.se/"}
            target="_blank"
            rel="noreferrer"
            className="experience_card_link_row"
          >
            <h2 className="experience_card_title">Hackberry Bay</h2>
            <FontAwesomeIcon
              className="other_project_link"
              icon={faUpRightFromSquare}
            />
          </a>
          <h4 className="experience_card_undertitle">
            Mobile Application Developer
          </h4>
          <p className="experience_card_text">
            As a member of the React Native developer team at Hackberry, I've
            worked on numerous in-house projects where we along with the
            customers figure out the best technologies & services that fit their
            needs.
            <br />
            <br />
            <span className="experience_card_text cursive">
              Responsibilities / Tasks / Contributions
            </span>
            <br />
            <br />
            • Creating Responsive & Reusable UI Components Creating Animated
            Components
            <br />
            • Creating Integrated Tests in Backend
            <br />
            • Creating CRUD Resources in Backend
            <br />
            • Setting up TurboRepo (Monorepo) Bug Fixing
            <br />• Manual Testing
          </p>
          <div className="project_tools">
            <span>Typescript</span>
            <span>React Native</span>
            <span>Expo</span>
            <span>Contentful</span>
            <span>Firebase</span>
            <span>NestJS</span>
            <span>Scrum</span>
          </div>
        </div>
      </div>

      <div className="experience_column">
        {!mediaQuery.matches && (
          <div className="experience_timeframe">Jan - May 2023</div>
        )}
        <div className="experience_card">
          {mediaQuery.matches && (
            <div className="experience_timeframe">Jan - May 2023</div>
          )}
          <a
            href={"https://space.cc/sv/academy/"}
            target="_blank"
            rel="noreferrer"
            className="experience_card_link_row"
          >
            <h2 className="experience_card_title">Space Academy</h2>
            <FontAwesomeIcon
              className="other_project_link"
              icon={faUpRightFromSquare}
            />
          </a>
          <h4 className="experience_card_undertitle">Senior Educator</h4>
          <p className="experience_card_text">
            At Space Academy, I had the role of guiding and educating students
            from Grade 6 - High School, using drag & drop programming tools and
            games. We did this in a way that is both fun and instructive,
            tailored for beginners.
            <br />
            <br />
            The goal & driving force behind the programmme - democratising tech
            for everyone, especially the disenfranchised.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
