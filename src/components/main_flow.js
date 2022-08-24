import { Canvas } from '@react-three/fiber';
import '../styles/main_flow.css';

export default function MainFlow({viewport}) {

    return (
        <div className="main_container">
            <section className='section'>
                <div className='about_me'>
                    <h1 >
                        Hi,
                        <br />
                        I'm <span className='r_style'>Robin</span>
                        <br />
                        <span className='profession'>Frontend Developer</span>
                    </h1>
                    <button className='contact_me_btn slide_right'>Contact me</button>
                </div>
            </section>
        </div>
    )

}