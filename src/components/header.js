import '../styles/header.css';

export default function Header() {


    return (
        <header className='nav_styledHeader'>
            <nav className='nav_styledNav'>

                <a href='/' className='nav_home'>
                    <span>
                        <i>R</i>
                        Robin Xia
                        <br />
                        Frontend Developer
                    </span>
                </a>

                <ol>
                    <a href='/#about'>
                        <span>01.</span> About
                    </a>
                    <a href='/#projects'>
                        <span>02.</span> Projects
                    </a>
                    <a href='/#resume'>
                        <span>03.</span> Resume
                    </a>
                </ol>


                {/* <input type="checkbox" id="menyAvPaa"/>
                    <label id="burger" htmlFor='menyAvPaa'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </label>
                    <nav id="meny">
                    </nav> */}

            </nav>
        </header>
    )

};