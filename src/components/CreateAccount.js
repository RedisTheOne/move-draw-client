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

export default class CreateAccount extends Component {
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
        const email = document.getElementById("email").value;
        const data = {username, password, email};
        const j = JSON.stringify(data);

        if(username.length > 3 && email.length > 3 && password.length > 3) {
            console.log(j)
            fetch("http://192.168.0.177:5000/users/create", {
                method: "POST",
                body: j,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(d => {
                    if(d.res === "True") {
                        openNotificationWithIcon("User Created", "Welcome!");
                        setTimeout(() => {
                            this.save_local_storage(username);
                        }, 500);
                    } else {
                        openNotificationWithIcon("Invalid Submition", "Username or email already exists")
                    }
                })
        } else {
            openNotificationWithIcon("Invalid Submition", "Username, password and email should have ate least 4 characters")
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
                            <i className="fa fa-envelope icon"></i>
                            <input className="input-field" type="text" placeholder="Email" id="email" />
                        </div>

                        <div className="input-container">
                            <i className="fa fa-eye-slash icon" id="touchable"></i>
                            <input className="input-field" type="password" placeholder="Password" id="password" name="psw" />
                        </div>
                        <button type="submit" className="btn">Register</button>
                        <br /><br />
                        <Link to={"/users/login"} style={{textDecoration: "none", paddingTop: "20px", color: "black", float: "right"}}>
                            Click here to log in!
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}