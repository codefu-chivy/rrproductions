import React from "react";
import Banner from "./banner";
import Footer from "./footer";

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false
        }
    }
    handleLogin = () => {
        fetch("/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: document.getElementById("user").value, password: document.getElementById("pass").value})
        }).then((res) => {
            if (res.status === 401) {
                this.setState({
                    error: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            error: false
                        })
                        return;
                    }, 2000)
                });
            }
            else {
              return res.json();
            }
        }).then((json) => {
            if (json.data === "success") {
                sessionStorage.setItem("loggedIn", true);
                if (sessionStorage.getItem("loggedIn")) {
                    window.location = "/";
                }
            }
        });
    }
    render() {
        return (
          <div>
            <Banner/>
            <div className="body">
              <div className="login-form">
                  <label htmlFor="user">Username: </label>
                  <input name="user" id="user" type="username" placeholder="Enter username here" required/><br/>
                  <label htmlFor="pass">Password: </label>
                  <input name="pass" id="pass" type="password" placeholder="Enter password here" required/><br/>
                  {this.state.error ? <p id="invalid">Invalid Login Credentials</p> : null}
                  <button id="login-button" onClick={this.handleLogin}>Login</button>
              </div>
            </div>
            <Footer/>
          </div>
        )
    }
}