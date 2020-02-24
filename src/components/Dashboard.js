import React, { Component } from 'react';
import './style/Dashboard.css';
import Navbar from './Navbar';
import {  Link  } from 'react-router-dom';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: [],
            username: localStorage.getItem("username"),
            noCollections: false
        }
    }

    componentDidMount() {
        //Check If The User Is Loged In
        if(!localStorage.getItem("username")) {
            window.location.href = "/users/login";
        }

        //Fetch Collections
        fetch("http://192.168.0.177:5000/collections/" + localStorage.getItem("username"))
            .then(res => res.json())
            .then(d => {
                if(d.length !== 0) {
                    this.setState({collections: d})
                } else {
                    this.setState({noCollections: true})
                }
            })
    }
    
    render() {
        const collections = this.state.collections.map((c, i) => (
            <Link to={'/users/collection/' + c._id} key={i}>
                <div>
                    <h1>{c.name}</h1>
                </div>
            </Link>
        )) 

        const noValue = this.state.noCollections ? " | 0 " : "";
        return (
            <div>
                <div style={{minHeight: "100vh"}}>
                    <Navbar />
                    <div className="container">
                        <h1 style={{fontSize: 40}}>{this.state.username}'s collections{noValue}</h1>
                        <div className="collection">
                            {collections}
                        </div>
                        {/* <h1 style={{fontSize: 40, marginTop: 30}}>Saved collections</h1>
                        <div className="collection">
                            {collections}
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}