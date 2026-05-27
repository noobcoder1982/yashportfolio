import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Activity, Cpu } from 'lucide-react';

const tools = [
  { name: 'Adobe Premiere Pro', short: 'Pr', color: '#9999FF', level: 92, bentoClass: 'bento-wide-pr', summary: 'Cinematic editing, audio & speed pacing' },
  { name: 'Adobe After Effects', short: 'Ae', color: '#9999FF', level: 85, bentoClass: 'bento-tall-ae', summary: 'Motion tracking, kinetics, VFX & fluid keyframes' },
  { name: 'Adobe Photoshop', short: 'Ps', color: '#31A8FF', level: 95, bentoClass: 'bento-square-ps', summary: 'Digital composites & design' },
  { name: 'Adobe Illustrator', short: 'Ai', color: '#FF9A00', level: 90, bentoClass: 'bento-square-ai', summary: 'Vector marks & branding grids' },
  { name: 'Figma', short: 'Fig', color: '#F24E1E', level: 88, bentoClass: 'bento-wide-fig', summary: 'High-fidelity UI prototypes & vector tokens' },
  { name: 'Adobe Animate', short: 'An', color: '#FF0F7B', level: 80, bentoClass: 'bento-square-an', summary: '2D hand-drawn retro frame reels' },
  { name: 'Autodesk Maya', short: 'Ma', color: '#1CAAD9', level: 42, bentoClass: 'bento-full-ma', summary: '3D polygonal mesh crafting, rigging & coordinate mapping' },
];

const toolDetails = {
  'Adobe Premiere Pro': {
    desc: 'Yash orchestrates complex narrative cuts, pacing, and audio mixes inside Premiere. Specializes in cinematic pace-matching, multi-cam broadcast setups, and precision audio mixdowns.',
    capabilities: ['Dynamic Narrative Cuts', 'SMPTE Sync', 'Rec.709 Calibration', 'Gain Trim'],
    status: 'TIMELINE EXPORT READY',
    codec: 'Apple ProRes 422 HQ',
    bitrate: '220 Mbps'
  },
  'Adobe After Effects': {
    desc: 'The playground for dynamic keyframes and motion tracking. Yash brings visual identities to life through fluid typography, parallax vector layers, and realistic particle FX.',
    capabilities: ['3D Tracking & solve', 'Kinetic Typography', 'Vector Rigging', 'Compositing'],
    status: 'RENDER ENGINE: ACTIVE',
    codec: 'ProRes 4444 (Alpha)',
    bitrate: '330 Mbps'
  },
  'Adobe Photoshop': {
    desc: 'Used for composite artwork, raw photo manipulations, and creative visual assets. Yash constructs complex graphic textures, brand guidelines, and high-impact layouts.',
    capabilities: ['Photo Composite', 'Texture Blends', 'Tone Curve Tune', 'Layout Master'],
    status: 'SHADER PASS: COMPILED',
    codec: '16-Bit RAW (Rec.2020)',
    bitrate: 'Lossless TIFF'
  },
  'Adobe Illustrator': {
    desc: 'The vector design workspace. Yash drafts vector logos, custom branding grids, editorial typography layout, and high-impact vector artwork.',
    capabilities: ['Brand Mark Grid', 'Visual Identity', 'Icon Typography', 'Brutalist Color'],
    status: 'VECTOR MATRIX: COMPILED',
    codec: 'SVG / Scalable Paths',
    bitrate: 'Infinity SVG'
  },
  'Figma': {
    desc: 'The digital blueprint canvas. Yash crafts responsive web prototypes, user interfaces, wireframes, and design systems with absolute component precision.',
    capabilities: ['Component Blueprint', 'UI Layout Design', 'Micro Prototype', 'Token Variables'],
    status: 'UI PROTOTYPE: READY',
    codec: 'Figma Design',
    bitrate: 'HTML5 Ready'
  },
  'Adobe Animate': {
    desc: 'Used for hand-crafted 2D vector animations, flash frames, character cycles, and retro VHS style cartoons.',
    capabilities: ['Hand-drawn Frame', 'Morph Animation', 'VHS Cartoon Reel', 'Canvas Cuts'],
    status: 'TIMELINE: MATCHED',
    codec: 'H.264 WebM Composite',
    bitrate: '45 Mbps'
  },
  'Autodesk Maya': {
    desc: 'An emerging workspace for Yash. Actively learning 3D modeling, texturing, camera movement, and polygonal mesh creations to expand into 3D design.',
    capabilities: ['Polygonal Drafting', 'Texture Mapping', '3D Orbit Control', 'Mesh Deform'],
    status: 'LEARNING (42%)',
    codec: 'Maya 3D Object',
    bitrate: 'Polygonal Mesh'
  }
};

