import React from "react";
import {Link} from "react-router";

export default class Navbar extends React.Component {
    render() {
        return (
            <div id="navbar">
                <ul id="nav-list">
                  <li id="logo"><Link id="home" to="/"><p id="added-text"><img id="nav-logo" src="/static/images/play.png" alt="rr productions logo" title="RR Productions"/><span id="productions">PRODUCTIONS</span></p></Link></li>
                  <li className="not-logo"><Link className="menu nav-link" to="/about">ABOUT</Link></li>
                  <li className="not-logo"><Link className="menu nav-link" to="/music">MUSIC</Link></li>
                  <li className="not-logo"><Link className="menu nav-link" to="/gallery">GALLERY</Link></li>
                  <li className="not-logo"><Link className="menu nav-link" to="/events">EVENTS</Link></li>
                  <li className="not-logo"><button id="col-button" className="btn collapse">MENU</button></li>
                </ul>
            </div>    
        )
    }
}