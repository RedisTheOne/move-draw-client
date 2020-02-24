import {  Link  } from 'react-router-dom';
import React, { Component } from 'react';

export default class CollectionInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collection_id: this.props.match.params.coll_id,
            images: []
        }
    }

    componentDidMount() {
        //Check If The User Is Loged In
        if(!localStorage.getItem("username")) {
            window.location.href = "/users/login";
        }

        //Get Collection Images
        fetch("http://192.168.0.177:5000/collections/images/" + this.state.collection_id)
            .then(res => res.json())
            .then(d => {
                if(!d.res) {
                    this.setState({images: d});
                }
            })
    }

    render() {
        const images = this.state.images.map((d, i) => (
            <div key={i}>
                <img alt="" src={"http://192.168.0.177:5000/collections/image/" + d.path} />
            </div>
        ))
        return (
            <div>
                <div className="splash">
                    <h1>Collection Images</h1>
                </div>
                <div className="container">
                    <div className="images_div">
                        {images} 
                    </div>
                    <br />
                    <Link to={"/craft/" + this.state.collection_id} style={{width: "100% !important", textDecoration: "none !important"}}>
                        <button className="submit_button">Start Crafting</button>
                    </Link>
                    <br /><br />
                </div>
            </div>
        )
    }
}