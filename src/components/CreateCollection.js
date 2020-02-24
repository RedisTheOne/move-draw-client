import React, { Component } from 'react';
import './style/CreateCollection.css';
import NoImage from '../images/insert_image.png';
import { notification } from 'antd';
import Chris from '../images/chris_bot.png';
import 'antd/dist/antd.css';

const openNotificationWithIcon = (message, description) => {
    notification.open({
        message,
        description
    });
}

export default class CreateCollection extends Component {
    componentDidMount() {
        //Check If Loged In
        if(!localStorage.getItem("username")) {
            window.location.href = "/users/login";
        }
    }

    create_collection = () => {
        const collectionName = document.querySelector('.collection_name_input').value;
        if(collectionName.length < 3) {
            openNotificationWithIcon("Invalid Submit", "Collection name should have more than 3 characters");
        } else {
            const data = JSON.stringify({
                user_id: localStorage.getItem("username"),
                name: collectionName
            });
            const photo1 = document.getElementById("input1").files[0];
            const photo2 = document.getElementById("input2").files[0];
            const photo3 = document.getElementById("input3").files[0];
            const photo4 = document.getElementById("input4").files[0];
            const photo5 = document.getElementById("input5").files[0];
            if(photo1 && photo2 && photo3 && photo4 && photo5) {
                fetch("http://192.168.0.177:5000/collections/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: data
                })
                    .then(res => res.json())
                    .then(d => {
                        if(d.res === "False") {
                            openNotificationWithIcon("Error", "Error creating collection");
                        } else {
                            //Upload Photos
                            openNotificationWithIcon("Progress", "Uploading the images");
                            let formData1 = new FormData();
                            let formData2 = new FormData();
                            let formData3 = new FormData();
                            let formData4 = new FormData();
                            let formData5 = new FormData();
                            formData1.append("image", photo1);
                            formData2.append("image", photo2);
                            formData3.append("image", photo3);
                            formData4.append("image", photo4);
                            formData5.append("image", photo5);
                            fetch('http://localhost:5000/collections/image/add/' + d.res, {method: "POST", body: formData1})
                            fetch('http://localhost:5000/collections/image/add/' + d.res, {method: "POST", body: formData2})
                            fetch('http://localhost:5000/collections/image/add/' + d.res, {method: "POST", body: formData3})
                            fetch('http://localhost:5000/collections/image/add/' + d.res, {method: "POST", body: formData4})
                            fetch('http://localhost:5000/collections/image/add/' + d.res, {method: "POST", body: formData5})
                            openNotificationWithIcon("Success", "Collection Created!");
                        }
                    })
            } else {
                openNotificationWithIcon("Invalid Submit", "Upload all the photos");
            }
        }
    }

    change_files = (e) => {
        const file = e.target.files[0];
        const id = e.target.id;
        if(file) {
            const reader = new FileReader();
            reader.onload = () => {
                switch(id) {
                    case "input1":
                        document.getElementById("image1").src = reader.result;
                        break;
                    case "input2":
                        document.getElementById("image2").src = reader.result;
                        break;
                    case "input3":
                        document.getElementById("image3").src = reader.result;
                        break;
                    case "input4":
                        document.getElementById("image4").src = reader.result;
                        break;
                    case "input5":
                        document.getElementById("image5").src = reader.result;
                        break;
                    default:
                        console.log();
                }
            };
            reader.readAsDataURL(file);
        }
    }

    render() {
        return (
            <div>
                <div className="splash">
                    <img alt="" src={Chris} style={{width: 170, height: 170, margin: "auto", padding: 25}} />
                    <h2>In this page you can add a collection. Suggested image resolution is 300x300, otherwise the images will look horrible.</h2>
                </div>
                <div className="container" style={{marginTop: 20}}>
                    <h1 style={{fontSize: 40}}>Collection Name:</h1>
                    <input type="text" className="collection_name_input" />
                    <br /><br />
                    <h1 style={{fontSize: 40}}>Images:</h1>
                    <div className="images_div">
                        <div>
                            <img alt="" src={NoImage} id="image1" />
                            <div className="upload-btn-wrapper">
                                <button className="input_btn">Upload a file</button>
                                <input type="file" id="input1" onChange={this.change_files} />
                            </div>
                        </div>
                        <div>
                            <img alt="" src={NoImage} id="image2" />
                            <div className="upload-btn-wrapper">
                                <button className="input_btn">Upload a file</button>
                                <input type="file" id="input2" onChange={this.change_files} />
                            </div>
                        </div>
                        <div>
                            <img alt="" src={NoImage} id="image3" />
                            <div className="upload-btn-wrapper">
                                <button className="input_btn">Upload a file</button>
                                <input type="file" id="input3" onChange={this.change_files} />
                            </div>
                        </div>
                        <div>
                            <img alt="" src={NoImage} id="image4" />
                            <div className="upload-btn-wrapper">
                                <button className="input_btn">Upload a file</button>
                                <input type="file" id="input4" onChange={this.change_files} />
                            </div>
                        </div>
                        <div>
                            <img alt="" src={NoImage} id="image5" />
                            <div className="upload-btn-wrapper">
                                <button className="input_btn">Upload a file</button>
                                <input type="file" id="input5" onChange={this.change_files} />
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <button className="submit_button" onClick={() => this.create_collection()}>Submit</button>
                    <br /><br />
                </div>
            </div>
        )
    }
}