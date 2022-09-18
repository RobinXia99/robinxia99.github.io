import '../styles/resume.css';


const Resume = () => {

    return (
        <div className='main_container resume'>
            
            <div className='columns skills'>
                <div>
                    <ul>
                        <li>Frontend Development</li>
                        <li>UI / UX Design</li>
                    </ul>

                    <ul>
                        <li>Agile Workflow</li>
                        <li>Scrum</li>
                    </ul>
                </div>
            </div>

            <div className='columns tools'>
                <h3>Tools</h3>
                <div>
                    <ul>
                        <li>Javascript</li>
                        <li>Typescript</li>
                        <li>Swift</li>
                        <li>Kotlin</li>
                        <li>HTML</li>
                        <li>CSS</li>
                        
                    </ul>

                    <ul>
                        <li>React</li>
                        <li>React Native</li>
                        <li>Redux</li>
                        <li>SwiftUI</li>
                        <li>Firebase</li>
                    </ul>

                    <ul>
                        <li>Adobe XD</li>
                        <li>Figma</li>
                        <li>Blender</li>
                        <li>Git</li>
                        <li>Linear</li>
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