import '../styles/resume.css';

import cv from '../files/robinxiacv.pdf';

const Resume = () => {

    return (
        <div className='main_container resume'>
            <aside className='path_tag left'><span>&lt;resume&gt;</span></aside>

            <div className='title_holder'>
                <h2>Resume</h2>
                <div className='resume_dl'>Download my <a href={cv} target='_blank'>CV</a></div>
            </div>
            
            <div className='columns skills'>
                <h3>Skills</h3>
                <div>
                    <ul>
                        <li>Frontend Development</li>
                        <li>UI / UX Design</li>
                    </ul>

                    <ul>
                        <li>Agile Project Management</li>
                        <li>Scrum</li>
                    </ul>
                </div>
            </div>

            <div className='columns tools'>
                <h3>Tools</h3>
                <div>
                    <ul>
                        <li>Javascript</li>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>React</li>
                        <li>Redux</li>
                    </ul>

                    <ul>
                        <li>Swift</li>
                        <li>SwiftUI</li>
                        <li>UIKit</li>
                    </ul>

                    <ul>
                        <li>Kotlin</li>
                        <li>XML</li>
                    </ul>

                    <ul>
                        <li>Adobe XD</li>
                        <li>Figma</li>
                        <li>Blender</li>
                        <li>Git</li>
                        <li>Firebase</li>
                    </ul>
                </div>
            </div>

            <div className='columns languages'>
                <h3>Languages</h3>
                <div>
                    <ul>
                        <li>Swedish // Fluent</li>
                        <li>English // Fluent</li>
                        <li>Mandarin (Chinese) // Fluent</li>
                    </ul>
                </div>
            </div>

            <aside className='path_tag right'><span>&lt;/resume&gt;</span></aside>
        </div>
    )

}

export default Resume;