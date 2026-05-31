import React, { useState } from 'react';
import { Sliders, Cpu, Code, BarChart2, Terminal } from 'lucide-react';

const tools = [
  { name: 'Adobe Premiere Pro', short: 'Pr', color: '#E44D26', level: 92, category: 'MOTION DESIGN' },
  { name: 'Adobe After Effects', short: 'Ae', color: '#38BDF8', level: 85, category: 'MOTION DESIGN' },
  { name: 'Adobe Photoshop', short: 'Ps', color: '#61DAFB', level: 95, category: 'VISUAL DESIGN' },
  { name: 'Adobe Illustrator', short: 'Ai', color: '#F1502F', level: 90, category: 'VISUAL DESIGN' },
  { name: 'Figma', short: 'Fig', color: '#0ACF83', level: 88, category: 'UI/UX DESIGN' },
  { name: 'Adobe Animate', short: 'An', color: '#EC4899', level: 80, category: '2D ARTWORK' },
  { name: 'Autodesk Maya', short: 'Ma', color: '#A855F7', level: 42, category: '3D MODELING' },
];

const toolDetails = {
  'Adobe Premiere Pro': {
    desc: 'Orchestrates complex narrative cuts, pace-matching, and multichannel audio mixdowns inside Premiere Pro. Specialized in logarithmic color calibration and dynamic speed ramp curves.',
    capabilities: ['Dynamic Narrative Cuts', 'SMPTE Sync Alignment', 'Rec.709 Color Calibration', 'Advanced Audio Mastering'],
    status: 'COMPILE_SUCCESS',
    latency: '0.04s',
    env: 'production',
    bundleSize: '1.2 MB'
  },
  'Adobe After Effects': {
    desc: 'Brings vector layouts and typographic matrices to life. Yash specializes in kinetic animations, realistic particle physics solvers, custom expressions, and parallax multi-cam staging.',
    capabilities: ['3D Camera Vector Solvers', 'Kinetic Typography Layouts', 'Expression-based Vector Rigs', 'Multi-layer VFX Composites'],
    status: 'COMPILE_SUCCESS',
    latency: '0.12s',
    env: 'production',
    bundleSize: '3.4 MB'
  },
  'Adobe Photoshop': {
    desc: 'Constructs complex raster graphics, creative photo composites, high-end visual brand assets, and dark-room digital adjustments. Expert in blend modes, tone matching, and typographic layouts.',
    capabilities: ['Advanced Photo Composites', 'Organic Texture Blending', 'Tone Curve Tuning & Grading', 'Studio Layout Architecture'],
    status: 'ACTIVE_SHADERS',
    latency: '0.01s',
    env: 'production',
    bundleSize: '4.8 MB'
  },
  'Adobe Illustrator': {
    desc: 'Drafts infinitely scalable vector icons, primary brand marks, visual identity grids, editorial typography, and high-impact layout illustrations with brutalist precision and flawless geometry.',
    capabilities: ['Scalable Brand Mark Grids', 'Systematic Visual Identities', 'Bespoke Icon Typography', 'High-Contrast Vector Assets'],
    status: 'MATH_MATRIX_READY',
    latency: '0.02s',
    env: 'stable',
    bundleSize: '0.8 MB'
  },
  'Figma': {
    desc: 'Develops interactive high-fidelity user prototypes, structured wireframes, component design systems, and responsive layouts with absolute grid discipline and layout variable tracking.',
    capabilities: ['Component Architecture', 'UI Grid Layout Design', 'Micro-Interaction Prototypes', 'Token variables & Styles'],
    status: 'UI_STACK_CONVERGED',
    latency: '0.05s',
    env: 'production',
    bundleSize: '1.8 MB'
  },
  'Adobe Animate': {
    desc: 'Crafts hand-drawn and vector-based 2D frame reels, frame-by-frame character loops, active morph cuts, and vintage aesthetic animations mimicking standard physical cartoon cells.',
    capabilities: ['Hand-Drawn Onion Skinning', 'Smooth Vector Tweening', 'Retro VHS Anim Reels', 'Frame-by-Frame Key Cycles'],
    status: 'CELL_MATRIX_STABLE',
    latency: '0.08s',
    env: 'stable',
    bundleSize: '2.2 MB'
  },
  'Autodesk Maya': {
    desc: 'An expanding creative space. Yash is actively learning the pipelines of 3D polygonal construction, coordinate mapping, surface texturing, skeletal rigging, and orbiting camera controls.',
    capabilities: ['Polygonal Mesh Drafting', 'Procedural Texture Mapping', '3D Scene Orbit Controls', 'Introductory Rigging'],
    status: 'COMPILING_INDEX (42%)',
    latency: '0.84s',
    env: 'development',
    bundleSize: '14.2 MB'
  }
};

