import React, { Component } from 'react';
import './style/Settings.css';
import { notification } from 'antd';
import Chris from '../images/chris_bot.png';
import 'antd/dist/antd.css';

const openNotificationWithIcon = (message, description) => {
    notification.open({
        message,
        description
    });
}

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: [],
            username: localStorage.getItem("username"),
            email: "",
            noCollections: false
        }
    }

    componentDidMount() {
        //Check if is logged in
        if(!localStorage.getItem("username")) {
            window.location.href = "/users/login";
        }

        //Get Email
        fetch("http://192.168.0.177:5000/users/email/" + this.state.username)
            .then(res => res.json())
            .then(res => {
                if(!res.res) {
                    this.setState({email: res.email})
                }
            })

        //Get Collections
        fetch("http://192.168.0.177:5000/collections/" + this.state.username)
            .then(res => res.json())
            .then(d => {
                if(d.length !== 0) {
                    this.setState({collections: d})
                } else {
                    this.setState({noCollections: true})
                }
            })
    }

    change_email = (e) => { 
        e.preventDefault();
        const new_email = document.getElementById("new_email").value;
        fetch(`http://192.168.0.177:5000/users/change/email/${this.state.email}/${new_email}`)
            .then(res => res.json())
            .then(d => {
                if(d.res === "False") {
                    //Invalid
                    openNotificationWithIcon("Invalid", "The email already is used!");
                } else {
                    //Valid
                    openNotificationWithIcon("Success", "The email is changed to " + new_email + "!");
                    setTimeout(() => window.location.reload(), 1000);
                }
            })
    }

    delete_coll = (id) => {
        if(window.confirm("Are you sure?")) {
            fetch("http://192.168.0.177:5000/collections/delete/" + id)
                .then(res => res.json())
                .then(d => {
                    if(d.res === "False") {
                        //Invalid
                        openNotificationWithIcon("Invalid", "An error occured, try it again later!");
                    } else {
                        //Valid
                        openNotificationWithIcon("Success", "Collection deleted");
                        window.location.reload();
                    }
                })
        }
    }

    render() {
        const collections = this.state.collections.map((d, i) => (
            <div className="settings_collection" key={i}>
                <i onClick={() => this.delete_coll(d._id)} class="fa fa-window-close icon" style={{background: "transparent", float: "right", fontSize: 20, cursor: "pointer"}}></i>
                <h1>{d.name}</h1>
            </div>
        ))
        return (
            <div>
                <div className="settings_container" >
                    <div style={{padding: 30, textAlign: "center", background: "#3e3e3e3e"}} className="settings_chat">
                        <img alt="" src={Chris} style={{width: 150, height: 150, marginLeft: "auto", marginRight: "auto"}} />
                        <h2 style={{color: "#3e3e3e", padding: 10, borderBottom: "2px solid #3e3e3e"}}>In this page, you can change your email and delete your collections!</h2>
                        <h2 style={{color: "#3e3e3e"}}>Change Email: </h2>
                        <form onSubmit={this.change_email}>
                            <input type="email" id="new_email" className="collection_name_input" style={{marginBottom: 30}} />
                            <button className="submit_button" type="submit">Submit</button>
                        </form>
                    </div>
                    <div style={{padding: 30, flex: 3, display: "flex", background: "#333333", flexDirection: "column", justifyContent: "center"}}>
                        <h2 style={{color: "white"}}>Username: {this.state.username}</h2>
                        <h2 style={{color: "white"}}>Email: {this.state.email}</h2>
                        {collections}
                    </div>
                </div>
            </div>
        )
    }
}
