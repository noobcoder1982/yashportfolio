import React, { useState } from 'react';
import { ArrowUpRight, Film, Sparkles } from 'lucide-react';
import ProjectDetailPage from './ProjectDetailPage';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  const projectsData = [
    {
      title: 'commercial brand identity',
      desc: 'High-pacing post-production sequence detailing corporate campaign summaries, incorporating sound-design beat alignment and motion graphic overrides.',
      tech: ['Premiere Pro', 'After Effects', 'Sound Design', 'Pacing'],
      category: 'commercial',
      number: '01',
      color: '#8E1616',
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
      color: '#D84040',
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
            <span className="meta-tag"><Sparkles size={12} /> SWISS POST-PRODUCTION</span>
          </div>
          
          <div className="editorial-main-grid">
            <h2 className="editorial-title">Selected Cuts</h2>
            <div className="editorial-desc-box">
              <p>
                Explore selected video works, showreels, and narrative cuts structured with solid pacing, calibrated grading, and rich soundscapes.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Split Editorial Layout */}
        <div className="projects-layout-grid">
          
          {/* Sticky Left Sidebar for Filters */}
          <div className="projects-sidebar">
            <div className="sidebar-sticky-wrapper">
              <span className="sidebar-label">CUT_GENRE</span>
              <div className="filter-pill-stack">
                {['all', 'commercial', 'narrative', 'documentary', 'social'].map((cat) => (
                  <button
                    key={cat}
                    className={`filter-brutal-btn ${filter === cat ? 'active' : ''}`}
                    onClick={() => setFilter(cat)}
                  >
                    <span className="dot-marker"></span>
                    {cat}
                  </button>
                ))}
              </div>
              <div className="sidebar-decor-box">
                <span className="decor-title">MONITOR STATUS</span>
                <p>TIMELINE: MATCHED</p>
                <p>AUDIO: MIXED</p>
                <p>GRADING: CALIBRATED</p>
              </div>
            </div>
          </div>

          {/* Right Column: Giant Interactive Brutalist Lists */}
          <div className="projects-list-container">
            {filteredProjects.map((project, idx) => (
              <div 
                key={idx} 
                className={`project-strip ${hoveredIdx === idx ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Horizontal dividing grid lines */}
                <div className="strip-grid-line"></div>
                
                <div className="strip-header" onClick={() => {
                  // Find original index inside primary projectsData to handle correct detail page rendering
                  const originalIndex = projectsData.findIndex(p => p.number === project.number);
                  setActiveProjectIndex(originalIndex);
                }}>
                  <div className="strip-number" style={{ color: project.color }}>
                    {project.number}
                  </div>
                  
                  <div className="strip-main-info">
                    <span className="project-category-tag">{project.category}</span>
                    <h3 className="project-strip-title">{project.title}</h3>
                  </div>

                  <div className="strip-arrow">
                    <ArrowUpRight size={28} className="arrow-icon" />
                  </div>
                </div>

                {/* Sliding details drawer panel */}
                <div className="strip-body-drawer">
                  <div className="drawer-inner-grid">
                    <p className="drawer-desc">{project.desc}</p>
                    
                    <div className="drawer-meta">
                      <div className="tech-badges-group">
                        {project.tech.map((t, tIdx) => (
                          <span key={tIdx} className="tech-brutal-badge">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="strip-grid-line"></div>
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
