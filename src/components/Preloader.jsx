import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'exiting'

  const onCompleteRef = React.useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Fast, premium and organic loading increments
      const inc = Math.floor(Math.random() * 5) + 3;
      current = Math.min(current + inc, 100);
      setProgress(current);
      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('exiting');
          if (onCompleteRef.current) onCompleteRef.current();
        }, 700);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Compute timecode style loading counter
  const frames = Math.floor((progress / 100) * 24);
  const timecode = `00:00:${String(Math.floor((progress / 100) * 12)).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;

  return (
    <div className={`pl-curtain-root ${phase === 'exiting' ? 'pl-curtain-exiting' : ''}`}>
      {/* Top half panel */}
      <div className="pl-curtain-top">
        <div className="pl-curtain-ambient-top"></div>
        <div className="pl-curtain-branding-top">YASH // POST-PRODUCTION & WEB DEVELOPER</div>
      </div>

      {/* Center Dividing Seam Line */}
      <div className="pl-curtain-line">
        <div className="pl-curtain-pulse"></div>
      </div>

      {/* Central Floating Cinematic HUD Display */}
      <div className="pl-curtain-hud">
        <div className="pl-hud-glass">
          <div className="pl-hud-top-row">
            <span className="pl-hud-tag font-mono">SYS.INITIALIZE_</span>
            <span className="pl-hud-tc font-mono">{timecode}</span>
          </div>
          
          <div className="pl-hud-logo-wrap">
            <h1 className="pl-hud-title font-bebas">YASH</h1>
            <p className="pl-hud-subtitle">CREATIVE PORTFOLIO</p>
          </div>

          <div className="pl-hud-progress-block">
            <div className="pl-hud-track">
              <div className="pl-hud-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="pl-hud-details font-mono">
              <span className="pl-hud-status">{progress < 100 ? 'COMPILING REEL...' : 'SYSTEMS ONLINE'}</span>
              <span className="pl-hud-pct">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom half panel */}
      <div className="pl-curtain-bottom">
        <div className="pl-curtain-ambient-bottom"></div>
        <div className="pl-curtain-branding-bottom">©{new Date().getFullYear()} ALL RIGHTS RESERVED</div>
      </div>
    </div>
  );
}
