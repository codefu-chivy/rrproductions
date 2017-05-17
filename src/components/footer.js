import React from "react";
import {Link} from "react-router";

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            views: null,
            authenticated: false,
            adminView: null
        }
    }
    componentDidMount = () => {
        if (typeof(window) !== undefined) {
            this.setState({
                adminView: sessionStorage.getItem("loggedIn") ? <a onClick={this.handleLogout} href="/logout">Logout</a> : <Link id="admin" to="/login">Admin</Link>
            })
        }
        /*fetch("/views", {
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
        })*/
        if (!localStorage.getItem("viewed")) {
            console.log("hello");
            fetch("/views", {
                method: "get"
            }).then((res) => {
                return res.json();
            }).then((json) => {
                this.setState({
                    views: json.data
                });
            });
            localStorage.setItem("viewed", "true");
        }
        else if (localStorage.getItem("viewed")) {
            console.log("bye");
            return;
        }
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
                {this.state.adminView}
                <h6 id="credits">Designed by Chival Trotman</h6>
              </div>
            </div>    
        )
    }
}