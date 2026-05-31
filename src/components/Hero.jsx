import React, { useState } from 'react';
import { Video, Sparkles, RefreshCw, Sliders, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [coords, setCoords] = useState({ x: 1097, y: 746 });
  const [isRendering, setIsRendering] = useState(false);
  const [renderPercent, setRenderPercent] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('CINEMATIC');
  const [selectedPreset, setSelectedPreset] = useState('TEASER TRAILER');
  const [promptText, setPromptText] = useState(
    "Generate cinematic edits that somehow make the client's 17th revision request make sense"
  );

  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    setCoords({ x, y });
  };

  const handleGenerate = () => {
    if (isRendering) return;
    setIsRendering(true);
    setRenderPercent(0);

    let pct = 0;
    const interval = setInterval(() => {
      pct = Math.min(pct + Math.floor(Math.random() * 8) + 4, 100);
      setRenderPercent(pct);
      if (pct === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRendering(false);
        }, 1200);
      }
    }, 45);
  };

  return (
    <section 
      id="home" 
      className="hero-section generative-hero brutalist-viewfinder-hero"
      onMouseMove={handleMouseMove}
    >
      {/* ── DESKTOP VIEWFINDER BUILD ── */}
      <div className="hero-desktop-layout">
        {/* Static Technical Blueprint Grid Backdrop */}
        <div className="hero-technical-grid"></div>

        {/* Cinematic Spotlight Backdrop */}
        <div className="spotlight-overlay"></div>
        <div className="spotlight-grain"></div>

        <div className="hero-canvas-container">
          
          {/* Sleek Cinematic Editor Dashboard */}
          <div className="editor-dashboard-container">
            
            {/* Top Bar Strip */}
            <div className="dashboard-header-strip">
              <span className="tb-tag top-left">[ SYSTEM: CAFFEINATED ] // RENDER: READY</span>
              
              {/* Color Strip Indicator */}
              <div className="brutal-color-strip">
                <span className="cs-block cs-white"></span>
                <span className="cs-block cs-grey-light"></span>
                <span className="cs-block cs-grey-mid"></span>
                <span className="cs-block cs-grey-dark"></span>
                <span className="cs-block cs-accent"></span>
              </div>

              <span className="tb-tag top-right">FPS: 23.976 (STABLE-ISH) // REEL: MATCHED</span>
            </div>

            {/* Static Visual Viewport Box with Staggered Reveals */}
            <div className={`editor-viewport-card ${isRendering ? 'active-rendering' : ''}`}>
              {/* Fine L-shaped Corner Crop Marks */}
              <div className="crop-mark mark-tl"></div>
              <div className="crop-mark mark-tr"></div>
              <div className="crop-mark mark-bl"></div>
              <div className="crop-mark mark-br"></div>
              
              {/* Real-time laser scanner overlay when generating */}
              {isRendering && (
                <div className="viewfinder-laser-overlay">
                  <div className="viewfinder-laser-line" />
                  <div className="viewfinder-grid-lines" />
                  <div className="viewfinder-render-readout">
                    <span className="vrr-line">[ENGINE] COMPILING SHADER JOKES...</span>
                    <span className="vrr-line">[SYS] IGNORED 47 CLIENT EMAILS...</span>
                    <span className="vrr-line active-pct">BUFFER PROGRESS: {renderPercent}%</span>
                    <span className="vrr-line success-msg">{renderPercent === 100 ? '✓ CAFFEINE ENCODED SUCCESS' : '▸ RUNNING CINEMATIC PASS'}</span>
                  </div>
                </div>
              )}

              {/* Split layout: 2 Columns */}
              <div className="viewport-columns-grid">
                
                {/* Left Column: Editor text asset and specs */}
                <div className="viewport-left-pane">
                  <div className="post-production-label reveal-text-item" style={{ animationDelay: '100ms' }}>
                    <Video size={14} className="video-icon" />
                    <span>POST PRODUCTION</span>
                  </div>
                  
                  {/* Editor Text PNG Asset */}
                  <div className="editor-image-container reveal-text-item" style={{ animationDelay: '250ms' }}>
                    <img 
                      src="/assets/editor.png" 
                      alt="EDITOR" 
                      className={`editor-text-image ${isRendering ? 'rendering' : ''}`}
                    />
                    <div className="image-glow-overlay"></div>
                  </div>

                  <div className="vision-statement reveal-text-item" style={{ animationDelay: '400ms' }}>
                    <span className="red-dash"></span>
                    <span className="statement-text">TURNING VISION INTO CINEMATIC REALITY</span>
                  </div>

                  {/* Tech specifications row */}
                  <div className="technical-specs-row reveal-text-item" style={{ animationDelay: '550ms' }}>
                    <div className="tech-spec-item">
                      <span className="tech-spec-val">4K UHD</span>
                      <span className="tech-spec-lbl">RESOLUTION</span>
                    </div>
                    <div className="tech-spec-item">
                      <span className="tech-spec-val">2.39:1</span>
                      <span className="tech-spec-lbl">ASPECT RATIO</span>
                    </div>
                    <div className="tech-spec-item">
                      <span className="tech-spec-val">CINEMASCOPE</span>
                      <span className="tech-spec-lbl">FORMAT</span>
                    </div>
                    <div className="tech-spec-item">
                      <span className="tech-spec-val">23.976</span>
                      <span className="tech-spec-lbl">FPS</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Bio details and static telemetry image */}
                <div className="viewport-right-pane">
                  <div className="top-accent-line"></div>
                  
                  <h1 className="editor-title-yar-yash reveal-text-item" style={{ animationDelay: '200ms' }}>
                    YAR <span className="red-text">YASH</span>
                  </h1>
                  
                  <div className="film-editor-tag reveal-text-item" style={{ animationDelay: '350ms' }}>
                    FILM EDITOR
                  </div>

                  {/* Divider Line with Red Circle */}
                  <div className="scope-divider reveal-text-item" style={{ animationDelay: '450ms' }}>
                    <span className="divider-line"></span>
                    <span className="divider-circle"></span>
                    <span className="divider-line"></span>
                  </div>

                  <p className="editor-narrative-paragraph reveal-text-item" style={{ animationDelay: '600ms' }}>
                    Crafting emotions, rhythm and stories frame by frame. Every cut is a choice. Every choice tells a story.
                  </p>

                  {/* Highly authentic static graph and compass asset replacement */}
                  <div className="telemetry-box image-telemetry-box reveal-text-item" style={{ animationDelay: '750ms' }}>
                    <img 
                      src="/assets/telemetry.png" 
                      alt="Telemetry Graph & Compass Panel" 
                      className="telemetry-asset-image"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel Row */}
            <div className="dashboard-controls-row">
              
              {/* Prompt Input Group */}
              <div className="control-group prompt-group">
                <span className="control-label">PROMPT</span>
                <div className="prompt-input-container">
                  <input 
                    type="text" 
                    className="control-input prompt-textbox" 
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    disabled={isRendering}
                  />
                </div>
              </div>

              {/* Slider Settings Icon Button */}
              <button className="control-settings-btn" title="Edit Parameters">
                <Sliders size={15} />
              </button>

              {/* Style Selection Group */}
              <div className="control-group dropdown-group">
                <span className="control-label">STYLE</span>
                <div className="custom-dropdown-select">
                  <select 
                    value={selectedStyle} 
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    disabled={isRendering}
                  >
                    <option value="CINEMATIC">CINEMATIC</option>
                    <option value="GLITCH_ART">GLITCH ART</option>
                    <option value="RETRO_VHS">RETRO VHS</option>
                    <option value="CYBERPUNK">CYBERPUNK</option>
                  </select>
                  <ChevronDown size={11} className="select-arrow-icon" />
                </div>
              </div>

              {/* Preset Selection Group */}
              <div className="control-group dropdown-group">
                <span className="control-label">PRESET</span>
                <div className="custom-dropdown-select">
                  <select 
                    value={selectedPreset} 
                    onChange={(e) => setSelectedPreset(e.target.value)}
                    disabled={isRendering}
                  >
                    <option value="TEASER TRAILER">TEASER TRAILER</option>
                    <option value="DIRECTOR'S CUT">DIRECTOR'S CUT</option>
                    <option value="COMMERCIAL">COMMERCIAL</option>
                    <option value="DOCUMENTARY">DOCUMENTARY</option>
                  </select>
                  <ChevronDown size={11} className="select-arrow-icon" />
                </div>
              </div>

              {/* Generate Action Button */}
              <button 
                className={`control-generate-btn ${isRendering ? 'rendering' : ''}`}
                onClick={handleGenerate}
                disabled={isRendering}
              >
                {isRendering ? (
                  <RefreshCw size={14} className="generate-icon spin-icon" />
                ) : (
                  <Sparkles size={14} className="generate-icon" />
                )}
                <span>{isRendering ? `GENERATING ${renderPercent}%` : 'GENERATE'}</span>
              </button>
            </div>

            {/* Bottom telemetry/status bar */}
            <div className="dashboard-status-strip">
              <span className="status-tag">PROJECT: <span className="white-text">YAR EDITOR YASH</span> | STATUS: <span className="green-text">READY</span></span>
              <span className="status-tag hide-mobile">LUT: <span className="white-text">CRYING_IN_REC709_LOG</span></span>
              <span className="status-tag">CUR.POS: <span className="white-text">{coords.x}PX, {coords.y}PX</span></span>
            </div>

          </div>

        </div>
      </div>

      {/* ── MOBILE PREMIUM EDITORIAL TYPOGRAPHIC HERO ── */}
      <div className="hero-mobile-layout">
        <div className="mobile-hero-glow"></div>
        <div className="mobile-hero-content">
          <div className="mobile-hero-badge">
            <span className="led-dot green-led" style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#00e676', borderRadius: '50%', marginRight: '6px' }}></span>
            <span>SYSTEM_ONLINE: V2.0</span>
          </div>

          <h1 className="editorial-hero-title">
            <span>Hey there! I'm <span className="pill-name"><em>Yash</em></span></span><br />
            <span>a <span className="pill-role"><em>Film Editor</em></span> from <span className="text-italic-accent">India</span></span>
          </h1>

          <h2 className="editorial-hero-subtext">
            Pacing meets pixels,<br />
            <em>your vision, frame-perfect.</em>
          </h2>

          <div className="mobile-hero-ctas">
            <button className="btn btn-primary" onClick={() => {
              const el = document.getElementById('projects');
              if (el) {
                const targetPosition = el.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                  top: targetPosition - 60,
                  behavior: 'smooth'
                });
              }
            }}>
              <span>Selected Cuts</span>
            </button>
            
            <button 
              className="btn btn-secondary" 
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) {
                  const targetPosition = el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: targetPosition - 60,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              <span>Request Quote</span>
            </button>
          </div>
        </div>

        <div className="mobile-hero-scroll-prompt">
          <span>SCROLL TO EXPLORE</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}

