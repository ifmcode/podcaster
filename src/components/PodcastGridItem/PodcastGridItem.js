import "./PodcastGridItem.css";
import { Link } from "react-router-dom";

function PodcastGridItem(props) {
  const podcast = props.podcast;
  return (
    <Link to={"/podcast/" + podcast.id} className="grid-item">
      <div className="grid-item-info">
        <img src={podcast.image} alt="podcast main photo" className="grid-item-image"/>
        <span className="grid-item-title max-two-lines">{podcast.title}</span>
        <span className="grid-item-author max-two-lines">Author: {podcast.author}</span>
      </div>
    </Link>
  );
}

export default PodcastGridItem;