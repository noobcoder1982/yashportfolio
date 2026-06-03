import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const InstagramIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const DiscordIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.894.076.076 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);

const NAV = [
  { id: 'home',     label: 'HOME'    },
  { id: 'about',    label: 'ABOUT'   },
  { id: 'skills',   label: 'SKILLS'  },
  { id: 'projects', label: 'WORKS'   },
  { id: 'contact',  label: 'CONTACT' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const isMobile = window.innerWidth <= 1024;
  if (isMobile) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
  } else {
    const wrap = document.querySelector('.app-wrapper');
    if (wrap) {
      const rel = el.getBoundingClientRect().top - wrap.getBoundingClientRect().top + wrap.scrollTop;
      wrap.scrollTo({ top: rel, behavior: 'smooth' });
    }
  }
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [time, setTime] = useState('');
  const [isDayTime, setIsDayTime] = useState(true);
  const nameRef = useRef(null);

  /* clock */
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat([], {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
    const tick = () => {
      const str = fmt.format(new Date());
      setTime(str);
      const hr = Number(str.split(':')[0]);
      setIsDayTime(hr >= 6 && hr < 18);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  /* GSAP marquee on the big name */
  useEffect(() => {
    if (!nameRef.current) return;
    gsap.to(nameRef.current, {
      x: '-50%',
      duration: 18,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <footer className="ft-root">

      {/* ── TOP RULE ── */}
      <div className="ft-top-rule" />

      {/* ── SCROLLING NAME MARQUEE ── */}
      <div className="ft-marquee-wrap" aria-hidden="true">
        <div ref={nameRef} className="ft-marquee-track">
          {/* duplicate for seamless loop */}
          {[0, 1].map(n => (
            <span key={n} className="ft-marquee-text">
              YASH SRIVASTAVA&nbsp;&nbsp;·&nbsp;&nbsp;
              FILM EDITOR&nbsp;&nbsp;·&nbsp;&nbsp;
              MOTION DESIGNER&nbsp;&nbsp;·&nbsp;&nbsp;
              ART DIRECTOR&nbsp;&nbsp;·&nbsp;&nbsp;
              VISUAL ARTIST&nbsp;&nbsp;·&nbsp;&nbsp;
              DELHI, INDIA&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div className="ft-body">

        {/* LEFT: giant availability statement */}
        <div className="ft-left">
          <p className="ft-avail-label">CURRENTLY AVAILABLE FOR</p>
          <h2 className="ft-avail-heading">
            FREELANCE<br />
            <span className="ft-avail-accent">PROJECTS.</span>
          </h2>
          <a href="mailto:srivastavayash970@gmail.com" className="ft-cta-btn">
            <span>START A PROJECT</span>
            <span className="ft-cta-arrow">→</span>
          </a>
        </div>

        {/* RIGHT: split into nav + contact */}
        <div className="ft-right">

          {/* Nav index */}
          <div className="ft-col">
            <span className="ft-col-label">INDEX</span>
            <nav className="ft-nav">
              {NAV.map(({ id, label }) => (
                <button key={id} className="ft-nav-btn" onClick={() => scrollTo(id)}>
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Channels */}
          <div className="ft-col">
            <span className="ft-col-label">CHANNELS</span>
            <div className="ft-channels">
              <a href="mailto:srivastavayash970@gmail.com" className="ft-channel-link">
                <span className="ft-channel-dot" />MAIL
              </a>
              <a href="https://www.instagram.com/yar_yash25/" target="_blank" rel="noopener noreferrer" className="ft-channel-link">
                <span className="ft-channel-dot" />INSTAGRAM
              </a>
              <a href="https://discord.gg/bahjQrDjw" target="_blank" rel="noopener noreferrer" className="ft-channel-link">
                <span className="ft-channel-dot" />DISCORD
              </a>
            </div>
          </div>

          {/* Clock */}
          <div className="ft-col">
            <span className="ft-col-label">LOCAL TIME</span>
            <div className="ft-clock-block">
              <span className="ft-clock-time">{time}</span>
              <span className="ft-clock-meta">
                <span className={`ft-clock-dot ${isDayTime ? 'ft-dot-day' : 'ft-dot-night'}`} />
                {isDayTime ? 'STUDIO HOURS' : 'AFTER HOURS'}
              </span>
              <span className="ft-clock-city">NEW DELHI · IST</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="ft-bottom-bar">
        <span className="ft-copy">© {year} YAR YASH. ALL RIGHTS RESERVED.</span>
        <div className="ft-stack-pills">
          {['REACT', 'VITE', 'GSAP', 'CSS GRID'].map(s => (
            <span key={s} className="ft-stack-pill">{s}</span>
          ))}
        </div>
        <button className="ft-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          ↑ TOP
        </button>
      </div>

    </footer>
  );
}
