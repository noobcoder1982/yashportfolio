import React, { useState, useRef } from 'react';
import { Sliders, Cpu, Zap, Activity, Shield, Clock, Package } from 'lucide-react';

/* ── SVG Logo Components — brand accurate ── */
function LogoPremierePro({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#2B1B58"/>
      {/* Pr lettermark — Adobe style */}
      <text x="50" y="67" textAnchor="middle" fontFamily="'Arial Black', 'Arial', sans-serif" fontSize="46" fontWeight="900" fill="#9999FF" letterSpacing="-3">Pr</text>
    </svg>
  );
}

function LogoAfterEffects({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#0D0045"/>
      <text x="50" y="67" textAnchor="middle" fontFamily="'Arial Black', 'Arial', sans-serif" fontSize="46" fontWeight="900" fill="#9999FF" letterSpacing="-3">Ae</text>
    </svg>
  );
}

function LogoPhotoshop({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#001424"/>
      <text x="50" y="67" textAnchor="middle" fontFamily="'Arial Black', 'Arial', sans-serif" fontSize="46" fontWeight="900" fill="#31A8FF" letterSpacing="-3">Ps</text>
    </svg>
  );
}

function LogoIllustrator({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#2E0E00"/>
      <text x="50" y="67" textAnchor="middle" fontFamily="'Arial Black', 'Arial', sans-serif" fontSize="46" fontWeight="900" fill="#FF9A00" letterSpacing="-3">Ai</text>
    </svg>
  );
}

function LogoFigma({ size = 52 }) {
  // Accurate Figma F-shape: two stacked rounded rects left + circle right
  const s = size;
  const u = s / 100;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#1A1A1A"/>
      {/* Bottom-left: green */}
      <rect x="26" y="62" width="22" height="22" rx="11" fill="#0ACF83"/>
      {/* Middle-left: purple */}
      <rect x="26" y="40" width="22" height="22" rx="0" fill="#A259FF"/>
      {/* Top-left: red */}
      <rect x="26" y="18" width="22" height="22" rx="11" fill="#F24E1E"/>
      {/* Top-right: orange */}
      <rect x="48" y="18" width="22" height="22" rx="11" fill="#FF7262"/>
      {/* Center-right: blue circle */}
      <circle cx="59" cy="51" r="11" fill="#1ABCFE"/>
    </svg>
  );
}

function LogoAnimate({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#1C0012"/>
      <text x="50" y="67" textAnchor="middle" fontFamily="'Arial Black', 'Arial', sans-serif" fontSize="46" fontWeight="900" fill="#EC4899" letterSpacing="-3">An</text>
    </svg>
  );
}

