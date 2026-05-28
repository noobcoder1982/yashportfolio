import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Clock, Globe, ArrowRight } from 'lucide-react';

const InstagramIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ verticalAlign: 'middle' }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const DiscordIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ verticalAlign: 'middle' }}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.894.076.076 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState('00:00:00');
  const [isDayTime, setIsDayTime] = useState(true);

  // Delhi Live Clock and day/night state
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const currentTimeStr = formatter.format(new Date());
      setTime(currentTimeStr);
      
      const hr = Number(currentTimeStr.split(':')[0]);
      setIsDayTime(hr >= 6 && hr < 18);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const targetPosition = el.getBoundingClientRect().top + window.scrollY;
      const isMobile = window.innerWidth <= 1024;
      const offset = isMobile ? 60 : 0;
      
      window.scrollTo({
        top: targetPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="brutalist-compact-footer">
      <div className="container">
        
        {/* UPPER MAIN GRID */}
        <div className="footer-compact-grid">
          
          {/* COLUMN 1: Brand & Availability Status */}
          <div className="footer-compact-col brand-status-panel">
            <div className="footer-brand-title">
              <span className="brand-dot"></span>
              <h3>YASH SRIVASTAVA</h3>
            </div>
            <p className="footer-brand-tagline">
              Post-Production Artist &amp; Motion Designer. Specializing in high-precision narrative cuts, kinetic typography, and fluid visual workflows.
            </p>
            <div className="footer-availability-badge">
              <span className="avail-pulse-dot"></span>
              <span className="avail-txt">READY FOR GIGS (OR UNTIL PREMIERE PRO CRASHES)</span>
            </div>
          </div>

          {/* COLUMN 2: Fast Navigation Directory */}
          <div className="footer-compact-col navigation-panel">
            <span className="footer-section-hdr">// TIMELINE INDEX</span>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => scrollToSection('home')} className="footer-nav-link">
                  <ArrowRight size={10} className="link-arrow" /> HERO INDEX
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="footer-nav-link">
                  <ArrowRight size={10} className="link-arrow" /> ABOUT PROFILE
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('skills')} className="footer-nav-link">
                  <ArrowRight size={10} className="link-arrow" /> ABILITIES MATRIX
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('projects')} className="footer-nav-link">
                  <ArrowRight size={10} className="link-arrow" /> SELECTED CUTS
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="footer-nav-link">
                  <ArrowRight size={10} className="link-arrow" /> CHANNELS MIX
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Contact & Communication Channels */}
          <div className="footer-compact-col channels-panel">
            <span className="footer-section-hdr">// CONNECT CHANNELS</span>
            <div className="footer-channels-stack">
              <a 
                href="mailto:srivastavayash970@gmail.com" 
                className="footer-channel-item email-channel"
                aria-label="Send Mail"
              >
                <div className="channel-icon-wrap email-icon">
                  <Mail size={14} />
                </div>
                <div className="channel-meta">
                  <span className="channel-lbl">PRIMARY MAIL</span>
                  <span className="channel-val">srivastavayash970@gmail.com</span>
                </div>
              </a>

              <div className="footer-social-row">
                <a 
                  href="https://www.instagram.com/yar_yash25/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-pill instagram-pill"
                >
                  <InstagramIcon size={14} /> <span>INSTAGRAM</span>
                </a>
                <a 
                  href="https://discord.gg/bahjQrDjw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-pill discord-pill"
                >
                  <DiscordIcon size={14} /> <span>DISCORD</span>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Clock & Geographic Signal */}
          <div className="footer-compact-col telemetry-panel">
            <span className="footer-section-hdr">// SIGNAL SOURCE</span>
            <div className="footer-telemetry-clock-card">
              <div className="clock-hdr">
                <Globe size={12} className="clock-icon" />
                <span>NEW DELHI, IN</span>
              </div>
              <div className="clock-numeric-readout">
                <span className="clock-digits-txt">{time}</span>
                <span className="clock-tz-txt">IST</span>
              </div>
              <div className="clock-status-tag">
                <span className={`status-dot ${isDayTime ? 'day-green' : 'night-blue'}`}></span>
                <span className="status-label">
                  {isDayTime ? 'STUDIO HOURS // IN OFFICE' : 'AFTER HOURS // ASYNC SYSTEM'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* SUB-BASEBAR */}
        <div className="footer-compact-sub-basebar">
          
          <div className="basebar-left">
            <span className="copyright-txt">
              © {currentYear} YAR YASH. COMPRESSED WITH HIGH PRECISION.
            </span>
            <div className="tech-stack-pills">
              <span className="stack-pill">REACT 18.2</span>
              <span className="stack-pill">VITE</span>
              <span className="stack-pill">CSS GRIDS</span>
              <span className="stack-pill">SPACE GROTESK</span>
            </div>
          </div>

          <button 
            className="footer-back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            <ArrowUp size={12} strokeWidth={2.5} />
            <span>[ BACK TO TOP ]</span>
          </button>

        </div>

      </div>
    </footer>
  );
}
