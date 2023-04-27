import "./Home.css"
import {useEffect, useState, useRef, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {savePodcastList, updatePodcaster} from "../../redux/podcasterSlice";
import PodcastGridItem from "../../components/PodcastGridItem/PodcastGridItem";
import { checkDate } from "../../utils/utils";

const Home = () => {
  const dispatch = useDispatch(),
    podcaster = useSelector(state => state.podcaster),
    filterInputRef = useRef(null),
    [filteredPodcasts, setFilteredPodcasts] = useState(podcaster.podcastList || []);

  useEffect(() => {
    setFilteredPodcasts(podcaster.podcastList);
  }, [podcaster.podcastList]);

  const checkLocalPodcastList = useCallback(() => {
    const lastUpdate = JSON.parse(localStorage.getItem("lastUpdateDate"));
    if (lastUpdate) {
      const isOutdated = checkDate(lastUpdate);
      if (isOutdated) {
        dispatch(updatePodcaster());
      } else {
        const podcastListSaved = JSON.parse(localStorage.getItem("podcastList"));
        dispatch(savePodcastList(podcastListSaved)); 
        setFilteredPodcasts(podcastListSaved);
      }
    } else {
      dispatch(updatePodcaster());
    }
  },[dispatch]);

  useEffect(() => {
    checkLocalPodcastList();
  }, [checkLocalPodcastList]);

  const filterPodcastList = (searchTerm) => {
    searchTerm = searchTerm.replace("  ", " ");
    if (searchTerm !== "" || searchTerm !== " ") {
      const filteredPodcastList = podcaster.podcastList.filter(podcast => {
        const title = podcast.title.toLowerCase(),
          author = podcast.author.toLowerCase(),
          term = searchTerm.toLowerCase();
        return title.includes(term) || author.includes(term);
      });

      setFilteredPodcasts(filteredPodcastList);
    } else {
      setFilteredPodcasts(podcaster.podcastList);
    }
  }

  return (filteredPodcasts.length > 0) ? (
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
    </section>
  ) : (
    <p>The data is not loaded</p>
  );
}

export default Home;