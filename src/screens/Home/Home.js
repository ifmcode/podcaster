import "./Home.css"
import {useCallback, useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from "moment/moment";
import { requestPodcastList } from "../../services/podcastService";
import {updatePodcaster, updateStatus, status} from "../../redux/podcasterSlice";
import PodcastGridItem from "../../components/PodcastGridItem/PodcastGridItem";

const Home = () => {
  const dispatch = useDispatch(),
    podcaster = useSelector(state => state.podcaster),
    filterInputRef = useRef(null),
    [filteredPodcasts, setFilteredPodcasts] = useState(podcaster.podcastList || []);

  useEffect(() => {
    async function fetchPodcastList() {
      const podcastList = await requestPodcastList();
      podcastList && dispatch(updatePodcaster(podcastList));
      setFilteredPodcasts(podcastList);
    }

    if (podcaster.status === status.ZERO || podcaster.status === status.OUTDATED) {
      fetchPodcastList();
    }
  }, [podcaster.status, dispatch]);

  const checkData = useCallback(() => {
    const lastUpdate = moment(podcaster.lastUpdate),
      now = moment(),
      moreThanOneDayHasPassed = (now.diff(lastUpdate, 'days') > 0);
    moreThanOneDayHasPassed && dispatch(updateStatus(status.OUTDATED));
  }, [dispatch, podcaster.lastUpdate]);
  
  useEffect(() => {
    podcaster.lastUpdate && checkData();
  }, [podcaster.lastUpdate, checkData]);

  const filterPodcastList = (searchTerm) => {
    searchTerm = searchTerm.replace("  ", " ");
    if (searchTerm !== "" || searchTerm !== " ") {
      const filteredPodcastList = podcaster.podcastList.filter(podcast => {
        const title = podcast.title.toLowerCase();
        const author = podcast.author.toLowerCase();
        const term = searchTerm.toLowerCase();
        return title.includes(term) || author.includes(term);
      });

      setFilteredPodcasts(filteredPodcastList);
    } else {
      setFilteredPodcasts(podcaster.podcastList);
    }
  }



  return (
  <section className="main-wrapper">
    <div className="filter-section">
      <input
        type="text"
        className="filter-input"
        placeholder="Filtrar podcasts..."
        ref={filterInputRef}
        onChange={(e) => filterPodcastList(e.target.value)}
      />
      <span className="results-number">{filteredPodcasts.length}</span>
    </div>
    <div className="home-grid">
      {
        filteredPodcasts && filteredPodcasts.map((podcast) => {
          return (
            <PodcastGridItem podcast={podcast} key={podcast.id}/>
          );
        })
      }
    </div>
  </section>);
}

export default Home;