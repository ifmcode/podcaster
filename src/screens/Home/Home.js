import "./Home.css"
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from "moment/moment";
import { requestPodcastList } from "../../services/data";
import {updatePodcaster, status} from "../../redux/podcasterSlice";
import { Link } from "react-router-dom";

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

    if (podcaster.status === status.ZERO || podcaster.status === status.OUTDATED) {
      fetchData();
    }
  }, [podcaster.status]);


  return (<>
    <p className="home-title">Home:</p>
    <p>Estado de la store: {podcaster.status}</p>
    <p>Numero de podcasts: {podcaster.podcastList.length}</p>
    <Link to="/podcast/2">Pulsa aqui para ir al podcast</Link>
  </>);
}

export default Home;