import React, { useEffect, useRef, useState } from 'react';
import yashSketch from '../assets/yash_sketch.png';

// Helper: returns className with blur-reveal + in-view toggle
const R = (extra, inView, delay) => (
  `about-line-reveal${inView ? ' alr-in' : ''} ${extra}`
);

const styleD = (d) => ({ '--alr-delay': d });

export default function About() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-layout">

        {/* ── LEFT: Text ── */}
        <div className="about-text-col">

          {/* LINE 1 — Hello! */}
          <h2
            className={`about-hello ${R('', inView)}`}
            style={styleD('0s')}
          >
            Hello!
          </h2>

          {/* LINE 2 — I am Yash Srivastava. */}
          <div
            className={`about-name-line ${R('', inView)}`}
            style={styleD('0.14s')}
          >
            <h3 className="about-name">I am Yash Srivastava.</h3>
          </div>

          {/* LINE 3 — About me script + arrow */}
          <div
            className={`about-script-lockup ${R('', inView)}`}
            style={styleD('0.24s')}
          >
            <span className="about-script-text">About me</span>
            <svg className="about-script-arrow" viewBox="0 0 36 52" fill="none" stroke="currentColor" strokeLinecap="round">
              <path d="M10,4 C16,8 22,18 18,28 C14,36 8,40 16,48" strokeWidth="2.2" />
              <path d="M11,42 L16,49 L22,43" strokeWidth="2.2" strokeLinejoin="round" />
            </svg>
          </div>

          {/* LINE 4 — Greetings */}
          <p
            className={`about-greeting ${R('', inView)}`}
            style={styleD('0.36s')}
          >
            Greetings ladies, gentlemen, and sentient algorithms.
          </p>

          {/* LINE 5 — Para 1 */}
          <p
            className={`about-para ${R('', inView)}`}
            style={styleD('0.46s')}
          >
            I'm a passionate <strong>Graphic Designer</strong>, <strong>creative artist</strong>, and professional pixel-pusher skilled in Photoshop, Illustrator, Figma, and Animate CC. I have extensive experience translating vague client feedback like <em>"can you make it pop?"</em> or <em>"make it feel more blue-ish modern"</em> into high-impact professional designs, custom branding materials, and digital experiences.
          </p>

          {/* LINE 6 — Para 2 */}
          <p
            className={`about-para ${R('', inView)}`}
            style={styleD('0.56s')}
          >
            I specialize in <strong>video editing</strong> and <strong>motion graphics</strong> using Adobe Premiere Pro and After Effects (yes, I have conditioned myself to press Ctrl+S every two seconds). I also have a solid grasp of <strong>web design &amp; front-end development</strong> (which is how this portfolio survived compile time), and I'm currently expanding into 3D with <strong>Autodesk Maya</strong> to master the ultimate art of modeling realistic three-dimensional spheres.
          </p>

        </div>

        {/* ── RIGHT: Portrait ── */}
        <div
          className={`about-image-col ${R('about-img-reveal', inView)}`}
          style={styleD('0.06s')}
        >
          <img
            src={yashSketch}
            alt="Yash Srivastava — Sketch Portrait"
            className="about-portrait-img"
          />
        </div>

      </div>
    </section>
  );
}
