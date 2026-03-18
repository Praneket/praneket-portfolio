import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-visual">
        <div className="about-orb about-orb-1"></div>
        <div className="about-orb about-orb-2"></div>
        <div className="about-orb about-orb-3"></div>
        <div className="about-grid">
          {[...Array(12)].map((_, i) => (
            <div className="about-grid-item" key={i}></div>
          ))}
        </div>
        <div className="about-ring about-ring-1"></div>
        <div className="about-ring about-ring-2"></div>
      </div>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Full Stack Developer with 1+ years of experience building scalable web
          applications using React.js, Node.js, and Express.JS. Skilled
          in microservices architecture and low-code platforms.
          Passionate about creating high-performance, production-ready solutions
          from concept to deployment.
        </p>
      </div>
    </div>
  );
};

export default About;
