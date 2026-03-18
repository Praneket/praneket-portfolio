import gsap from "gsap";
import { smoother } from "../Navbar";
import { setAllTimeline } from "./GsapScroll";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");

  gsap.to("body", { backgroundColor: "#0a0e17", duration: 0.5, delay: 1 });

  // Animate landing intro text
  gsap.fromTo(
    ".landing-intro h2",
    { opacity: 0, y: 50, filter: "blur(5px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.2 }
  );
  gsap.fromTo(
    ".landing-intro h1",
    { opacity: 0, y: 60, filter: "blur(5px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.4, stagger: 0.1 }
  );
  gsap.fromTo(
    ".landing-info h3",
    { opacity: 0, y: 40, filter: "blur(5px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.5 }
  );
  gsap.fromTo(
    ".landing-role-wrap",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power1.inOut", delay: 0.8 }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 }
  );

  // Animate particle field in
  gsap.fromTo(
    ".particle-wrapper",
    { opacity: 0 },
    { opacity: 1, duration: 2, ease: "power2.out", delay: 0.3 }
  );

  // Looping role text swap
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
  tl.to(".landing-h2-1", { y: "-100%", duration: 0.8, ease: "power3.inOut", delay: 3 })
    .to(".landing-h2-2", { y: "0%",    duration: 0.8, ease: "power3.inOut" }, "<")
    .to(".landing-h2-2", { y: "-100%", duration: 0.8, ease: "power3.inOut", delay: 3 })
    .to(".landing-h2-1", { y: "0%",    duration: 0.8, ease: "power3.inOut" }, "<");

  // Setup all scroll-based timelines
  setAllTimeline();
}
