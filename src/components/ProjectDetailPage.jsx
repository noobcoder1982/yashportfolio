import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowUpRight, Palette, Tag } from 'lucide-react';

const getProjectMetadata = (projectNum) => {
  const metadataMap = {
    '01': {
      industry: 'Technology & Enterprise',
      year: '2026',
      services: 'Creative Direction, Post-Production, Motion Design',
      location: 'New York / Remote',
      website: 'https://apex-global-corp.demo'
    },
    '02': {
      industry: 'Entertainment & Cinema',
      year: '2025',
      services: 'SLOG3 Grading, Multicam Editing, Film Grain Sync',
      location: 'Mumbai, India',
      website: 'https://vanguard-films.demo'
    },
    '03': {
      industry: 'Journalism & Culture',
      year: '2026',
      services: 'Script Writing, Archival Sync, Spectral Voice Repair',
      location: 'New Delhi, India',
      website: 'https://independent-media-lab.demo'
    },
    '04': {
      industry: 'Digital Marketing & Social',
      year: '2026',
      services: 'Kinetic Captions, Sound Design, Retention Editing',
      location: 'Remote / London',
      website: 'https://influence-network.demo'
    }
  };
  
  return metadataMap[projectNum] || {
    industry: 'Creative Post-Production',
    year: '2026',
    services: 'Editorial Sequence & Grading',
    location: 'Remote',
    website: '#'
  };
};

