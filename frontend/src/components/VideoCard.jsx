import { FaBookmark, FaShareAlt, FaFlag } from "react-icons/fa";
import "../styles/VideoCard.css";

const VideoCard = ({ image, title, description }) => {
  return (
    <div className="video-card">
      <img src={image} alt={title} className="video-thumbnail" />
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="video-card-actions">
        <button title="Save for Later"><FaBookmark /></button>
        <button title="Share"><FaShareAlt /></button>
        <button title="Report"><FaFlag /></button>
      </div>
    </div>
  );
};

export default VideoCard;
