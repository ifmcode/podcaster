import "./Podcast.css"
import {useParams} from 'react-router-dom';

const Podcast = () => {
  const {podcastId} = useParams();

  return <p className="podcast-title">Podcasts: {podcastId}</p>
}

export default Podcast;