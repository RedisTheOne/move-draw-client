import React, { Component } from 'react';
import './style/Navbar.css';
import Logo from '../images/logo.png';
import {  Link  } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarVisible: false,
            navbarScroll: 0
        }
    }

    componentDidMount() {

    }

    click = () => {
        if(!this.state.sideBarVisible) {
            document.querySelector(".sidebar").style.marginLeft = "0px";
            this.setState({sideBarVisible: true});
        } else {
            document.querySelector(".sidebar").style.marginLeft = "-250px";
            this.setState({sideBarVisible: false});
        }
    }

    logout = () => {
        localStorage.removeItem("username");
        window.location.href = "/users/login";
    }

    render() {
        return (
            <div>
                <div className="navbar">
                    <div style={{flex: 1}}>
                        <Link to={"/"}>
                            <img alt="1" src={Logo} id="logo" style={{height: 110, padding: 10}} />
                        </Link>
                    </div>  
                    <div className="right" id="pc">
                        <Link to={"/users/add"}>
                            Add    
                        </Link> 
                        <Link to={"/users/settings"}>
                            Settings  
                        </Link>  
                        <Link to={"#"} style={{marginRight: 20}} onClick={() => this.logout()}>
                            Log Out   
                        </Link>  
                    </div> 
                    <div className="right" id="mobile">
                        <Link to={"#"} onClick={() => this.click()} style={{marginRight: 20}}>
                            =
                        </Link> 
                    </div>
                </div>
                <div className="sidebar">
                    <Link to={"/"} style={{borderBottom: "2px solid white"}}>
                        <img alt="1" src={Logo} style={{height: 150}} />
                    </Link>
                    <Link to={"/users/add"} id="link">
                        Add    
                    </Link>  
                    <Link to={"/users/settings"} id="link">
                        Settings  
                    </Link> 
                    <Link to={"#"} id="link" onClick={() => this.logout()}>
                        Log Out   
                    </Link>
                </div>
            </div>
        )
    }
}