import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} RadiantNeuron. All rights reserved.</p>
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/ravikant-singh-2100b2266/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="https://github.com/raavikant27"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
