import React, { useEffect, useState } from "react";
import '../styles/header.css'
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";



const NavigationBar = ({device}) => {


    let navigate = useNavigate();
    let location = useLocation();

    const [activePage, setActivePage] = useState('/');

    useEffect(() => {
        switch(location.pathname) {
            case '/': {
                setActivePage('.aboutme( )');
                break;
            }
            case '/projects': {
                setActivePage('.projects( )');
                break;
            }
            case '/resume': {
                setActivePage('.resume( )');
                break;
            }
        }
    },[location.pathname])

    return (device == 'web') ? 

    // Web
    (
        <div className="header_container">
            <nav className="navbar">
                <li className="navbar_breadcrumb">{activePage}</li>
                <ul>
                    <li><span onClick={() => navigate('/')} className={(location.pathname == '/' ? 'active' : '')}>.aboutme( )</span></li>
                    <li><span onClick={() => navigate('/projects')} className={(location.pathname.includes('/projects') ? 'active' : '')}>.projects( )</span></li>
                    <li><span onClick={() => navigate('/resume')} className={(location.pathname.includes('/resume') ? 'active' : '')}>.resume( )</span></li>
                    <li><FontAwesomeIcon icon={faLinkedin} className='fa_icon'/></li>
                    <li><FontAwesomeIcon icon={faGithub} className='fa_icon'/></li>
                </ul>
            </nav>
        </div>
    )
    :

    // Mobile
    (
        <div className="header_container">
            <nav className="navbar">
                <li className="navbar_breadcrumb">.aboutme( )</li>
            </nav>
        </div>
    )

}

export default NavigationBar;