import React from "react";
import '../styles/header.css'
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const NavigationBar = ({device}) => {




    return (device == 'web') ? 
    

    // Web
    (
        <div className="header_container">
            <nav className="navbar">
                <li className="navbar_breadcrumb">.aboutme( )</li>
                <ul>
                    <li><span>.aboutme( )</span></li>
                    <li><span>.projects( )</span></li>
                    <li><span>.resume( )</span></li>
                    <li><FontAwesomeIcon icon={faLinkedin} className='fa_icon'/></li>
                    <li><FontAwesomeIcon icon={faGithub} className='fa_icon'/></li>
                </ul>
            </nav>
        </div>
    )
    :

    // Mobile
    (
        <div>

        </div>
    )

}

export default NavigationBar;