const renderOriginalLogo = (toolName) => {
  switch (toolName) {
    case 'Adobe Premiere Pro':
      return (
        <svg viewBox="0 0 256 256" className="original-logo-svg">
          <rect width="256" height="256" rx="48" fill="#14011d" />
          <rect x="5" y="5" width="246" height="246" rx="43" fill="none" stroke="#9999FF" strokeWidth="10" />
          <text x="50%" y="56%" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="105" fill="#9999FF" textAnchor="middle" dominantBaseline="middle">Pr</text>
        </svg>
      );
    case 'Adobe After Effects':
      return (
        <svg viewBox="0 0 256 256" className="original-logo-svg">
          <rect width="256" height="256" rx="48" fill="#13001f" />
          <rect x="5" y="5" width="246" height="246" rx="43" fill="none" stroke="#D196FF" strokeWidth="10" />
          <text x="50%" y="56%" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="105" fill="#D196FF" textAnchor="middle" dominantBaseline="middle">Ae</text>
        </svg>
      );
    case 'Adobe Photoshop':
      return (
        <svg viewBox="0 0 256 256" className="original-logo-svg">
          <rect width="256" height="256" rx="48" fill="#001c33" />
          <rect x="5" y="5" width="246" height="246" rx="43" fill="none" stroke="#31A8FF" strokeWidth="10" />
          <text x="50%" y="56%" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="105" fill="#31A8FF" textAnchor="middle" dominantBaseline="middle">Ps</text>
        </svg>
      );
    case 'Adobe Illustrator':
      return (
        <svg viewBox="0 0 256 256" className="original-logo-svg">
          <rect width="256" height="256" rx="48" fill="#261300" />
          <rect x="5" y="5" width="246" height="246" rx="43" fill="none" stroke="#FF9A00" strokeWidth="10" />
          <text x="50%" y="56%" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="105" fill="#FF9A00" textAnchor="middle" dominantBaseline="middle">Ai</text>
        </svg>
      );
    case 'Figma':
      return (
        <svg viewBox="0 0 256 256" className="original-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded black square backdrop */}
          <rect width="256" height="256" rx="56" fill="#000000" />
          
          {/* Top Left: Red-Orange semi-circle (flat on right) */}
          <path d="M78 78c0-13.807 11.193-25 25-25h25v50h-25c-13.807 0-25-11.193-25-25z" fill="#F24E1E"/>
          
          {/* Top Right: Light red/coral semi-circle (flat on left) */}
          <path d="M128 53h25c13.807 0 25 11.193 25 25s-11.193 25-25 25h-25V53z" fill="#FF7262"/>
          
          {/* Middle Left: Purple semi-circle (flat on right) */}
          <path d="M78 128c0-13.807 11.193-25 25-25h25v50h-25c-13.807 0-25-11.193-25-25z" fill="#A259FF"/>
          
          {/* Middle Right: Green full circle */}
          <circle cx="153" cy="128" r="25" fill="#0ACF83"/>
          
          {/* Bottom Left: Cyan teardrop (flat on top-right, rounded other corners) */}
          <path d="M78 178c0-13.807 11.193-25 25-25h25v25c0 13.807-11.193 25-25 25s-25-11.193-25-25z" fill="#1ABCFE"/>
        </svg>
      );
    case 'Adobe Animate':
      return (
        <svg viewBox="0 0 256 256" className="original-logo-svg">
          <rect width="256" height="256" rx="48" fill="#2d0012" />
          <rect x="5" y="5" width="246" height="246" rx="43" fill="none" stroke="#FF0F7B" strokeWidth="10" />
          <text x="50%" y="56%" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="105" fill="#FF0F7B" textAnchor="middle" dominantBaseline="middle">An</text>
        </svg>
      );
    case 'Autodesk Maya':
      return (
        <svg viewBox="0 0 256 256" className="original-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="256" height="256" rx="48" fill="#071b26" />
          <path d="M128 44 L204 88 L204 168 L128 212 L52 168 L52 88 Z" fill="#008099" />
          <path d="M128 44 L204 88 L128 132 L52 88 Z" fill="#00d5ff" />
          <path d="M128 132 L204 88 L204 168 L128 212 Z" fill="#00acc2" />
          <path d="M85 105 L108 105 L128 138 L148 105 L171 105 L171 176 L151 176 L151 135 L128 168 L105 135 L105 176 L85 176 Z" fill="#ffffff" />
        </svg>
      );
    default:
      return null;
  }
};

