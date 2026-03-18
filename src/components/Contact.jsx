import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BiLogoGmail } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.8, ease: "easeOut", delay },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) { alert("Thanks for your message!"); form.reset(); }
        else res.json().then((d) =>
          alert(d.errors ? d.errors.map((err) => err.message).join(", ") : "Oops! There was a problem submitting your form")
        );
      })
      .catch(() => alert("Oops! There was a problem submitting your form"));
  };

  return (
    <div ref={ref} className="contact-section section-container" id="contact">
      <div className="contact-container">

        <motion.h3 {...anim(0)} className="contact-heading">
          Let's <span>Connect</span>
        </motion.h3>
        <motion.p {...anim(0.1)} className="contact-subheading">
          I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.
        </motion.p>

        <div className="contact-flex">

          {/* ── Form ── */}
          <motion.form
            {...anim(0.2)}
            className="contact-form"
            action="https://formspree.io/f/xyzbzvjy"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="contact-form-row">
              <div className="contact-field">
                <label>Name</label>
                <input type="text" name="name" placeholder="Your name" required />
              </div>
              <div className="contact-field">
                <label>Email</label>
                <input type="email" name="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="contact-field">
              <label>Website <span>(optional)</span></label>
              <input type="text" name="website" placeholder="https://yourwebsite.com" />
            </div>
            <div className="contact-field">
              <label>Message</label>
              <textarea name="message" placeholder="How can I help?" required />
            </div>

            <div className="contact-form-bottom">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="contact-submit"
              >
                Get In Touch
                <span className="contact-submit-arrow">↗</span>
              </motion.button>

              <div className="contact-social-icons">
                {[
                  { Icon: BiLogoGmail,    link: "mailto:jadhavpraneket@gmail.com",            label: "Gmail" },
                  { Icon: IoLogoLinkedin, link: "https://www.linkedin.com/in/praneket-jadhav", label: "LinkedIn" },
                  { Icon: BsGithub,      link: "https://github.com/Praneket",                 label: "GitHub" },
                ].map(({ Icon, link, label }, i) => (
                  <motion.a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="disable"
                    aria-label={label}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.form>

          {/* ── Info ── */}
          <motion.div {...anim(0.35)} className="contact-info">
            <div className="contact-info-inner">
              <div className="contact-info-tag">AVAILABLE FOR WORK</div>
              <h2 className="contact-info-title">
                Ready to build<br />
                something <span>great?</span>
              </h2>
              <motion.a
                whileHover={{ x: 6 }}
                className="contact-mail-link"
                href="mailto:jadhavpraneket@gmail.com"
                data-cursor="disable"
              >
                <span className="contact-mail-icon"><IoMdMail /></span>
                jadhavpraneket@gmail.com
              </motion.a>
              <div className="contact-info-divider" />
              <p className="contact-info-edu">
                <span>Education</span>
                B.E in Computer Science
              </p>
            </div>
          </motion.div>

        </div>

        {/* ── Footer ── */}
        <motion.div {...anim(0.5)} className="contact-footer">
          <span><MdCopyright /> 2025 — Designed & Developed by <span className="contact-footer-name">Praneket Jadhav</span></span>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
