import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FiMail, FiPhone, FiMapPin, FiCopy, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const socialLinks = [
    { label: "Github", href: config.contact.github },
    { label: "Linkedin", href: config.contact.linkedin },
    { label: "Resume", href: config.contact.resume },
  ].filter((link) => link.href);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(config.contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      gsap.set(".contact-header, .contact-card", { opacity: 1, y: 0 });
      return;
    }

    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 85%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    // Animate title from bottom
    contactTimeline.fromTo(
      ".contact-header",
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // Animate contact cards with stagger from bottom
    contactTimeline.fromTo(
      ".contact-card",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Clean up
    return () => {
      contactTimeline.kill();
    };
  }, []);

  return (
    <div className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h3>Get in <span>Touch</span></h3>
          <div className="contact-header-line"></div>
        </div>
        
        <div className="contact-grid">
          {/* Card 1: Let's Connect (Quick Contact) */}
          <div className="contact-card contact-info-card">
            <div className="contact-card-glow"></div>
            <h4>Let's Build Something premium</h4>
            <p className="contact-desc">
              Have a premium mobile app project, custom library integration, or professional opportunity in mind? Let's connect!
            </p>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon-wrap">
                  <FiMail />
                </div>
                <div className="contact-text-wrap">
                  <h5>Email</h5>
                  <div className="email-copy-wrap">
                    <a href={`mailto:${config.contact.email}`} className="contact-link" data-cursor="disable">
                      {config.contact.email}
                    </a>
                    <button 
                      onClick={handleCopyEmail} 
                      className={`copy-btn ${copied ? 'copied' : ''}`}
                      title="Copy email to clipboard"
                      data-cursor="disable"
                    >
                      {copied ? <FiCheck className="accent-icon" /> : <FiCopy />}
                      <span className="tooltip-text">{copied ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-wrap">
                  <FiPhone />
                </div>
                <div className="contact-text-wrap">
                  <h5>Phone</h5>
                  <a href={`tel:${config.contact.phone.replace(/\s/g, "")}`} className="contact-link" data-cursor="disable">
                    {config.contact.phone}
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-wrap">
                  <FaWhatsapp />
                </div>
                <div className="contact-text-wrap">
                  <h5>WhatsApp</h5>
                  <a 
                    href={`https://wa.me/${config.contact.phone.replace(/[^0-9]/g, "")}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-link" 
                    data-cursor="disable"
                  >
                    {config.contact.phone}
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-wrap">
                  <FiMapPin />
                </div>
                <div className="contact-text-wrap">
                  <h5>Location</h5>
                  <span className="contact-static-text">{config.social.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Social Links */}
          <div className="contact-card contact-social-card">
            <div className="contact-card-glow"></div>
            <h4>Connect Digitally</h4>
            <p className="contact-desc">
              Check out my GitHub repositories, browse my professional credentials on LinkedIn, or inspect my resume details.
            </p>
            <div className="social-buttons">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                  className="social-btn"
                >
                  <span className="social-btn-label">{link.label}</span>
                  <span className="social-btn-icon"><MdArrowOutward /></span>
                </a>
              ))}
            </div>
          </div>

          {/* Card 3: Signature Card */}
          <div className="contact-card contact-signature-card">
            <div className="contact-card-glow"></div>
            <div className="signature-content">
              <h2>
                Designed & Developed <br /> by <span>{config.developer.fullName}</span>
              </h2>
              <div className="signature-divider"></div>
              <h5>
                <MdCopyright /> {new Date().getFullYear()} All Rights Reserved
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