const skillCategories = [
  {
    id: '01',
    tag: 'DESIGN',
    title: 'Visual Identity & Design',
    skills: [
      'Graphic Designing',
      'Branding & Visual Design',
      'Social Media Post Design',
      'UI/UX Design with Figma',
    ],
  },
  {
    id: '02',
    tag: 'ARTWORK',
    title: 'Illustration & Editing',
    skills: [
      'Photo Editing & Manipulation',
      'Vector Illustration',
      '2D Animation',
    ],
  },
  {
    id: '03',
    tag: 'MOTION',
    title: 'Video & Motion Graphics',
    skills: [
      'Video Editing with Premiere',
      'Motion with After Effects',
    ],
  },
  {
    id: '04',
    tag: 'TECH',
    title: 'Web & 3D Modeling',
    skills: [
      'Web Design & HTML/CSS',
      '3D Modeling (Learning)',
      'Freelance Management',
    ],
  },
];

export default function Skills() {
  const [selectedToolName, setSelectedToolName] = useState('Adobe Premiere Pro');
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' or 'disciplines'
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  const activeTool = tools.find(t => t.name === selectedToolName) || tools[0];
  const activeDetails = toolDetails[selectedToolName] || toolDetails[tools[0].name];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    setCoords({ x, y });
  };

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">

        {/* ── SECTION HEADER ── */}
        <div className="section-header skills-header-compact">
          <span className="section-tag">ABILITIES MATRIX</span>
          <h2 className="section-title">Creative Toolkit</h2>
          <p className="section-desc">
            Yash controls a dual-engine production suite: high-precision graphic layouts and multi-track motion timelines. Audit capabilities using the interactive console below.
          </p>
        </div>

        {/* ── UNIFIED SINGLE-SCREEN CONSOLE ── */}
        <div className="skills-dashboard-grid">

          {/* LEFT: Tools Inlet Patchbay */}
          <div className="skills-tools-bay">
            <div className="skills-bay-header">
              <Sliders size={12} className="bay-icon color-primary" />
              <span>SOURCE TOOL INLET // BENTO BOARD</span>
            </div>

            {/* Swiss-Minimalist Bento Grid Tools Stack */}
            <div className="skills-tools-bento-grid">
              {tools.map((tool) => {
                const isActive = tool.name === selectedToolName;
                const isSquare = tool.bentoClass.includes('square');
                const isTall = tool.bentoClass.includes('tall');
                const isFull = tool.bentoClass.includes('full');

                return (
                  <button
                    key={tool.name}
                    className={`bento-tool-card ${tool.bentoClass} ${isActive ? 'active-bento' : ''}`}
                    onClick={() => {
                      setSelectedToolName(tool.name);
                      setActiveTab('preview');
                    }}
                    style={{
                      '--active-color': tool.color,
                    }}
                  >
                    {/* Inner wrapper to support physical tactile borders */}
                    <div className="bento-card-inner">
                      {isSquare ? (
                        /* 1x1 Square layout */
                        <div className="bento-square-content">
                          <div className="inlet-avatar bento-avatar-sm">
                            {renderOriginalLogo(tool.name)}
                          </div>
                          <div className="bento-name-group" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span className="bento-name-sm" style={{ margin: 0 }}>{tool.name.replace('Adobe ', '')}</span>
                            <span className="bento-summary-sm">{tool.summary}</span>
                          </div>
                          <div className="bento-footer-sm">
                            <span className="bento-level-sm">{tool.level}%</span>
                            <div className="inlet-led" style={{ background: isActive ? tool.color : 'rgba(0,0,0,0.1)' }}></div>
                          </div>
                        </div>
                      ) : isTall ? (
                        /* 1x2 Tall layout */
                        <div className="bento-tall-content">
                          <div className="bento-top-tall" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="inlet-avatar bento-avatar-md">
                              {renderOriginalLogo(tool.name)}
                            </div>
                            <h3 className="bento-name-lg" style={{ marginTop: '10px', marginBottom: '4px' }}>{tool.name.replace('Adobe ', '')}</h3>
                            <p className="bento-summary-tall">{tool.summary}</p>
                          </div>
                          <div className="bento-footer-lg">
                            <span className="bento-level-lg">{tool.level}% SCALE</span>
                            <div className="inlet-led" style={{ background: isActive ? tool.color : 'rgba(0,0,0,0.1)' }}></div>
                          </div>
                        </div>
                      ) : isFull ? (
                        /* 3x1 Full Width layout (Autodesk Maya) */
                        <div className="bento-full-content">
                          <div className="bento-left-group">
                            <div className="inlet-avatar bento-avatar-md">
                              {renderOriginalLogo(tool.name)}
                            </div>
                            <div className="bento-name-group">
                              <span className="bento-name-lg">{tool.name}</span>
                              <span className="bento-summary-full">{tool.summary}</span>
                            </div>
                          </div>
                          <div className="bento-right-group">
                            <span className="bento-level-lg">EXP: {tool.level}%</span>
                            <div className="inlet-led" style={{ background: isActive ? tool.color : 'rgba(0,0,0,0.1)' }}></div>
                          </div>
                        </div>
                      ) : (
                        /* 2x1 Wide layout (Premiere Pro, Figma) */
                        <div className="bento-wide-content">
                          <div className="bento-left-group">
                            <div className="inlet-avatar bento-avatar-md">
                              {renderOriginalLogo(tool.name)}
                            </div>
                            <div className="bento-name-group">
                              <span className="bento-name-lg">{tool.name}</span>
                              <span className="bento-summary-wide">{tool.summary}</span>
                            </div>
                          </div>
                          <div className="bento-right-group">
                            <span className="bento-level-lg">{tool.level}%</span>
                            <div className="inlet-led" style={{ background: isActive ? tool.color : 'rgba(0,0,0,0.1)' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Live Spaceship Tactical Monitor Screen */}
          <div 
            className="skills-preview-monitor spaceship-terminal"
            onMouseMove={handleMouseMove}
            style={{
              '--active-hud-color': activeTool.color,
            }}
          >
            {/* Viewfinder Crops */}
            <div className="monitor-crop crop-tl"></div>
            <div className="monitor-crop crop-tr"></div>
            <div className="monitor-crop crop-bl"></div>
            <div className="monitor-crop crop-br"></div>
            
            {/* Interactive Sci-Fi Corner Brackets */}
            <div className="hud-corner-bracket hb-tl"></div>
            <div className="hud-corner-bracket hb-tr"></div>
            <div className="hud-corner-bracket hb-bl"></div>
            <div className="hud-corner-bracket hb-br"></div>
            <div className="monitor-crosshair">+</div>

            {/* Glowing vector scopes and spaceship radar grid */}
            <div className="monitor-scifi-radar">
              <svg viewBox="0 0 100 100" className="scifi-radar-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(20, 115, 230, 0.12)" strokeWidth="0.8" strokeDasharray="3,3" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(20, 115, 230, 0.16)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(20, 115, 230, 0.22)" strokeWidth="0.8" strokeDasharray="1,2" />
                <line x1="50" y1="50" x2="50" y2="5" stroke={activeTool.color} strokeWidth="1" strokeLinecap="round" className="radar-sweep-line" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Monitor Header Selector tabs */}
            <div className="monitor-header">
              <span className="m-tag scifi-tag">
                <Activity size={10} className="m-icon pulsing-red" /> [ TACTICAL HUD MARK_V ]
              </span>
              
              {/* Dynamic Console Tabs */}
              <div className="monitor-console-tabs">
                <button 
                  className={`m-tab-link ${activeTab === 'preview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('preview')}
                >
                  [ 01: TELEMETRY_SIGNAL ]
                </button>
                <button 
                  className={`m-tab-link ${activeTab === 'disciplines' ? 'active' : ''}`}
                  onClick={() => setActiveTab('disciplines')}
                >
                  [ 02: SYSTEM_DISCIPLINE ]
                </button>
              </div>
            </div>

            {/* Monitor Body Panel */}
            <div className="monitor-body">
              {activeTab === 'preview' ? (
                /* TAB 01: Core Tool Preview details styled as a space console screen */
                <>
                  <div className="monitor-screen-top">
                    <div className="m-tool-badge scifi-badge-original">
                      {renderOriginalLogo(activeTool.name)}
                    </div>
                    <div className="m-tool-headers">
                      <h3 className="m-tool-title">{activeTool.name}</h3>
                      <span className="m-tool-status" style={{ color: activeTool.color }}>// STATUS: {activeDetails.status}</span>
                    </div>
                  </div>

                  <p className="monitor-tool-desc scifi-desc">{activeDetails.desc}</p>

                  {/* Real-time system telemetry parameters */}
                  <div className="scifi-telemetry-dashboard">
                    <div className="telemetry-col">
                      <div className="tel-row">
                        <span className="tel-lbl">CORE.TEMP:</span> 
                        <span className="tel-val color-green">STABLE [312K]</span>
                      </div>
                      <div className="tel-row">
                        <span className="tel-lbl">SHIELD.GEN:</span> 
                        <span className="tel-val" style={{ color: activeTool.color }}>100% SECURE</span>
                      </div>
                      <div className="tel-row">
                        <span className="tel-lbl">WARP.SYS:</span> 
                        <span className="tel-val color-orange">ACTIVE [RESONANT]</span>
                      </div>
                    </div>
                    <div className="telemetry-col">
                      <div className="tel-row">
                        <span className="tel-lbl">NAV.MATRIX:</span> 
                        <span className="tel-val color-cyan">ONLINE [GRID_{activeTool.short}]</span>
                      </div>
                      <div className="tel-row">
                        <span className="tel-lbl">ENERGY.GRID:</span> 
                        <span className="tel-val" style={{ color: activeTool.color }}>MAX FLOW</span>
                      </div>
                      <div className="tel-row">
                        <span className="tel-lbl">VECTOR.SYS:</span> 
                        <span className="tel-val color-cyan">X: {coords.x} / Y: {coords.y}</span>
                      </div>
                    </div>
                  </div>

                  <div className="monitor-capabilities-log scifi-cap-log" style={{ borderColor: activeTool.color + '30' }}>
                    <div className="cap-log-header">
                      <Cpu size={10} style={{ color: activeTool.color }} />
                      <span>HUD SPECIALIZED CRITICAL CAPABILITIES</span>
                    </div>
                    <div className="cap-log-grid">
                      {activeDetails.capabilities.map((cap, i) => (
                        <div key={i} className="cap-log-item">
                          <span className="cap-bullet" style={{ color: activeTool.color }}>►</span>
                          <span className="cap-text">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="monitor-tuner-track">
                    <div className="tuner-labels">
                      <span className="tuner-title">HUD SHIELD POWER RAIL (GAIN LEVEL):</span>
                      <span className="tuner-val" style={{ color: activeTool.color }}>{activeTool.level}%</span>
                    </div>
                    <div className="tuner-track-bar scifi-power-rail">
                      <div 
                        className="tuner-track-fill scifi-energy-pulse" 
                        style={{ 
                          width: inView ? `${activeTool.level}%` : '0%', 
                          backgroundColor: activeTool.color,
                          boxShadow: `0 0 10px ${activeTool.color}`,
                          transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      ></div>
                    </div>
                  </div>
                </>
              ) : (
                /* TAB 02: Consolidated Disciplines Grid */
                <div className="monitor-disciplines-console scifi-disciplines">
                  <div className="disc-console-title">[ CONNECTED DISCIPLINE MATRIX DIAGNOSTIC LOGS ]</div>
                  <div className="monitor-disc-grid">
                    {skillCategories.map((cat) => (
                      <div key={cat.id} className="monitor-disc-card scifi-disc-card">
                        <div className="mdc-header">
                          <span className="mdc-num">{cat.id}</span>
                          <span className="mdc-tag scifi-badge-tag">{cat.tag}</span>
                        </div>
                        <h4 className="mdc-title">{cat.title}</h4>
                        <ul className="mdc-list">
                          {cat.skills.slice(0, 3).map((s, i) => (
                            <li key={i} className="mdc-item">
                              <span className="mdc-bullet">►</span>
                              <span className="mdc-item-txt">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Viewfinder Stats Overlay */}
            <div className="monitor-stats-bottom scifi-stats-bottom">
              <span>CODEC_RESONANCE: {activeTab === 'preview' ? activeDetails.codec : 'LR_HIGH_MATRIX'}</span>
              <span>TELEMETRY_RATE: {activeTab === 'preview' ? activeDetails.bitrate : 'SYNAPSE INDEX'}</span>
              <span className="m-coords">SECTOR.LOC: [X: {coords.x}PX // Y: {coords.y}PX]</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
