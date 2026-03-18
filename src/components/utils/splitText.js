import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Animate .para elements on scroll
  document.querySelectorAll(".para").forEach((para) => {
    if (para._anim) {
      para._anim.kill();
      para._anim = null;
    }
    gsap.set(para, { autoAlpha: 1 });
    para._anim = gsap.fromTo(
      para,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: para,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Animate .title elements on scroll
  document.querySelectorAll(".title").forEach((title) => {
    if (title._anim) {
      title._anim.kill();
      title._anim = null;
    }
    title._anim = gsap.fromTo(
      title,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}
