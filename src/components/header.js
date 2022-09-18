
import { useEffect, useState } from 'react';
import '../styles/header.css';
import ThemeBar from './themebar';
import cv from '../files/robinxiacv.pdf';
import { faArtstation, faGithub, faLinkedin, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header({ device, aboutRef, projectsRef, skillsRef }) {


    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (event) => {
        if (event.target.checked) {
            setIsOpen(true);
        } else if (!event.target.checked) {
            setIsOpen(false);
        }
    }

    const handleNavigation = (ref) => {

        if(device == 'mobile') {
            setIsOpen(false);
        }

        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });

    }

    useEffect(() => {

        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else if (!isOpen) {
            document.body.style.overflow = 'unset'
        }

    }, [isOpen])



    function useScroll() {
        const [scroll, setScroll] = useState({
            direction: null,
            isDocked: null
        });

        useEffect(() => {
            let lastScrollY = window.pageYOffset;

            const updateScroll = () => {

                const scrollY = window.pageYOffset;
                const direction = scrollY > lastScrollY ? "down" : "up";

                if (direction !== scroll.direction && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10) && window.scrollY >= 100) {

                    setScroll({ ...scroll, direction: direction, isDocked: false });

                } else if (window.scrollY < 100) {

                    setScroll({ ...scroll, direction: direction, isDocked: true });
                }
                lastScrollY = scrollY > 0 ? scrollY : 0;

            };
            window.addEventListener("scroll", updateScroll); // add event listener
            return () => {
                window.removeEventListener("scroll", updateScroll); // clean up
            }
        }, [scroll]);

        return scroll;
    };

    const scroll = useScroll();

    return (
        <header className={`nav_styledHeader ${scroll.direction === "down" ? "hide" : "show"} ${scroll.isDocked === false ? 'colored_nav' : ""}`}>
            <nav className='nav_styledNav'>

                <a href='/' className='nav_home'>
                    <span>
                        <img src='/rx.svg' alt='App logo'/>
                        Robin Xia
                        <br />
                        Application Developer
                    </span>
                </a>

                {device == "web" ?
                    <ol className='web_menu'>
                        <a href='/#about' onClick={() => handleNavigation(aboutRef)}>
                            <span>01.</span> About
                        </a>
                        <a href='/#projects' onClick={() => handleNavigation(projectsRef)}>
                            <span>02.</span> Projects
                        </a>
                        <a href='/#skills' onClick={() => handleNavigation(skillsRef)}>
                            <span>03.</span> Skills
                        </a>

                        <a className='cv_btn slide_right' href={cv} target='_blank' rel="noreferrer">CV</a>
                    </ol>
                    :
                    <>


                        <input type="checkbox" id="checkbox1" className="checkbox1 visuallyHidden" checked={isOpen} onChange={handleChange} />
                        <label htmlFor="checkbox1">
                            <div className="hamburger hamburger1">
                                <span className="bar bar1"></span>
                                <span className="bar bar2"></span>
                                <span className="bar bar3"></span>
                                <span className="bar bar4"></span>
                            </div>
                        </label>

                        <div className={`mobile_menu_backdrop ${isOpen ? 'menu_visible' : 'menu_backdrop_hidden'}`} onClick={handleChange} />
                        <aside className={`mobile_menu ${isOpen ? 'menu_visible' : 'menu_hidden'}`}>
                            <nav className='mobile_menu_nav'>
                                <a href='/#about' onClick={() => handleNavigation(aboutRef)}>
                                    <span>01.</span> About
                                </a>
                                <a href='/#projects' onClick={() => handleNavigation(projectsRef)}>
                                    <span>02.</span> Projects
                                </a>
                                <a href='/#skills' onClick={() => handleNavigation(skillsRef)}>
                                    <span>03.</span> Skills
                                </a>

                                <a className='cv_btn slide_right' href={cv} target='_blank' rel="noreferrer">CV</a>

                                <div className='mobile_socials_container'>
                                    <a href='https://www.linkedin.com/in/robin-xia-98a1881b5/' target={'_blank'} rel="noreferrer">
                                      <FontAwesomeIcon icon={faLinkedinIn} className={"socials_icon"} />
                                    </a>
                                    <a href='https://github.com/RobinXia99' target={'_blank'} rel="noreferrer">
                                      <FontAwesomeIcon icon={faGithub} className={"socials_icon"} />
                                    </a>
                                    <a href='https://www.artstation.com/voyance' target={'_blank'} rel="noreferrer">
                                      <FontAwesomeIcon icon={faArtstation} className={"socials_icon"} />
                                    </a>
                                </div>

                                <ThemeBar/>
                                
                            </nav>
                        </aside>



                    </>
                }

            </nav>
        </header>
    )

};