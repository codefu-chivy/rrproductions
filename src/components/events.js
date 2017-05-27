import React from "react";
import Banner from "./banner";
import Footer from "./footer";

export default class Events extends React.Component {
    componentDidMount = () => {
        $("body").one("mouseover", () => {
            setTimeout(() => {
                $(".modal-cover").fadeIn();
                $("#subscribe").fadeIn();
            }, 500)
        });
    };
    handleHide = () => {
        $(".modal-cover").hide();
        $("#subscribe").fadeOut("fast");
    };
    handleSubscribe = () => {
        fetch("/subscribe", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: document.getElementById("email-form").value})
        }).then((res) => {
            return res.json();
        }).then((json) => {
            if (!json.data) {
                alert("You're already on our emailing list!");
                document.getElementById("email-form").value = "";
            }
            else if (json.data === "invalid") {
                alert("Invalid email address!");
                document.getElementById("email-form").value = "";
            }
            else {
                document.getElementById("email-form").value = "";
                return;   
            }
        })
    }
    render() {
        return (
            <div>
              <Banner/>
              <div className="body">
              <div className="modal-cover"></div>
              <div id="subscribe">
                <div id="modal-heading">
                  <button onClick={this.handleHide} id="close">X</button>
                  <h2 id="subscribe-heading">Subscribe</h2>
                  <h3>Subscribe to us and receive an email notification every time we update our events</h3>
                </div>
                <div id="modal-body">
                    <label htmlFor="email-form">Email Address: </label>
                    <input id="email-form" type="email" name="email" placeholder="Enter email address" required/>
                    <br/>
                    <button onClick={this.handleSubscribe} id="sub-button">Subscribe</button>
                </div>    
              </div>
                <h1>Events</h1>
                <div id="events-container">
                  <h2>Stay tuned for events!</h2>
                </div>
              </div>  
              <Footer/>
            </div>
        )
    }
}