import React from "react";
import Footer from "./footer";
import Banner from "./banner";

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: null
        }
    }
    componentDidMount = () => {
        let unauthBody = (
        <div>
          <div id="rr-home">
            <div id="feat-container">
              <h2 id="slogan">We Produce Your Future</h2> 
              <h3 id="featured-title">Featured Song</h3>
              <iframe id="featured" src="https://www.youtube.com/embed/rNID1nPb40Y?enablejsapi=1" frameBorder="0" width="700" height="500"></iframe>
            </div>
          </div> 
        </div>
      );
      this.setState({
          body: sessionStorage.getItem("loggedIn") ? (
        <div className="admin-body">
          <div className="edit-music">
            <h2>Edit Music</h2>
            <h4>Title</h4>
            <input className="music-up" type="text" id="title" placeholder="Enter song title" required/>
            <h4>Artist Name</h4>
            <input className="music-up" type="text" id="artist-name" placeholder="Enter artist name" required/>
            <h4>Genre</h4>
            <input className="music-up" type="text" id="genre" placeholder="Genre" required/>
            <h4>Price</h4>
            <input className="music-up" type="text" id="price" placeholder="Price" required/>
            <h4>Video ID</h4>
            <input className="music-up" type="text" id="video-id" placeholder="Video ID, e.g., d1eaQrxA6ZE" required/><br/>
            <button className="update" onClick={this.handleMusicUpdate}>Update Music</button>
          </div>
          <div className="edit-events">
            <h2>Edit Events</h2>
            <h4>Location</h4>
            <input className="event-up" type="text" id="location" placeholder="Enter location" required/>
            <h4>Description</h4>
            <textarea className="event-up" id="description" required></textarea><br/>
            <button className="update" onClick={this.handleEventsUpdate}>Update Events</button>
          </div>
        </div> 
      ) : unauthBody
      });
    }
    handleMusicUpdate = () => {
        let title = document.getElementById("title").value;
        let artist = document.getElementById("artist-name").value;
        let genre = document.getElementById("genre").value;
        let price = document.getElementById("price").value;
        let videoId = document.getElementById("video-id").value;
        if (!title || !artist || !genre || !price || !videoId) {
          return;
        }
        let musicData = {
          title: title,
          artist: artist,
          genre: genre,
          price: price,
          id: videoId
        };
        fetch("/update-music", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(musicData)
        }).then((res) => {
          return res.json();
        }).then((json) => {
          if (json.data === "success") {
              alert("Successfully Updated Music");
              Array.prototype.forEach.call(document.getElementsByClassName("music-up"), (element) => {
                  element.value = "";
              });
          }
        })
    };
    handleEventsUpdate = () => {
      let location = document.getElementById("location").value;
      let description = document.getElementById("description").value;
      if (!location || !description) {
        return;
      }
      let eventsData = {
        location: location,
        description: description
      }
      fetch("/events-update", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(eventsData)
      }).then((res) => {
        return res.json();
      }).then((json) => {
        if (json.data === "success") {
            alert("Successfully Updated Events");
            Array.prototype.forEach.call(document.getElementsByClassName("event-up"), (element) => {
                element.value = "";
            })
          }
      })
    }
    render() {
        return (
            <div id="home-container">
              <div id="not-footer">
                <Banner/>
                <div className="body">
                  {this.state.body}
                </div>
              </div>
              <Footer/>  
            </div>  
        )
    }
}