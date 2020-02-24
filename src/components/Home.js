import React, { Component } from 'react';
import './style/Home.css';
import Background from '../images/thumbnail1.jpg';
import Target from '../images/target1.png';
import Chris from '../images/chris_bot.png';
import User from '../images/user.png';
import {  Link  } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div style={{background: 'url("' + Background + '")  no-repeat center center'}} className="section-a">
                    <h1>Move&Draw</h1>
                    <h5>Simplicity isn't for everyone</h5>
                    <Link className="dashboard_link" to={"/users"}>
                        Dashboard
                    </Link>
                </div>
                <div className="section-2">
                    <div style={{padding: 40, flex: 1, textAlign: "center"}} id="first" className="section_2_child">
                        <div style={{textAlign: "center"}}>
                            <img alt="1" src={Target} style={{width: 200, height: 200}} />
                            <h1>Purpose</h1>
                        </div>
                        <p>Move&Draw is a simple tool build by Redis. It's based on 3 simple actions: <br />
                        - You move the images<br />
                        - You draw<br />
                        - You save the image<br />
                        </p>
                    </div>
                    <div style={{padding: 40, flex: 1, textAlign: "center"}} id="second" className="section_2_child">
                        <div style={{textAlign: "center"}}>
                            <img alt="1" src={Chris} style={{width: 200, height: 200}} />
                            <h1>Chris</h1>
                        </div>
                        <p>Chris will help you to make up your mind. Be nice to him, he hates mean peoples.</p>
                    </div>
                    <div style={{padding: 40, flex: 1, textAlign: "center"}} className="section_2_child">
                        <div style={{textAlign: "center"}}>
                            <img alt="1" src={User} style={{width: 200, height: 200}} />
                            <h1>Register</h1>
                        </div>
                        <p>You can register for free. Try it out!</p>
                        <Link to={"/users/register"} className="register_link">
                            Register
                        </Link>
                    </div>
                </div>
                <div className="section-3">
                    <h1>Move&Draw&copy; 2020</h1>
                </div>
            </div>
        )
    }
}