import React from "react";
import Banner from "./banner";
import Footer from "./footer";

export default class About extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
              <Banner/>
              <div className="body">
                <h1 className="about-rr">About Us</h1>
                <div className="about1">
                  <img className="not-found" src="/static/images/noimagefound.jpg"/>
                  <p className="bio">My name is Ralph Rookwood and I'm a music producer from Brooklyn, New York. I love to create and arrange music to put smiles and joy onto people's faces. I'm a very simple and understanding type of guy and hope you will feel
                  comfortable with me and my team as we produce great and refreshing music for you.</p>
                </div>
                <h1 className="about-rr">The Team</h1>
                <h2>Siahh</h2>
                <div className="about1">
                  <img className="not-found" src="/static/images/noimagefound.jpg"/>
                  <p className="bio">My name is Siahh and I'm a singer, rapper, songwriter from Brooklyn, New York. My style of music stems from the 90s era: very simplistic, to the point and filled with everlasting messages for my listeners. One listen at a time, I'm hoping to change the opinions of many, especially those of the youth.</p>
                </div>
                <h2>Chival</h2>
                <div className="about1">
                  <img className="not-found" src="/static/images/noimagefound.jpg"/>
                  <p className="bio">Hey everyone, I'm a composer and musician from West Babylon, New York, and I have a passion for creating great music. The music I create reflects a fusion of several genres, most importantly jazz, electronic, and rock. I believe that good music serves a higher purpose that not only includes engaging the mind but healing the soul and it's my hope that my creations can do that for you.</p>
                </div>  
              </div>
              <Footer/>
            </div>    
        )
    }
}