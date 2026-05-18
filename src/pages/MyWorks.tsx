import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";

const MyWorks = () => {
  const getProjectMockups = (title: string) => {
    if (title === "Gallery Application") {
      return [
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/album_screen.png",
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/gallery_main_screen.png",
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/favorites_screen.png"
      ];
    }
    if (title === "Dealzy") {
      return [
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/loginScreen.jpeg",
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/welcome_screen.jpeg",
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/homeScreen.jpeg"
      ];
    }
    return [
      "https://raw.githubusercontent.com/YangDai2003/ChatApp-Compose/master/screenshots/Screenshot_20231014_162546_iChat.png",
      "https://raw.githubusercontent.com/YangDai2003/ChatApp-Compose/master/screenshots/Screenshot_20231014_162945_iChat.png",
      "https://raw.githubusercontent.com/YangDai2003/ChatApp-Compose/master/screenshots/Screenshot_20231014_162955_iChat.png"
    ];
  };

  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <Link to={`/project/${project.id}`} className="myworks-item" key={project.id} data-cursor="disable" style={{ textDecoration: "none" }}>
            <div className="myworks-number">0{index + 1}</div>
            
            <div className="myworks-image-wrap mockup-cluster-container">
              <div className="mockup-cluster">
                {getProjectMockups(project.title).map((imgSrc, idx) => (
                  <div key={idx} className={`mini-iphone-mockup mockup-${idx + 1}`}>
                    <div className="mini-speaker"></div>
                    <div className="mini-dynamic-island"></div>
                    <div className="mini-screen">
                      <img src={imgSrc} alt={`${project.title} screen ${idx + 1}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="myworks-info-wrap">
              <h3>{project.title}</h3>
              <p className="myworks-category">{project.category}</p>
              <p className="myworks-description">{project.description}</p>
              <p className="myworks-tech">{project.technologies}</p>
              {"link" in project && project.link && (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.link, "_blank", "noopener,noreferrer");
                  }}
                  className="myworks-link"
                  data-cursor="disable"
                >
                  View GitHub
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
