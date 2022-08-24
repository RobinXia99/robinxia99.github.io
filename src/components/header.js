import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/header.css';

export default function Header({ device }) {


    return (
        <header className='nav_styledHeader'>
            <nav className='nav_styledNav'>

                <a href='/' className='nav_home'>
                    <span>
                        <i>R</i>
                        Robin Xia
                        <br />
                        Frontend Developer
                    </span>
                </a>

                {device == "web" ?
                    <ol>
                        <a href='/#about'>
                            <span>01.</span> About
                        </a>
                        <a href='/#projects'>
                            <span>02.</span> Projects
                        </a>
                        <a href='/#resume'>
                            <span>03.</span> Resume
                        </a>
                    </ol>
                    :
                    <>
                        <FontAwesomeIcon icon={faBars} className={'menu_icon'}/>
                    </>
                    }

            
                


                

            </nav>
        </header>
    )

};