import React from "react";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, browserHistory } from "react-router";
//import {Router} from "react-stormpath";
import MasterPage from "./components/master";
import Home from "./components/home";
import About from "./components/about";
import Music from "./components/music";
import Gallery from "./components/gallery";
import Events from "./components/events";
import Login from "./components/login";
import routes from "./routes";


ReactDOM.render(
    <Router history={browserHistory}>
      {routes}
    </Router>, 
    document.getElementById("app-container"));

