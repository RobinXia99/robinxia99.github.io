import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/alertbar.css";

const AlertBar = () => {
  const handleClose = () => {
    const alertContainer = document.querySelector(".alert_container");

    alertContainer.classList.add("hidden");
  };
  return (
    <div className="alert_container">
      <p className="alert_text">
        The content of the website is outdated. A new version will eventually be
        published with new professional projects.
      </p>
      <div className="alert_icon_container" onClick={() => handleClose()}>
        <FontAwesomeIcon icon={faXmark} className="alert_icon" />
      </div>
    </div>
  );
};

export default AlertBar;
