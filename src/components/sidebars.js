import { faArtstation, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/sidebar.css';

export default function SideBars() {


    return (
        <>
            <div className='socials_sidebar'>
                <aside>
                    <FontAwesomeIcon icon={faLinkedin} className={"socials_icon"} />
                    <FontAwesomeIcon icon={faGithub} className={"socials_icon"} />
                    <FontAwesomeIcon icon={faArtstation} className={"socials_icon"} />
                    <div className='socials_divider'/>
                </aside>
            </div>
        </>
    )

};