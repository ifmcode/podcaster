import { useRef } from "react";
import PodcastCard from "../../components/PodcastCard/PodcastCard";
import "./Episode.css"
import { useLocation } from 'react-router-dom';

const Episode = () => {
  const location = useLocation(),
    audioRef = useRef(null),
    {podcast, episode} = location.state;

  return (
    <section className="main-wrapper episode-main-wrapper">
      <PodcastCard podcastInfo={podcast}/>
      <div className="episode-info-wrapper">
        <h1 className="episode-title">{episode.title}</h1>
        <p className="episode-description">{episode.description}</p>
        <audio controls controlsList="nodownload" className="episode-audio" ref={audioRef}>
          <source src={episode.episodeUrl} type="audio/mpeg" />
        </audio>
      </div>
    </section>
  );
}

export default Episode;