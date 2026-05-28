import React, { useEffect, useRef, useState } from 'react';

const ScrollRevealLine = ({ children, delay = '0s' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -12% 0px' // triggers as it scrolls into viewport
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`about-reveal-line ${inView ? 'revealed' : ''}`}
      style={{ '--reveal-delay': delay }}
    >
      {children}
    </div>
  );
};

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-editorial-grid">
          
          {/* ── LEFT COLUMN: Brand Panel & Status Info ── */}
          <div className="about-brand-panel">
            <ScrollRevealLine delay="0s">
              <span className="about-panel-index">// 02 PROFILE</span>
            </ScrollRevealLine>
            
            <ScrollRevealLine delay="0.1s">
              <h2 className="about-massive-title">
                DESIGNING<br />
                VISUAL<br />
                CHAOS.
              </h2>
            </ScrollRevealLine>

            {/* Technical Spec Box */}
            <ScrollRevealLine delay="0.2s">
              <div className="about-technical-specs">
                <div className="tech-spec-row">
                  <span className="spec-label">SYSTEM_STATUS</span>
                  <span className="spec-val active-status">ONLINE_ACTIVE</span>
                </div>
                <div className="tech-spec-row">
                  <span className="spec-label">COORDS</span>
                  <span className="spec-val">DELHI_IST</span>
                </div>
                <div className="tech-spec-row">
                  <span className="spec-label">EXPERIENCE</span>
                  <span className="spec-val">5+ YEARS</span>
                </div>
                <div className="tech-spec-row">
                  <span className="spec-label">SPECIALIZATION</span>
                  <span className="spec-val">POST_PRODUCTION</span>
                </div>
              </div>
            </ScrollRevealLine>
          </div>

          {/* ── RIGHT COLUMN: Narrative / Bio Lines (Line-by-Line Reveal) ── */}
          <div className="about-bio-lines">
            
            <ScrollRevealLine delay="0s">
              <h3 className="bio-subheading">I am Yash Srivastava.</h3>
            </ScrollRevealLine>
            
            <ScrollRevealLine delay="0.05s">
              <p className="bio-line-text highlight">
                Greetings ladies, gentlemen, and sentient algorithms.
              </p>
            </ScrollRevealLine>

            <ScrollRevealLine delay="0.1s">
              <p className="bio-line-text">
                I'm a passionate <strong>Graphic Designer</strong>, <strong>creative artist</strong>, and professional pixel-pusher skilled in Photoshop, Illustrator, Figma, and Animate CC.
              </p>
            </ScrollRevealLine>

            <ScrollRevealLine delay="0.15s">
              <p className="bio-line-text">
                I have extensive experience translating vague client feedback like <em>"can you make it pop?"</em> or <em>"make it feel more blue-ish modern"</em> into high-impact professional designs, custom branding, and digital experiences.
              </p>
            </ScrollRevealLine>

            <ScrollRevealLine delay="0.2s">
              <p className="bio-line-text">
                I specialize in <strong>video editing</strong> and <strong>motion graphics</strong> using Adobe Premiere Pro and After Effects (yes, I have conditioned myself to press Ctrl+S every two seconds to outsmart Adobe crashes).
              </p>
            </ScrollRevealLine>

            <ScrollRevealLine delay="0.25s">
              <p className="bio-line-text">
                I also have a solid grasp of <strong>web design &amp; front-end development</strong> (which is how this portfolio compiles), and I'm currently expanding into 3D with <strong>Autodesk Maya</strong> to master the ultimate art of modeling realistic spheres.
              </p>
            </ScrollRevealLine>

          </div>

        </div>
      </div>
    </section>
  );
}
