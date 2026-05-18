import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  
  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const getMockups = () => {
    if (props.alt === "Gallery Application") {
      return [
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/album_screen.png",
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/gallery_main_screen.png",
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Photic-gallery-app/main/assets/favorites_screen.png"
      ];
    }
    if (props.alt === "Dealzy") {
      return [
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/loginScreen.jpeg",
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/welcome_screen.jpeg",
        "https://raw.githubusercontent.com/rajvishvakarma088-star/Dealzy/main/screenshots/homeScreen.jpeg"
      ];
    }
    // Chat Room Application Compose screenshots
    return [
      "https://raw.githubusercontent.com/YangDai2003/ChatApp-Compose/master/screenshots/Screenshot_20231014_162546_iChat.png",
      "https://raw.githubusercontent.com/YangDai2003/ChatApp-Compose/master/screenshots/Screenshot_20231014_162945_iChat.png",
      "https://raw.githubusercontent.com/YangDai2003/ChatApp-Compose/master/screenshots/Screenshot_20231014_162955_iChat.png"
    ];
  };

  const mockups = getMockups();

  return (
    <div className="work-image">
      <div
        className="work-image-in mockup-cluster-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
      >
        {props.link && (
          <a
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            className="work-link"
            data-cursor={"disable"}
          >
            <MdArrowOutward />
          </a>
        )}
        
        <div className="mockup-cluster">
          {mockups.map((imgSrc, index) => (
            <div key={index} className={`mini-iphone-mockup mockup-${index + 1}`}>
              <div className="mini-speaker"></div>
              <div className="mini-dynamic-island"></div>
              <div className="mini-screen">
                <img src={imgSrc} alt={`${props.alt} screen ${index + 1}`} />
                {index === 1 && isVideo && <video src={video} autoPlay muted playsInline loop></video>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkImage;
