export default function AboutMe() {
  return (
    <div className="about_me_container reveal">
      <div className="content_container">
        <p className="about_me_text">
          Hello! My name is Robin, my main area of expertise is mobile app
          development using React Native. I work with both frontend and backend
          development. If I could pick one, it would be frontend as I find it
          more enjoyable and because it's just very fulfilling to visualize a
          solution for building a component/ui and then building it and have the
          outcome be the same as your visualization.
          <br />
          <br />
          My goal in the future is to start my own product company where I have
          more freedom to design and create what I believe in. To get there, I
          am working on honing my skills as a developer, growing as a person and
          learning about the ins and outs of the app development industry.
        </p>
      </div>
      <div className="content_container">
        <div className="pfp_container">
          <img className="about_me_pfp" src="./pfp.png" alt="profile" />
          <div className="about_me_pfp_cover" />
        </div>
      </div>
    </div>
  );
}
