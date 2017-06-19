import React from "react";
import Banner from "./banner";
import Footer from "./footer";
import Search from "./search";
import Payment from "./payment";

export default class Music extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: null,
            payment: null,
            showSearch: true, 
            showReturn: false
        }
    }
    componentDidMount = () => {
        fetch("/render-music", {
            method: "get"
        }).then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({
                musicList: json.data
            });
        });
        if (this.state.showReturn) {
            this.setState({
                showReturn: false,
                payment: null
            });
        }
    };
    handlePlay = (id, ele) => {
        $(".modal-cover").fadeIn();
        $("#" + id).fadeIn();
        if (!localStorage.getItem(id.toString())) {
            fetch("/video-views", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({data: {id: id, name: ele.title}})
            }).then((res) => {
                return res.json();
            }).then((json) => {
                if (!json.data) {
                    return;
                }
                let newList = this.state.musicList.slice(0);
                newList[id] = json.data;
                this.setState({
                    musicList: newList
                });
                localStorage.setItem(id.toString(), "true");
            });
        }  
    };
    handleHide = () => {
        $(".modal-cover").fadeOut();
        $(".youtube").fadeOut();
    };
    search = (json) => {
        this.setState({
            musicList: json.data,
            showReturn: true
        });
    };
    handlePurchase = (ele) => {
        let payment = <Payment info={ele}/>
        this.setState({
            musicList: false,
            payment: payment,
            showReturn: true
        });
    };
    handleDelete = (id) => {
        fetch("/delete", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id})
        }).then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({
                musicList: json.data
            });
        });
    };
    render() {
        let loading = <div className="loading"><h1>Loading...</h1></div>
        let list;
        if (this.state.musicList === false) {
            list = null;
        }
        else if (Array.isArray(this.state.musicList) && !this.state.musicList.length) {
            list = <div className="loading"><h1>No Results</h1></div>
        }
        else {
            list = this.state.musicList ? this.state.musicList.reverse().map((ele, id) => {
            return (
                <div key={id} className="music-cont">
                  <div className="img-cont">
                    <img className="thumb" src={ele.thumbnail}/>
                    <img onClick={(e) => this.handlePlay(id, ele)} className="play-video" src="/static/images/play-video.png"/>
                    <button className="purchase" onClick={() => this.handlePurchase(ele)}>Purchase Audio for ${ele.price}</button>
                  </div>
                  <div className="music-info">
                    <h3 className="title video-head">{ele.title}</h3>
                    <h4 className="artist video-head">Artist: {ele.artName}</h4>
                    <h4 className="genre video-head">Genre: {ele.genre}</h4>
                    <h4 className="views video-head">Views: {ele.views.num}</h4>
                    <h4 className="date video-head">Uploaded: {ele.date}</h4>
                    {sessionStorage.getItem("loggedIn") ? (
                        <button onClick={() => this.handleDelete(id)} id="delete">Delete</button>
                    ) : null}
                  </div> 
                   <iframe id={id} className="youtube" src={"https://www.youtube.com/embed/" + ele.videoId + "?enablejsapi=1"}
        frameBorder="0"></iframe>
                </div>      
            )
        }) : loading;
        }
        return(
            <div>
              <Banner/>
              <div className="body">
              <div className="modal-cover" onClick={this.handleHide}></div>
                <Search search={this.search}/>
                {this.state.showReturn ? <button id="return" onClick={this.componentDidMount}>Return</button> : null}
                <div id="list-container">
                  {list}
                  {this.state.payment}
                </div>
              </div>
              <Footer/>
            </div>    
        )
    }
}