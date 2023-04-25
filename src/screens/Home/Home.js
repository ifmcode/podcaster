import "./Home.css"
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from "moment/moment";
import { requestPodcastList } from "../../services/data";
import {updatePodcaster} from "../../redux/podcasterSlice";

const Home = () => {
  const dispatch = useDispatch(),
    podcaster = useSelector(state => state.podcaster);

  useEffect(() => {
    async function fetchData() {
      const podcastList = await requestPodcastList();
      podcastList && dispatch(updatePodcaster({
        podcastList,
        lastUpdate: moment().valueOf()
      }));
    }

    if (podcaster.status === "ZERO") {
      fetchData();
    }
  }, [podcaster.status]);


  return (<>
    <p className="home-title">Home:</p>
    <p>Estado de la store: {podcaster.status}</p>
    <p>Numero de podcasts: {podcaster.podcastList.length}</p>
  </>);
}

export default Home;