function LogoMaya({ size = 52 }) {
  // Autodesk Maya — teal/blue brand color, M lettermark
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#0D2233"/>
      {/* Maya M mark — two triangles forming an M */}
      <path d="M18 76 L18 34 L50 60 L82 34 L82 76" stroke="#00B4D8" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

const TOOL_LOGOS = {
  'Adobe Premiere Pro':  LogoPremierePro,
  'Adobe After Effects': LogoAfterEffects,
  'Adobe Photoshop':     LogoPhotoshop,
  'Adobe Illustrator':   LogoIllustrator,
  'Figma':               LogoFigma,
  'Adobe Animate':       LogoAnimate,
  'Autodesk Maya':       LogoMaya,
};

const tools = [
  { name: 'Adobe Premiere Pro', short: 'Pr', color: '#9999FF', level: 92, category: 'MOTION DESIGN', size: 'large' },
  { name: 'Adobe After Effects', short: 'Ae', color: '#38BDF8', level: 85, category: 'MOTION DESIGN', size: 'tall' },
  { name: 'Adobe Photoshop', short: 'Ps', color: '#31A8FF', level: 95, category: 'VISUAL DESIGN', size: 'small' },
  { name: 'Adobe Illustrator', short: 'Ai', color: '#FF9A00', level: 90, category: 'VISUAL DESIGN', size: 'small' },
  { name: 'Figma', short: 'Fig', color: '#0ACF83', level: 88, category: 'UI/UX DESIGN', size: 'wide' },
  { name: 'Adobe Animate', short: 'An', color: '#EC4899', level: 80, category: '2D ARTWORK', size: 'small' },
  { name: 'Autodesk Maya', short: 'Ma', color: '#A855F7', level: 42, category: '3D MODELING', size: 'small' },
];

const toolDetails = {
  'Adobe Premiere Pro': {
    desc: 'Orchestrates complex narrative cuts, pace-matching, and multichannel audio mixdowns. Specialized in logarithmic color calibration and dynamic speed ramp curves.',
    capabilities: ['Dynamic Narrative Cuts', 'SMPTE Sync Alignment', 'Rec.709 Color Calibration', 'Advanced Audio Mastering'],
    status: 'COMPILE_SUCCESS',
    latency: '0.04s',
    env: 'production',
    bundleSize: '1.2 MB',
    uptime: '99.8%',
  },
  'Adobe After Effects': {
    desc: 'Brings vector layouts and typographic matrices to life. Specialized in kinetic animations, realistic particle physics solvers, custom expressions, and parallax multi-cam staging.',
    capabilities: ['3D Camera Vector Solvers', 'Kinetic Typography Layouts', 'Expression-based Vector Rigs', 'Multi-layer VFX Composites'],
    status: 'COMPILE_SUCCESS',
    latency: '0.12s',
    env: 'production',
    bundleSize: '3.4 MB',
    uptime: '97.2%',
  },
  'Adobe Photoshop': {
    desc: 'Constructs complex raster graphics, creative photo composites, high-end visual brand assets, and dark-room digital adjustments. Expert in blend modes and typographic layouts.',
    capabilities: ['Advanced Photo Composites', 'Organic Texture Blending', 'Tone Curve Tuning & Grading', 'Studio Layout Architecture'],
    status: 'ACTIVE_SHADERS',
    latency: '0.01s',
    env: 'production',
    bundleSize: '4.8 MB',
    uptime: '99.9%',
  },
  'Adobe Illustrator': {
    desc: 'Drafts infinitely scalable vector icons, primary brand marks, visual identity grids, editorial typography, and high-impact illustrations with precision geometry.',
    capabilities: ['Scalable Brand Mark Grids', 'Systematic Visual Identities', 'Bespoke Icon Typography', 'High-Contrast Vector Assets'],
    status: 'MATH_MATRIX_READY',
    latency: '0.02s',
    env: 'stable',
    bundleSize: '0.8 MB',
    uptime: '99.5%',
  },
  'Figma': {
    desc: 'Develops interactive high-fidelity user prototypes, structured wireframes, component design systems, and responsive layouts with absolute grid discipline.',
    capabilities: ['Component Architecture', 'UI Grid Layout Design', 'Micro-Interaction Prototypes', 'Token Variables & Styles'],
    status: 'UI_STACK_CONVERGED',
    latency: '0.05s',
    env: 'production',
    bundleSize: '1.8 MB',
    uptime: '98.6%',
  },
  'Adobe Animate': {
    desc: 'Crafts hand-drawn and vector-based 2D frame reels, frame-by-frame character loops, active morph cuts, and vintage aesthetic animations mimicking physical cartoon cells.',
    capabilities: ['Hand-Drawn Onion Skinning', 'Smooth Vector Tweening', 'Retro VHS Anim Reels', 'Frame-by-Frame Key Cycles'],
    status: 'CELL_MATRIX_STABLE',
    latency: '0.08s',
    env: 'stable',
    bundleSize: '2.2 MB',
    uptime: '96.4%',
  },
  'Autodesk Maya': {
    desc: 'An expanding creative space. Actively learning the pipelines of 3D polygonal construction, coordinate mapping, surface texturing, skeletal rigging, and orbiting camera controls.',
    capabilities: ['Polygonal Mesh Drafting', 'Procedural Texture Mapping', '3D Scene Orbit Controls', 'Introductory Rigging'],
    status: 'COMPILING_INDEX (42%)',
    latency: '0.84s',
    env: 'development',
    bundleSize: '14.2 MB',
    uptime: '72.1%',
  },
};

const skillCategories = [
  {
    id: '01',
    tag: 'DESIGN',
    title: 'Visual Identity & Design',
    skills: ['Graphic Layout Designing', 'Branding & Visual Archetypes', 'Social Media Assets', 'Interactive Figma Mockups'],
  },
  {
    id: '02',
    tag: 'ARTWORK',
    title: 'Illustration & Composites',
    skills: ['Photo Editing & Compositing', 'Scalable Vector Illustration', 'Traditional 2D Animations'],
  },
  {
    id: '03',
    tag: 'MOTION',
    title: 'Video & Motion Graphics',
    skills: ['Narrative Video Cuts', 'Kinetic Typography Motion', 'VFX Camera Solvers & Composites'],
  },
  {
    id: '04',
    tag: 'TECH',
    title: 'Web Design & 3D Assets',
    skills: ['Responsive Web Layouts', 'Polygonal 3D Mesh Assemblies', 'Studio Production Mechanics'],
  },
];

// Circular proficiency ring component
function ProficiencyRing({ level, color, size = 44 }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;
  return (
    <svg width={size} height={size} className="bento-ring-svg">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)', filter: `drop-shadow(0 0 4px ${color}88)` }}
      />
      <text x={size / 2} y={size / 2 + 4} textAnchor="middle" fill={color} fontSize="9" fontFamily="'Space Mono', monospace" fontWeight="700">
        {level}%
      </text>
    </svg>
  );
}

