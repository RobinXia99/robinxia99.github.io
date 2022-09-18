
import { otherProjects } from '../files/globals';
import '../styles/main_flow.css';
import '../styles/about_me.css';
import Resume from './resume';
import { FeaturedProjects, OtherProject } from './Projects';




export default function MainFlow({ viewport, aboutRef, projectsRef, skillsRef }) {

    window.addEventListener('scroll', reveal);

    function reveal() {

        var reveals = document.querySelectorAll('.reveal');

        for(const reveal of reveals) {

            var revealTop = reveal.getBoundingClientRect().top;
            var revealPoint = 150;

            if(revealTop < viewport.height - revealPoint) {
                reveal.classList.add('active');
            }

        }

    }

    


    return (
        <div className="main_container">


            <section className='section'>
                <div className='name_section'>
                    <h1 >
                        Hi,
                        <br />
                        I'm <span className='r_style'>Robin</span>,
                        <br />
                        <span className='profession'>I build websites and apps.</span>
                        <br />
                        <p>
                            Mobile - Web - Frontend
                            <br />
                        </p>
                    </h1>

                    <a href='mailto: robin_99@live.se' className='contact_me_btn slide_right'>Contact me</a>
                </div>
            </section>

            <section className='section' >
                <div className='section_headline reveal' id='about_section' ref={aboutRef} >

                    <span>- 01 -</span>
                    <span>Who am I?</span>
                    <div className='headline_divider' />
                </div>

                <AboutMe/>
            </section>

            <section className='section' >

                <div className='project_container reveal'>
                    <div className='section_headline' id='project_section' ref={projectsRef}>

                        <span>- 02 -</span>
                        <span>Featured Projects</span>
                        <div className='headline_divider' />
                    </div>
                    <FeaturedProjects />

                    <div className='more_projects_section reveal'>
                        <span>

                            <h3>Other projects</h3>

                        </span>
                        <div className='more_projects_container'>
                            {otherProjects.map(project => (
                                <OtherProject project={project} key={project.title} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section >
                <div className='section_headline' id='skills_section' ref={skillsRef}>

                    <span>- 03 -</span>
                    <span>Skills</span>
                    <div className='headline_divider' />
                </div>

                <Resume/>
            </section>


        </div>
    )

}

function AboutMe() {

    return (
        <div className='about_me_container reveal'>

            <div className='content_container'>
                <p className='about_me_text'>
                    Hello! My name is Robin and what drives me forward in my work is seeing ideas materialize into real & usable applications and websites.
                    <br/>
                    In just a little bit over a year, I've set foot in native iOS & Android, Web, and Cross platform app development.
                    <br/>
                    Throughout my journey, I've realized that my interest in this field is not really rooted in coding, but in the creative freedom that it brings.
                    The day dreams and the ideas that arise during the train ride home are no longer a source of disappointment when I realize It's just fantasies. They're sources for inspiration.
                    <br/>
                    <br/>
                    Currently, I'm in the midst of a consultant internship at <a href='https://www.hackberry.se/' target={'_blank'} rel="noreferrer">Hackberry</a>. While working in an agile environment, I'm also learning what it means to be client oriented.
                </p>
            </div>
            <div className='content_container'>
                <div className='pfp_container'>
                    <img className='about_me_pfp' src='./pfp.png' alt='profile'/>
                    <div className='about_me_pfp_cover'/>
                </div>
            </div>

        </div>
    )

}

