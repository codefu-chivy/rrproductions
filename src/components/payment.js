import React from "react";

export default class Payment extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount = () => {
        let title = this.props.info.title;
        let price = this.props.info.price;
        let artName = this.props.info.artName;
        fetch("/get-id", {
            method: "get"
        }).then((res) => {
            return res.json();
        }).then((json) => {
            console.log(document.getElementById("paypal-button"), json)
            paypal.Button.render({
            env: "production",
            style: {
              label: 'checkout', 
              size:  'small',    
              shape: 'pill',  
              color: 'blue'      
            },
            client: {
              client: json.data.sandbox,
              production: json.data.prod
            },
            payment: function() {
            // Make a client-side call to the REST api to create the payment

            return paypal.rest.payment.create(this.props.env, this.props.client, {
                transactions: [
                    {
                        amount: { 
                            total: price, 
                            currency: 'USD' 
                        },
                        item_list: {
                            items: [
                                {
                                    name: title,
                                    description: `The song, ${title} from ${artName}`,
                                    quantity: "1",
                                    price: price,
                                    tax: "0.00",
                                    currency: "USD"
                                }
                            ]
                        }
                    }    
                ]
            });
            },
            onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function() {
                document.querySelector('#paypal-button').innerText = 'Payment Complete!';
            });
            }
            
        }, "#paypal-button");
        });
    }
    render() {        
        return (
            <div className="music-cont">
              <div className="img-cont">
                <img className="thumb" src={this.props.info.thumbnail}/>
                <div id="paypal-button"></div>
              </div>
              <div className="music-info">
                <h3 className="title video-head">{this.props.info.title}</h3>
                <h4 className="artist video-head">Artist: {this.props.info.artName}</h4>
                <h4 className="genre video-head">Genre: {this.props.info.genre}</h4>
                <h4 className="views video-head">Views: {this.props.info.views.num}</h4>
                <h4 className="date video-head">Uploaded: {this.props.info.date}</h4>
              </div>
            </div>
        )
    }
}