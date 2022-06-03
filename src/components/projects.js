import '../styles/projects.css';
import { projectsJson } from '../files/globals';

const Projects = () => {

    return (
        <div className="main_container projects">
            <aside className='path_tag left'><span>&lt;projects&gt;</span></aside>
            <div className='title_holder projects'>
                <h2>Projects</h2>
                <span>// No professional works yet! In the meantime, here are some school/side projects! Currently working with React.</span>
            </div>
            {projectsJson.map(project => (
                <ProjectInfo project={project} key={project.title}></ProjectInfo>
            ))}

            <aside className='path_tag right'><span>&lt;/projects&gt;</span></aside>
        </div>
    )

}

const ProjectInfo = ({project}) => {

    

    return (
        <div className='projects_container'>
            <div className='projects_desc'>
                <h2>{project.title}</h2>
                <p>{project.desc}</p>
                <h4>Made using: {project.tools}</h4>
                <a href={project.repo} target="_blank">Source / Demo</a>
            </div>
            <div className='project_images'>
                {project.images.map(image => (
                <img key={image} className='project_img' src={image}></img>
                ))}
            </div>

        </div>
    )
}




export default Projects;