import React, { useState, useEffect, useRef } from 'react';

const TIMELINE_CLIPS = {
  V1: [
    { label: 'PORTFOLIO_CORE.mp4', color: '#4f8ef7', width: '38%', left: '0%' },
    { label: 'REEL_2024.mp4',      color: '#3d6fcc', width: '25%', left: '40%' },
    { label: 'FINAL_GRADE.mp4',    color: '#4f8ef7', width: '28%', left: '68%' },
  ],
  A1: [
    { label: 'LAV',  color: '#2ea44f', width: '60%', left: '0%' },
    { label: 'LAV',  color: '#2ea44f', width: '35%', left: '63%' },
  ],
  A2: [
    { label: 'SFX',  color: '#2ea44f', width: '45%', left: '10%' },
    { label: 'SFX',  color: '#22833e', width: '40%', left: '57%' },
  ],
  A3: [
    { label: 'AMBIENCE', color: '#9333ea', width: '95%', left: '2%' },
  ],
  A4: [
    { label: 'MUSIC', color: '#b845c5', width: '100%', left: '0%' },
  ],
};

const TIMECODES = ['00:00:00', '00:02:00', '00:04:00', '00:06:00', '00:08:00', '00:10:00', '00:12:00'];

const FILES = [
  { name: '001 SEQUENCES', indent: 0, isFolder: true },
  { name: '002 MEDIA', indent: 0, isFolder: true },
  { name: 'ARCHIVAL', indent: 1, isFolder: true },
  { name: 'B-ROLL', indent: 1, isFolder: true },
  { name: 'A_CAM', indent: 2, isFolder: true },
  { name: 'PORTFOLIO_CORE.mp4', indent: 3, isFolder: false },
  { name: 'REEL_2024.mp4', indent: 3, isFolder: false },
  { name: 'FINAL_GRADE.mp4', indent: 3, isFolder: false },
  { name: 'INTERVIEWS', indent: 1, isFolder: true },
  { name: '003 GFX', indent: 0, isFolder: true },
  { name: '004 AUDIO', indent: 0, isFolder: true },
  { name: 'Creative_Reel_Score.wav', indent: 1, isFolder: false },
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'exiting'
  const currentFrame = Math.floor((progress / 100) * 240);
  const tc = `00:00:${String(Math.floor((progress / 100) * 59)).padStart(2,'0')}:${String(Math.floor((progress / 100) * 23)).padStart(2,'0')}`;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const inc = Math.floor(Math.random() * 4) + 2;
      current = Math.min(current + inc, 100);
      setProgress(current);
      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('exiting');
          if (onComplete) onComplete();
        }, 500);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`pl-root ${phase === 'exiting' ? 'pl-exiting' : ''}`}>

      {/* ═══════════════ TOP HALF — everything above the timeline ═══════════════ */}
      <div className="pl-top-half">

        {/* ── App chrome title bar ── */}
        <div className="pl-titlebar">
          <div className="pl-titlebar-left">
            <div className="pl-pr-badge">Pr</div>
            <span>Adobe Premiere Pro — <em>YASH_PORTFOLIO_v24.prproj</em></span>
          </div>
          <div className="pl-titlebar-controls">
            <span className="pl-win-btn pl-minimize"></span>
            <span className="pl-win-btn pl-maximize"></span>
            <span className="pl-win-btn pl-close"></span>
          </div>
        </div>

        {/* ── Menu bar ── */}
        <div className="pl-menubar">
          {['File','Edit','Clip','Sequence','Markers','Graphics','View','Window','Help'].map(m => (
            <span key={m} className="pl-menu-item">{m}</span>
          ))}
        </div>

        {/* ── Three-panel workspace ── */}
        <div className="pl-workspace">

          {/* LEFT — Project browser */}
          <div className="pl-panel pl-panel-left">
            <div className="pl-panel-header">
              <span className="pl-panel-title">Project: YASH_PORTFOLIO</span>
              <div className="pl-panel-tabs">
                <span className="pl-ptab pl-ptab-active">Project</span>
                <span className="pl-ptab">Libraries</span>
              </div>
            </div>
            <div className="pl-file-search">
              <span className="pl-search-icon">🔍</span>
              <span className="pl-search-placeholder">Search...</span>
            </div>
            <div className="pl-file-list">
              <div className="pl-file-cols">
                <span>Name</span><span>Duration</span>
              </div>
              {FILES.map((f, i) => (
                <div
                  key={i}
                  className={`pl-file-row ${f.isFolder ? 'pl-folder' : 'pl-file'} ${i === 5 ? 'pl-file-active' : ''}`}
                  style={{ paddingLeft: `${8 + f.indent * 14}px` }}
                >
                  <span className="pl-file-icon">{f.isFolder ? '▶' : '▪'}</span>
                  <span className="pl-file-name">{f.name}</span>
                  {!f.isFolder && <span className="pl-file-dur">00:01:00:00</span>}
                </div>
              ))}
            </div>
          </div>

          {/* CENTER — Program monitor */}
          <div className="pl-panel pl-panel-center">
            <div className="pl-panel-header">
              <span className="pl-panel-title">Program: YASH_REEL_v2 ▼</span>
            </div>

            {/* Video preview */}
            <div className="pl-monitor-screen">
              {/* Scan-line CRT effect */}
              <div className="pl-scanlines"></div>

              {/* Cinematic frame corners */}
              <div className="pl-corner pl-corner-tl"></div>
              <div className="pl-corner pl-corner-tr"></div>
              <div className="pl-corner pl-corner-bl"></div>
              <div className="pl-corner pl-corner-br"></div>

              {/* Preview content — logo + timecode */}
              <div className="pl-preview-content">
                <div className="pl-preview-brand">YASH</div>
                <div className="pl-preview-sub">POST-PRODUCTION PORTFOLIO</div>
              </div>

              {/* Timecode display */}
              <div className="pl-monitor-tc-bar">
                <span className="pl-tc-val">{tc}</span>
                <span className="pl-tc-fit">Fit</span>
                <span className="pl-tc-rest">1/2 &nbsp;⬙&nbsp; 00:01:00:00</span>
              </div>

              {/* Monitor scrub bar (reflects progress) */}
              <div className="pl-monitor-scrub">
                <div className="pl-monitor-scrub-fill" style={{ width: `${progress}%` }}></div>
                <div className="pl-monitor-scrub-head" style={{ left: `${progress}%` }}></div>
              </div>

              {/* Transport controls */}
              <div className="pl-transport">
                {'⏮ ◀◀ ◀ ▶◀ ⏹ ▶ ▶◀ ▶▶ ⏭'.split(' ').map((ic, i) => (
                  <button key={i} className={`pl-transport-btn ${i === 5 && progress < 100 ? 'pl-transport-active' : ''}`}>{ic}</button>
                ))}
              </div>
            </div>

            {/* Render status */}
            <div className="pl-render-status">
              <div className="pl-render-rec">
                <span className="pl-rec-dot"></span>
                <span>RENDERING</span>
              </div>
              <span className="pl-render-pct">{progress}%</span>
              <span className="pl-render-frames">Frame {currentFrame} / 240</span>
            </div>
          </div>

          {/* RIGHT — Lumetri / Essential Sound panel */}
          <div className="pl-panel pl-panel-right">
            <div className="pl-panel-header">
              <div className="pl-panel-tabs">
                <span className="pl-ptab">Lumetri Color</span>
                <span className="pl-ptab pl-ptab-active">Essential Sound</span>
                <span className="pl-ptab">Text</span>
              </div>
            </div>
            <div className="pl-esound-body">
              <div className="pl-esound-label">Preset: (Custom)</div>
              <div className="pl-esound-section">
                <div className="pl-esound-section-title">✔ Enhance Speech</div>
                <button className="pl-enhance-btn">Enhance</button>
                <div className="pl-esound-row">
                  <span>Mix Amount</span>
                  <div className="pl-slider-track">
                    <div className="pl-slider-fill" style={{ width: `${progress * 0.7}%` }}></div>
                    <div className="pl-slider-thumb" style={{ left: `${progress * 0.7}%` }}></div>
                  </div>
                  <span className="pl-slider-val">7.0</span>
                </div>
              </div>
              <div className="pl-esound-section">
                <div className="pl-esound-section-title">✔ Loudness</div>
                <div className="pl-esound-row pl-muted">
                  <span>Clip Volume</span>
                </div>
                <div className="pl-esound-row">
                  <span>Level</span>
                  <div className="pl-slider-track">
                    <div className="pl-slider-fill pl-slider-blue" style={{ width: `${40 + progress * 0.3}%` }}></div>
                    <div className="pl-slider-thumb" style={{ left: `${40 + progress * 0.3}%` }}></div>
                  </div>
                  <span className="pl-slider-val pl-blue">0.0 dB</span>
                </div>
              </div>
              <div className="pl-esound-section">
                <div className="pl-esound-section-title">Lumetri Scopes</div>
                <div className="pl-waveform-mini">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="pl-wf-bar" style={{ height: `${20 + Math.sin(i * 0.8 + progress * 0.05) * 15}px` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ THE CURTAIN SPLIT SEAM (timeline divider) ═══════════ */}
      <div className="pl-seam">
        <div className="pl-seam-label">Ad_RoughCut-V1 ×</div>
        <div className="pl-seam-tools">
          <span>🖊</span><span>✂</span><span>↔</span><span>↕</span><span>✋</span>
        </div>
      </div>

      {/* ═══════════════ BOTTOM HALF — Timeline ═══════════════ */}
      <div className="pl-bottom-half">

        {/* Timeline header bar */}
        <div className="pl-tl-header">
          <div className="pl-tl-tc-display">{tc}</div>
          <div className="pl-tl-ruler">
            {TIMECODES.map((t, i) => (
              <span key={i} className="pl-tl-ruler-tick">{t}</span>
            ))}
          </div>
          {/* VU meter */}
          <div className="pl-vu-meter">
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} className={`pl-vu-bar ${i < Math.floor(progress / 5) ? (i > 16 ? 'pl-vu-red' : i > 12 ? 'pl-vu-yellow' : 'pl-vu-green') : ''}`}></div>
            ))}
          </div>
        </div>

        {/* Timeline tracks area */}
        <div className="pl-tl-body">
          {/* Track controls (left gutter) */}
          <div className="pl-tl-gutter">
            {['V1','A1','A2','A3','A4'].map((t, i) => (
              <div key={t} className={`pl-tl-track-ctrl ${t.startsWith('V') ? 'pl-tl-video' : 'pl-tl-audio'}`}>
                <span className="pl-track-name">{t}</span>
                <div className="pl-track-btns">
                  <span className="pl-tbtn">M</span>
                  <span className="pl-tbtn">H</span>
                  <span className="pl-tbtn">S</span>
                  {t.startsWith('A') && <span className="pl-tbtn pl-mic">🎙</span>}
                </div>
                {t.startsWith('V') && <span className="pl-track-sub">Video {i + 1}</span>}
                {t.startsWith('A') && <span className="pl-track-sub">{['LAV','SFX','AMBIENCE','MUSIC'][i-1]}</span>}
              </div>
            ))}
          </div>

          {/* Track lanes */}
          <div className="pl-tl-lanes">
            {/* Playhead */}
            <div className="pl-playhead" style={{ left: `${progress}%` }}>
              <div className="pl-playhead-head"></div>
              <div className="pl-playhead-line"></div>
            </div>

            {/* Progress "played" tint */}
            <div className="pl-tl-played" style={{ width: `${progress}%` }}></div>

            {/* Clip tracks */}
            {Object.entries(TIMELINE_CLIPS).map(([trackName, clips]) => (
              <div key={trackName} className={`pl-tl-lane ${trackName.startsWith('V') ? 'pl-lane-video' : 'pl-lane-audio'}`}>
                {clips.map((clip, i) => (
                  <div
                    key={i}
                    className="pl-clip"
                    style={{
                      left: clip.left,
                      width: clip.width,
                      backgroundColor: clip.color,
                    }}
                  >
                    <div className="pl-clip-label">{clip.label}</div>
                    {trackName.startsWith('A') && (
                      <div className="pl-clip-waveform">
                        {Array.from({ length: 40 }).map((_, wi) => (
                          <div
                            key={wi}
                            className="pl-wf-spike"
                            style={{ height: `${8 + Math.abs(Math.sin(wi * 0.4)) * 14}px` }}
                          ></div>
                        ))}
                      </div>
                    )}
                    {trackName === 'V1' && (
                      <div className="pl-clip-thumbnails">
                        {Array.from({ length: 4 }).map((_, ti) => (
                          <div key={ti} className="pl-clip-thumb"></div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline footer — the export progress bar */}
        <div className="pl-tl-footer">
          <div className="pl-export-row">
            <span className="pl-export-lbl">
              {progress < 100 ? `Encoding: Frame ${currentFrame} of 240` : '✓ Export Complete — Launching Portfolio...'}
            </span>
            <span className="pl-export-pct">{progress}%</span>
          </div>
          <div className="pl-export-track">
            <div className="pl-export-fill" style={{ width: `${progress}%` }}></div>
            <div className="pl-export-glow" style={{ left: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
