import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, ArrowUpRight, RotateCcw, Volume2, Film, AlertTriangle, Palette, ExternalLink } from 'lucide-react';

export default function ProjectDetailPage({ project, onClose, onNextProject, projectIndex, totalProjects, originRect }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [playProgress, setPlayProgress] = useState(0);
  const [audioMeter, setAudioMeter] = useState([20, 15, 10]); 
  const [isEntering, setIsEntering] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('neon'); // 'neon' | 'editorial' | 'matrix'
  
  const overlayRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const playIntervalRef = useRef(null);
  const timecodeFramesRef = useRef(0);
  const animRef = useRef(null);

  // ── Curtain OPEN: runs from strip position → fullscreen ──────────────────
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const T  = originRect?.top    ?? window.innerHeight * 0.45;
    const R  = originRect?.right  ?? 0;
    const B  = originRect?.bottom ?? window.innerHeight * 0.45;
    const L  = originRect?.left   ?? 0;

    // Start clipped to the strip's exact position, then expand
    animRef.current = el.animate(
      [
        // Frame 0 — strip footprint
        { clipPath: `inset(${T}px ${R}px ${B}px ${L}px)`, opacity: 0.7 },
        // Frame 30% — spread left/right to full width, stay at strip's vertical band
        { clipPath: `inset(${T}px 0px ${B}px 0px)`,       opacity: 1,   offset: 0.3 },
        // Frame 100% — full screen
        { clipPath: 'inset(0px 0px 0px 0px)',              opacity: 1 },
      ],
      { duration: 680, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
    );

    // Reveal content exactly when curtain finishes
    animRef.current.onfinish = () => setIsEntering(false);

    return () => {
      animRef.current?.cancel();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smooth project transition handler
  useEffect(() => {
    setIsTransitioning(true);
    const t = setTimeout(() => setIsTransitioning(false), 300);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
    resetTimeline();
    
    return () => clearTimeout(t);
  }, [project]);

  // Prevent background scroll
  useEffect(() => {
    document.body.classList.add('project-details-active');
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.classList.remove('project-details-active');
      document.body.style.overflow = '';
    };
  }, []);

  // Frame count & VU meter ticks
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        timecodeFramesRef.current += 1;
        
        const totalFrames = timecodeFramesRef.current;
        const ff = String(totalFrames % 24).padStart(2, '0');
        const totalSeconds = Math.floor(totalFrames / 24);
        const ss = String(totalSeconds % 60).padStart(2, '0');
        const totalMinutes = Math.floor(totalSeconds / 60);
        const mm = String(totalMinutes % 60).padStart(2, '0');
        const hh = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
        
        setTimecode(`${hh}:${mm}:${ss}:${ff}`);
        
        const nextProgress = (totalFrames / 360) * 100; // 15-second loop
        if (nextProgress >= 100) {
          timecodeFramesRef.current = 0;
          setPlayProgress(0);
        } else {
          setPlayProgress(nextProgress);
        }

        // Kinetic audio VU values
        setAudioMeter([
          Math.floor(Math.random() * 70) + 20,
          Math.floor(Math.random() * 55) + 15,
          Math.floor(Math.random() * 45) + 10
        ]);
      }, 1000 / 24);
    } else {
      clearInterval(playIntervalRef.current);
      setAudioMeter([15, 10, 5]);
    }

    return () => clearInterval(playIntervalRef.current);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimeline = () => {
    setIsPlaying(false);
    timecodeFramesRef.current = 0;
    setTimecode('00:00:00:00');
    setPlayProgress(0);
    setAudioMeter([15, 10, 5]);
  };

  const handleClose = () => {
    const el = overlayRef.current;
    if (!el) {
      onClose();
      return;
    }

    const T  = originRect?.top    ?? window.innerHeight * 0.45;
    const R  = originRect?.right  ?? 0;
    const B  = originRect?.bottom ?? window.innerHeight * 0.45;
    const L  = originRect?.left   ?? 0;

    // Reverse: fullscreen → strip footprint
    animRef.current?.cancel();
    animRef.current = el.animate(
      [
        { clipPath: 'inset(0px 0px 0px 0px)',              opacity: 1 },
        { clipPath: `inset(${T}px 0px ${B}px 0px)`,       opacity: 1,   offset: 0.55 },
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
      style={{ clipPath: 'inset(0px 0px 0px 0px)' }}
    >
      <div ref={scrollContainerRef} className={`project-detail-scroll-container ${isTransitioning ? 'transition-flash' : ''}`}>
        
        {/* TOP STATUS NAVIGATION BAR */}
        <div className="detail-top-nav">
          <div className="top-nav-left">
            <span className="status-indicator"></span>
            <span className="workspace-tag font-mono">WORKSPACE: CUT_DOSSIER_0{project.number} // PORTFOLIO_2026</span>
          </div>
          <div className="detail-top-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="detail-theme-btn" 
              onClick={() => {
                const themes = ['neon', 'editorial', 'matrix'];
                const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
                setCurrentTheme(themes[nextIndex]);
              }}
              title="Toggle Brutalist Theme"
            >
              <span className="theme-btn-label">THEME: {currentTheme.toUpperCase()}</span>
              <span className="theme-btn-icon"><Palette size={14} /></span>
            </button>

            <button className="detail-close-btn" onClick={handleClose} aria-label="Close Case Study">
              <span className="close-text">CLOSE WORK</span>
              <span className="close-icon-box"><X size={16} /></span>
            </button>
          </div>
        </div>

        {/* HERO SECTION */}
        <header className="detail-hero-section">
          <div className="container">
            <div className="hero-index-badge">// 0{project.number} _ SELECTED_CUT</div>
            
            <h1 className="detail-main-title">
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

            <div className="detail-meta-grid">
              <div className="meta-col">
                <span className="meta-label">ROLE</span>
                <span className="meta-value">{project.role}</span>
              </div>
              <div className="meta-col">
                <span className="meta-label">CLIENT / BRAND</span>
                <span className="meta-value">{project.client}</span>
              </div>
              <div className="meta-col">
                <span className="meta-label">PRODUCTION TIMELINE</span>
                <span className="meta-value">{project.timeline}</span>
              </div>
              <div className="meta-col">
                <span className="meta-label">DISCIPLINE</span>
                <span className="meta-value uppercase">{project.category}</span>
              </div>
            </div>
          </div>
        </header>

        {/* MINIMAL CINEMATIC VIEWPORT DECK (Completely replaced DaVinci Timeline block) */}
        <section className="timeline-monitor-section" style={{ padding: '48px 0' }}>
          <div className="container">
            
            <div className="cinematic-viewport-card" style={{
              backgroundColor: 'var(--detail-card-bg)',
              border: '2px solid var(--detail-line)',
              boxShadow: '8px 8px 0px var(--detail-shadow)',
              overflow: 'hidden',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              
              {/* CINEMATIC MONITOR HEADER */}
              <div className="source-monitor" style={{
                backgroundColor: '#000000',
                borderBottom: '2px solid var(--detail-line)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 20px',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="hud-badge active-rec" style={{
                    backgroundColor: 'rgba(255, 46, 46, 0.15)',
                    color: 'var(--detail-accent)',
                    border: '1px solid var(--detail-accent)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span className="hud-rec-dot" style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--detail-accent)',
                      boxShadow: '0 0 6px var(--detail-accent)',
                      display: 'inline-block'
                    }}></span>
                    REC
                  </span>
                  <span style={{ fontSize: '0.62rem', color: 'rgba(255, 255, 255, 0.4)' }}>ASPECT_RATIO: 2.39:1 CINEMASCOPE</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--detail-accent)', fontWeight: 700, letterSpacing: '0.05em' }}>{timecode}</span>
                </div>
              </div>

              {/* VIEWPORT SCREEN */}
              <div className="viewport-screen" style={{
                position: 'relative',
                aspectRatio: '16/9',
                backgroundColor: '#050505',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}>
                
                {/* Viewfinder crosshairs & corner crop markings */}
                <div className="viewport-grid-lines" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 20
                }}>
                  <div className="viewport-brackets" style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    right: '16px',
                    bottom: '16px'
                  }}>
                    <div className="bracket b-top-left" style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '14px',
                      height: '14px',
                      borderLeft: '2px solid var(--detail-accent)',
                      borderTop: '2px solid var(--detail-accent)'
                    }}></div>
                    <div className="bracket b-bottom-right" style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '14px',
                      height: '14px',
                      borderRight: '2px solid var(--detail-accent)',
                      borderBottom: '2px solid var(--detail-accent)'
                    }}></div>
                  </div>
                  
                  {/* Subtle Grid Lines */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10%',
                    right: '10%',
                    height: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '10%',
                    bottom: '10%',
                    width: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)'
                  }}></div>
                  
                  {/* Center Cross Reticle */}
                  <div className="viewport-crosshair" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '24px',
                    height: '24px',
                    transform: 'translate(-50%, -50%)',
                    border: '1px dashed rgba(255, 255, 255, 0.12)',
                    borderRadius: '50%'
                  }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '6px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.3)', transform: 'translate(-50%, -50%)' }}></div>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '1px', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.3)', transform: 'translate(-50%, -50%)' }}></div>
                  </div>
                </div>

                {/* VIEWPORT MEDIA PLAYER OVERLAY */}
                <div className="viewport-media-container" style={{ width: '100%', height: '100%' }}>
                  {isPlaying && project.driveLink ? (
                    <iframe 
                      src={project.driveLink} 
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        position: 'relative',
                        zIndex: 10
                      }} 
                      allow="autoplay; encrypted-media; picture-in-picture" 
                      allowFullScreen
                      title={project.title}
                    ></iframe>
                  ) : isPlaying ? (
                    <div className="viewport-simulation-graphic" style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#090909',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <div className="film-burn-effect" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle, var(--detail-accent) 0%, rgba(0,0,0,0) 80%)',
                        opacity: 0.15,
                        pointerEvents: 'none'
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '2px',
                        backgroundColor: 'var(--detail-accent)',
                        boxShadow: '0 0 10px var(--detail-accent)',
                        animation: 'scanTimeline 2.5s linear infinite'
                      }}></div>
                      
                      <Film size={36} className="poster-film-icon" style={{
                        color: 'var(--detail-accent)',
                        marginBottom: '16px',
                        animation: 'rotateSpin 6s linear infinite'
                      }} />
                      
                      <p className="playback-simulation-title" style={{
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        color: '#ffffff',
                        margin: '0 0 6px'
                      }}>EDITING SEQUENCE ACTIVE</p>
                      
                      <p className="playback-simulation-desc font-mono" style={{
                        fontSize: '0.65rem',
                        color: 'rgba(255, 255, 255, 0.45)',
                        margin: 0
                      }}>
                        {project.driveLink ? 'STREAMING EMBEDDED CLIP' : 'PASTE GOOGLE DRIVE PREVIEW LINK TO EMBED DIRECTLY'}
                      </p>
                    </div>
                  ) : (
                    <div className="viewport-poster-graphic" style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, #050505 0%, ${project.color || 'var(--detail-accent)'}15 100%)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
                        pointerEvents: 'none'
                      }}></div>
                      
                      <h3 style={{
                        fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                        fontWeight: 900,
                        color: 'rgba(255, 255, 255, 0.03)',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.04em',
                        position: 'absolute',
                        margin: 0,
                        userSelect: 'none'
                      }}>{project.category}</h3>

                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--detail-accent)',
                        border: '1px solid var(--detail-accent)',
                        padding: '4px 10px',
                        borderRadius: '3px',
                        marginBottom: '16px',
                        letterSpacing: '0.1em'
                      }}>CUT_INDEX_0{project.number}</span>

                      <button 
                        onClick={togglePlay}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '12px',
                          backgroundColor: 'var(--detail-text)',
                          color: 'var(--detail-bg)',
                          border: 'none',
                          padding: '16px 28px',
                          borderRadius: '50px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          letterSpacing: '0.02em',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                          zIndex: 10
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                          e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 46, 46, 0.15)';
                          e.currentTarget.style.backgroundColor = 'var(--detail-accent)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
                          e.currentTarget.style.backgroundColor = 'var(--detail-text)';
                          e.currentTarget.style.color = 'var(--detail-bg)';
                        }}
                      >
                        <Play size={16} fill="currentColor" />
                        <span>ENTER CINEMATIC VIEWPORT</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* VIEWPORT CONTROLS / CALIBRATION DECK */}
              <div className="viewport-deck-controls" style={{
                backgroundColor: 'var(--detail-card-bg)',
                padding: '18px 24px',
                borderTop: '1.5px solid var(--detail-line)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                
                {/* Timeline progress line bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button 
                    onClick={togglePlay}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--detail-text)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                  >
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                  </button>

                  <button 
                    onClick={resetTimeline}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--detail-text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                    title="Rewind Timeline"
                  >
                    <RotateCcw size={14} />
                  </button>

                  {/* High end minimalist progress lane */}
                  <div style={{
                    flex: 1,
                    height: '2px',
                    backgroundColor: 'var(--detail-pane-border)',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percentage = (clickX / rect.width) * 100;
                    setPlayProgress(percentage);
                    timecodeFramesRef.current = Math.floor((percentage / 100) * 360);
                  }}
                  >
                    <div style={{
                      height: '100%',
                      width: `${playProgress}%`,
                      backgroundColor: 'var(--detail-accent)',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transition: 'width 0.1s linear'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--detail-accent)',
                      position: 'absolute',
                      top: '-2px',
                      left: `${playProgress}%`,
                      transform: 'translateX(-50%)',
                      boxShadow: '0 0 6px var(--detail-accent)',
                      transition: 'left 0.1s linear'
                    }}></div>
                  </div>

                  <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--detail-text)', fontWeight: 700 }}>
                    {timecode}
                  </span>
                </div>

                {/* Sub specs/VU indicators row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px dashed var(--detail-pane-border)',
                  paddingTop: '12px'
                }}>
                  {/* Left: VU level indicator */}
                  <div className="deck-audio-monitor" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem'
                  }}>
                    <Volume2 size={12} style={{ color: 'var(--detail-text-muted)' }} />
                    <div style={{ display: 'flex', gap: '2px', height: '14px', alignItems: 'flex-end' }}>
                      {audioMeter.map((val, idx) => (
                        <div key={idx} style={{
                          width: '4px',
                          height: '100%',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: `${val}%`,
                            backgroundColor: 'var(--detail-accent)',
                            transition: 'height 0.05s ease'
                          }}></div>
                        </div>
                      ))}
                    </div>
                    <span style={{ color: 'var(--detail-text-dim)' }}>CH_VU_CALIBRATION</span>
                  </div>

                  {/* Right: Actions */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {project.driveLink && (
                      <a 
                        href={project.driveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--detail-text)',
                          textDecoration: 'none',
                          fontWeight: 700,
                          borderBottom: '1px solid var(--detail-accent)',
                          paddingBottom: '2px'
                        }}
                      >
                        <span>OPEN DRIVE SOURCE</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--detail-text-dim)' }}>
                      STATUS: {isPlaying ? 'STREAMING_PLAYBACK' : 'STANDBY'}
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* BRIEFING AND PRODUCTION DETAILS */}
        <section className="case-brief-section">
          <div className="container">
            <div className="brief-editorial-grid">
              
              {/* Left Column: Narrative Details */}
              <div className="brief-narrative">
                <span className="editorial-mini-tag">01 / PROJECT OVERVIEW</span>
                <h3 className="brief-tagline">{project.details.tagline}</h3>
                
                <p className="brief-paragraph">{project.details.overview}</p>
                
                <div className="brief-process-timeline">
                  <span className="editorial-mini-tag">02 / WORKSTATION PROCESS STEPS</span>
                  <div className="process-stages-stack">
                    {project.details.process.map((stage, i) => (
                      <div key={i} className="process-stage-node">
                        <div className="stage-num">{stage.phase}</div>
                        <div className="stage-info">
                          <h4 className="stage-title">{stage.desc.split(': ')[0] || stage.phase}</h4>
                          <p className="stage-description">{stage.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Technical Stats & Editor Diary */}
              <div className="brief-technical-column">
                
                {/* Statistics Box */}
                <div className="brutal-case-card tech-stats-card">
                  <div className="card-header">
                    <Film size={14} className="card-header-icon" />
                    <span>TECHNICAL STATISTICS</span>
                  </div>
                  <div className="stats-brutal-grid">
                    {project.details.stats.map((stat, i) => (
                      <div key={i} className="stat-brutal-item">
                        <span className="stat-item-label">{stat.label}</span>
                        <span className="stat-item-value">{stat.value}</span>
                      </div>
                    ))}
                    <div className="stat-brutal-item">
                      <span className="stat-item-label">SOFTWARE LIST</span>
                      <span className="stat-item-value">{project.tech.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Editor Notes (Jokes Box) */}
                <div className="brutal-case-card editor-notes-card">
                  <div className="card-header">
                    <AlertTriangle size={14} className="card-header-icon notes-warning-icon" />
                    <span>CONFIDENTIAL_EDITOR_NOTES</span>
                  </div>
                  <div className="card-body">
                    <p className="editor-diary-paragraph">
                      "{project.details.editorNotes}"
                    </p>
                    <div className="editor-signature-log">
                      <span className="log-stamp">// STATUS: COMPILED_SUCCESSFULLY</span>
                      <span className="signature-name">Yash Srivastava</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* BOTTOM PAGINATION NAV FOOTER */}
        <footer className="detail-bottom-pagination">
          <div className="container">
            <div className="pagination-grid">
              
              <button className="pag-btn prev-exit" onClick={handleClose}>
                <span className="pag-dir">← BACK TO LIST</span>
                <span className="pag-desc">RETURN TO TIMELINE</span>
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
