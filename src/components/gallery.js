import React from "react";
import Banner from "./banner"
import Footer from "./footer";

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
              <Banner/>
              <div className="body">
                <h1>Gallery</h1>
                <div id="photo-container">
                  <h2>There are no photos yet!</h2>
                </div>
              </div>
              <Footer/>
            </div>
        )
    }
}