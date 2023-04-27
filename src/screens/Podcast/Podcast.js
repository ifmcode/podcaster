import "./Podcast.css"
import {Link, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from "react";
import PodcastCard from "../../components/PodcastCard/PodcastCard";
import { requestPodcastEpisodes } from "../../services/podcastService";
//import {updatePodcaster} from "../../redux/podcasterSlice";


const Podcast = () => {
  const {podcastId} = useParams(),
    podcaster = useSelector(state => state.podcaster),
    dispatch = useDispatch(),
    [currentPodcast, setCurrentPodcast] = useState(null),
    [episodeList, setEpisodeList] = useState([]);

  useEffect(() => {
    if ((currentPodcast === null || currentPodcast === undefined)) {
      const newPodcast = podcaster.podcastList.filter((podcast) => podcast.id === podcastId)[0];
      setCurrentPodcast(newPodcast);
    }
  }, [podcaster.podcastList, podcastId, currentPodcast])

  useEffect(() => {
    async function fetchPodcastData() {
      const podcastEpisodeList = await requestPodcastEpisodes(podcastId);
      if (podcastEpisodeList) {
        // TODO: save in store
        /*const podcastListCopy = podcaster.podcastList,
          indexToUpdate = podcastListCopy.findIndex((podcast) => podcast.id === podcastId),
          podcastUpdated = {
            ...podcastListCopy[indexToUpdate],
            episodeList: podcastEpisodeList
          };
        podcastListCopy[indexToUpdate] = podcastUpdated;
        dispatch(updatePodcaster(podcastListCopy));*/
        setEpisodeList(podcastEpisodeList);
      }
    }

    (episodeList.length === 0) && fetchPodcastData();
  }, [podcastId, dispatch, episodeList, podcaster.podcastList]);

  return currentPodcast && (
    <section className="main-wrapper podcast-main-wrapper">
      <PodcastCard podcastInfo={currentPodcast}/>
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
                      <Link
                        to={"/podcast/" + currentPodcast.id + "/episode/" + episode.id}
                        state= {{ podcast: currentPodcast, episode: episode}}>
                          {episode.title}
                      </Link>
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