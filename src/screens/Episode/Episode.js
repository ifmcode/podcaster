import "./Episode.css"
import React from 'react';
import {useParams} from 'react-router-dom';

const Episode = () => {
  const {podcastId, episodeId} = useParams();

  return <p className="episode-title">Podcast: {podcastId} Episode: {episodeId}</p>
}

export default Episode;