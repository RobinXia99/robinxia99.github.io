import React, { useEffect, useState } from "react";
import '../styles/header.css'
import { faLinkedin, faGithub, faArtstation } from "@fortawesome/free-brands-svg-icons";
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";



const NavigationBar = ({device}) => {


    let navigate = useNavigate();
    let location = useLocation();

    const [activePage, setActivePage] = useState('/');
    const [dropdownActive, setDropdownActive] = useState(false);

    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
    };

    useEffect(() => {
        setDropdownActive(false);
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

    const Dropdown = () => {
        return (
            <div className="dropdown_holder">
                <FontAwesomeIcon className="dropdown_icon" icon={faXmark} onClick={toggleDropdown}/>
                <ul className="dropdown_ul">
                    <li><span onClick={() => navigate('/')} className={(location.pathname == '/' ? 'active' : '')}>.aboutme( )</span></li>
                    <li><span onClick={() => navigate('/projects')} className={(location.pathname.includes('/projects') ? 'active' : '')}>.projects( )</span></li>
                    <li><span onClick={() => navigate('/resume')} className={(location.pathname.includes('/resume') ? 'active' : '')}>.resume( )</span></li>
                    <div>
                        <li><a href="https://www.linkedin.com/in/robin-xia-98a1881b5/" target="_blank"><FontAwesomeIcon icon={faLinkedin} className='fa_icon_menu'/></a></li>
                        <li><a href="https://github.com/RobinXia99" target="_blank"><FontAwesomeIcon icon={faGithub} className='fa_icon_menu'/></a></li>
                        <li><a href="https://www.artstation.com/voyance" target="_blank"><FontAwesomeIcon icon={faArtstation} className='fa_icon_menu'/></a></li>
                    </div>
                </ul>
            </div>
        )
    };

    return (device == 'web') ? 

    // Web
    (
        <div className="header_container">
            <nav className="navbar">
                <li className="navbar_breadcrumb">{activePage}</li>
                <ul className="web_ul">

                    <li><span onClick={() => navigate('/')} className={(location.pathname == '/' ? 'active' : '')}>.aboutme( )</span></li>

                    <li><span onClick={() => navigate('/projects')} className={(location.pathname.includes('/projects') ? 'active' : '')}>.projects( )</span></li>

                    <li><span onClick={() => navigate('/resume')} className={(location.pathname.includes('/resume') ? 'active' : '')}>.resume( )</span></li>

                    <li><a href="https://www.linkedin.com/in/robin-xia-98a1881b5/" target="_blank"><FontAwesomeIcon icon={faLinkedin} className='fa_icon'/></a></li>

                    <li><a href="https://github.com/RobinXia99" target="_blank"><FontAwesomeIcon icon={faGithub} className='fa_icon'/></a></li>

                    <li><a href="https://www.artstation.com/voyance" target="_blank"><FontAwesomeIcon icon={faArtstation} className='fa_icon'/></a></li>
                </ul>
            </nav>
        </div>
    )
    :

    // Mobile
    (
        <div className="header_container">
            <nav className="navbar mobile">
                <li className="navbar_breadcrumb">{activePage}</li>
                <li onClick={toggleDropdown}><FontAwesomeIcon className={dropdownActive ? 'hidden' : 'dropdown_icon'} icon={faBars}/></li>
            </nav>

            {dropdownActive
            ? <Dropdown></Dropdown>
            : ''
            }

        </div>
    )

}

export default NavigationBar;