import "./styles/Landing.css";
import ParticleField from "./ParticleField";

const Landing = () => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            PRANEKET
            <br />
            <span>JADHAV</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>A Full Stack</h3>
          <div className="landing-role-wrap">
            <div className="landing-h2-1">Developer</div>
            <div className="landing-h2-2">Engineer</div>
          </div>
        </div>
        <div className="particle-wrapper">
          <ParticleField />
        </div>
      </div>
    </div>
  );
};

export default Landing;
