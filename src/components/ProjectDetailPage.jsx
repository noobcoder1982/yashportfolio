import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, ArrowUpRight, RotateCcw, Volume2, Film, AlertTriangle } from 'lucide-react';

export default function ProjectDetailPage({ project, onClose, onNextProject, projectIndex, totalProjects }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [playProgress, setPlayProgress] = useState(0);
  const [audioMeter, setAudioMeter] = useState([30, 20, 10]); // decibel bar heights
  const [isClosing, setIsClosing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const scrollContainerRef = useRef(null);
  const playIntervalRef = useRef(null);
  const timecodeFramesRef = useRef(0);

  // Transition handler for switching projects & mounting scroll triggers
  useEffect(() => {
    setIsTransitioning(true);
    const t = setTimeout(() => setIsTransitioning(false), 300);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
    resetTimeline();
    
    return () => clearTimeout(t);
  }, [project]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.classList.add('project-details-active');
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.classList.remove('project-details-active');
      document.body.style.overflow = '';
    };
  }, []);

  // Simulating timecode & audio level animation on playback
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        // Increment frames
        timecodeFramesRef.current += 1;
        
        // Formulate typical 24fps timecode: HH:MM:SS:FF
        const totalFrames = timecodeFramesRef.current;
        const ff = String(totalFrames % 24).padStart(2, '0');
        const totalSeconds = Math.floor(totalFrames / 24);
        const ss = String(totalSeconds % 60).padStart(2, '0');
        const totalMinutes = Math.floor(totalSeconds / 60);
        const mm = String(totalMinutes % 60).padStart(2, '0');
        const hh = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
        
        setTimecode(`${hh}:${mm}:${ss}:${ff}`);
        
        // Progress (loops back at 100%)
        const nextProgress = (totalFrames / 360) * 100; // 15-second loop
        if (nextProgress >= 100) {
          timecodeFramesRef.current = 0;
          setPlayProgress(0);
        } else {
          setPlayProgress(nextProgress);
        }

        // Dance audio level meters
        setAudioMeter([
          Math.floor(Math.random() * 80) + 15,
          Math.floor(Math.random() * 65) + 15,
          Math.floor(Math.random() * 50) + 10
        ]);
      }, 1000 / 24); // 24 FPS
    } else {
      clearInterval(playIntervalRef.current);
      setAudioMeter([15, 10, 5]); // resting audio
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
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 450); // Matches smooth CSS slide-out delay
  };

  return (
    <div className={`project-detail-overlay ${isClosing ? 'closing' : ''}`}>
      <div ref={scrollContainerRef} className={`project-detail-scroll-container ${isTransitioning ? 'transition-flash' : ''}`}>
        
        {/* TOP STATUS NAVIGATION BAR */}
        <div className="detail-top-nav">
          <div className="top-nav-left">
            <span className="status-indicator"></span>
            <span className="workspace-tag">WORKSPACE: CASE_STUDY_{project.number} // YASH_PORTFOLIO</span>
          </div>
          <button className="detail-close-btn" onClick={handleClose} aria-label="Close Case Study">
            <span className="close-text">CLOSE WORK</span>
            <span className="close-icon-box"><X size={16} /></span>
          </button>
        </div>

        {/* HERO SECTION */}
        <header className="detail-hero-section">
          <div className="container">
            <div className="hero-index-badge">// 01_SELECTED_CUT</div>
            
            <h1 className="detail-main-title">
              {project.title.split(' ').map((word, i) => {
                // Style one of the words beautifully with Playfair Display Italic to keep consistency
                if (i === 0) {
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

        {/* INTERACTIVE WORKSPACE MONITOR & TIMELINE */}
        <section className="timeline-monitor-section">
          <div className="container">
            
            {/* Editing Suite Grid */}
            <div className="editing-suite-card">
              
              {/* SOURCE MONITOR (Viewport) */}
              <div className="source-monitor">
                
                {/* Viewport Overlay HUD */}
                <div className="viewport-hud">
                  <div className="hud-left">
                    <span className="hud-badge active-rec">
                      <span className="hud-rec-dot"></span>
                      REC
                    </span>
                    <span className="hud-cam-model">YASH_CAM_1</span>
                  </div>
                  <div className="hud-right">
                    <span className="hud-timecode">{timecode}</span>
                  </div>
                </div>

                {/* Viewport Screen Content */}
                <div className="viewport-screen">
                  
                  {/* Viewport Overlay Reticle grid lines */}
                  <div className="viewport-grid-lines">
                    <div className="grid-h"></div>
                    <div className="grid-v"></div>
                    <div className="viewport-crosshair"></div>
                  </div>

                  {/* Animated Frame Content depending on playback */}
                  <div className={`viewport-video-simulation ${isPlaying ? 'playing' : ''}`}>
                    {isPlaying ? (
                      <div className="simulated-motion-graphics">
                        {/* Film Burn Layer */}
                        <div className="film-burn-effect"></div>
                        {/* Dynamic Grid elements flashing */}
                        <div className="gfx-scanning-bar"></div>
                        <div className="gfx-elements-container">
                          <span className="gfx-box-marker"></span>
                          <span className="gfx-index-number">CLIP_INDEX: 00{project.number}</span>
                          <span className="gfx-time-tracker">{timecode}</span>
                          <div className="gfx-soundbar-oscillate">
                            <div className="oscillate-bar" style={{ height: `${audioMeter[0]}%` }}></div>
                            <div className="oscillate-bar" style={{ height: `${audioMeter[1]}%` }}></div>
                            <div className="oscillate-bar" style={{ height: `${audioMeter[2]}%` }}></div>
                            <div className="oscillate-bar" style={{ height: `${audioMeter[1] * 0.8}%` }}></div>
                            <div className="oscillate-bar" style={{ height: `${audioMeter[0] * 0.5}%` }}></div>
                          </div>
                        </div>
                        <p className="playback-overlay-text">EDITING SEQUENCE ACTIVE</p>
                      </div>
                    ) : (
                      <div className="simulated-stills">
                        <div className="viewport-still-poster" style={{ backgroundColor: project.color + '22' }}>
                          <Film size={48} className="poster-film-icon" />
                          <p className="poster-title-text">{project.title.toUpperCase()}</p>
                          <p className="poster-sub-text">TIMELINE PAUSED // PRESS PLAY FOR MOTION SIMULATION</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Viewport Control Panel Bar */}
                <div className="viewport-controls-bar">
                  <div className="viewport-status-message">
                    {isPlaying ? (
                      <span className="status-playing"><span className="pulse-circle animate-pulse"></span>PLAYING // SOURCE MONITOR LINKED</span>
                    ) : (
                      <span className="status-paused">PAUSED // STANDBY</span>
                    )}
                  </div>

                  <div className="viewport-main-btns">
                    <button className="viewport-btn control-reset" onClick={resetTimeline} title="Rewind to start">
                      <RotateCcw size={16} />
                    </button>
                    <button className={`viewport-btn control-play ${isPlaying ? 'active-play' : ''}`} onClick={togglePlay}>
                      {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />}
                    </button>
                  </div>

                  {/* Audio HUD Decibel Levels */}
                  <div className="viewport-audio-hud">
                    <Volume2 size={14} className="vol-icon" />
                    <div className="db-meter-stack">
                      {audioMeter.map((ht, idx) => (
                        <div key={idx} className="db-meter-track">
                          <div className="db-meter-fill" style={{ height: `${ht}%` }}></div>
                        </div>
                      ))}
                    </div>
                    <span className="db-val">L_R CH</span>
                  </div>
                </div>

              </div>

              {/* TIMELINE TRACKS PANEL */}
              <div className="timeline-tracks-editor">
                
                {/* Timeline Header (Time scales) */}
                <div className="timeline-tracks-header">
                  <div className="timeline-tracks-title">
                    <span>EDITING TRACKS TIMELINE</span>
                  </div>
                  
                  <div className="timeline-ruler-track">
                    <div className="ruler-marker" style={{ left: '0%' }}>00:00</div>
                    <div className="ruler-marker" style={{ left: '25%' }}>00:03</div>
                    <div className="ruler-marker" style={{ left: '50%' }}>00:07</div>
                    <div className="ruler-marker" style={{ left: '75%' }}>00:11</div>
                    <div className="ruler-marker" style={{ left: '100%' }}>00:15</div>
                  </div>
                </div>

                {/* Timeline Main Track Lanes */}
                <div className="timeline-lanes">
                  
                  {/* Playhead Marker */}
                  <div className="timeline-playhead" style={{ left: `${playProgress}%` }}>
                    <div className="playhead-pointer"></div>
                    <div className="playhead-line"></div>
                  </div>

                  {/* Lane 1: Video A-Roll */}
                  <div className="timeline-lane-row">
                    <div className="lane-label">V2 GRAPHICS</div>
                    <div className="lane-track-content">
                      <div className="lane-clip-block clip-v2" style={{ left: '15%', width: '40%' }}>
                        <span>TYPO_OVERLAYS_AE</span>
                      </div>
                      <div className="lane-clip-block clip-v2" style={{ left: '65%', width: '25%' }}>
                        <span>DYNAMIC_LOGO</span>
                      </div>
                    </div>
                  </div>

                  {/* Lane 2: Video B-Roll */}
                  <div className="timeline-lane-row">
                    <div className="lane-label">V1 FOOTAGE</div>
                    <div className="lane-track-content">
                      <div className="lane-clip-block clip-v1" style={{ left: '0%', width: '35%' }}>
                        <span>CAM1_SLOG3_A_ROLL</span>
                      </div>
                      <div className="lane-clip-block clip-v1" style={{ left: '38%', width: '32%' }}>
                        <span>CAM2_CU_B_ROLL</span>
                      </div>
                      <div className="lane-clip-block clip-v1" style={{ left: '72%', width: '28%' }}>
                        <span>CAM1_FINAL_EXIT</span>
                      </div>
                    </div>
                  </div>

                  {/* Lane 3: Audio Dialogue */}
                  <div className="timeline-lane-row">
                    <div className="lane-label">A1 VOICE</div>
                    <div className="lane-track-content">
                      <div className="lane-clip-block clip-a1" style={{ left: '0%', width: '55%' }}>
                        <span>VO_DIALOGUE_CLEAN_MIX</span>
                      </div>
                      <div className="lane-clip-block clip-a1" style={{ left: '60%', width: '35%' }}>
                        <span>VO_OUTRO_CUE</span>
                      </div>
                    </div>
                  </div>

                  {/* Lane 4: Audio Sound FX */}
                  <div className="timeline-lane-row">
                    <div className="lane-label">A2 SOUND_FX</div>
                    <div className="lane-track-content">
                      <div className="lane-clip-block clip-a2" style={{ left: '15%', width: '8%' }}>
                        <span>WHOOSH</span>
                      </div>
                      <div className="lane-clip-block clip-a2" style={{ left: '35%', width: '6%' }}>
                        <span>CLICK_HIT</span>
                      </div>
                      <div className="lane-clip-block clip-a2" style={{ left: '55%', width: '10%' }}>
                        <span>CINEMATIC_HIT</span>
                      </div>
                      <div className="lane-clip-block clip-a2" style={{ left: '72%', width: '8%' }}>
                        <span>SWOOSH</span>
                      </div>
                    </div>
                  </div>

                  {/* Lane 5: Audio Music Track */}
                  <div className="timeline-lane-row">
                    <div className="lane-label">A3 MUSIC</div>
                    <div className="lane-track-content">
                      <div className="lane-clip-block clip-a3" style={{ left: '0%', width: '100%' }}>
                        <span>HIGH_ENERGY_PULSE_STEREO.WAV [BEAT_SYNCED]</span>
                      </div>
                    </div>
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
                  PROJECT {projectIndex + 2 > totalProjects ? '01' : String(projectIndex + 2).padStart(2, '0')} // {projectIndex + 2 > totalProjects ? 'COMMERCIAL' : 'VIEW'}
                </span>
              </button>

            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
