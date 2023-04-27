import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import './App.css';
import './styles/variables.css';
import Home from "./screens/Home/Home";
import Podcast from "./screens/Podcast/Podcast";
import Episode from "./screens/Episode/Episode";
import Root from "./screens/Root/Root";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
          <Route index element={<Home/>}/>
          <Route exact path="/podcast/:podcastId" element={<Podcast/>}/>
          <Route exact path="/podcast/:podcastId/episode/:episodeId" element={<Episode/>}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router}/>
  );
}

//TODO: solve cors error
//TODO: Header component the navigation.state does not notify changed

export default App;
