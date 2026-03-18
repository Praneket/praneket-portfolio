import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const WorkImage = ({ image, alt, video, link }) => {
  const [isVideo, setIsVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const handleMouseEnter = async () => {
    if (video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideoSrc(blobUrl);
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor="disable"
      >
        {link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={image} alt={alt} />
        {isVideo && <video src={videoSrc} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
