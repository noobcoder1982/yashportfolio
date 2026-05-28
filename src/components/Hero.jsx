import React, { useState } from 'react';
import { Video } from 'lucide-react';
import moonHands from '../assets/moon_hands.jpg';

export default function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    setCoords({ x, y });
  };

  return (
    <section 
      id="home" 
      className="hero-section generative-hero brutalist-viewfinder-hero"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Technical Blueprint Grid Backdrop */}
      <div 
        className="hero-technical-grid"
        style={{ transform: `translate(${coords.x * -0.2}px, ${coords.y * -0.2}px)` }}
      ></div>

      {/* Cinematic Spotlight Backdrop */}
      <div className="spotlight-overlay"></div>
      <div className="spotlight-grain"></div>

      {/* Outer Technical Frame Indicators */}
      <div className="hero-technical-borders">
        <span className="tb-tag top-left">[ SYSTEM: CAFFEINATED ] // RENDER_READY</span>
        <span className="tb-tag top-right">FPS: 23.976 (STABLE-ISH) // REEL: MATCHED</span>
        <span className="tb-tag bottom-left">LUT: CRYING_IN_REC709_LOG</span>
      </div>

      <div className="container hero-canvas-container">
        
        {/* Bounding Box Viewfinder Selection */}
        <div 
          className="brutal-bounding-box view-finder-box animate-float"
          style={{ 
            transform: `rotateX(${coords.y * -0.15}deg) rotateY(${coords.x * 0.15}deg) translate(${coords.x * 0.1}px, ${coords.y * 0.1}px)`,
          }}
        >
          {/* SEMI-BRUTALIST VIEWPORT ACCENTS */}
          {/* 1. Broadcast Color Calibration Strip */}
          <div className="brutal-color-strip">
            <span className="cs-block cs-white"></span>
            <span className="cs-block cs-grey-light"></span>
            <span className="cs-block cs-grey-mid"></span>
            <span className="cs-block cs-grey-dark"></span>
            <span className="cs-block cs-accent"></span>
          </div>

          {/* 2. Audio Channel Decibel Ticks (Left & Right Sides) */}
          <div className="brutal-db-ruler left-ruler">
            <span>0dB</span>
            <span>-6</span>
            <span>-12</span>
            <span>-24</span>
            <span>-INF</span>
          </div>

          <div className="brutal-db-ruler right-ruler">
            <span>L_CH</span>
            <span>• •</span>
            <span>• •</span>
            <span>• •</span>
            <span>R_CH</span>
          </div>

          {/* 3. Outer Resolution Tag Anchored to Border */}
          <div className="brutal-dimensions-badge">
            <span>860 × 480 PX [2.39:1]</span>
          </div>
          
          {/* Active selection handles */}
          <div className="bbox-handle handle-tl"></div>
          <div className="bbox-handle handle-tc"></div>
          <div className="bbox-handle handle-tr"></div>
          <div className="bbox-handle handle-ml"></div>
          <div className="bbox-handle handle-mr"></div>
          <div className="bbox-handle handle-bl"></div>
          <div className="bbox-handle handle-bc"></div>
          <div className="bbox-handle handle-br"></div>

          {/* Cinematic Camera Viewfinder Crop Marks */}
          <div className="crop-mark mark-tl"></div>
          <div className="crop-mark mark-tr"></div>
          <div className="crop-mark mark-bl"></div>
          <div className="crop-mark mark-br"></div>
          <div className="viewfinder-crosshair">+</div>



          {/* Sub Header: Post-Production Scope */}
          <div className="canvas-subtitle">
            <span className="sub-graphic"><Video size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> POST</span>
            <span className="sub-design">PRODUCTION</span>
          </div>

          {/* Typographic Lockup: EDIT[moon]R */}
          <div className="canvas-title-wrapper">
            <span className="title-part">Edit</span>
            
            {/* Glowing Moon Photo Visual */}
            <div className="glowing-orb-container">
              <div className="orb-halo-spotlight"></div>
              <img 
                src={moonHands} 
                alt="Realistic glowing moon cradled in hands" 
                className="moon-photo-img"
              />
            </div>

            <span className="title-part title-lio">R</span>

            {/* Neon Green Cursive Signature Yar Yash - Perfectly centered */}
            <div className="cursive-signature-overlay">
              Yar Yash
            </div>
          </div>

          {/* Viewfinder metadata overlay */}
          <div className="viewfinder-meta">
            <span className="meta-item">4K UHD</span>
            <span className="meta-divider">|</span>
            <span className="meta-item">2.39:1 CINEMASCOPE</span>
            <span className="meta-divider">|</span>
            <span className="meta-item">FPS 23.976</span>
          </div>

          {/* Real-time Viewfinder Coordinates Overlay */}
          <div className="viewfinder-coords">
            <span className="vc-tag">CUR.POS:</span>
            <span className="vc-val">{coords.x}PX, {coords.y}PX</span>
          </div>

        </div>



      </div>
    </section>
  );
}
