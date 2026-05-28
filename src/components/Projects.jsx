import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Film, Sparkles, Volume2, Play, Activity, Monitor, Layers, ListFilter } from 'lucide-react';
import ProjectDetailPage from './ProjectDetailPage';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [monitorTimecode, setMonitorTimecode] = useState('00:00:00:00');
  const [playheadPos, setPlayheadPos] = useState(12.5); // percentage along the timeline
  const [eqHeights, setEqHeights] = useState([20, 30, 40, 20, 10]);

  const eqIntervalRef = useRef(null);

  const projectsData = [
    {
      title: 'commercial brand identity',
      desc: 'High-pacing post-production sequence detailing corporate campaign summaries, incorporating sound-design beat alignment and motion graphic overrides.',
      tech: ['Premiere Pro', 'After Effects', 'Sound Design', 'Pacing'],
      category: 'commercial',
      number: '01',
      color: '#FF2E2E', // Neon Red accent
      timeRange: '00:00 - 00:05',
      posStart: 2,
      posWidth: 21,
      role: 'Lead Post-Production Artist',
      client: 'Apex Global Corp',
      timeline: '4 Weeks (2026)',
      details: {
        tagline: 'Crafting the Visual Signature of a High-Octane Brand.',
        overview: 'A full-scale rebrand execution focusing on rhythmic precision, editorial identity systems, and dynamic logo reveals. The core objective was to turn dry corporate analytics into a captivating cinematic visual narrative that instantly retains viewer attention.',
        stats: [
          { label: 'RENDER TIME', value: '14 hrs' },
          { label: 'CRASHES survived', value: '23' },
          { label: 'KEYFRAMES EASED', value: '1,420+' }
        ],
        process: [
          { phase: '01. CONCEPT & PACING', desc: 'Analyzing the brand audio track, marking key frame sync points, and designing a raw editorial storyboard to establish the flow.' },
          { phase: '02. GRAPHIC OVERLAYS', desc: 'Injecting customized brutalist text lockups and vector layouts inside After Effects, using custom expressions for bounce easing.' },
          { phase: '03. AUDIO CALIBRATION', desc: 'Layering 14 channels of audio, including cinematic hits, whooshes, and micro-clicks, mixed at -14 LUFS.' }
        ],
        editorNotes: 'The client asked if the logo could "spin in 3D but remain totally flat." After 4 mockups and a deep breath, we aligned on a sleek, vector-based keyframe slide that felt modern and neat. Pressing Ctrl+S was done exactly 341 times.'
      }
    },
    {
      title: 'video edits and cinematic shorts',
      desc: 'Highly atmospheric color-graded editing sequence utilizing custom grain styling, SLOG3 logarithmic conversions, and multicam synchronization.',
      tech: ['DaVinci Resolve', 'Color Grading', 'Grain Matching', 'VFX'],
      category: 'narrative',
      number: '02',
      color: '#D84040',
      timeRange: '00:05 - 00:10',
      posStart: 26,
      posWidth: 22,
      role: 'Cinematic Colorist & Editor',
      client: 'Vanguard Films',
      timeline: '6 Weeks (2026)',
      details: {
        tagline: 'Atmospheric storytelling crafted frame-by-frame.',
        overview: 'A cinematic anthology featuring deeply atmospheric visual grading, custom 35mm grain matching, and seamless multicam sequencing. Every scene was treated like a painting, adjusting highlights and midtones to provoke specific emotional cues.',
        stats: [
          { label: 'LUT PROFILES', value: 'SLOG3 to Film' },
          { label: 'COFFEE CONSUMPTION', value: '48 Cups' },
          { label: 'RESOLVE NODES', value: '42 per clip' }
        ],
        process: [
          { phase: '01. LOG CALIBRATION', desc: 'Transforming flat SLOG3 camera footage into a high-dynamic range base using custom Primaries, exposing hidden shadow details.' },
          { phase: '02. NARRATIVE SPEED RAMPING', desc: 'Applying subtle speed ramps and freeze-frame cuts to amplify micro-expressions and build narrative tension.' },
          { phase: '03. GRAIN INTEGRATION', desc: 'Overlaying authentic 35mm film grain textures, meticulously mapped to shadows and midtones for an organic, tactile aesthetic.' }
        ],
        editorNotes: 'We spent a full afternoon adjusting a single shadow curve to make sure the darkness felt "cozy, yet slightly ominous." The audio track features room tone recorded in an empty stairwell. It makes all the difference.'
      }
    },
    {
      title: 'short documentary or script writing',
      desc: 'Dialogue-driven storytelling showcasing editorial structuring, archival integration, clean noise-reduction mix, and audio leveling.',
      tech: ['Premiere Pro', 'Audio Cleanup', 'Archival Sync', 'Grading'],
      category: 'documentary',
      number: '03',
      color: '#1D1616',
      timeRange: '00:10 - 00:15',
      posStart: 51,
      posWidth: 21,
      role: 'Script Writer & Narrative Editor',
      client: 'Independent Media Lab',
      timeline: '8 Weeks (2026)',
      details: {
        tagline: 'Unearthing raw narratives through dialogue and structure.',
        overview: 'An editorial masterpiece blending archival 8mm footage with modern high-fidelity digital interviews. The focus was on script cohesion, structuring the timeline to let silent pauses build dramatic tension, and surgical audio leveling.',
        stats: [
          { label: 'AUDIO TRACKS MIXED', value: '28' },
          { label: 'SCRIPTS WRITTEN', value: '4 drafts' },
          { label: 'ARCHIVAL CLIPS CLEANED', value: '112' }
        ],
        process: [
          { phase: '01. TRANSCRIPT ASSEMBLY', desc: 'Reviewing 10+ hours of raw interview text, highlighting emotional spikes, and drafting the narrative script arc.' },
          { phase: '02. RETRO ARCHIVAL ASSEMBLY', desc: 'Syncing historical archive reel scans with the primary dialogue track, adding custom audio hiss and optical flare filters.' },
          { phase: '03. NOISE RECONSTRUCTION', desc: 'Employing advanced spectral repair to isolate voice frequencies, removing room echo and background traffic rumble.' }
        ],
        editorNotes: 'The subject fell silent for 7 seconds during a crucial question. The producer wanted to cut the silence. I fought to keep it in. Those 7 seconds became the most reviewed segment of the documentary.'
      }
    },
    {
      title: 'social contacts',
      desc: 'High-retention social cuts utilizing dynamic typography overlays, custom sound effects, zooming visual focus keys, and rapid pace editing.',
      tech: ['Premiere Pro', 'After Effects', 'Typography', 'Effects'],
      category: 'social',
      number: '04',
      color: '#FF2E2E',
      timeRange: '00:15 - 00:20',
      posStart: 75,
      posWidth: 23,
      role: 'Retention Specialist & Motion Designer',
      client: 'Influence Network',
      timeline: 'Ongoing',
      details: {
        tagline: 'Hacking the human attention span with rapid-fire visuals.',
        overview: 'A set of viral shorts engineered for absolute retention. Utilizing dynamic, frame-by-frame text scale tracking, aggressive zoom sweeps, sound-effect markers, and high-retention visual hooks within the first 1.5 seconds.',
        stats: [
          { label: 'RETENTION RATE', value: '+68% Avg' },
          { label: 'TEXT ANCHORS', value: '180 per min' },
          { label: 'SOUND FX HITS', value: '45 per video' }
        ],
        process: [
          { phase: '01. THE 1.5s HOOK', desc: 'Designing high-contrast zoom transitions and sound risers inside the initial 24 frames to immediately halt scroll behavior.' },
          { phase: '02. KINETIC CAPTIONS', desc: 'Adding hand-animated kinetic text overlays that pulse, change color based on vocal stress, and track visual elements.' },
          { phase: '03. EFFECTS BLASTING', desc: 'Layering pop sound effects, digital glitches, camera whooshes, and visual scale loops to keep the subconscious mind fully engaged.' }
        ],
        editorNotes: 'They said attention span is dead, so we decided to feed it pure kinetic fuel. Making 60 seconds feel like a 5-second roller coaster is hard work, but seeing the analytics curve stay perfectly flat makes all the keyframe pain worth it.'
      }
    }
  ];

  // Dynamic timecode & Audio VU levels simulated on active hover
  useEffect(() => {
    eqIntervalRef.current = setInterval(() => {
      // Dance dynamic audio bars
      setEqHeights([
        Math.floor(Math.random() * 45) + 10,
        Math.floor(Math.random() * 65) + 15,
        Math.floor(Math.random() * 50) + 10,
        Math.floor(Math.random() * 60) + 15,
        Math.floor(Math.random() * 35) + 10
      ]);

      // Calculate timecode based on selected index
      const baseSeconds = selectedIdx * 5;
      const ms = String(Math.floor(Math.random() * 24)).padStart(2, '0');
      const ss = String(baseSeconds + Math.floor(Math.random() * 5)).padStart(2, '0');
      setMonitorTimecode(`00:00:${ss}:${ms}`);
    }, 150);

    return () => clearInterval(eqIntervalRef.current);
  }, [selectedIdx]);

  // Sync playhead to start center of the active block
  const selectProject = (idx) => {
    setSelectedIdx(idx);
    const start = projectsData[idx].posStart;
    const width = projectsData[idx].posWidth;
    setPlayheadPos(start + width / 2);
  };

  const activeProject = projectsData[selectedIdx];
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        
        {/* Newspaper Style Editorial Header */}
        <div className="editorial-header">
          <div className="editorial-meta">
            <span className="meta-tag"><Film size={12} /> PORTFOLIO 2026</span>
            <span className="meta-divider"></span>
            <span className="meta-tag"><Sparkles size={12} /> SWISS EDITING SUITE</span>
          </div>
          
          <div className="editorial-main-grid">
            <h2 className="editorial-title">Selected Cuts</h2>
            <div className="editorial-desc-box">
              <p>
                Explore selected video works, showreels, and narrative cuts structured inside an interactive Swiss Non-Linear Editor timeline cockpit. Click any clip block to open its full workspace study.
              </p>
            </div>
          </div>
        </div>

        {/* NLE SUITE DASHBOARD WORKSPACE */}
        <div className="nle-suite-workspace">
          
          {/* Main Top Grid Pane */}
          <div className="nle-pane-grid">
            
            {/* LEFT PANE: SOURCE MONITOR (PREVIEW AND HUD SYSTEM) */}
            <div className="nle-pane-monitor">
              
              {/* Monitor Screen Header HUD */}
              <div className="nle-monitor-header">
                <span className="monitor-badge">
                  <Monitor size={10} style={{ marginRight: '4px' }} />
                  SOURCE VIEWPORT
                </span>
                <span className="monitor-filename">YASH_CUT_0{activeProject.number}.MOV</span>
                <span className="monitor-timer font-mono text-neon">{monitorTimecode}</span>
              </div>

              {/* Viewport CRT simulation */}
              <div className="nle-viewport-screen" onClick={() => setActiveProjectIndex(selectedIdx)}>
                
                {/* Viewport HUD overlays */}
                <div className="viewport-overlay-hud">
                  <div className="rec-blinker">
                    <span className="rec-led"></span>
                    <span>ONLINE</span>
                  </div>
                  <span className="aspect-label">16:9 DNG</span>
                </div>

                {/* Viewport content */}
                <div className="viewport-content-visual" style={{ backgroundColor: activeProject.color + '0a' }}>
                  <div className="monitor-viewfinder-grid">
                    <div className="grid-center-cross"></div>
                    <div className="corner-bracket top-left"></div>
                    <div className="corner-bracket top-right"></div>
                    <div className="corner-bracket bottom-left"></div>
                    <div className="corner-bracket bottom-right"></div>
                  </div>

                  <div className="viewport-preview-card">
                    <span className="preview-index-tag">CLIP // 0{activeProject.number}</span>
                    <h3 className="preview-headline">{activeProject.title}</h3>
                    <p className="preview-desc-tag">{activeProject.desc}</p>
                    <span className="preview-action-tag">CLICK SCREEN TO LOAD EDIT TIMELINE ↗</span>
                  </div>
                </div>

                {/* Bottom screen controls */}
                <div className="viewport-status-footer">
                  <div className="eq-level-indicator">
                    <Volume2 size={12} className="eq-icon" />
                    <div className="eq-meter-stack">
                      {eqHeights.map((ht, i) => (
                        <div key={i} className="eq-meter-bar" style={{ height: `${ht}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <span className="viewport-scale-log">SCALE: 100% // SLOG3_ACTIVE</span>
                </div>

              </div>

            </div>

            {/* RIGHT PANE: PROJECT BIN & SPECIFICATIONS */}
            <div className="nle-pane-specbin">
              
              <div className="bin-header">
                <span className="bin-title">
                  <Layers size={10} style={{ marginRight: '4px' }} />
                  PROJECT BIN
                </span>
                
                {/* Micro Genre Filter Stack */}
                <div className="bin-filter-pills">
                  {['all', 'commercial', 'narrative', 'documentary', 'social'].map((cat) => (
                    <button
                      key={cat}
                      className={`bin-filter-pill ${filter === cat ? 'active' : ''}`}
                      onClick={() => setFilter(cat)}
                      title={`Filter by ${cat}`}
                    >
                      {cat.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset bin elements */}
              <div className="bin-assets-list">
                {filteredProjects.map((project) => {
                  const isSel = project.number === activeProject.number;
                  return (
                    <div 
                      key={project.number}
                      className={`bin-asset-row ${isSel ? 'selected' : ''}`}
                      onMouseEnter={() => {
                        const originalIdx = projectsData.findIndex(p => p.number === project.number);
                        selectProject(originalIdx);
                      }}
                      onClick={() => {
                        const originalIdx = projectsData.findIndex(p => p.number === project.number);
                        setActiveProjectIndex(originalIdx);
                      }}
                    >
                      <div className="asset-thumb-box" style={{ borderColor: isSel ? '#FF2E2E' : 'currentColor' }}>
                        <span>0{project.number}</span>
                      </div>
                      <div className="asset-meta-box">
                        <span className="asset-title-text">{project.title}</span>
                        <div className="asset-sub-row">
                          <span className="asset-cat-badge">{project.category}</span>
                          <span className="asset-time-range font-mono">{project.timeRange}</span>
                        </div>
                      </div>
                      <div className="asset-arrow-trigger">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Editorial Spec Info Card */}
              <div className="bin-metadata-panel">
                <span className="meta-panel-label">// LOADED_CLIP_SPECS</span>
                <div className="bin-specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">CLIENT</span>
                    <span className="spec-val text-white">{activeProject.client}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">ROLE</span>
                    <span className="spec-val text-white">{activeProject.role}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">TIMELINE</span>
                    <span className="spec-val text-white">{activeProject.timeline}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">CODECS</span>
                    <span className="spec-val text-white">ProRes 422 HQ</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Pane: Timeline editing track cockpit */}
          <div className="nle-pane-timeline">
            
            {/* Timeline Cockpit Ruler */}
            <div className="timeline-cockpit-header">
              <div className="timeline-lane-col">TRACKS</div>
              <div className="timeline-ruler-col">
                <div className="time-scale-tick" style={{ left: '0%' }}>00:00</div>
                <div className="time-scale-tick" style={{ left: '25%' }}>00:05</div>
                <div className="time-scale-tick" style={{ left: '50%' }}>00:10</div>
                <div className="time-scale-tick" style={{ left: '75%' }}>00:15</div>
                <div className="time-scale-tick" style={{ left: '98%' }}>00:20</div>
              </div>
            </div>

            {/* Timeline track content and playhead */}
            <div className="timeline-tracks-workspace">
              
              {/* Playhead Scrubber */}
              <div className="timeline-scrubber-playhead" style={{ left: `${playheadPos}%` }}>
                <div className="playhead-needle"></div>
                <div className="playhead-line-track"></div>
              </div>

              {/* V2: Motion Graphics Track */}
              <div className="timeline-track-row">
                <div className="lane-header-col">V2 GRAPHICS</div>
                <div className="lane-tracks-col">
                  {projectsData.map((project, idx) => (
                    <div 
                      key={project.number}
                      className={`timeline-clip-block block-v2 ${project.number === activeProject.number ? 'active' : ''}`}
                      style={{ left: `${project.posStart}%`, width: `${project.posWidth}%` }}
                      onMouseEnter={() => selectProject(idx)}
                      onClick={() => setActiveProjectIndex(idx)}
                    >
                      <span>TYPO_OVERLAYS_AE_0{project.number}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* V1: Footage Track */}
              <div className="timeline-track-row">
                <div className="lane-header-col">V1 FOOTAGE</div>
                <div className="lane-tracks-col">
                  {projectsData.map((project, idx) => (
                    <div 
                      key={project.number}
                      className={`timeline-clip-block block-v1 ${project.number === activeProject.number ? 'active' : ''}`}
                      style={{ left: `${project.posStart}%`, width: `${project.posWidth}%` }}
                      onMouseEnter={() => selectProject(idx)}
                      onClick={() => setActiveProjectIndex(idx)}
                    >
                      <span>RAW_FOOTAGE_0{project.number}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* A1: Dialogue Track */}
              <div className="timeline-track-row">
                <div className="lane-header-col">A1 VOICE</div>
                <div className="lane-tracks-col">
                  {projectsData.map((project, idx) => (
                    <div 
                      key={project.number}
                      className={`timeline-clip-block block-a1 ${project.number === activeProject.number ? 'active' : ''}`}
                      style={{ left: `${project.posStart}%`, width: `${project.posWidth}%` }}
                      onMouseEnter={() => selectProject(idx)}
                      onClick={() => setActiveProjectIndex(idx)}
                    >
                      <span>DIALOGUE_VO_0{project.number}.WAV</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* A2: Sound Design Track */}
              <div className="timeline-track-row">
                <div className="lane-header-col">A2 SFX</div>
                <div className="lane-tracks-col">
                  {projectsData.map((project, idx) => (
                    <div 
                      key={project.number}
                      className={`timeline-clip-block block-a2 ${project.number === activeProject.number ? 'active' : ''}`}
                      style={{ left: `${project.posStart}%`, width: `${project.posWidth}%` }}
                      onMouseEnter={() => selectProject(idx)}
                      onClick={() => setActiveProjectIndex(idx)}
                    >
                      <span>WHOOSHES_IMPACTS.WAV</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FULLSCREEN WORK CASE STUDY OVERLAY PAGE */}
      {activeProjectIndex !== null && (
        <ProjectDetailPage
          project={projectsData[activeProjectIndex]}
          projectIndex={activeProjectIndex}
          totalProjects={projectsData.length}
          onClose={() => setActiveProjectIndex(null)}
          onNextProject={() => {
            setActiveProjectIndex((prev) => (prev + 1) % projectsData.length);
          }}
        />
      )}

    </section>
  );
}
