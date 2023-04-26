import "./Podcast.css"
import {Link, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import PodcastCard from "../../components/PodcastCard/PodcastCard";
import { useEffect, useState } from "react";
import { requestPodcastEpisodes } from "../../services/podcastService";

const Podcast = () => {
  const {podcastId} = useParams(),
    podcaster = useSelector(state => state.podcaster),
    [podcast, setPodcast] = useState(null),
    [episodeList, setEpisodeList] = useState([]); 

  useEffect(() => {
    const podcast = podcaster.podcastList.filter((podcast) => podcast.id === podcastId)[0];
    setPodcast(podcast);
  }, [podcaster.podcastList, podcastId])

  useEffect(() => {
    async function fetchPodcastData() {
      const podcastEpidoseList = await requestPodcastEpisodes(podcastId);
      podcastEpidoseList && setEpisodeList(podcastEpidoseList);
      
      /*dispatch(updatePodcaster({
        podcastList,
        lastUpdate: moment().valueOf()
      }));*/
    }

    fetchPodcastData();
  }, [podcastId]);

  return podcast && (
    <section className="main-wrapper podcast-main-wrapper">
      <PodcastCard podcastInfo={podcast}/>
      <div className="podcast-episodes-wrapper">
        <div className="podcast-episode-header">
          <span>Episodes: {episodeList.length}</span>
        </div>
        <div className="podcast-episode-list">
        <table>
          <thead>
            <tr>
              <th className="left-alignment">Title</th>
              <th className="left-alignment">Date</th>
              <th className="right-alignment">Duration</th>
            </tr>
          </thead>
          <tbody>
            {
              episodeList && episodeList.map((episode, index) => {
                return (
                  <tr key={index}>
                    <td className="left-alignment">
                      <Link to={"/podcast/" + podcast.id + "/episode/" + episode.id}>{episode.title}</Link>
                    </td>
                    <td className="left-alignment">{episode.date}</td>
                    <td className="right-alignment">{episode.duration}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        </div>
      </div>
    </section>
  ) 
}

export default Podcast;