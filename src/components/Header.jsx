import React, { useState, useEffect } from 'react';
import { Home, User, Layers, Film, Mail, ArrowUp } from 'lucide-react';

const NAV = [
  { id: 'home',     num: '01', label: 'HOME',    icon: Home    },
  { id: 'about',    num: '02', label: 'ABOUT',   icon: User    },
  { id: 'skills',   num: '03', label: 'SKILLS',  icon: Layers  },
  { id: 'projects', num: '04', label: 'WORKS',   icon: Film    },
  { id: 'contact',  num: '05', label: 'CONTACT', icon: Mail    },
];

export default function Header() {
  const [active, setActive] = useState('home');
  const [scrollPercent, setScrollPercent] = useState(0);
  const [hovered, setHovered] = useState(null);

  /* Delhi IST Live Clock */
  const [time, setTime] = useState('00:00:00');
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
      setTime(formatter.format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  /* Scroll tracking & scroll percentage computation */
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(Math.max(window.scrollY / docH, 0), 1) : 0;
      setScrollPercent(Math.round(pct * 100));

      if (window.scrollY < 60) { 
        setActive('home'); 
        return; 
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 60) return;
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-80px 0px -45% 0px', threshold: 0.1 }
    );

    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      NAV.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) io.unobserve(el);
      });
    };
  }, []);

  const scrollTo = (id) => {
    const targetEl = document.getElementById(id);
    if (!targetEl) return;
    
    const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY;
    const isMobile = window.innerWidth <= 1024;
    const offset = isMobile ? 60 : 0; // Offset for mobile top navigation bar
    
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition - offset;
    let startTime = null;
    const duration = 800; // Luxurious 800ms animation curve

    // Premium Quintic easing curve for smooth decelerating
    const easeInOutQuint = (t) => {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuint(progress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };

  return (
    <aside className="brutalist-side-nav">
      
      {/* ── TOP SECTION: Studio Logo Node ── */}
      <div className="side-nav-brand">
        <div className="brand-hexagon">
          <span>YY</span>
        </div>
        <div className="brand-status-led">
          <span className="led-dot green-led"></span>
          <span className="led-label">LIVE.SYS</span>
        </div>
      </div>

      {/* ── MIDDLE SECTION: Tactile Keyframe Nav Markers ── */}
      <nav className="side-nav-links-stack">
        {NAV.map(({ id, num, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`side-nav-btn ${isActive ? 'active-nav-btn' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={label}
            >
              <div className="nav-btn-indicator"></div>
              <div className="nav-btn-icon-wrap">
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} className="nav-icon-svg" />
              </div>
              <span className="nav-btn-num">{num}</span>
              
              {/* Expandable sliding name tag on hover */}
              <div className={`nav-btn-sliding-tag ${hovered === id ? 'hover-reveal' : ''}`}>
                <span className="tag-inner-txt">{label}</span>
              </div>
            </a>
          );
        })}
      </nav>

      {/* ── BOTTOM SECTION: Live Telemetry Outlets ── */}
      <div className="side-nav-telemetry-console">
        
        {/* Dynamic Stereo Audio VU visualizer */}
        <div className="side-nav-audio-scope">
          <div className="scope-bars">
            <span className="audio-bar b1" />
            <span className="audio-bar b2" />
            <span className="audio-bar b3" />
            <span className="audio-bar b4" />
            <span className="audio-bar b5" />
          </div>
          <span className="scope-title">L/R MASTER</span>
        </div>

        {/* Live Delhi Clock */}
        <div className="side-nav-clock-block">
          <span className="clock-val">{time}</span>
          <span className="clock-label">IST (DELHI)</span>
        </div>

        {/* Scroll Progress & Tactile Back to Top */}
        <div className="side-nav-progress-block">
          <span className="progress-tag">READ: {scrollPercent}%</span>
          
          <button 
            className="side-nav-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onMouseEnter={() => setHovered('top')}
            onMouseLeave={() => setHovered(null)}
            aria-label="Back to top"
          >
            <ArrowUp size={14} strokeWidth={2.5} />
            
            {/* Sliding drawer label on hover */}
            <div className={`nav-btn-sliding-tag ${hovered === 'top' ? 'hover-reveal' : ''}`}>
              <span className="tag-inner-txt">BACK TO TOP</span>
            </div>
          </button>
        </div>

      </div>

    </aside>
  );
}
