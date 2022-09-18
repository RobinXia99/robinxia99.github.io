
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/main_flow.css';


export function FeaturedProjects() {

    return (
        <>
            <div className='project reveal'>
                <h3>Dear Nature</h3>
                <div className='project_preview_container'>
                    <aside>
                        <i />
                        <i />
                        <i />
                    </aside>
                    <div>
                        <img className='project_preview_img' src='/dearnaturesc.png' />
                    </div>

                </div>
                <div className='project_description_container'>
                    <p>
                        Dear Nature is a social app where users can create & share maps and pin locations/findings as well as their favorite pictures.
                        <br />
                        <br />
                        Maps can be locked and unlocked as you wish. Locations pinned to the map can be edited - icon, image and description.

                    </p>
                    <a href='https://github.com/RobinXia99/Dear-Nature' target={'_blank'} rel="noreferrer">Source</a>
                </div>
                <div className='project_tools'>
                    <span>SwiftUI</span>
                    <span>Firebase</span>
                    <span>Google Maps</span>
                </div>
            </div>

            <div className='project mid reveal'>
                <h3>Food Track</h3>
                <div className='project_description_container mid'>
                    <p>
                        Food Track is an app made with the idea of spreading the awesomeness of Food Trucks because they are sometimes hard to find. Theyre also criminally underrated!
                        <br />
                        <br />
                        Food Truck owners can also register their own trucks and menus!
                    </p>
                    <a href='https://github.com/crystalii/Food-Truck' target={'_blank'} rel="noreferrer">Source</a>
                </div>
                <div className='project_preview_container mid'>
                    <aside>
                        <i />
                        <i />
                        <i />
                    </aside>
                    <div>
                        <img className='project_preview_img' src='/foodtracksc.png' />
                    </div>

                </div>

                <div className='project_tools mid'>
                    <span>Kotlin</span>
                    <span>Firebase</span>
                    <span>Google Maps</span>
                </div>
            </div>

            <div className='project reveal'>
                <h3>Movie Collector</h3>
                <div className='project_preview_container'>
                    <aside>
                        <i />
                        <i />
                        <i />
                    </aside>
                    <div>
                        <img className='project_preview_img' src='/moviecollectorsc.png' />
                    </div>

                </div>
                <div className='project_description_container'>
                    <p>
                        A movie database that lets the user discover new movies through detailed pages, search & filter as well as write reviews.
                        <br />
                        <br />
                        This was a school project which means the shopping cart isn't functional.

                    </p>
                    <a href='https://github.com/RticRtic/webb-movie' target={'_blank'} rel="noreferrer">Source</a>
                </div>
                <div className='project_tools'>
                    <span>React</span>
                    <span>Redux</span>
                    <span>Firebase</span>
                </div>
            </div>
        </>


    )

}

export function OtherProject({ project }) {

    return (
        <div className='other_project' >
            <div className='other_project_inner'>
                <span className='other_project_links_container'>
                    <a href={project.source[0]} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon className='other_project_link' icon={faGithub} />
                    </a>

                    {project.source.length > 1 ?
                        <a href={project.source[1]} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon className='other_project_link' icon={faUpRightFromSquare} />
                        </a>
                        :
                        null}

                </span>
                <h3 className='other_project_title'>{project.title}</h3>
                <p >{project.desc}</p>
                <div className='other_project_tools'>{project.tools.map(tool => (
                    <span key={tool}>{tool}</span>
                ))}</div>
            </div>

        </div>
    )

}