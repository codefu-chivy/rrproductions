import React from "react";
import Navbar from "./navbar";

export default class MasterPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
              <Navbar/>
              <div id="not-nav">
                {this.props.children}
              </div>
            </div>  
        )
    }
}