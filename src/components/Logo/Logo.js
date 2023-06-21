import React from "react";
import Tilt from 'react-parallax-tilt';
import loanero from './loanero.png'


const Logo = () => {
    return (
       <div className="ma3 mt0">
        <Tilt>
            <div className="Tilt br2 shadow-2" style={{ maxHeight: '150px', background: "linear-gradient(89deg, #FF5EDF 0%, #04C8D3 100%)" }}>
                <img className="Tilt-inner pa3" style={{paddingTop: '20px'} }alt= 'logo' src={loanero}/>
            </div>
        </Tilt>
       </div>
    );
}

export default Logo;