import "./Home.css"
import React from 'react';
import {useSelector} from 'react-redux';

const Home = () => {
  const podcaster = useSelector(state => state.podcaster);

  return (<>
    <p className="home-title">Home:</p>
    <p>Estado de la store: {podcaster.status}</p>
  </>);
}

export default Home;