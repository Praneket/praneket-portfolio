import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setAllTimeline() {
  // ── Landing parallax (text only, sphere stays) ──
  gsap.to(".landing-container", {
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    opacity: 0,
    y: "20%",
  });

  // ── About section ──
  gsap.fromTo(
    ".about-me",
    { opacity: 0, x: 60 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    }
  );

  gsap.fromTo(
    ".about-visual",
    { opacity: 0, x: -60 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // ── WhatIDo ──
  gsap.to(".what-box-in", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top 65%",
      toggleActions: "play none none reverse",
    },
  });

  // ── Career timeline ──
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  careerTimeline
    .fromTo(".career-timeline", { maxHeight: "10%", opacity: 0 }, { maxHeight: "100%", opacity: 1, duration: 0.5 }, 0)
    .fromTo(".career-info-box", { opacity: 0, x: 30 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, 0)
    .fromTo(".career-dot", { animationIterationCount: "infinite" }, { animationIterationCount: "1", delay: 0.3, duration: 0.1 }, 0);

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(".career-section", { y: 0 }, { y: "20%", duration: 0.5, delay: 0.2 }, 0);
  }

  // ── Work section ──
  gsap.fromTo(
    ".work-section h2",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".work-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    }
  );
}
