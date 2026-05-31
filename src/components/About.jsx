import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Film, Lock, Music, Eye, Scissors, MousePointer, ArrowRight } from 'lucide-react';

const ScrollRevealLine = ({ children, delay = '0s' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -12% 0px'
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`about-reveal-line ${inView ? 'revealed' : ''}`}
      style={{ '--reveal-delay': delay }}
    >
      {children}
    </div>
  );
};

export default function About() {
  const [activeTab, setActiveTab] = useState('program'); // 'source' | 'program'
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPos, setPlayheadPos] = useState(0); // 0% to 100%
  const [selectedClip, setSelectedClip] = useState('intro'); // 'intro' | 'motion' | 'design'
  const [currentTimecode, setCurrentTimecode] = useState('00:00:00:00');
  
  const playheadInterval = useRef(null);

  // Timecode generator mapped to playhead percentage
  const calculateTimecode = (pos) => {
    const totalFrames = Math.floor((pos / 100) * 600); // 10 seconds of 60fps = 600 frames
    const minutes = Math.floor(totalFrames / 3600).toString().padStart(2, '0');
    const seconds = Math.floor((totalFrames % 3600) / 60).toString().padStart(2, '0');
    const frames = (totalFrames % 60).toString().padStart(2, '0');
    return `00:00:${seconds}:${frames}`;
  };

  // Sync selected clip based on playhead position during playback
  const getClipFromPos = (pos) => {
    if (pos >= 0 && pos < 30) return 'intro';
    if (pos >= 30 && pos < 65) return 'motion';
    return 'design';
  };

  // Playhead animation cycle
  useEffect(() => {
    if (isPlaying) {
      playheadInterval.current = setInterval(() => {
        setPlayheadPos((prev) => {
          const next = prev >= 100 ? 0 : prev + 0.5;
          setSelectedClip(getClipFromPos(next));
          setCurrentTimecode(calculateTimecode(next));
          return next;
        });
      }, 40); // 25fps clock refresh
    } else {
      clearInterval(playheadInterval.current);
    }

    return () => clearInterval(playheadInterval.current);
  }, [isPlaying]);

  // Click on a timeline clip
  const handleClipClick = (clipId, startPct) => {
    setIsPlaying(false);
    setSelectedClip(clipId);
    setPlayheadPos(startPct);
    setCurrentTimecode(calculateTimecode(startPct));
  };

  // Restart playback
  const handleReset = () => {
    setIsPlaying(false);
    setPlayheadPos(0);
    setSelectedClip('intro');
    setCurrentTimecode('00:00:00:00');
  };

  // Manual click on scrubber track
  const handleScrubberClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
    setIsPlaying(false);
    setPlayheadPos(pct);
    setSelectedClip(getClipFromPos(pct));
    setCurrentTimecode(calculateTimecode(pct));
  };

  return (
    <section id="about" className="about-section">
      <div className="container">

        {/* ── MOBILE ABOUT REDESIGN ── */}
        <div className="about-mobile-layout">
          <div className="about-mobile-tag">// 02 PROFILE</div>

          <h2 className="about-mobile-title">
            DESIGNING<br />VISUAL<br />
            <span className="about-mobile-title-accent">CHAOS.</span>
          </h2>

          <p className="about-mobile-bio">
            I'm <strong>Yash Srivastava</strong> — a visual artist, motion graphic designer, and professional pixel-pusher based in India. Every cut is a choice. Every choice tells a story.
          </p>

          <div className="about-mobile-stats">
            {[['5+','YEARS EXP'],['4K','RESOLUTION'],['60','FPS OUTPUT'],['IST','DELHI']].map(([val,lbl]) => (
              <div key={lbl} className="about-mobile-stat">
                <span className="ams-val">{val}</span>
                <span className="ams-lbl">{lbl}</span>
              </div>
            ))}
          </div>

          <div className="about-mobile-cards">
            {[
              { badge: '// LAYER 01', color: '#7AA6C9', title: 'PROFILE', body: 'Expert in Photoshop, Illustrator, Figma & Animate CC. Translating vague client feedback into premium identities.' },
              { badge: '// LAYER 02', color: '#C98BB9', title: 'VFX & MOTION', body: 'Post-production, sound design & custom graphics. Conditioned to hit Ctrl+S every 2 seconds.' },
              { badge: '// LAYER 03', color: '#85B796', title: 'WEB & 3D', body: 'React + Vite front-end chops combined with Maya modeling. Immersive spheres and responsive spaces.' },
            ].map((card, i) => (
              <div key={i} className="about-mobile-card">
                <span className="amc-badge" style={{ color: card.color }}>{card.badge}</span>
                <h4 className="amc-title">{card.title}</h4>
                <p className="amc-body">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="about-mobile-status">
            <span className="ams-dot"></span>
            <span className="ams-text">SYSTEM_STATUS: <span style={{ color: '#00FF66' }}>ONLINE_ACTIVE</span></span>
          </div>
        </div>

        {/* ── DESKTOP ABOUT LAYOUT ── */}
        <div className="about-editorial-grid">
          
          {/* ── LEFT COLUMN: Profile Narrative ── */}
          <div className="about-brand-panel">
            <ScrollRevealLine delay="0s">
              <span className="about-panel-index">// 02 PROFILE</span>
            </ScrollRevealLine>
            
            <ScrollRevealLine delay="0.1s">
              <h2 className="about-massive-title">
                DESIGNING<br />
                VISUAL<br />
                CHAOS.
              </h2>
            </ScrollRevealLine>

            <ScrollRevealLine delay="0.15s">
              <p className="about-brief-desc">
                Greetings, ladies, gentlemen, and sentient algorithms. I am <strong>Yash Srivastava</strong> — a visual artist, motion graphic designer, and professional pixel-pusher based in India.
              </p>
            </ScrollRevealLine>

            {/* Technical Spec Box */}
            <ScrollRevealLine delay="0.2s">
              <div className="about-technical-specs">
                <div className="tech-spec-row">
                  <span className="spec-label">SYSTEM_STATUS</span>
                  <span className="spec-val active-status">ONLINE_ACTIVE</span>
                </div>
                <div className="tech-spec-row">
                  <span className="spec-label">COORDS</span>
                  <span className="spec-val">DELHI_IST</span>
                </div>
                <div className="tech-spec-row">
                  <span className="spec-label">EXPERIENCE</span>
                  <span className="spec-val">5+ YEARS</span>
                </div>
                <div className="tech-spec-row">
                  <span className="spec-label">SPECIALIZATION</span>
                  <span className="spec-val">POST_PRODUCTION</span>
                </div>
              </div>
            </ScrollRevealLine>
          </div>

          {/* ── RIGHT COLUMN: Interactive Premiere Pro Mockup ── */}
          <div className="about-workspace-column">
            
            <div className="premiere-workspace-container about-workspace-card">
              
              {/* Premiere Workspace Top Header Tabs */}
              <div className="premiere-header">
                <div className="header-tabs">
                  <div 
                    className={`tab ${activeTab === 'source' ? 'active' : ''}`}
                    onClick={() => setActiveTab('source')}
                  >
                    Source: Bio.mp4
                  </div>
                  <div 
                    className={`tab ${activeTab === 'program' ? 'active' : ''}`}
                    onClick={() => setActiveTab('program')}
                  >
                    Program: Profile.prproj
                  </div>
                </div>
                <span className="premiere-icon-dim" style={{ fontSize: '10px', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.15em' }}>[ COCKPIT v8.0 ]</span>
              </div>

              {/* Dynamic Program Monitor Screen */}
              <div className="video-viewport">
                
                {/* Timecode overlay */}
                <div className="playback-timer">{currentTimecode}</div>

                <div className="video-placeholder-graphic video-screen-content">
                  {/* Viewfinder corner grids */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', width: '12px', height: '12px', borderTop: '2px solid #fff', borderLeft: '2px solid #fff', opacity: 0.3 }}></div>
                  <div style={{ position: 'absolute', top: '12px', right: '12px', width: '12px', height: '12px', borderTop: '2px solid #fff', borderRight: '2px solid #fff', opacity: 0.3 }}></div>
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '12px', height: '12px', borderBottom: '2px solid #fff', borderLeft: '2px solid #fff', opacity: 0.3 }}></div>
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '12px', height: '12px', borderBottom: '2px solid #fff', borderRight: '2px solid #fff', opacity: 0.3 }}></div>
                  
                  {/* Screen Content based on Active Clip Selection */}
                  {selectedClip === 'intro' && (
                    <div className="screen-slide-panel active">
                      <div className="screen-layer-badge">// LAYER 01: PROFILE</div>
                      <h4 className="screen-slide-title">YASH SRIVASTAVA</h4>
                      <div className="screen-metadata" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9.5px', color: '#c0b8b8', marginTop: '4px', marginBottom: '8px', letterSpacing: '0.04em' }}>
                        LOC: DELHI_IST // SPEED: 60FPS // CHANNELS: L/R
                      </div>
                      <p className="screen-slide-body">
                        Expert pixel-pusher skilled in Photoshop, Illustrator, Figma, and Animate CC. Translating vague client feedback into premium identities.
                      </p>
                    </div>
                  )}

                  {selectedClip === 'motion' && (
                    <div className="screen-slide-panel active">
                      <div className="screen-layer-badge pink-badge">// LAYER 02: MOTION FX</div>
                      <h4 className="screen-slide-title">VFX &amp; MOTION DESIGN</h4>
                      <div className="screen-metadata" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9.5px', color: '#e8cada', marginTop: '4px', marginBottom: '8px', letterSpacing: '0.04em' }}>
                        ENGINE: AFTER_EFFECTS // PREVIEW: ACTV // RENDER: COMPILING
                      </div>
                      <p className="screen-slide-body">
                        Specialized in post-production, sound design, and custom graphics. Conditioned to hit Ctrl+S every 2 seconds to outsmart software crashes.
                      </p>
                    </div>
                  )}

                  {selectedClip === 'design' && (
                    <div className="screen-slide-panel active">
                      <div className="screen-layer-badge green-badge">// LAYER 03: DEVELOPER</div>
                      <h4 className="screen-slide-title">WEB &amp; 3D WORKFLOW</h4>
                      <div className="screen-metadata" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9.5px', color: '#cae8ce', marginTop: '4px', marginBottom: '8px', letterSpacing: '0.04em' }}>
                        STACK: REACT_VITE // ENV: AUTODESK_MAYA // SPHERE: MODELING
                      </div>
                      <p className="screen-slide-body">
                        Solid front-end engineering chops combined with Maya modeling. Architecting responsive web spaces and immersive spheres.
                      </p>
                    </div>
                  )}

                </div>
              </div>

              {/* Viewport Playback Control Bar */}
              <div className="video-controls-bar">
                
                {/* Control Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button 
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause size={14} className="playback-control-icon" fill="currentColor" />
                    ) : (
                      <Play size={14} className="playback-control-icon" fill="currentColor" />
                    )}
                  </button>
                  <button 
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={handleReset}
                    title="Rewind / Reset"
                  >
                    <RotateCcw size={13} className="playback-control-icon" />
                  </button>
                </div>

                {/* Scrubber Bar */}
                <div 
                  className="timeline-scrubber-bg"
                  onClick={handleScrubberClick}
                >
                  <div 
                    className="timeline-loaded-progress"
                    style={{ width: `${playheadPos}%` }}
                  />
                  <div 
                    className="timeline-playhead"
                    style={{ left: `calc(${playheadPos}% - 6px)` }}
                  />
                </div>

                {/* Live indicators */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className={`fps-counter ${isPlaying ? 'text-[#00FF66] animate-pulse' : ''}`}>60 FPS</span>
                  <Volume2 size={12} className="premiere-icon-dim" />
                </div>
              </div>

              {/* Multitrack Premiere Timeline Grid */}
              <div className="premiere-timeline-panel">
                
                {/* Premiere Toolbar (Selection, Pen, Razor) */}
                <div className="premiere-toolbox">
                  <button className="tool-btn active" title="Selection Tool (V)">
                    <MousePointer size={12} style={{ transform: 'rotate(-20deg)' }} />
                  </button>
                  <button className="tool-btn" title="Track Select Forward (A)">
                    <ArrowRight size={12} />
                  </button>
                  <button className="tool-btn" title="Razor Tool (C)">
                    <Scissors size={12} />
                  </button>
                </div>

                {/* Tracks Area */}
                <div className="timeline-tracks-area">
                  
                  {/* Time Ruler */}
                  <div 
                    className="timeline-time-ruler cursor-pointer"
                    onClick={handleScrubberClick}
                  >
                    <div className="ruler-tick" style={{ left: '2%', color: playheadPos >= 2 ? '#1473E6' : '#8E8E8E', fontFamily: 'var(--font-mono), monospace' }}>00:00</div>
                    <div className="ruler-tick" style={{ left: '30%', color: playheadPos >= 30 ? '#1473E6' : '#8E8E8E', fontFamily: 'var(--font-mono), monospace' }}>03:00</div>
                    <div className="ruler-tick" style={{ left: '65%', color: playheadPos >= 65 ? '#1473E6' : '#8E8E8E', fontFamily: 'var(--font-mono), monospace' }}>06:30</div>
                    <div className="ruler-tick" style={{ left: '90%', color: playheadPos >= 90 ? '#1473E6' : '#8E8E8E', fontFamily: 'var(--font-mono), monospace' }}>09:00</div>

                    {/* Vertical Blue Scrubber Line slicing through tracks */}
                    <div 
                      className="premiere-blue-playhead"
                      style={{ left: `${playheadPos}%` }}
                    >
                      <div className="playhead-cap"></div>
                      <div className="playhead-line"></div>
                    </div>
                  </div>

                  {/* Track V2: Adjustment/Text Layer (Pink) */}
                  <div className="premiere-track-row">
                    <div className="track-controls">
                      <span className="track-id">V2</span>
                      <Eye size={10} className="premiere-icon-dim" />
                      <Lock size={10} className="premiere-icon-dim" />
                    </div>
                    <div className="track-content-lane">
                      <div 
                        className="premiere-clip clip-video-pink"
                        style={{ width: '98%' }}
                        onClick={() => handleClipClick(selectedClip, playheadPos)}
                        title="Global Biography Track"
                      >
                        <span className="clip-label">Narrative_Bio_Text.srt</span>
                        <div className="clip-level-line"></div>
                      </div>
                    </div>
                  </div>

                  {/* Track V1: Video Clips (Lavender Blue) */}
                  <div className="premiere-track-row">
                    <div className="track-controls">
                      <span className="track-id">V1</span>
                      <Eye size={10} className="premiere-icon-dim" />
                      <Lock size={10} className="premiere-icon-dim" />
                    </div>
                    <div className="track-content-lane">
                      
                      {/* Clip 1: Intro Profile */}
                      <div 
                        className={`premiere-clip clip-video-blue ${selectedClip === 'intro' ? 'brightness-125' : ''}`}
                        style={{ 
                          position: 'absolute', 
                          left: '0%', 
                          width: '30%',
                          border: selectedClip === 'intro' ? '1px solid #ffffff' : '1px solid rgba(0,0,0,0.3)',
                          filter: selectedClip === 'intro' ? 'brightness(1.2)' : 'none'
                        }}
                        onClick={() => handleClipClick('intro', 0)}
                        title="Layer 1: Click to explore profile"
                      >
                        <span className="clip-label">01_Yash_Profile.mp4</span>
                        <div className="clip-level-line"></div>
                      </div>

                      {/* Clip 2: Motion FX */}
                      <div 
                        className={`premiere-clip clip-video-blue ${selectedClip === 'motion' ? 'brightness-125' : ''}`}
                        style={{ 
                          position: 'absolute', 
                          left: '30%', 
                          width: '35%',
                          border: selectedClip === 'motion' ? '1px solid #ffffff' : '1px solid rgba(0,0,0,0.3)',
                          filter: selectedClip === 'motion' ? 'brightness(1.2)' : 'none'
                        }}
                        onClick={() => handleClipClick('motion', 30)}
                        title="Layer 2: Click to explore VFX"
                      >
                        <span className="clip-label">02_Motion_FX.mov</span>
                        <div className="clip-level-line"></div>
                      </div>

                      {/* Clip 3: Web Dev & 3D */}
                      <div 
                        className={`premiere-clip clip-video-blue ${selectedClip === 'design' ? 'brightness-125' : ''}`}
                        style={{ 
                          position: 'absolute', 
                          left: '65%', 
                          width: '33%',
                          border: selectedClip === 'design' ? '1px solid #ffffff' : '1px solid rgba(0,0,0,0.3)',
                          filter: selectedClip === 'design' ? 'brightness(1.2)' : 'none'
                        }}
                        onClick={() => handleClipClick('design', 65)}
                        title="Layer 3: Click to explore Front-end"
                      >
                        <span className="clip-label">03_Code_3D.mp4</span>
                        <div className="clip-level-line"></div>
                      </div>

                    </div>
                  </div>

                  {/* Track A1: Audio Waveform (Green) */}
                  <div className="premiere-track-row track-audio-row">
                    <div className="track-controls">
                      <span className="track-id">A1</span>
                      <span className="audio-toggle-btn">M</span>
                      <span className="audio-toggle-btn">S</span>
                    </div>
                    <div className="track-content-lane">
                      <div className="premiere-clip clip-audio-green" style={{ width: '98%' }}>
                        <span className="clip-label" style={{ display: 'flex', alignItems: 'center' }}>
                          <Music size={11} style={{ marginRight: '4px', display: 'inline-block' }} /> Voiceover_Stereo.wav
                        </span>
                        <div className="clip-level-line"></div>
                        
                        {/* Interactive Ripple waveform bars */}
                        <div className="clip-audio-wave">
                          <span style={{ height: isPlaying ? '14px' : '4px' }}></span>
                          <span style={{ height: isPlaying ? '18px' : '8px' }}></span>
                          <span style={{ height: isPlaying ? '10px' : '3px' }}></span>
                          <span style={{ height: isPlaying ? '20px' : '6px' }}></span>
                          <span style={{ height: isPlaying ? '15px' : '9px' }}></span>
                          <span style={{ height: isPlaying ? '7px' : '2px' }}></span>
                          <span style={{ height: isPlaying ? '16px' : '11px' }}></span>
                          <span style={{ height: isPlaying ? '12px' : '5px' }}></span>
                          <span style={{ height: isPlaying ? '22px' : '12px' }}></span>
                          <span style={{ height: isPlaying ? '10px' : '4px' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Mockup Status Footer */}
              <div className="premiere-footer">
                <div className="footer-left">
                  <span className="status-indicator-dot"></span>
                  <span>MEDIA STATUS: READY</span>
                </div>
                <span>RENDER_CACHE: 100% OK</span>
              </div>

            </div>
          </div>

        </div>{/* end about-editorial-grid */}

      </div>
    </section>
  );
}
