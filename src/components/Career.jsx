import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer Intern</h4>
                <h5>EY GDS, AICTE</h5>
              </div>
              <h3>February 2025 – April 2025</h3>
            </div>
            <p>
              Built a Full-stack Food Delivery Web App using MERN, with secure authentication,
              cart management, and order tracking. Implemented responsive design principles to
              make websites and applications mobile-friendly.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI & Data Analytics Intern</h4>
                <h5>Skills4Future (AICTE, Shell India)</h5>
              </div>
              <h3>April 2025 – June 2025</h3>
            </div>
            <p>
              Developed a Carbon Footprint Calculator web app with Flask, providing personalized
              eco-tips. Assisted designing and developing user-friendly, responsive applications
              using Flask and dashboard using Power BI.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Intern</h4>
                <h5>Microsoft, AICTE, Edunet Foundation</h5>
              </div>
              <h3>June 2025 – August 2025</h3>
            </div>
            <p>
              Built a Medical Diagnosis AI using deep learning to classify medical images with 92%
              accuracy for early disease detection. Gained hands-on experience with supervised learning,
              computer vision, and model deployment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Campus Ambassador</h4>
                <h5>IIT Bombay</h5>
              </div>
              <h3>June 2025 – Present</h3>
            </div>
            <p>
              Working as a Campus Ambassador for IIT Bombay, completing various tasks such as
              promoting events, managing registrations, and coordinating with students to increase
              participation in national-level technical programs.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Campus Ambassador</h4>
                <h5>Google</h5>
              </div>
              <h3>October 2025 – Present</h3>
            </div>
            <p>
              Conducted Google tech awareness workshops on topics like Cloud and AI, helped students
              explore Google tools, and encouraged campus involvement in coding competitions and
              online learning initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
