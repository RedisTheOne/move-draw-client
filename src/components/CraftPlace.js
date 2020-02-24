import React, { Component } from 'react';
import Chris from '../images/chris_bot.png';
import './style/CraftPlace.css';

export default class CraftPlace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collection_id: this.props.match.params.coll_id,
            images: [],
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            canMove: false,
            image1Pos: {},
            image2Pos: {},
            image3Pos: {},
            image4Pos: {},
            image5Pos: {},
            currentImage: 0,
            image1: new Image(),
            image2: new Image(),
            image3: new Image(),
            image4: new Image(),
            image5: new Image(),

        }
    }

    download_image = () => {
        const link = document.createElement('a');
        link.download = 'canvas.jpg';
        link.href = document.getElementById('canvas').toDataURL("image/jpeg", 1.0)
        link.click();
    }

    componentDidMount() {
        //Check If The User Is Loged In
        if(!localStorage.getItem("username")) {
            window.location.href = "/users/login";
        }
        // const link = document.createElement('a');
        // link.download = 'filename.png';
        // link.href = document.getElementById('canvas').toDataURL()
        // link.click();

        //Get Collection Images
        fetch("http://192.168.0.177:5000/collections/images/" + this.state.collection_id)
            .then(res => res.json())
            .then(d => {
                console.log(d)
                if(!d.res) {
                    this.setState({images: d}, () => {
                        this.init();
                    });
                }
            })
        
        //Set Canvas Width
        document.getElementById("canvas").width = window.innerWidth;
        document.getElementById("canvas").height = window.innerHeight;
        window.addEventListener("resize", () => {
            document.getElementById("canvas").width = window.innerWidth;
            document.getElementById("canvas").height = window.innerHeight;
            this.setState({windowHeight: window.innerHeight, windowWidth: window.innerWidth})
            this.draw_images();
        })

        //Canvas event listener
        document.getElementById("canvas").addEventListener("mousedown", (e) => {
            this.setState({canMove: true});
            const ctx = document.getElementById("canvas").getContext('2d');
            ctx.beginPath();
        });
        document.getElementById("canvas").addEventListener("mousemove", this.move);
        document.getElementById("canvas").addEventListener("click", (e) => {
            this.setState({canMove: true}, () => {
                this.move(e);
                this.setState({canMove: false})
            })
        });
        document.getElementById("canvas").addEventListener("mouseup", (e) => {
            this.setState({canMove: false});
        })
        
    }

    move = (e) => {
        if(this.state.canMove) {
            //Move Images
            const ctx = document.getElementById("canvas").getContext('2d');
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.stroke();
            ctx.beginPath();
            switch(this.state.currentImage) {
                case 0:
                    this.setState({image1Pos: {x: e.clientX, y: e.clientY}}, () => {
                        this.draw_images();
                    })
                    break;
                case 1:
                    this.setState({image2Pos: {x: e.clientX, y: e.clientY}}, () => {
                        this.draw_images();
                    })
                    break;
                case 2:
                    this.setState({image3Pos: {x: e.clientX, y: e.clientY}}, () => {
                        this.draw_images();
                    })
                    break;
                case 3:
                    this.setState({image4Pos: {x: e.clientX, y: e.clientY}}, () => {
                        this.draw_images();
                    })
                    break;
                case 4:
                    this.setState({image5Pos: {x: e.clientX, y: e.clientY}}, () => {
                        this.draw_images();
                    })
                    break;
                default:
                    this.draw_images();
            }
        }
    }

    draw_images = () => {
        const ctx = document.getElementById("canvas").getContext('2d'); 
        ctx.drawImage(this.state.image1, this.state.image1Pos.x, this.state.image1Pos.y);
        ctx.drawImage(this.state.image2, this.state.image2Pos.x, this.state.image2Pos.y);
        ctx.drawImage(this.state.image3, this.state.image3Pos.x, this.state.image3Pos.y);
        ctx.drawImage(this.state.image4, this.state.image4Pos.x, this.state.image4Pos.y);
        ctx.drawImage(this.state.image5, this.state.image5Pos.x, this.state.image5Pos.y);
    }

    init = () => {
        //Initialize
        const image1 = new Image();
        const image2 = new Image();
        const image3 = new Image();
        const image4 = new Image();
        const image5 = new Image();
        image1.crossOrigin = "anonymous";
        image2.crossOrigin = "anonymous";
        image3.crossOrigin = "anonymous";
        image4.crossOrigin = "anonymous";
        image5.crossOrigin = "anonymous";

        //On Load
        image1.onload = () => {
            const ctx = document.getElementById("canvas").getContext('2d'); 
            ctx.drawImage(image1, 0, 0);
            ctx.beginPath();
            this.setState({image1Pos: {x: 0, y: 0}});
            ctx.stroke();
        }
        image2.onload = () => {
            const ctx = document.getElementById("canvas").getContext('2d'); 
            ctx.drawImage(image2, 0, image1.height);
            ctx.beginPath();
            this.setState({image2Pos: {x: 0, y: image1.height}});
            ctx.stroke();
        }
        image3.onload = () => {
            const ctx = document.getElementById("canvas").getContext('2d'); 
            ctx.drawImage(image3, image1.width, 0);
            ctx.beginPath();
            this.setState({image3Pos: {x: image1.width, y: 0}});
            ctx.stroke();
        }
        image4.onload = () => {
            const ctx = document.getElementById("canvas").getContext('2d'); 
            ctx.drawImage(image4, image2.width, image1.height);
            ctx.beginPath();
            this.setState({image4Pos: {x: image2.width, y: image1.height}});
            ctx.stroke();
        }
        image5.onload = () => {
            const ctx = document.getElementById("canvas").getContext('2d'); 
            ctx.drawImage(image5, image1.width + image3.width, 0);
            this.setState({image5Pos: {x: image1.width + image3.width, y: 0}});
            ctx.beginPath();
            ctx.stroke();
        }

        //Set Sources 
        image1.src = "http://192.168.0.177:5000/collections/image/" + this.state.images[0].path;
        image2.src = "http://192.168.0.177:5000/collections/image/" + this.state.images[1].path;
        image3.src = "http://192.168.0.177:5000/collections/image/" + this.state.images[2].path;
        image4.src = "http://192.168.0.177:5000/collections/image/" + this.state.images[3].path;
        image5.src = "http://192.168.0.177:5000/collections/image/" + this.state.images[4].path;

        //Set State
        this.setState({image1, image2, image3, image4, image5})
    }

    render() {
        const images = this.state.images.map((img, i) => {
            if(i === 0) {
                return (
                    <div key={i}>
                        <img onClick={(e) => {
                            this.setState({currentImage: i});
                            document.querySelectorAll(".image_picker").forEach(d => d.style.background = "white");
                            document.getElementById(e.target.id).style.background = "gray";
                        }}
                        src={`http://192.168.0.177:5000/collections/image/` + img.path} alt="" style={{background: "gray"}} className="image_picker" id={"picker" + i} />
                    </div>
                )
            }
            return (
                <div key={i} onClick={() => this.setState({currentImage: i})}>
                    <img
                        onClick={(e) => {
                            this.setState({currentImage: i});
                            document.querySelectorAll(".image_picker").forEach(d => d.style.background = "white");
                            document.getElementById(e.target.id).style.background = "gray";
                        }} src={`http://192.168.0.177:5000/collections/image/` + img.path} alt="" className="image_picker" id={"picker" + i} />
                </div>
            )
        })
        return (
            <div>
                <canvas id="canvas" style={{background: "black", width: "100vw", height: "100vh"}}></canvas>
                <div className="craft_chat">
                    <img alt="" src={Chris} />
                    <h2>This is your craft place. Make sure that the canvas fill your screen, and scroll to the top
                         when you are editing the canvas!
                    </h2>
                    <button className="submit_button" style={{background: "white", color: "black", width: "80vw", fontSize: 20, borderRadius: "10px"}}>Quit moving, start Drawing</button>
                    <button onClick={() => this.download_image()} className="submit_button" style={{background: "white", color: "black", marginTop: 20, width: "80vw", fontSize: 20, borderRadius: "10px"}}>Download Image</button>
                </div>
                <h1 style={{textAlign: "center", padding: 30}}>Select the image: </h1>
                <div className="craft_images">
                    {images}
                </div>
                <div style={{width: "100vw", background: "#333333"}}>
                    <h1 style={{textAlign: "center", padding: 30, color: "white"}}>Select the color: </h1>
                    <div className="craft_colors">
                        <div>
                            <div style={{width: "18vw", height: "18vw", border: "1px solid white", backgroundColor: "white", borderRadius: "100%"}}></div>
                        </div>
                        <div>
                            <div style={{width: "18vw", height: "18vw", border: "1px solid white", backgroundColor: "black", borderRadius: "100%"}}></div>
                        </div>
                        <div>
                            <div style={{width: "18vw", height: "18vw", border: "1px solid white", backgroundColor: "red", borderRadius: "100%"}}></div>
                        </div>
                        <div>
                            <div style={{width: "18vw", height: "18vw", border: "1px solid white", backgroundColor: "yellow", borderRadius: "100%"}}></div>
                        </div>
                        <div>
                            <div style={{width: "18vw", height: "18vw", border: "1px solid white", backgroundColor: "purple", borderRadius: "100%"}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}