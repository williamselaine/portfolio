/** @jsxRuntime classic */
/** @jsx jsx */
import { useEffect, useState, Suspense, lazy } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";
import { colors } from "./constants";
import { Home } from "./pages";
import { Navbar, Loading } from "./components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useSizeListener, useDelayedUnmount } from "./hooks";
import { ContentFetchService } from "./services";
const Projects = lazy(() => import("./pages/projects/projects"));
const Music = lazy(() => import("./pages/music/music"));
const Blogs = lazy(() => import("./pages/blog/blogs"));
const Blog = lazy(() => import("./pages/blog/blog"));

const LOADING_DURATION = 3500;
const FADE_OUT_DURATION = 1000;

const body = {
  backgroundColor: colors.yellow,
  fontFamily: "Inconsolata",
  height: "100%",
  opacity: "0.0",
  transition: "opacity 0.5s",
};

const App = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [width, height] = useSizeListener();
  const isMounted = useDelayedUnmount(!isLoaded, FADE_OUT_DURATION);

  useEffect(() => {
    disableBodyScroll(document.body);
    setTimeout(() => {
      setFadeIn(true);
    }, 500);
    setTimeout(() => setIsLoaded(true), LOADING_DURATION);
    setTimeout(() => enableBodyScroll(document.body), LOADING_DURATION);
  }, []);
  return (
    <div css={{ ...body, opacity: fadeIn ? "1.0" : "0.0" }} id="app">
      {isMounted && <Loading show={!isLoaded} />}
      <Router>
        {fadeIn && <Navbar width={width} height={height} />}
        <Paths width={width} />
      </Router>
    </div>
  );
};

const Paths = ({ width }) => {
  // cache images at the top level for quicker load times
  // of course for a larger project i would use Redux or Context to manage this state
  const [homeContent, setHomeContent] = useState();
  const [projectsContent, setProjectsContent] = useState();
  const [musicContent, setMusicContent] = useState();
  const [blogContent, setBlogContent] = useState();

  useEffect(() => {
    (async () => {
      const home = await new ContentFetchService("home", "static", "photos");
      const projects = await new ContentFetchService("projects", "static", [
        "projects",
        "photos",
      ]);
      const music = await new ContentFetchService(
        "music",
        "static",
        ["albums", "photo"],
        "icons",
      );
      const blogs = await new ContentFetchService("blog", "static", [
        "blogs",
        "photos",
        "image",
        "caption",
      ]);
      setHomeContent(home);
      setProjectsContent(projects);
      setMusicContent(music);
      setBlogContent(blogs);
    })();
  }, []);

  return (
    <Suspense fallback={<Loading show={false} />}>
      <Switch>
        <Route exact path="/">
          <Home width={width} {...homeContent} />
        </Route>
        <Route path="/music">
          <Music width={width} {...musicContent} />
        </Route>
        <Route path="/projects">
          <Projects width={width} {...projectsContent} />
        </Route>
        <Route exact path="/blog">
          <Blogs width={width} {...blogContent} />
        </Route>
        <Route exact path="/blog/:title">
          <Blog width={width} {...blogContent} />
        </Route>
      </Switch>
    </Suspense>
  );
};

Paths.propTypes = {
  width: PropTypes.number,
};

export default App;
