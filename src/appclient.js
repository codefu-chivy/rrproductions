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


ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={MasterPage}>
        <IndexRoute component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/music" component={Music}/>
        <Route path="/gallery" component={Gallery}/>
        <Route path="/events" component={Events}/>
        <Route path="/login" component={Login}/>
      </Route>
    </Router>, 
    document.getElementById("app-container"));

    /*<Route path="/" component={MasterPage}>
        <IndexRoute component={Home}/>
      </Route>*/