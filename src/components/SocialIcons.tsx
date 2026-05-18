import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { config } from "../config";

const SocialIcons = () => {
  const socialLinks = [
    { href: config.contact.github, icon: <FaGithub />, label: "GitHub" },
    { href: config.contact.linkedin, icon: <FaLinkedinIn />, label: "LinkedIn" },
    { href: config.contact.email ? `mailto:${config.contact.email}` : "", icon: <FaEnvelope />, label: "Email" },
    { href: config.contact.phone ? `https://wa.me/${config.contact.phone.replace(/[^0-9]/g, "")}` : "", icon: <FaWhatsapp />, label: "WhatsApp" },
  ].filter((link) => link.href);

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {socialLinks.map((link) => (
          <span key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
              {link.icon}
            </a>
          </span>
        ))}
      </div>
      <a className="resume-button" href={config.contact.resume} target="_blank" rel="noopener noreferrer">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
