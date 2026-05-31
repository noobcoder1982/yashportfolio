import React, { useState, useEffect } from 'react';
import { Home, User, Layers, Film, Mail, ArrowUp, X, Menu } from 'lucide-react';

const NAV = [
  { id: 'home',     num: '01', label: 'HOME',    icon: Home    },
  { id: 'about',    num: '02', label: 'ABOUT',   icon: User    },
  { id: 'skills',   num: '03', label: 'SKILLS',  icon: Layers  },
  { id: 'projects', num: '04', label: 'WORKS',   icon: Film    },
  { id: 'contact',  num: '05', label: 'CONTACT', icon: Mail    },
];

export default function Header() {
  const [active, setActive]           = useState('home');
  const [scrollPercent, setScrollPercent] = useState(0);
  const [hovered, setHovered]         = useState(null);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [isMobile, setIsMobile]       = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  /* Scroll tracking */
  useEffect(() => {
    const isDesktop = !isMobile;
    const scrollContainer = isDesktop ? (document.querySelector('.app-wrapper') || window) : window;

    const onScroll = () => {
      const el = scrollContainer === window ? document.documentElement : scrollContainer;
      const scrollY = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = scrollContainer === window ? window.innerHeight : el.clientHeight;
      const docH = scrollHeight - clientHeight;
      const pct = docH > 0 ? Math.min(Math.max(scrollY / docH, 0), 1) : 0;
      setScrollPercent(Math.round(pct * 100));
      if (scrollY < 60) { setActive('home'); return; }
    };

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });

    const rootEl = isDesktop ? document.querySelector('.app-wrapper') : null;
    const io = new IntersectionObserver(
      (entries) => {
        const scrollY = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;
        if (scrollY < 60) return;
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { 
        root: rootEl,
        rootMargin: isDesktop ? '-80px 0px -45% 0px' : '-60px 0px -45% 0px', 
        threshold: 0.1 
      }
    );

    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    onScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', onScroll);
      NAV.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) io.unobserve(el);
      });
    };
  }, [isMobile]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const targetEl = document.getElementById(id);
    if (!targetEl) return;

    const isMobileDevice = window.innerWidth <= 1024;
    const offset = isMobileDevice ? 60 : 0;

    if (isMobileDevice) {
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPosition - offset,
        behavior: 'smooth'
      });
    } else {
      const scrollContainer = document.querySelector('.app-wrapper');
      if (scrollContainer) {
        // Temporarily disable scroll snap to prevent delay/lag
        scrollContainer.classList.add('no-snap');
        
        const containerRect = scrollContainer.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        const relativeTop = targetRect.top - containerRect.top + scrollContainer.scrollTop;

        scrollContainer.scrollTo({
          top: relativeTop,
          behavior: 'smooth'
        });

        // Re-enable scroll snap after transition
        setTimeout(() => {
          scrollContainer.classList.remove('no-snap');
        }, 800);
      }
    }
  };


  return (
    <>
      {/* ── DESKTOP: Fixed vertical side nav (only when !isMobile) ── */}
      {!isMobile && (
        <aside className="brutalist-side-nav">
          {/* TOP: Studio Logo Node */}
          <div className="side-nav-brand">
            <div className="brand-hexagon">
              <span>YY</span>
            </div>
            <div className="brand-status-led">
              <span className="led-dot green-led"></span>
              <span className="led-label">LIVE.SYS</span>
            </div>
          </div>

          {/* MIDDLE: Nav markers */}
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
                  <div className={`nav-btn-sliding-tag ${hovered === id ? 'hover-reveal' : ''}`}>
                    <span className="tag-inner-txt">{label}</span>
                  </div>
                </a>
              );
            })}
          </nav>

          {/* BOTTOM: Telemetry */}
          <div className="side-nav-telemetry-console">
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

            <div className="side-nav-clock-block">
              <span className="clock-val">{time}</span>
              <span className="clock-label">IST (DELHI)</span>
            </div>

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
                <div className={`nav-btn-sliding-tag ${hovered === 'top' ? 'hover-reveal' : ''}`}>
                  <span className="tag-inner-txt">BACK TO TOP</span>
                </div>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* ── MOBILE: Sleek branding top bar ── */}
      {isMobile && (
        <header className="mobile-top-bar">
          <div className="mobile-bar-brand">
            <div className="mobile-brand-dot"></div>
            <span className="mobile-brand-name">YAR YASH</span>
            <div className="mobile-bar-led">
              <span className="led-dot green-led"></span>
              <span className="mobile-bar-clock font-mono">{time}</span>
            </div>
          </div>
        </header>
      )}

      {/* ── MOBILE: Sleek glassmorphic floating bottom pill nav dock ── */}
      {isMobile && (
        <nav className="mobile-floating-pill-nav">
          {NAV.map(({ id, num, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                className={`mobile-pill-btn ${isActive ? 'active-pill' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                aria-label={label}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="mobile-pill-label">{label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
}
