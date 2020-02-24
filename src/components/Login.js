import React, { Component } from 'react';
import './style/Login.css';
import {  Link  } from 'react-router-dom';
import { notification } from 'antd';
import 'antd/dist/antd.css';

const openNotificationWithIcon = (message, description) => {
    notification.open({
        message,
        description
    });
}

export default class LogIn extends Component {
    save_local_storage = (name) => {
        localStorage.setItem("username", name);
        window.location.href = "/users";
    }

    change_password_type = () => {
        document.getElementById('touchable').addEventListener('click', () => {
            if(document.getElementById('touchable').className !== "fa fa-eye icon") {
                document.getElementById('touchable').className = "fa fa-eye icon";
                document.getElementById('password').type = "text";
            } else {
                document.getElementById('touchable').className = "fa fa-eye-slash icon";
                document.getElementById('password').type = "password";
            }
        })
    }

    componentDidMount() {
        this.change_password_type();

        //Check If User IS Loged On
        if(localStorage.getItem("username")) {
            window.location.href = "/users";     
        }
    }

    submit_form = (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if(username.length <= 3 || password.length <= 3) {
            openNotificationWithIcon("Invalid Login", "Password and username should be at least 4 characters")
        } else {
            fetch("http://192.168.0.177:5000/users/login/" + username + "/" + password)
            .then(res => res.json())
            .then(d => {
                if(d.res === "True") {
                    openNotificationWithIcon("Succsessful Login", "Welcome");
                    setTimeout(() => {
                        this.save_local_storage(username);
                    }, 500);
                } else {
                    openNotificationWithIcon("Invalid Login", "User was not found")
                }
            })
        }
    }

    render() {
        return (
            <div className="login_container">
                <form className="login_form" onSubmit={this.submit_form}>
                    <h1>Move&Draw</h1>
                    <div style={{padding: 30}}>
                        <div className="input-container">
                            <i className="fa fa-user icon"></i>
                            <input className="input-field" type="text" placeholder="Username" id="username" />
                        </div>
                        <div className="input-container">
                            <i className="fa fa-eye-slash icon" id="touchable" />
                            <input className="input-field" type="password" placeholder="Password" id="password" />
                        </div>
                        <button type="submit" className="btn">Log In</button>
                        <br></br><br></br>
                        <Link to={"/users/register"} style={{textDecoration: "none", paddingTop: "20px", color: "black", float: "right"}}>
                            Click here to register!
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}