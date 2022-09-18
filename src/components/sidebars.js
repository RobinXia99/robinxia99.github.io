import { faArtstation, faGithub, faLinkedin, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHref } from 'react-router-dom';
import '../styles/sidebar.css';
import ThemeBar from './themebar';

export default function SideBars({device}) {


    return device == "web" ? (
        <>

        
            <div className='socials_sidebar'>
                <aside>

                    <a href='https://www.linkedin.com/in/robin-xia-98a1881b5/' target={'_blank'} rel="noreferrer">
                        <FontAwesomeIcon icon={faLinkedinIn} className={"socials_icon"} />
                    </a>
                    <a href='https://github.com/RobinXia99' target={'_blank'} rel="noreferrer">
                        <FontAwesomeIcon icon={faGithub} className={"socials_icon"} />
                    </a>
                    <a href='https://www.artstation.com/voyance' target={'_blank'} rel="noreferrer">
                        <FontAwesomeIcon icon={faArtstation} className={"socials_icon"} />
                    </a>
                    
                    <div className='socials_divider'/>
                </aside>
            </div>

            <ThemeBar/>
            
        </>
    )
    :
    null;

};