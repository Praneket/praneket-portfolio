import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Mati Mitra : A soil sensing app",
    category: "A powerful tool for farmers using IOT and AI.",
    tools: "React, Node.Js, Express.js, MongoDB",
    image: "/images/portfolio-1.png",
    link : "https://mati-mitra.vercel.app/",
  },
  {
    title: "NASA APOD Explorer",
    category: "A responsive React application that fetches NASA's Astronomy Picture of the Day (APOD) with date-based browsing and a dynamic gallery.",
    tools: "React, Node.Js, Express.js, MongoDB",
    image: "/images/portfolio 4.png",
    link: "https://nasa-apod-explorer-ejyr.onrender.com",
  },
  {
    title: "OMDB Movie Explorer",
    category: "A full-stack movie search app using OMDB API with favorites, movie details, and a modern Tailwind-styled UI.",
    tools: "React, Node.Js, Express.js, MongoDB",
    image: "/images/portfolio 5.png",
    link: "https://omdb-movie-explorer-frontend.onrender.com",
  },
  {
    title: "Medical Diagnosis Using AI",
    category: "Health care app to diagnosis diseases.",
    tools: "React, Node.Js, Express.js, MongoDB",
    image: "/images/portfolio 3.png",
    link: "https://medical-diagnosis-by-using-ai.streamlit.app/"
  },
  {
    title: "Tomato : Food Delivery App",
    category: "A Food delivery App for easier ordering of food.",
    tools: "React.js, Node.js, Microservices",
    image: "/images/portfolio-2.png",
    link: "https://food-delivery-app-f9r4.vercel.app/"
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / projects.length)}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} link={project.link} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