const skillCategories = [
  {
    id: '01',
    tag: 'DESIGN',
    title: 'Visual Identity & Design',
    skills: [
      'Graphic Layout Designing',
      'Branding & Visual Archetypes',
      'Social Media Assets',
      'Interactive Figma Mockups',
    ],
  },
  {
    id: '02',
    tag: 'ARTWORK',
    title: 'Illustration & Composites',
    skills: [
      'Photo Editing & Compositing',
      'Scalable Vector Illustration',
      'Traditional 2D Animations',
    ],
  },
  {
    id: '03',
    tag: 'MOTION',
    title: 'Video & Motion Graphics',
    skills: [
      'Narrative Video Cuts',
      'Kinetic Typography Motion',
      'VFX Camera Solvers & Composites',
    ],
  },
  {
    id: '04',
    tag: 'TECH',
    title: 'Web Design & 3D Assets',
    skills: [
      'Responsive Web Layouts',
      'Polygonal 3D Mesh Assemblies',
      'Studio Production Mechanics',
    ],
  },
];

export default function Skills() {
  const [selectedToolName, setSelectedToolName] = useState('Adobe Premiere Pro');
  const [activeConsoleTab, setActiveConsoleTab] = useState('json'); // 'json' | 'vector'

  const activeTool = tools.find(t => t.name === selectedToolName) || tools[0];
  const activeDetails = toolDetails[selectedToolName] || toolDetails[tools[0].name];

  return (
    <section id="skills" className="skills-section">
      <div className="container">

        {/* ── MOBILE SKILLS REDESIGN ── */}
        <div className="skills-mobile-layout">
          <div className="skills-mobile-tag"><Sliders size={11} /> ABILITIES MATRIX</div>
          <h2 className="skills-mobile-title">THE PRODUCTION<br /><span className="skills-mobile-title-accent">SUITE.</span></h2>

          {/* Tool bars */}
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

          {/* Capability cards */}
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

        {/* Cohesive stark Swiss Header matching Projects section */}
        <div className="editorial-header">
          <div className="editorial-meta">
            <span className="meta-tag"><Sliders size={12} /> ABILITIES MATRIX</span>
            <span className="meta-divider"></span>
            <span className="meta-tag"><Cpu size={12} /> SYSTEM SPECIFICATION REPORT</span>
          </div>
          
          <div className="editorial-main-grid">
            <h2 className="editorial-title">THE PRODUCTION SUITE</h2>
            <div className="editorial-desc-box">
              <p>
                Yash controls a dual-engine production suite: high-precision graphic layouts and multi-track motion timelines. Select an inlet row to load the developer metrics screen.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Studio Editorial Grid */}
        <div className="skills-editorial-grid">
          
          {/* LEFT COLUMN: Typographic Tool Directory */}
          <div className="skills-directory-bay">
            <div className="directory-list-header">
              <span className="dir-hdr-num">ID</span>
              <span className="dir-hdr-name">SOFTWARE ENGINE</span>
              <span className="dir-hdr-cat">PRIMARY DISCIPLINE</span>
            </div>
            
            <div className="directory-list-rows">
              {tools.map((tool, idx) => {
                const isActive = tool.name === selectedToolName;
                return (
                  <button
                    key={tool.name}
                    className={`directory-row-btn ${isActive ? 'active-row' : ''}`}
                    onClick={() => setSelectedToolName(tool.name)}
                  >
                    <span className="dir-row-num">0{idx + 1}</span>
                    <span className="dir-row-name">{tool.name.replace('Adobe ', '')}</span>
                    <span className="dir-row-cat">{tool.category}</span>
                    <span className="dir-row-led-indicator" style={{ backgroundColor: isActive ? activeTool.color : 'transparent' }}></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Real Web Developer Bento Console Card */}
          <div className="skills-dev-console" style={{ '--dev-glow-color': activeTool.color }}>
            
            {/* Top Workspace Tab Bar */}
            <div className="dev-console-tabbar">
              <div className="tabbar-left">
                <span className="window-dot dot-red"></span>
                <span className="window-dot dot-yellow"></span>
                <span className="window-dot dot-green"></span>
              </div>
              <div className="tabbar-tabs">
                <button 
                  className={`tab-btn ${activeConsoleTab === 'json' ? 'active-tab' : ''}`}
                  onClick={() => setActiveConsoleTab('json')}
                >
                  <Code size={11} className="tab-icon" />
                  <span>package.json</span>
                </button>
                <button 
                  className={`tab-btn ${activeConsoleTab === 'vector' ? 'active-tab' : ''}`}
                  onClick={() => setActiveConsoleTab('vector')}
                >
                  <BarChart2 size={11} className="tab-icon" />
                  <span>vectors.svg</span>
                </button>
              </div>
              <div className="tabbar-right font-mono">
                node v20.12.0
              </div>
            </div>

            {/* Main Console View Area */}
            <div className="dev-console-body">
              {activeConsoleTab === 'json' ? (
                /* TAB 1: Code Syntax highlighting for JSON Config */
                <pre className="syntax-codeblock font-mono">
                  <code>
                    <span className="code-key">"name"</span>: <span className="code-string">"{activeTool.name}"</span>,<br />
                    <span className="code-key">"shortCode"</span>: <span className="code-string">"{activeTool.short}"</span>,<br />
                    <span className="code-key">"primaryDiscipline"</span>: <span className="code-string">"{activeTool.category}"</span>,<br />
                    <span className="code-key">"integrationLevel"</span>: <span className="code-number">{activeTool.level}%</span>,<br />
                    <span className="code-key">"engineStatus"</span>: <span className="code-string">"{activeDetails.status}"</span>,<br />
                    <span className="code-key">"latency"</span>: <span className="code-number">"{activeDetails.latency}"</span>,<br />
                    <span className="code-key">"verifiedCapabilities"</span>: [<br />
                    {activeDetails.capabilities.map((cap, i) => (
                      <React.Fragment key={i}>
                        &nbsp;&nbsp;<span className="code-string">"{cap}"</span>
                        {i < activeDetails.capabilities.length - 1 ? ',' : ''}
                        <br />
                      </React.Fragment>
                    ))}
                    ]
                  </code>
                </pre>
              ) : (
                /* TAB 2: Minimalist Clean Developer Grid/Graph */
                <div className="console-chart-view">
                  <div className="chart-meta font-mono">
                    <span>INDEXED ABILITIES SCALE // HISTOGRAM</span>
                    <span style={{ color: activeTool.color }}>ACTIVE: {activeTool.name}</span>
                  </div>
                  
                  {/* Clean SVG graph visualizer showing all tool values */}
                  <div className="chart-visualizer-box">
                    {tools.map((t) => {
                      const isSelf = t.name === selectedToolName;
                      return (
                        <div key={t.name} className="chart-bar-col">
                          <div className="bar-track">
                            <div 
                              className="bar-fill" 
                              style={{ 
                                height: `${t.level}%`, 
                                backgroundColor: isSelf ? activeTool.color : 'rgba(255, 255, 255, 0.1)',
                                boxShadow: isSelf ? `0 0 12px ${activeTool.color}55` : 'none'
                              }}
                            ></div>
                          </div>
                          <span className="bar-label font-mono" style={{ color: isSelf ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>
                            {t.short}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Spec Narrative paragraph */}
            <div className="dev-console-description">
              <p>{activeDetails.desc}</p>
            </div>

            {/* Bottom Real Web Developer Performance Metrics Bar */}
            <div className="dev-console-footer">
              <div className="metric-cell">
                <Terminal size={11} className="metric-icon" />
                <span className="lbl font-mono">BUILD_ENV</span>
                <span className="val font-mono" style={{ color: activeDetails.env === 'production' ? '#00e676' : '#ff9100' }}>
                  {activeDetails.env.toUpperCase()}
                </span>
              </div>
              <div className="metric-cell">
                <span className="lbl font-mono">LATENCY_INDEX</span>
                <span className="val font-mono">{activeDetails.latency}</span>
              </div>
              <div className="metric-cell">
                <span className="lbl font-mono">BUNDLE_WEIGHT</span>
                <span className="val font-mono">{activeDetails.bundleSize}</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: Permanent stark capabilities grid */}
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
        </div>{/* end skills-capabilities-grid */}

        </div>{/* end skills-desktop-layout */}

      </div>
    </section>
  );
}