export default function ProjectDetailPage({ project, onClose, onNextProject, projectIndex, totalProjects, originRect }) {
  const [isEntering, setIsEntering] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('neon');
  const [mobileCurtain, setMobileCurtain] = useState('opening'); // 'opening' | 'open' | 'closing' | null

  const overlayRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const animRef = useRef(null);

  const projectMetadata = getProjectMetadata(project.number);
  const isMobile = window.innerWidth <= 1024;

  // ── OPEN animation ──────────────────────────────────────────────────────
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    if (isMobile) {
      // Curtains split open after a brief flash delay
      setMobileCurtain('opening');
      setTimeout(() => {
        setMobileCurtain('open');
        setTimeout(() => {
          setMobileCurtain(null);
          setIsEntering(false);
        }, 700);
      }, 80);
      return;
    }

    const T = originRect?.top    ?? window.innerHeight * 0.45;
    const R = originRect?.right  ?? 0;
    const B = originRect?.bottom ?? window.innerHeight * 0.45;
    const L = originRect?.left   ?? 0;

    animRef.current = el.animate(
      [
        { clipPath: `inset(${T}px ${R}px ${B}px ${L}px)`, opacity: 0.7 },
        { clipPath: `inset(${T}px 0px ${B}px 0px)`,       opacity: 1, offset: 0.3 },
        { clipPath: 'inset(0px 0px 0px 0px)',              opacity: 1 },
      ],
      { duration: 680, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
    );
    animRef.current.onfinish = () => setIsEntering(false);
    return () => animRef.current?.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsTransitioning(true);
    const t = setTimeout(() => setIsTransitioning(false), 300);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTo(0, 0);
    return () => clearTimeout(t);
  }, [project]);

  useEffect(() => {
    document.body.classList.add('project-details-active');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('project-details-active');
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    if (isMobile) {
      setMobileCurtain('closing');
      setTimeout(() => onClose(), 600);
      return;
    }

    const el = overlayRef.current;
    if (!el) { onClose(); return; }
    animRef.current?.cancel();

    const T = originRect?.top    ?? window.innerHeight * 0.45;
    const R = originRect?.right  ?? 0;
    const B = originRect?.bottom ?? window.innerHeight * 0.45;
    const L = originRect?.left   ?? 0;

    animRef.current = el.animate(
      [
        { clipPath: 'inset(0px 0px 0px 0px)',              opacity: 1 },
        { clipPath: `inset(${T}px 0px ${B}px 0px)`,       opacity: 1, offset: 0.55 },
        { clipPath: `inset(${T}px ${R}px ${B}px ${L}px)`, opacity: 0 },
      ],
      { duration: 620, easing: 'cubic-bezier(0.7, 0, 0.84, 0)', fill: 'forwards' }
    );
    animRef.current.onfinish = () => onClose();
  };

  return (
    <div 
      ref={overlayRef}
      className={`project-detail-overlay theme-${currentTheme} ${isEntering ? 'entering' : ''}`}
      style={isMobile ? {} : { clipPath: 'inset(0px 0px 0px 0px)' }}
    >
      {/* ── MOBILE SPLIT CURTAIN ── */}
      {isMobile && mobileCurtain && (
        <div className={`mobile-curtain-root ${mobileCurtain === 'open' ? 'curtain-open' : ''} ${mobileCurtain === 'closing' ? 'curtain-closing' : ''}`}>
          <div className="mobile-curtain-top">
            <div className="mobile-curtain-scanline" />
            <span className="mobile-curtain-label">// {project.category.toUpperCase()}</span>
          </div>
          <div className="mobile-curtain-bottom">
            <span className="mobile-curtain-title">{project.title.toUpperCase()}</span>
          </div>
          <div className="mobile-curtain-flash" />
        </div>
      )}
      <div ref={scrollContainerRef} className={`project-detail-scroll-container ${isTransitioning ? 'transition-flash' : ''}`}>
        
        {/* TOP STATUS NAVIGATION BAR */}
        <div className="detail-top-nav">
          <div className="top-nav-left">
            <button className="detail-back-link font-mono" onClick={handleClose}>
              ← ALL CASES
            </button>
          </div>
          <div className="detail-top-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="detail-theme-btn" 
              onClick={() => {
                const themes = ['neon', 'editorial', 'matrix'];
                const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
                setCurrentTheme(themes[nextIndex]);
              }}
              title="Toggle Theme"
            >
              <span className="theme-btn-label">THEME: {currentTheme.toUpperCase()}</span>
              <span className="theme-btn-icon"><Palette size={14} /></span>
            </button>

            <button className="detail-close-btn" onClick={handleClose} aria-label="Close Case Study">
              <span className="close-text">CLOSE</span>
              <span className="close-icon-box"><X size={16} /></span>
            </button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="container" style={{ padding: '60px 0 20px' }}>
          
          {/* TWO-COLUMN GRID */}
          <div className="project-detail-grid">
            
            {/* LEFT COLUMN */}
            <div className="detail-left-col">
              
              {/* Category tags */}
              <div className="detail-category-tag font-mono">
                <Tag size={12} style={{ color: 'var(--detail-accent)', marginRight: '4px' }} />
                <span>0{project.number} // {project.category.toUpperCase()}</span>
              </div>
              
              {/* Majestic Title */}
              <h1 className="detail-project-title">
                {project.title.split(' ').map((word, i) => {
                  if (
                    word === 'commercial' || 
                    word === 'cinematic' || 
                    word === 'documentary' || 
                    word === 'social' ||
                    i === 0
                  ) {
                    return <span key={i} className="title-serif-italic">{word} </span>;
                  }
                  return <span key={i}>{word} </span>;
                })}
              </h1>

              {/* Tagline */}
              <h3 className="detail-project-tagline">
                {project.details.tagline}
              </h3>
              
              {/* Description Overview */}
              <p className="detail-project-desc">
                {project.details.overview}
              </p>

              {/* Two CTA Buttons */}
              <div className="detail-cta-group">
                <a 
                  href={projectMetadata.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-cta btn-primary"
                >
                  <span>View Website</span>
                  <ArrowUpRight size={16} />
                </a>
                
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                    // Scroll to contact section
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 650);
                  }}
                  className="btn-cta btn-secondary"
                >
                  <span>Request a quote</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="detail-right-col">
              <div className="browser-mockup">
                
                {/* Mock Browser URL Bar */}
                <div className="browser-window-header">
                  <div className="browser-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="browser-address-bar font-mono">
                    https://yar-yash.pro/case/0{project.number}
                  </div>
                </div>
                
                {/* Image screenshot display area */}
                <div className="browser-content-area">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="browser-screenshot"
                  />
                  <div className="browser-glow-overlay"></div>
                </div>

              </div>
            </div>

          </div>

          {/* BOTTOM SWISS METADATA BAR */}
          <div className="detail-metadata-bar">
            
            <div className="metadata-item">
              <span className="metadata-label font-mono">CLIENT</span>
              <span className="metadata-value">{project.client}</span>
            </div>

            <div className="metadata-item">
              <span className="metadata-label font-mono">INDUSTRY</span>
              <span className="metadata-value">{projectMetadata.industry}</span>
            </div>

            <div className="metadata-item">
              <span className="metadata-label font-mono">YEAR</span>
              <span className="metadata-value">{projectMetadata.year}</span>
            </div>

            <div className="metadata-item">
              <span className="metadata-label font-mono">SERVICES</span>
              <span className="metadata-value">{projectMetadata.services}</span>
            </div>

            <div className="metadata-item">
              <span className="metadata-label font-mono">LOCATION</span>
              <span className="metadata-value">{projectMetadata.location}</span>
            </div>

          </div>

        </div>

        {/* BOTTOM PAGINATION NAV FOOTER */}
        <footer className="detail-bottom-pagination">
          <div className="container">
            <div className="pagination-grid">
              
              <button className="pag-btn prev-exit" onClick={handleClose}>
                <span className="pag-dir">← BACK TO LIST</span>
                <span className="pag-desc">RETURN TO SELECTED CUTS</span>
              </button>

              <button className="pag-btn next-project" onClick={onNextProject}>
                <span className="pag-dir">NEXT CASE STUDY →</span>
                <span className="pag-desc">
                  PROJECT {projectIndex + 2 > totalProjects ? '01' : String(projectIndex + 2).padStart(2, '0')} // VIEW
                </span>
              </button>

            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
