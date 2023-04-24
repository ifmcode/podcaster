import './App.css';
import Home from "./screens/Home/Home";
import Podcast from "./screens/Podcast/Podcast";
import Episode from "./screens/Episode/Episode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/podcast/:podcastId" element={<Podcast/>}/>
        <Route exact path="/podcast/:podcastId/episode/:episodeId" element={<Episode/>}/>
      </Routes>
    </Router>
  );
}

export default App;
