import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const NAV = [
  { id: 'home',     num: '01', label: 'HOME'    },
  { id: 'about',    num: '02', label: 'ABOUT'   },
  { id: 'skills',   num: '03', label: 'SKILLS'  },
  { id: 'projects', num: '04', label: 'WORKS'   },
  { id: 'contact',  num: '05', label: 'CONTACT' },
];

export default function Header() {
  const [active, setActive]           = useState('home');
  const [scrollPct, setScrollPct]     = useState(0);
  const [isMobile, setIsMobile]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const navRef                        = useRef(null);
  const markerRef                     = useRef(null);

  /* ── responsive breakpoint ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Delhi IST clock ── */
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat([], {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  /* ── scroll + section tracking ── */
  useEffect(() => {
    const scrollEl = !isMobile ? (document.querySelector('.app-wrapper') || window) : window;

    const onScroll = () => {
      const el   = scrollEl === window ? document.documentElement : scrollEl;
      const top  = scrollEl === window ? window.scrollY : scrollEl.scrollTop;
      const max  = el.scrollHeight - (scrollEl === window ? window.innerHeight : el.clientHeight);
      setScrollPct(max > 0 ? Math.round((top / max) * 100) : 0);
      if (top < 60) setActive('home');
    };

    scrollEl.addEventListener('scroll', onScroll, { passive: true });

    const root = !isMobile ? document.querySelector('.app-wrapper') : null;
    const io = new IntersectionObserver(
      entries => {
        const top = scrollEl === window ? window.scrollY : scrollEl.scrollTop;
        if (top < 60) return;
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { root, rootMargin: '-80px 0px -45% 0px', threshold: 0.1 }
    );
    NAV.forEach(({ id }) => { const el = document.getElementById(id); if (el) io.observe(el); });
    onScroll();

    return () => {
      scrollEl.removeEventListener('scroll', onScroll);
      NAV.forEach(({ id }) => { const el = document.getElementById(id); if (el) io.unobserve(el); });
    };
  }, [isMobile]);

  /* ── GSAP: animate active marker pill ── */
  useEffect(() => {
    if (isMobile || !markerRef.current || !navRef.current) return;
    const idx  = NAV.findIndex(n => n.id === active);
    if (idx < 0) return;
    const items  = navRef.current.querySelectorAll('.snav-item');
    const target = items[idx];
    if (!target) return;
    const navTop  = navRef.current.getBoundingClientRect().top;
    const itemTop = target.getBoundingClientRect().top;
    const y = itemTop - navTop + target.offsetHeight / 2 - markerRef.current.offsetHeight / 2;
    gsap.to(markerRef.current, { y, duration: 0.5, ease: 'expo.out' });
  }, [active, isMobile]);

  /* ── mobile scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (isMobile) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
    } else {
      const wrap = document.querySelector('.app-wrapper');
      if (wrap) {
        wrap.classList.add('no-snap');
        const rel = el.getBoundingClientRect().top - wrap.getBoundingClientRect().top + wrap.scrollTop;
        wrap.scrollTo({ top: rel, behavior: 'smooth' });
        setTimeout(() => wrap.classList.remove('no-snap'), 800);
      }
    }
  };

  /* ── vertical progress track height ── */
  const progressHeight = `${scrollPct}%`;

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP — slim vertical rail
      ════════════════════════════════════════ */}
      {!isMobile && (
        <aside className="snav">

          {/* left edge progress track */}
          <div className="snav-track">
            <div className="snav-track-fill" style={{ height: progressHeight }} />
          </div>

          {/* top: monogram */}
          <div className="snav-top">
            <button className="snav-logo" onClick={() => scrollTo('home')} aria-label="Home">
              <span className="snav-logo-inner">YY</span>
            </button>
          </div>

          {/* middle: nav items */}
          <nav ref={navRef} className="snav-nav">
            {/* sliding active marker */}
            <div ref={markerRef} className="snav-marker" aria-hidden="true" />

            {NAV.map(({ id, num, label }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  className={`snav-item ${isActive ? 'snav-item-active' : ''}`}
                  onClick={() => scrollTo(id)}
                  aria-label={label}
                >
                  <span className="snav-num">{num}</span>
                  <span className="snav-label">{label}</span>
                </button>
              );
            })}
          </nav>

          {/* bottom: clock + scroll % */}
          <div className="snav-bottom">
            <div className="snav-clock">
              <span className="snav-clock-time">{time}</span>
              <span className="snav-clock-tz">IST</span>
            </div>
            <div className="snav-scroll-pct">
              <span>{String(scrollPct).padStart(2, '0')}</span>
              <span className="snav-pct-sym">%</span>
            </div>
          </div>

        </aside>
      )}

      {/* ════════════════════════════════════════
          MOBILE — top bar
      ════════════════════════════════════════ */}
      {isMobile && (
        <header className="mobile-top-bar">
          <div className="mobile-bar-brand">
            <div className="mobile-brand-dot" />
            <span className="mobile-brand-name">YAR YASH</span>
            <div className="mobile-bar-led">
              <span className="led-dot green-led" />
              <span className="mobile-bar-clock font-mono">{time}</span>
            </div>
          </div>
        </header>
      )}

      {/* ════════════════════════════════════════
          MOBILE — bottom pill nav
      ════════════════════════════════════════ */}
      {isMobile && (
        <nav className="mobile-floating-pill-nav">
          {NAV.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                className={`mobile-pill-btn ${isActive ? 'active-pill' : ''}`}
                onClick={() => scrollTo(id)}
                aria-label={label}
              >
                <span className="mobile-pill-label">{label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
}
