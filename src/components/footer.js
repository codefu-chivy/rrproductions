import React from "react";
import {Link} from "react-router";

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            views: 0,
            authenticated: false
        }
    }
    componentDidMount = () => {
        fetch("/views", {
            method: "get"
        }).then((res) => {
            return res.json();
        }).then((json) => {
            if(!json.data) {
                this.setState({
                    views: 1
                }, () => {
                    return;
                });
            }
            else {
                this.setState({
                    views: json.data
                });
            }
        })
    };
    handleLogout = () => {
        sessionStorage.removeItem("loggedIn");
    }
    render() {
        let views = this.state.views ? this.state.views : null;
        return (
            <div className="footer">
              <h3 id="page-views">Page Views: <span className="views">{this.state.views}</span></h3>
              <div className="contact">
                <h4 id="social">Social Media</h4>
                <img className="icon" src="/static/images/instagram.png"/>
                <img className="icon" src="/static/images/twitter.png"/>
                <img className="icon" src="/static/images/facebook.png"/>
                <img className="icon" src="/static/images/youtube.png"/>
              </div>
              <div className="misc">
                {sessionStorage.getItem("loggedIn") ? <a onClick={this.handleLogout} href="/logout">Logout</a> : <Link id="admin" to="/login">Admin</Link>}
                <h6 id="credits">Designed by Chival Trotman</h6>
              </div>
            </div>    
        )
    }
}