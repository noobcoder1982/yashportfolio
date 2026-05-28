import React, { useEffect, useRef, useState, useCallback } from 'react';

const TRAIL_LENGTH = 14;
const MAGNETIC_RADIUS = 80;

export default function FilmCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const rippleContainerRef = useRef(null);

  const mouse = useRef({ x: -200, y: -200 });
  const cursor = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const trail = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 })));

  const magnetTarget = useRef(null);
  const magnetOffset = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const [label, setLabel] = useState('');
  const [isDown, setIsDown] = useState(false);

  // ── helpers ──────────────────────────────────────────────────────────────
  const lerp = (a, b, t) => a + (b - a) * t;

  const findMagnet = useCallback((mx, my) => {
    const targets = document.querySelectorAll(
      'a, button, [data-cursor-label], .kinetic-cut-strip, .action-btn, .nav-link'
    );
    let closest = null;
    let minDist = MAGNETIC_RADIUS;

    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const d = Math.hypot(mx - cx, my - cy);
      if (d < minDist) { minDist = d; closest = el; }
    });

    if (closest) {
      const r = closest.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      magnetOffset.current = { x: (mx - cx) * 0.25, y: (my - cy) * 0.25 };
      magnetTarget.current = closest;
      const lbl = closest.dataset.cursorLabel || closest.getAttribute('aria-label') || '';
      setLabel(lbl);
    } else {
      magnetTarget.current = null;
      magnetOffset.current = { x: 0, y: 0 };
      setLabel('');
    }
  }, []);

  // ── animation loop ────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      findMagnet(e.clientX, e.clientY);
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

    const onDown = (e) => { setIsDown(true); spawnRipple(e.clientX, e.clientY); };
    const onUp = () => setIsDown(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const tick = () => {
      // Cursor dot — very snappy
      cursor.current.x = lerp(cursor.current.x, mouse.current.x + magnetOffset.current.x, 0.55);
      cursor.current.y = lerp(cursor.current.y, mouse.current.y + magnetOffset.current.y, 0.55);

      // Ring — slightly lagging
      ring.current.x = lerp(ring.current.x, mouse.current.x + magnetOffset.current.x, 0.13);
      ring.current.y = lerp(ring.current.y, mouse.current.y + magnetOffset.current.y, 0.13);

      // Trail chain
      trail.current[0].x = lerp(trail.current[0].x, cursor.current.x, 0.4);
      trail.current[0].y = lerp(trail.current[0].y, cursor.current.y, 0.4);
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail.current[i].x = lerp(trail.current[i].x, trail.current[i - 1].x, 0.55);
        trail.current[i].y = lerp(trail.current[i].y, trail.current[i - 1].y, 0.55);
      }

      // Apply positions
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursor.current.x}px, ${cursor.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate(${trail.current[i].x}px, ${trail.current[i].y}px)`;
        const progress = 1 - i / TRAIL_LENGTH;
        el.style.opacity = (progress * 0.7).toFixed(3);
        const s = (progress * 8 + 4).toFixed(1);
        el.style.width = `${s}px`;
        el.style.height = `${s}px`;
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
  }, [findMagnet]);

  return (
    <>
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

      {/* Outer ring */}
      <div
        ref={ringRef}
        className={`fcursor-ring ${magnetTarget.current ? 'magnetic' : ''} ${isDown ? 'pressed' : ''}`}
      >
        {/* Film-frame corner marks */}
        <span className="fr-corner fr-tl" />
        <span className="fr-corner fr-tr" />
        <span className="fr-corner fr-bl" />
        <span className="fr-corner fr-br" />
        {label && <span className="fcursor-label">{label}</span>}
      </div>

      {/* Inner dot */}
      <div
        ref={cursorRef}
        className={`fcursor-dot ${isDown ? 'pressed' : ''}`}
      />
    </>
  );
}
