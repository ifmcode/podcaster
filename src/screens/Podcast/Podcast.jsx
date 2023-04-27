import "./Podcast.css"
import {Link, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { useCallback, useEffect, useState } from "react";
import PodcastCard from "../../components/PodcastCard/PodcastCard";
import {savePodcastList, updatePodcaster, updatePodcastEpisodes} from "../../redux/podcasterSlice";
import { checkDate } from "../../utils/utils";


const Podcast = () => {
  const {podcastId} = useParams(),
    podcaster = useSelector(state => state.podcaster),
    dispatch = useDispatch(),
    [currentPodcast, setCurrentPodcast] = useState(null),
    [episodeList, setEpisodeList] = useState([]);

  useEffect(() => {
    if (podcaster.podcastList.length > 0 && !currentPodcast) {
      const newPodcast = podcaster.podcastList.filter((podcast) => podcast.id === podcastId)[0];
      if (newPodcast && episodeList.length === 0 && newPodcast.podcastEpisodeList) {
        setCurrentPodcast(newPodcast);
        setEpisodeList(newPodcast.podcastEpisodeList);
      }
    }
  }, [podcaster.podcastList, podcastId, currentPodcast, episodeList.length])

  const checkLocalPodcastEpisodeList = useCallback((podcastListSaved) => {
    const podcast = podcastListSaved.filter((podcast) => podcast.id === podcastId)[0];
    if (podcast && podcast.podcastEpisodeListLastUpdate) {
      const isOutdated = checkDate(podcast.podcastEpisodeListLastUpdate);
      if (isOutdated) {
        dispatch(updatePodcastEpisodes(podcastId));
      } else {

        setEpisodeList(podcast.podcastEpisodeList);
      }
    } else {
      dispatch(updatePodcastEpisodes(podcastId));
    }
  }, [dispatch, podcastId]);

  const checkLocalPodcastList = useCallback(() => {
    const lastUpdate = JSON.parse(localStorage.getItem("lastUpdateDate"));
    if (lastUpdate) {
      const isOutdated = checkDate(lastUpdate);
      if (isOutdated) {
        dispatch(updatePodcaster());
      } else {
        const podcastListSaved = JSON.parse(localStorage.getItem("podcastList"));
        dispatch(savePodcastList(podcastListSaved));
        checkLocalPodcastEpisodeList(podcastListSaved);
      }
    } else {
      dispatch(updatePodcaster());
    }
  },[dispatch, checkLocalPodcastEpisodeList]);

  useEffect(() => {
    checkLocalPodcastList();
  }, [checkLocalPodcastList]);


  return (currentPodcast && episodeList) ? (
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
  ) : (
    <p>The data is not loaded</p>
  );
}

export default Podcast;