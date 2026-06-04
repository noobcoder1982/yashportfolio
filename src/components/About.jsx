import React, { useState, useEffect, useRef } from 'react';
import { 
  Type, Sliders, RotateCcw, Cpu, FileText, Check, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, 
  Sparkles, CornerDownRight, ArrowUpRight
} from 'lucide-react';

export default function About() {
  // Typography Inspector States
  const [fontFamily, setFontFamily] = useState('sans'); // 'sans' | 'serif' | 'mono' | 'cursive'
  const [fontSize, setFontSize] = useState(1.15); // rem
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.65);
  const [letterSpacing, setLetterSpacing] = useState(0.02); // em
  const [textAlign, setTextAlign] = useState('left'); // 'left' | 'center' | 'right' | 'justify'
  const [textTransform, setTextTransform] = useState('none'); // 'none' | 'uppercase'

  // Tooltip keyword state
  const [hoveredWord, setHoveredWord] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Stats calculation
  const bioText = `My name is Yash Srivastava, and I am a passionate Graphic Designer and creative artist skilled in Photoshop, Illustrator, Figma, and Animate CC. I have experience working on freelance projects, creating professional designs, branding materials, and digital content for clients. I also specialize in video editing and motion graphics using Adobe Premiere Pro and Adobe After Effects.

In addition to graphic design, I have knowledge of web designing and web development, which helps me create modern and user-friendly digital experiences. Currently, I am learning 3D design and animation with Autodesk Maya to expand my creative skills further. I am passionate about learning new technologies, improving my creativity, and delivering high-quality visual work.`;

  const wordCount = bioText.split(/\s+/).filter(Boolean).length;
  const charCount = bioText.length;
  const readabilityIndex = '8.8 (Standard)';

  const resetTypography = () => {
    setFontFamily('sans');
    setFontSize(1.15);
    setFontWeight(400);
    setLineHeight(1.65);
    setLetterSpacing(0.02);
    setTextAlign('left');
    setTextTransform('none');
  };

  // Get active CSS font-family string
  const getFontFamilyString = () => {
    switch (fontFamily) {
      case 'sans': return 'var(--font-sans)';
      case 'serif': return "'Playfair Display', serif";
      case 'mono': return 'var(--font-mono)';
      case 'cursive': return "'Caveat', cursive";
      default: return 'var(--font-sans)';
    }
  };

  // Define software tooltip details
  const softwareInfo = {
    'Photoshop': { name: 'Adobe Photoshop', shortcut: 'Ps', color: '#31A8FF', desc: 'Compositing, raster editing, textures & creative grading.', experience: '95%' },
    'Illustrator': { name: 'Adobe Illustrator', shortcut: 'Ai', color: '#FF9A00', desc: 'Precise vector design, geometry, grid alignments & branding assets.', experience: '90%' },
    'Figma': { name: 'Figma Design', shortcut: 'Fg', color: '#0ACF83', desc: 'High-fidelity UI components, user testing & screen wireframes.', experience: '88%' },
    'Animate CC': { name: 'Adobe Animate', shortcut: 'An', color: '#EC4899', desc: 'Vector character reels, frame-by-frame onion skin animations.', experience: '80%' },
    'Adobe Premiere Pro': { name: 'Adobe Premiere Pro', shortcut: 'Pr', color: '#9999FF', desc: 'Narrative film cutting, pacing, multi-track audio & speed ramps.', experience: '92%' },
    'Adobe After Effects': { name: 'Adobe After Effects', shortcut: 'Ae', color: '#38BDF8', desc: 'Kinetic vector motion, particle simulations, camera solving & custom expressions.', experience: '85%' },
    'Autodesk Maya': { name: 'Autodesk Maya', shortcut: 'My', color: '#A855F7', desc: '3D polygonal meshes, coordinate texturing & keyframe kinematics (currently learning).', experience: 'Learning (42%)' }
  };

  // Render text with interactive keyword tooltips
  const renderInteractiveText = (text, pIndex) => {
    const keywords = [
      'Photoshop', 'Illustrator', 'Figma', 'Animate CC', 
      'Adobe Premiere Pro', 'Adobe After Effects', 'Autodesk Maya'
    ];

    let segments = [text];

    keywords.forEach(keyword => {
      let newSegments = [];
      segments.forEach(segment => {
        if (typeof segment !== 'string') {
          newSegments.push(segment);
          return;
        }

        const parts = segment.split(new RegExp(`(${keyword})`, 'g'));
        parts.forEach((part, idx) => {
          if (part === keyword) {
            newSegments.push(
              <span
                key={`${keyword}-${pIndex}-${idx}`}
                className="specimen-keyword-highlight"
                style={{ '--keyword-color': softwareInfo[keyword]?.color || 'var(--color-primary)' }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const container = document.getElementById('about');
                  const containerRect = container?.getBoundingClientRect();
                  setHoveredWord(keyword);
                  setTooltipPos({
                    x: rect.left - (containerRect?.left || 0) + (rect.width / 2),
                    y: rect.top - (containerRect?.top || 0) - 10
                  });
                }}
                onMouseLeave={() => setHoveredWord(null)}
              >
                {part}
              </span>
            );
          } else if (part !== '') {
            newSegments.push(part);
          }
        });
      });
      segments = newSegments;
    });

    return segments;
  };

  return (
    <section id="about" className="about-section specimen-page-root">
      {/* Background Kinetic Typography Grid */}
      <div className="specimen-backdrop-marquee" aria-hidden="true">
        <div className="marquee-line dir-left">
          <span>YASH SRIVASTAVA • GRAPHIC DESIGN • MOTION REELS • FRONTEND DEVELOPMENT • 3D EXPERIMENTS • </span>
          <span>YASH SRIVASTAVA • GRAPHIC DESIGN • MOTION REELS • FRONTEND DEVELOPMENT • 3D EXPERIMENTS • </span>
        </div>
        <div className="marquee-line dir-right">
          <span>CREATIVE ARTIST • PHOTOSHOP • ILLUSTRATOR • FIGMA • MAYA • AFTER EFFECTS • PREMIERE • </span>
          <span>CREATIVE ARTIST • PHOTOSHOP • ILLUSTRATOR • FIGMA • MAYA • AFTER EFFECTS • PREMIERE • </span>
        </div>
      </div>

      <div className="container specimen-layout-container">
        
        {/* TOP STATUS RIBBON */}
        <div className="specimen-ribbon">
          <div className="ribbon-block">
            <span className="ribbon-dot animate-pulse"></span>
            <span className="ribbon-label">SYS_STATUS: SPECIMEN_ACTIVE</span>
          </div>
          <div className="ribbon-block hide-mobile">
            <span className="ribbon-label font-mono">FILE: BIOGRAPHY.TXT</span>
          </div>
          <div className="ribbon-block">
            <span className="ribbon-label">VERSION: 2.0.TYPE</span>
          </div>
        </div>

        {/* MAIN EDITORIAL GRID */}
        <div className="specimen-grid">
          
          {/* COLUMN 1: POSTER HEADLINE */}
          <div className="specimen-left-col">
            <span className="specimen-index-num">// 02 PROFILE</span>
            
            <h2 className="specimen-main-title">
              DESIGNING<br />
              <span className="text-stroke">VISUAL</span><br />
              CHAOS.
            </h2>
            
            <div className="specimen-decorative-signature-box">
              <span className="signature-tag">Creative signature</span>
              <div className="signature-letters">
                Yash Srivastava
              </div>
            </div>

            {/* Live Stats Table */}
            <div className="specimen-stats-table">
              <div className="stat-row">
                <span className="stat-label">Words Count</span>
                <span className="stat-val">{wordCount}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Characters</span>
                <span className="stat-val">{charCount}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Readability</span>
                <span className="stat-val">{readabilityIndex}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Layout Mode</span>
                <span className="stat-val">3-Column Grid</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: THE TYPOGRAPHY INSPECTOR PANEL */}
          <div className="specimen-mid-col">
            <div className="inspector-panel brutal-card">
              <div className="inspector-header">
                <div className="inspector-title">
                  <Sliders size={14} className="icon-red" />
                  <span>SPECIMEN INSPECTOR v1.0</span>
                </div>
                <button 
                  className="inspector-reset-btn"
                  onClick={resetTypography}
                  title="Reset Specimen Settings"
                >
                  <RotateCcw size={12} />
                  <span>RESET</span>
                </button>
              </div>

              <div className="inspector-grid">
                
                {/* Font Selector Buttons */}
                <div className="inspector-group full-width">
                  <label className="inspector-label"><Type size={11} /> Font Family</label>
                  <div className="font-button-group">
                    <button 
                      className={`font-btn ${fontFamily === 'sans' ? 'active' : ''}`}
                      onClick={() => setFontFamily('sans')}
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Sans
                    </button>
                    <button 
                      className={`font-btn ${fontFamily === 'serif' ? 'active' : ''}`}
                      onClick={() => setFontFamily('serif')}
                      style={{ fontFamily: "'Playfair Display', serif", fontWeight: 'bold' }}
                    >
                      Serif
                    </button>
                    <button 
                      className={`font-btn ${fontFamily === 'mono' ? 'active' : ''}`}
                      onClick={() => setFontFamily('mono')}
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      Mono
                    </button>
                    <button 
                      className={`font-btn ${fontFamily === 'cursive' ? 'active' : ''}`}
                      onClick={() => setFontFamily('cursive')}
                      style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1rem' }}
                    >
                      Script
                    </button>
                  </div>
                </div>

                {/* Font Size Slider */}
                <div className="inspector-group">
                  <div className="slider-label-row">
                    <label className="inspector-label">Font Size</label>
                    <span className="slider-val">{fontSize.toFixed(2)}rem</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.90" 
                    max="1.70" 
                    step="0.05"
                    value={fontSize} 
                    onChange={(e) => setFontSize(parseFloat(e.target.value))}
                    className="inspector-slider"
                  />
                </div>

                {/* Font Weight Slider */}
                <div className="inspector-group">
                  <div className="slider-label-row">
                    <label className="inspector-label">Font Weight</label>
                    <span className="slider-val">{fontWeight}</span>
                  </div>
                  <input 
                    type="range" 
                    min="300" 
                    max="800" 
                    step="100"
                    value={fontWeight} 
                    onChange={(e) => setFontWeight(parseInt(e.target.value))}
                    className="inspector-slider"
                  />
                </div>

                {/* Line Height Slider */}
                <div className="inspector-group">
                  <div className="slider-label-row">
                    <label className="inspector-label">Leading (Height)</label>
                    <span className="slider-val">{lineHeight.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1.30" 
                    max="2.10" 
                    step="0.05"
                    value={lineHeight} 
                    onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                    className="inspector-slider"
                  />
                </div>

                {/* Letter Spacing Slider */}
                <div className="inspector-group">
                  <div className="slider-label-row">
                    <label className="inspector-label">Tracking (Spacing)</label>
                    <span className="slider-val">{letterSpacing.toFixed(2)}em</span>
                  </div>
                  <input 
                    type="range" 
                    min="-0.04" 
                    max="0.22" 
                    step="0.01"
                    value={letterSpacing} 
                    onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                    className="inspector-slider"
                  />
                </div>

                {/* Alignment Toggles */}
                <div className="inspector-group">
                  <label className="inspector-label">Alignment</label>
                  <div className="alignment-toggle-row">
                    {[
                      { val: 'left', icon: <AlignLeft size={13} /> },
                      { val: 'center', icon: <AlignCenter size={13} /> },
                      { val: 'right', icon: <AlignRight size={13} /> },
                      { val: 'justify', icon: <AlignJustify size={13} /> }
                    ].map(align => (
                      <button 
                        key={align.val}
                        className={`align-btn ${textAlign === align.val ? 'active' : ''}`}
                        onClick={() => setTextAlign(align.val)}
                        title={`Align ${align.val}`}
                      >
                        {align.icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transform Case Toggles */}
                <div className="inspector-group">
                  <label className="inspector-label">Text Case</label>
                  <div className="case-toggle-row">
                    <button 
                      className={`case-btn ${textTransform === 'none' ? 'active' : ''}`}
                      onClick={() => setTextTransform('none')}
                    >
                      Sentence
                    </button>
                    <button 
                      className={`case-btn ${textTransform === 'uppercase' ? 'active' : ''}`}
                      onClick={() => setTextTransform('uppercase')}
                    >
                      ALL CAPS
                    </button>
                  </div>
                </div>

              </div>

              {/* Dynamic CSS Readout */}
              <div className="inspector-css-readout">
                <div className="readout-header">
                  <Cpu size={11} className="icon-green" />
                  <span>CSS STYLESHEET EXPORT</span>
                </div>
                <code>
                  <span className="code-selector">.specimen-bio-paragraph</span> &#123;<br />
                  &nbsp;&nbsp;<span className="code-prop">font-family</span>: <span className="code-val">'{fontFamily === 'serif' ? 'Playfair Display' : fontFamily === 'cursive' ? 'Caveat' : fontFamily === 'mono' ? 'Space Mono' : 'Space Grotesk'}'</span>;<br />
                  &nbsp;&nbsp;<span className="code-prop">font-size</span>: <span className="code-val">{fontSize.toFixed(2)}rem</span>;<br />
                  &nbsp;&nbsp;<span className="code-prop">font-weight</span>: <span className="code-val">{fontWeight}</span>;<br />
                  &nbsp;&nbsp;<span className="code-prop">line-height</span>: <span className="code-val">{lineHeight.toFixed(2)}</span>;<br />
                  &nbsp;&nbsp;<span className="code-prop">letter-spacing</span>: <span className="code-val">{letterSpacing.toFixed(2)}em</span>;<br />
                  &nbsp;&nbsp;<span className="code-prop">text-align</span>: <span className="code-val">{textAlign}</span>;<br />
                  &nbsp;&nbsp;<span className="code-prop">text-transform</span>: <span className="code-val">{textTransform}</span>;<br />
                  &#125;
                </code>
              </div>
            </div>
          </div>

          {/* COLUMN 3: THE DYNAMIC BIOGRAPHY SPECIMEN SHEET */}
          <div className="specimen-right-col">
            <div className="specimen-sheet brutal-card">
              {/* Corner brackets */}
              <div className="sheet-bracket sheet-tl"></div>
              <div className="sheet-bracket sheet-tr"></div>
              <div className="sheet-bracket sheet-bl"></div>
              <div className="sheet-bracket sheet-br"></div>

              {/* Technical Grid Overlay */}
              <div className="sheet-blueprint-grid"></div>

              <div className="sheet-header">
                <span className="sheet-title-tag">SPECIMEN VIEWPORT // SCALE: 100%</span>
                <span className="sheet-dimensions-tag">1080px x 1920px</span>
              </div>

              {/* The Text Container */}
              <div 
                className="specimen-content-body"
                style={{
                  fontFamily: getFontFamilyString(),
                  fontSize: `${fontSize}rem`,
                  fontWeight: fontWeight,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}em`,
                  textAlign: textAlign,
                  textTransform: textTransform,
                  transition: 'font-size 0.15s ease, line-height 0.15s ease, letter-spacing 0.15s ease'
                }}
              >
                <p className="specimen-bio-para">
                  {renderInteractiveText("My name is Yash Srivastava, and I am a passionate Graphic Designer and creative artist skilled in Photoshop, Illustrator, Figma, and Animate CC. I have experience working on freelance projects, creating professional designs, branding materials, and digital content for clients. I also specialize in video editing and motion graphics using Adobe Premiere Pro and Adobe After Effects.", 1)}
                </p>
                <p className="specimen-bio-para">
                  {renderInteractiveText("In addition to graphic design, I have knowledge of web designing and web development, which helps me create modern and user-friendly digital experiences. Currently, I am learning 3D design and animation with Autodesk Maya to expand my creative skills further. I am passionate about learning new technologies, improving my creativity, and delivering high-quality visual work.", 2)}
                </p>
              </div>

              {/* Dynamic Interactive Software Tooltip HUD */}
              {hoveredWord && softwareInfo[hoveredWord] && (
                <div 
                  className="software-hud-tooltip"
                  style={{
                    position: 'absolute',
                    left: `${tooltipPos.x}px`,
                    top: `${tooltipPos.y}px`,
                    transform: 'translate(-50%, -100%)',
                    zIndex: 999
                  }}
                >
                  <div className="hud-tooltip-header" style={{ borderColor: softwareInfo[hoveredWord].color }}>
                    <div className="hud-tooltip-title">
                      <span 
                        className="hud-tooltip-badge"
                        style={{ backgroundColor: softwareInfo[hoveredWord].color }}
                      >
                        {softwareInfo[hoveredWord].shortcut}
                      </span>
                      <span>{softwareInfo[hoveredWord].name}</span>
                    </div>
                    <span className="hud-tooltip-status">VERIFIED</span>
                  </div>
                  <div className="hud-tooltip-body">
                    <p>{softwareInfo[hoveredWord].desc}</p>
                    <div className="hud-tooltip-level-row">
                      <span>INTEGRATION COEF:</span>
                      <span style={{ color: softwareInfo[hoveredWord].color }}>{softwareInfo[hoveredWord].experience}</span>
                    </div>
                  </div>
                  <div className="hud-tooltip-footer">
                    <span>SYS.REPORT // OK</span>
                    <ArrowUpRight size={10} />
                  </div>
                </div>
              )}

              {/* Specimen sheet footer indicators */}
              <div className="sheet-footer">
                <div className="sheet-indicators">
                  <span className="footer-spec-item">
                    <span className="spec-indicator-dot"></span>
                    <span>BODY TEXT STABLE</span>
                  </span>
                  <span className="footer-spec-item hide-mobile">
                    <span>KERNING: AUTO</span>
                  </span>
                </div>
                <div className="sheet-instructions font-mono">
                  <span>* Hover highlighted software tags for diagnostics</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
