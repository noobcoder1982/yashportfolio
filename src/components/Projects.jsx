import React, { useState } from 'react';
import { Play, ArrowUpRight, Film, Sparkles } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const projectsData = [
    {
      title: 'Commercial Brand Showreel',
      desc: 'High-pacing post-production sequence detailing corporate campaign summaries, incorporating sound-design beat alignment and motion graphic overrides.',
      tech: ['Premiere Pro', 'After Effects', 'Sound Design', 'Pacing'],
      category: 'commercial',
      demoLink: '#',
      repoLink: '#',
      number: '01',
      color: '#8E1616'
    },
    {
      title: 'Cinematic Music Video',
      desc: 'Highly atmospheric color-graded editing sequence utilizing custom grain styling, SLOG3 logarithmic conversions, and multicam synchronization.',
      tech: ['DaVinci Resolve', 'Color Grading', 'Grain Matching', 'VFX'],
      category: 'narrative',
      demoLink: '#',
      repoLink: '#',
      number: '02',
      color: '#D84040'
    },
    {
      title: 'Short Documentary Profile',
      desc: 'Dialogue-driven storytelling showcasing editorial structuring, archival integration, clean noise-reduction mix, and audio leveling.',
      tech: ['Premiere Pro', 'Audio Cleanup', 'Archival Sync', 'Grading'],
      category: 'documentary',
      number: '03',
      demoLink: '#',
      repoLink: '#',
      color: '#1D1616'
    },
    {
      title: 'Social Content Campaign Pack',
      desc: 'High-retention social cuts utilizing dynamic typography overlays, custom sound effects, zooming visual focus keys, and rapid pace editing.',
      tech: ['Premiere Pro', 'After Effects', 'Typography', 'Effects'],
      category: 'social',
      number: '04',
      demoLink: '#',
      repoLink: '#',
      color: '#D84040'
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
                
                <div className="strip-header">
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

                      <div className="project-strip-links">
                        <a href={project.demoLink} className="strip-action-link" target="_blank" rel="noopener noreferrer">
                          WATCH REEL <Play size={10} fill="currentColor" style={{ marginLeft: '2px' }} />
                        </a>
                        <a href={project.repoLink} className="strip-action-link" target="_blank" rel="noopener noreferrer">
                          CASE STUDY <ArrowUpRight size={10} style={{ marginLeft: '2px' }} />
                        </a>
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
    </section>
  );
}
