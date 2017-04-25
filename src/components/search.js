import React from "react";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSearch = () => {
        if (!document.getElementById("search-music").value) {
            alert("Please enter a search query");
            return;
        }
        fetch("/search", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text: document.getElementById("search-music").value.toLowerCase()})
        }).then((res) => {
            return res.json();
        }).then((json) => {
            this.props.search(json);
        });
    };
    handlePress = (event) => {
        if (event.key === "Enter") {
            this.handleSearch();
        }
    };
    render() {
        return (
            <div>
              <input name="search" type="search" id="search-music" placeholder="Search for our music" required onKeyPress={this.handlePress}/>
              <button id="search-button" onClick={this.handleSearch}>Search</button>
            </div>
        )
    }
}