import React from "react";
import "./ImageLinkForm.css"


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
       <div className="ma3 mt0">
        <p className="f3">
            {
                'This magic shark will detect faces in your pictures. Give it a try!'
            }
        </p>
        <div className="center"> {/*we want to put everything in one line, so we will create a center class in App.css since we are going to use it multiple times*/}
           <div className="form center pa3 br3 shadow-5">
            <input className="f6 pa2 w-70 center" type="text" onChange={onInputChange}/>
            <button 
            className="w-30 grow f6 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
            > Detect </button>
          </div>
        </div>
       </div>
    );
}

export default ImageLinkForm;