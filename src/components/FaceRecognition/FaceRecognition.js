import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({imageUrl, box}) => {
    return ( //making the image to be displayed nicely despite the size making sure that the wirdth is the same no matter what.
        <div className="center ma"> 
            <div className="absolute mt2">
            <img id = "inputimage" alt = "" src={imageUrl} width='500px' height = 'auto'/>
            <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>  
            </div>       
        </div>
    );
}

export default FaceRecognition;

