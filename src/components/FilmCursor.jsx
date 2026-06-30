import React, { useEffect, useRef, useState, useCallback } from 'react';

const TRAIL_LENGTH = 10;

export default function FilmCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const rippleContainerRef = useRef(null);

  const mouse = useRef({ x: -200, y: -200 });
  const cursor = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  
  // Blob shape state (width, height, border-radius)
  const ringSize = useRef({ w: 24, h: 24, r: 12 });
  
  const trail = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 })));
  const rafId = useRef(null);

  const [hoveredElement, setHoveredElement] = useState(null);
  const [isDown, setIsDown] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const lerp = (a, b, t) => a + (b - a) * t;

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  // Track hover elements globally
  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e) => {
      // Elements that trigger morphing
      const target = e.target.closest(
        'a, button, input[type="range"], select, .font-btn, .align-btn, .case-btn, .inspector-reset-btn, .control-generate-btn, .control-settings-btn, .tool-btn, .tab, .snav-logo, .snav-item, .mobile-pill-btn'
      );
      if (target) {
        setHoveredElement(target);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest(
        'a, button, input[type="range"], select, .font-btn, .align-btn, .case-btn, .inspector-reset-btn, .control-generate-btn, .control-settings-btn, .tool-btn, .tab, .snav-logo, .snav-item, .mobile-pill-btn'
      );
      if (target) {
        setHoveredElement(null);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isTouch]);

  // Main Cursor Animation Loop
  useEffect(() => {
    if (isTouch) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const spawnRipple = (x, y) => {
      if (!rippleContainerRef.current) return;
      const el = document.createElement('div');
      el.className = 'fcursor-ripple';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      rippleContainerRef.current.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    };

    const onDown = (e) => { 
      setIsDown(true); 
      spawnRipple(e.clientX, e.clientY); 
    };
    const onUp = () => setIsDown(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const tick = () => {
      // Determine target shape, size, border-radius, and position
      let targetX = mouse.current.x;
      let targetY = mouse.current.y;
      let targetW = 24;
      let targetH = 24;
      let targetR = 12; // circle

      if (hoveredElement) {
        const rect = hoveredElement.getBoundingClientRect();
        const style = window.getComputedStyle(hoveredElement);
        const radiusStr = style.borderRadius;
        const radiusVal = parseFloat(radiusStr) || 0;

        // Snaps to the center of the hovered element
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
        
        // Wrap slightly around the button (8px padding)
        targetW = rect.width + 8;
        targetH = rect.height + 8;
        targetR = Math.max(radiusVal + 4, 4); // match radius + spacing offset
      }

      // Lerp position of the outer ring
      ring.current.x = lerp(ring.current.x, targetX, 0.22);
      ring.current.y = lerp(ring.current.y, targetY, 0.22);

      // Lerp size of the outer ring
      ringSize.current.w = lerp(ringSize.current.w, targetW, 0.2);
      ringSize.current.h = lerp(ringSize.current.h, targetH, 0.2);
      ringSize.current.r = lerp(ringSize.current.r, targetR, 0.2);

      // Lerp inner dot - very snappy
      cursor.current.x = lerp(cursor.current.x, mouse.current.x, 0.45);
      cursor.current.y = lerp(cursor.current.y, mouse.current.y, 0.45);

      // Lerp tail trail dots
      trail.current[0].x = lerp(trail.current[0].x, cursor.current.x, 0.35);
      trail.current[0].y = lerp(trail.current[0].y, cursor.current.y, 0.35);
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail.current[i].x = lerp(trail.current[i].x, trail.current[i - 1].x, 0.45);
        trail.current[i].y = lerp(trail.current[i].y, trail.current[i - 1].y, 0.45);
      }

      // Apply style attributes
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%) ${isDown ? 'scale(0.96)' : ''}`;
        ringRef.current.style.width = `${ringSize.current.w}px`;
        ringRef.current.style.height = `${ringSize.current.h}px`;
        ringRef.current.style.borderRadius = `${ringSize.current.r}px`;
      }
      
      if (cursorRef.current) {
        // Inner dot scales down slightly on hover
        const dotScale = hoveredElement ? 'scale(0.5)' : (isDown ? 'scale(0.8)' : 'scale(1)');
        cursorRef.current.style.transform = `translate(${cursor.current.x}px, ${cursor.current.y}px) translate(-50%, -50%) ${dotScale}`;
      }

      // Trail chain visibility/animation
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate(${trail.current[i].x}px, ${trail.current[i].y}px) translate(-50%, -50%)`;
        
        // Hide trail dots entirely when morphing/snapped to prevent visual clutter
        if (hoveredElement) {
          el.style.opacity = '0';
        } else {
          const progress = 1 - i / TRAIL_LENGTH;
          el.style.opacity = (progress * 0.55).toFixed(3);
          const s = (progress * 5 + 2).toFixed(1);
          el.style.width = `${s}px`;
          el.style.height = `${s}px`;
        }
      });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, [isTouch, hoveredElement, isDown]);

  if (isTouch) return null;

  return (
    <>
      {/* Self-contained Cursor CSS */}
      <style>{`
        /* Hide system cursor on desktop */
        @media (min-width: 1025px) {
          html, body, a, button, input, select, textarea, [role="button"] {
            cursor: none !important;
          }
        }

        /* Inner Dot */
        .fcursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background-color: var(--color-primary, #D84040);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000000;
          will-change: transform;
          transition: background-color 0.3s ease;
        }

        /* Outer Blob Ring (Filled Translucent Circle) */
        .fcursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          border: none;
          background-color: rgba(216, 64, 64, 0.28); /* Warm filled circle */
          border-radius: 50%;
          pointer-events: none;
          z-index: 999999;
          box-sizing: border-box;
          will-change: transform, width, height, border-radius;
          /* Transition for color & glow changes, position handled by RAF loop */
          transition: 
            background-color 0.25s ease, 
            box-shadow 0.25s ease;
        }

        /* Hovering/Snapped state */
        .fcursor-ring.morph-active {
          background-color: rgba(216, 64, 64, 0.16); /* slightly more subtle overlay for button readability */
          box-shadow: 0 0 12px rgba(216, 64, 64, 0.22);
        }

        /* Sprocket trail dots */
        .fcursor-trail-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 4px;
          height: 4px;
          background-color: var(--text-dark, #1D1616);
          border-radius: 50%;
          pointer-events: none;
          z-index: 999998;
          will-change: transform;
          opacity: 0;
        }

        .fcursor-trail-dot.sprocket {
          border-radius: 1px;
          background-color: var(--color-primary, #D84040);
        }

        /* Click Ripple */
        .fcursor-ripple-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 999997;
        }

        .fcursor-ripple {
          position: absolute;
          width: 32px;
          height: 32px;
          border: 1px solid var(--color-primary, #D84040);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: fcursorRippleAnim 0.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        @keyframes fcursorRippleAnim {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.8;
          }
          100% {
            width: 64px;
            height: 64px;
            opacity: 0;
          }
        }
      `}</style>

      {/* Ripple container */}
      <div ref={rippleContainerRef} className="fcursor-ripple-container" />

      {/* Sprocket-hole trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className={`fcursor-trail-dot ${i % 3 === 0 ? 'sprocket' : ''}`}
        />
      ))}

      {/* Outer morphing blob ring */}
      <div
        ref={ringRef}
        className={`fcursor-ring ${hoveredElement ? 'morph-active' : ''}`}
      />

      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="fcursor-dot"
      />
    </>
  );
}
