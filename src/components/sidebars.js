import { faArtstation, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHref } from 'react-router-dom';
import '../styles/sidebar.css';

export default function SideBars() {

    const redirectLinkedin = useHref("https://www.linkedin.com/in/robin-xia-98a1881b5/");

    return (
        <>
            <div className='socials_sidebar'>
                <aside>

                    <a href='https://www.linkedin.com/in/robin-xia-98a1881b5/' target={'_blank'}>
                        <FontAwesomeIcon icon={faLinkedin} className={"socials_icon"} />
                    </a>
                    <a href='https://github.com/RobinXia99' target={'_blank'}>
                        <FontAwesomeIcon icon={faGithub} className={"socials_icon"} />
                    </a>
                    <a href='https://www.artstation.com/voyance' target={'_blank'}>
                        <FontAwesomeIcon icon={faArtstation} className={"socials_icon"} />
                    </a>
                    
                    <div className='socials_divider'/>
                </aside>
            </div>
        </>
    )

};