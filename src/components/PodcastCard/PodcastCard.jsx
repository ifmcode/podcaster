import "./PodcastCard.css";

function PodcastCard(props) {
  const podcast = props.podcastInfo;
  return (
    <div className="podcast-card-wrapper">
      <div className="podcast-card-image-wrapper">
        <img src={podcast.image} alt="podcast main photo" className="podcast-card-image"/>
      </div>
      <div className="podcast-card-title-author">
        <span className="podcast-title">{podcast.title}</span>
        <span className="podcast-author">by {podcast.author}</span>
      </div>
      <div className="podcast-card-description">
         <span className="podcast-description-header">Description:</span>
         <p className="podcast-description">{podcast.summary}</p>
      </div>
    </div>
  );
}

export default PodcastCard;