import React from "react";
import { Router, IndexRoute, Route, browserHistory } from "react-router";
import MasterPage from "./components/master";
import Home from "./components/home";
import About from "./components/about";
import Music from "./components/music";
import Gallery from "./components/gallery";
import Events from "./components/events";
import Login from "./components/login";

module.exports = (
  <Route path="/" component={MasterPage}>
    <IndexRoute component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/music" component={Music}/>
    <Route path="/gallery" component={Gallery}/>
    <Route path="/events" component={Events}/>
    <Route path="/login" component={Login}/>
  </Route>
)