export default function Skills() {
  const [selectedToolName, setSelectedToolName] = useState('Adobe Premiere Pro');
  const [animating, setAnimating] = useState(false);
  const [displayedTool, setDisplayedTool] = useState('Adobe Premiere Pro');
  const [scanline, setScanline] = useState(false);
  const panelRef = useRef(null);

  const activeTool = tools.find(t => t.name === selectedToolName) || tools[0];
  const activeDetails = toolDetails[selectedToolName] || toolDetails[tools[0].name];
  const displayDetails = toolDetails[displayedTool] || toolDetails[tools[0].name];
  const displayTool = tools.find(t => t.name === displayedTool) || tools[0];

  function handleSelect(name) {
    if (name === selectedToolName) return;
    setAnimating(true);
    setScanline(true);
    setTimeout(() => {
      setDisplayedTool(name);
      setSelectedToolName(name);
      setAnimating(false);
    }, 280);
    setTimeout(() => setScanline(false), 700);
  }

  return (
    <section id="skills" className="skills-section">
      <div className="container">

        {/* ── MOBILE SKILLS LAYOUT ── */}
        <div className="skills-mobile-layout">
          <div className="skills-mobile-tag"><Sliders size={11} /> ABILITIES MATRIX</div>
          <h2 className="skills-mobile-title">THE PRODUCTION<br /><span className="skills-mobile-title-accent">SUITE.</span></h2>
          <div className="skills-mobile-tools">
            {tools.map((tool) => (
              <div key={tool.name} className="smt-row">
                <div className="smt-info">
                  <span className="smt-short" style={{ color: tool.color }}>{tool.short}</span>
                  <span className="smt-name">{tool.name.replace('Adobe ', '')}</span>
                  <span className="smt-pct">{tool.level}%</span>
                </div>
                <div className="smt-track">
                  <div className="smt-fill" style={{ width: `${tool.level}%`, background: tool.color }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="skills-mobile-caps">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="smc-card">
                <div className="smc-header">
                  <span className="smc-num">{cat.id}</span>
                  <span className="smc-tag">{cat.tag}</span>
                </div>
                <h4 className="smc-title">{cat.title}</h4>
                <ul className="smc-list">
                  {cat.skills.map((s, i) => (
                    <li key={i}><span className="smc-bullet">▪</span>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP SKILLS LAYOUT ── */}
        <div className="skills-desktop-layout">

          {/* Header */}
          <div className="editorial-header">
            <div className="editorial-meta">
              <span className="meta-tag"><Sliders size={12} /> ABILITIES MATRIX</span>
              <span className="meta-divider"></span>
              <span className="meta-tag"><Cpu size={12} /> SYSTEM SPECIFICATION REPORT</span>
            </div>
            <div className="editorial-main-grid">
              <h2 className="editorial-title">THE PRODUCTION SUITE</h2>
              <div className="editorial-desc-box">
                <p>Yash operates a dual-engine production suite spanning motion, visual, and interface design. Select a software module to load its diagnostic readout.</p>
              </div>
            </div>
          </div>

          {/* ── BENTO + HUD GRID ── */}
          <div className="bento-hud-grid">

            {/* LEFT: Bento box software grid */}
            <div className="bento-software-grid">

              {/* Tile: Premiere Pro — large */}
              <BentoTile tool={tools[0]} isActive={selectedToolName === tools[0].name} onClick={() => handleSelect(tools[0].name)} className="bento-tile-large" />

              {/* Tile: After Effects — tall */}
              <BentoTile tool={tools[1]} isActive={selectedToolName === tools[1].name} onClick={() => handleSelect(tools[1].name)} className="bento-tile-tall" />

              {/* Tiles: Photoshop + Illustrator — small */}
              <BentoTile tool={tools[2]} isActive={selectedToolName === tools[2].name} onClick={() => handleSelect(tools[2].name)} className="bento-tile-small" />
              <BentoTile tool={tools[3]} isActive={selectedToolName === tools[3].name} onClick={() => handleSelect(tools[3].name)} className="bento-tile-small" />

              {/* Tile: Figma — wide */}
              <BentoTile tool={tools[4]} isActive={selectedToolName === tools[4].name} onClick={() => handleSelect(tools[4].name)} className="bento-tile-wide" />

              {/* Tiles: Animate + Maya — small */}
              <BentoTile tool={tools[5]} isActive={selectedToolName === tools[5].name} onClick={() => handleSelect(tools[5].name)} className="bento-tile-small" />
              <BentoTile tool={tools[6]} isActive={selectedToolName === tools[6].name} onClick={() => handleSelect(tools[6].name)} className="bento-tile-full bento-tile-maya" />

            </div>

            {/* RIGHT: Futuristic HUD Panel */}
            <div
              ref={panelRef}
              className={`hud-panel ${animating ? 'hud-panel-switching' : ''}`}
              style={{ '--hud-color': displayTool.color }}
            >
              {/* Scanline overlay */}
              {scanline && <div className="hud-scanline-sweep" />}

              {/* Corner brackets */}
              <div className="hud-corner hud-tl" />
              <div className="hud-corner hud-tr" />
              <div className="hud-corner hud-bl" />
              <div className="hud-corner hud-br" />

              {/* Top status bar */}
              <div className="hud-topbar">
                <div className="hud-topbar-left">
                  <span className="hud-led" style={{ background: displayTool.color, boxShadow: `0 0 8px ${displayTool.color}` }} />
                  <span className="hud-label">SYS.DIAGNOSTIC</span>
                  <span className="hud-divider">|</span>
                  <span className="hud-label" style={{ color: displayTool.color }}>{displayDetails.status}</span>
                </div>
                <div className="hud-topbar-right">
                  <span className="hud-label">ENV: <span style={{ color: displayDetails.env === 'production' ? '#00e676' : displayDetails.env === 'stable' ? '#38BDF8' : '#FF9A00' }}>{displayDetails.env.toUpperCase()}</span></span>
                </div>
              </div>

              {/* Software identity block */}
              <div className="hud-identity">
                <div className="hud-short-badge" style={{ color: displayTool.color, borderColor: `${displayTool.color}44`, boxShadow: `0 0 20px ${displayTool.color}22, inset 0 0 20px ${displayTool.color}08` }}>
                  {displayTool.short}
                </div>
                <div className="hud-identity-text">
                  <h3 className="hud-tool-name">{displayTool.name}</h3>
                  <span className="hud-tool-cat" style={{ color: displayTool.color }}>{displayTool.category}</span>
                </div>
                <div className="hud-proficiency-ring">
                  <ProficiencyRing level={displayTool.level} color={displayTool.color} size={64} />
                </div>
              </div>

              {/* Horizontal rule */}
              <div className="hud-rule" style={{ background: `linear-gradient(90deg, ${displayTool.color}44, transparent)` }} />

              {/* Description */}
              <p className="hud-desc">{displayDetails.desc}</p>

              {/* Capabilities grid */}
              <div className="hud-caps-label">VERIFIED CAPABILITIES</div>
              <div className="hud-caps-grid">
                {displayDetails.capabilities.map((cap, i) => (
                  <div key={i} className="hud-cap-item" style={{ borderColor: `${displayTool.color}33` }}>
                    <Zap size={10} style={{ color: displayTool.color, flexShrink: 0 }} />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              {/* Metrics row */}
              <div className="hud-metrics-row">
                <div className="hud-metric">
                  <Activity size={12} className="hud-metric-icon" style={{ color: displayTool.color }} />
                  <span className="hud-metric-lbl">LATENCY</span>
                  <span className="hud-metric-val">{displayDetails.latency}</span>
                </div>
                <div className="hud-metric">
                  <Package size={12} className="hud-metric-icon" style={{ color: displayTool.color }} />
                  <span className="hud-metric-lbl">BUNDLE</span>
                  <span className="hud-metric-val">{displayDetails.bundleSize}</span>
                </div>
                <div className="hud-metric">
                  <Shield size={12} className="hud-metric-icon" style={{ color: displayTool.color }} />
                  <span className="hud-metric-lbl">UPTIME</span>
                  <span className="hud-metric-val" style={{ color: displayTool.level > 80 ? '#00e676' : displayTool.level > 50 ? '#FF9A00' : '#FF5F56' }}>{displayDetails.uptime}</span>
                </div>
                <div className="hud-metric">
                  <Clock size={12} className="hud-metric-icon" style={{ color: displayTool.color }} />
                  <span className="hud-metric-lbl">PROFICIENCY</span>
                  <span className="hud-metric-val">{displayTool.level}%</span>
                </div>
              </div>

              {/* Bottom progress bar */}
              <div className="hud-progress-wrap">
                <div className="hud-progress-label">
                  <span>INTEGRATION LEVEL</span>
                  <span style={{ color: displayTool.color }}>{displayTool.level}%</span>
                </div>
                <div className="hud-progress-track">
                  <div
                    className="hud-progress-fill"
                    style={{
                      width: `${displayTool.level}%`,
                      background: `linear-gradient(90deg, ${displayTool.color}88, ${displayTool.color})`,
                      boxShadow: `0 0 10px ${displayTool.color}66`,
                    }}
                  />
                  {/* Tick marks */}
                  {[25, 50, 75].map(tick => (
                    <div key={tick} className="hud-progress-tick" style={{ left: `${tick}%` }} />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom capabilities grid */}
          <div className="skills-capabilities-grid">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="capability-editorial-card">
                <div className="cap-card-header">
                  <span className="cap-card-num">{cat.id}</span>
                  <span className="cap-card-tag">{cat.tag}</span>
                </div>
                <h4 className="cap-card-title">{cat.title}</h4>
                <div className="cap-card-divider"></div>
                <ul className="cap-card-list">
                  {cat.skills.map((skill, i) => (
                    <li key={i} className="cap-card-item">
                      <span className="cap-bullet-char">▪</span>
                      <span className="cap-item-text">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>{/* end skills-desktop-layout */}
      </div>
    </section>
  );
}

function BentoTile({ tool, isActive, onClick, className }) {
  const Logo = TOOL_LOGOS[tool.name];
  return (
    <button
      className={`bento-tile ${className} ${isActive ? 'bento-tile-active' : ''}`}
      onClick={onClick}
      style={{ '--tile-color': tool.color }}
    >
      {/* Active indicator glow layer */}
      {isActive && <div className="bento-tile-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${tool.color}18, transparent 70%)` }} />}

      {/* Corner marker */}
      <div className="bento-tile-corner" />

      {/* Logo */}
      <div className={`bento-tile-logo ${isActive ? 'bento-tile-logo-active' : ''}`}>
        <Logo size={44} />
      </div>

      {/* Name + category */}
      <div className="bento-tile-info">
        <span className="bento-tile-name">{tool.name.replace('Adobe ', '')}</span>
        <span className="bento-tile-cat">{tool.category}</span>
      </div>

      {/* Proficiency ring */}
      <div className="bento-tile-ring">
        <ProficiencyRing level={tool.level} color={isActive ? tool.color : 'rgba(255,255,255,0.2)'} size={42} />
      </div>

      {/* Active border glow */}
      {isActive && (
        <div className="bento-tile-active-border" style={{ boxShadow: `inset 0 0 0 1.5px ${tool.color}`, borderRadius: 'inherit' }} />
      )}
    </button>
  );
}
