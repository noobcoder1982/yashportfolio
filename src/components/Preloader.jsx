import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 5) + 3;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          // Fire onComplete the moment the slide-up STARTS
          // so page content begins fading in simultaneously → no white flash
          if (onComplete) onComplete();
        }, 600);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Derive frame count (240 frame export)
  const currentFrame = Math.floor((progress / 100) * 240);
  
  // Derive estimated remaining time (3 seconds countdown)
  const secondsRemaining = Math.max(0, 3 - Math.floor((progress / 100) * 3));
  const timeRemainingStr = `00:00:0${secondsRemaining}`;

  // Log message helper depending on export progress
  const getRenderLog = (p) => {
    if (p < 15) return `[SYS] Booting high-fidelity coffee engines...`;
    if (p < 30) return `[ASSETS] Importing yash_sketch.png (and extra caffeine)...`;
    if (p < 45) return `[ADOBE] Auto-saving every 1.5 seconds to prevent panic...`;
    if (p < 60) return `[NAV] Syncing timeline frame rates to match heart rate...`;
    if (p < 75) return `[MIXER] Overclocking bass to annoy the neighbors...`;
    if (p < 90) return `[RENDER] Sweating over the final export pass...`;
    if (p < 100) return `[SYS] Sweeping leftover pixel dust from screen...`;
    return `[COMPLETED] Ready to launch Yar Yash Portfolio.`;
  };

  return (
    <div className={`preloader-overlay ${isExiting ? 'exit-slide-up' : ''}`}>
      
      {/* Adobe Premiere Pro style Export Panel Window */}
      <div className="premiere-export-card">
        
        {/* Title Bar */}
        <div className="premiere-card-header">
          <div className="premiere-logo-area">
            <div className="pr-logo-badge">Pr</div>
            <span className="premiere-title-text">Adobe Premiere Pro Export</span>
          </div>
          <div className="premiere-window-dots">
            <span className="win-dot"></span>
            <span className="win-dot"></span>
            <span className="win-dot"></span>
          </div>
        </div>

        {/* Panel Window Content */}
        <div className="premiere-card-body">

          {/* REAL-TIME VIEWINDER / RENDER PREVIEW DISPLAY */}
          <div className="premiere-viewfinder">
            <div className="viewfinder-corner top-left"></div>
            <div className="viewfinder-corner top-right"></div>
            <div className="viewfinder-corner bottom-left"></div>
            <div className="viewfinder-corner bottom-right"></div>

            <div className="viewfinder-stats-top">
              <div className="stats-rec-indicator">
                <span className="rec-dot pulsing"></span>
                <span className="rec-text">RENDER</span>
              </div>
              <span className="stats-aspect-ratio">16:9 REC</span>
            </div>

            <div className="viewfinder-log-stream">
              <span className="log-line muted">✓ Engine: CALIBRATED (24.00fps)</span>
              <span className="log-line muted">✓ Audio: DYNAMIC_TRACK (LR Mix)</span>
              <span className="log-line active-phase">{getRenderLog(progress)}</span>
            </div>

            {/* Dynamic pixel matrices that light up as we render */}
            <div className="viewfinder-grid-visual">
              {Array.from({ length: 14 }).map((_, idx) => {
                const active = progress >= (idx / 14) * 100;
                return (
                  <div key={idx} className={`grid-block ${active ? 'active' : ''}`} />
                );
              })}
            </div>

            <div className="viewfinder-stats-bottom">
              <span className="stats-fps">LUT: CINEMATIC_V2</span>
              <span className="stats-frame">FR: {currentFrame} / 240</span>
            </div>
          </div>
          
          {/* Metadata Grid */}
          <div className="premiere-meta-grid">
            <div className="meta-row">
              <span className="meta-label">Format:</span>
              <span className="meta-val">H.264 (MP4)</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Preset:</span>
              <span className="meta-val">Match Source - High Bitrate</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Output Path:</span>
              <span className="meta-val">/Users/Yash/Portfolio_Final.mp4</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Range:</span>
              <span className="meta-val">Entire Sequence (00:00:10:00)</span>
            </div>
          </div>

          {/* Timeline Playhead Track Mockup */}
          <div className="premiere-mini-timeline">
            
            {/* Timeline Ruler Header */}
            <div className="timeline-ruler">
              <span>00:00:00</span>
              <span>00:02:15</span>
              <span>00:05:00</span>
              <span>00:07:15</span>
              <span>00:10:00</span>
            </div>

            {/* Track Layers Container */}
            <div className="timeline-tracks-container">
              
              {/* Blue Playhead Sweep Line */}
              <div 
                className="premiere-playhead-line"
                style={{ left: `${progress}%` }}
              >
                <div className="playhead-marker-top"></div>
              </div>

              {/* V2 Track Layer */}
              <div className="timeline-track-row v2-row">
                <span className="track-label">V2</span>
                <div className="track-segment-block active-text-track">
                  <span>[TEXT] Herr Von Muellerhoff</span>
                </div>
              </div>

              {/* V1 Track Layer */}
              <div className="timeline-track-row v1-row">
                <span className="track-label">V1</span>
                <div className="track-segment-block active-video-track">
                  <span>[VIDEO] YASH_PORTFOLIO_CORE.mp4</span>
                </div>
              </div>

              {/* A1 Track Layer */}
              <div className="timeline-track-row a1-row">
                <span className="track-label">A1</span>
                <div className="track-segment-block active-audio-track">
                  <span>[AUDIO] Creative_Reel_Score.wav</span>
                </div>
              </div>

            </div>
          </div>

          {/* Export Status Line */}
          <div className="premiere-status-label">
            <span className="status-main-txt">
              {progress < 100 ? `Encoding Sequence: Frame ${currentFrame} of 240` : 'Export Completed Successfully'}
            </span>
            <span className="status-percent-txt">{progress}%</span>
          </div>

          {/* Premiere Pro Style Progress Bar */}
          <div className="premiere-progress-track">
            <div 
              className="premiere-progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Bottom Estimated Time Counters */}
          <div className="premiere-bottom-counters">
            <div className="counter-item">
              <span className="counter-lbl">Time Remaining:</span>
              <span className="counter-val">{timeRemainingStr}</span>
            </div>
            <div className="counter-item">
              <span className="counter-lbl">Elapsed Time:</span>
              <span className="counter-val">00:00:0{Math.min(2, Math.floor((progress / 100) * 2.5))}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
