import '../styles/projects.css';

const Projects = () => {

    return (
        <div className="main_container projects">
            <aside className='path_tag left'><span>&lt;projects&gt;</span></aside>
            <div className='title_holder'>
                <h2>Projects</h2>
                <span>// No professional works yet! In the meantime, check out my <span style={{color: '#997AB6'}}>Artstation</span> and <span style={{color: '#8C9AC6'}}>Github</span>! (Pinned Repositories have images/demo in README)</span>
            </div>
            <div className='projects_container'>
                <a href='https://www.artstation.com/voyance' target='_blank'>
                    <img src='https://www.artstation.com/assets/about/logo/logo-artstation-vertical-a8aa107f79c46c9b16dcc7c5fe746084.png'></img>
                </a>
                <a href='https://github.com/RobinXia99' target='_blank'>
                    <img src='https://www.logo.wine/a/logo/GitHub/GitHub-Wordmark-White-Dark-Background-Logo.wine.svg'></img>
                </a>
            </div>
            <aside className='path_tag right'><span>&lt;/projects&gt;</span></aside>
        </div>
    )

}

export default Projects;