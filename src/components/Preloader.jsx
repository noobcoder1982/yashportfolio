import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/*
  BRUTALIST MINIMAL PRELOADER
  ─────────────────────────────
  All black. All type. No decorations.
  Two horizontal curtains split open to reveal the site.
*/

const LINES = [
  { text: 'POST-PRODUCTION',  weight: '900', size: 'xl',  align: 'left'  },
  { text: '&',                weight: '900', size: 'sym', align: 'center' },
  { text: 'CREATIVE DIRECTION', weight: '400', size: 'lg', align: 'right' },
];

export default function Preloader({ onComplete }) {
  const rootRef    = useRef(null);
  const topRef     = useRef(null);
  const btmRef     = useRef(null);
  const lineRef    = useRef(null);
  const onDoneRef  = useRef(onComplete);
  const progressObj = useRef({ val: 0 });

  useEffect(() => { onDoneRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── INITIAL STATE ── */
      gsap.set('.pl-char',          { yPercent: 105, opacity: 0 });
      gsap.set('.pl-index-num',     { opacity: 0 });
      gsap.set('.pl-meta-line',     { opacity: 0, xPercent: -6 });
      gsap.set('.pl-rule',          { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.pl-pct-display',   { opacity: 0 });
      gsap.set('.pl-role-line',     { opacity: 0, yPercent: 30 });
      gsap.set(lineRef.current,     { scaleX: 0, opacity: 0 });
      gsap.set([topRef.current, btmRef.current], { yPercent: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      /* 1 — index number ticks in */
      tl.to('.pl-index-num', { opacity: 1, duration: 0.4 }, 0.1)

      /* 2 — top rule draws left→right */
      .to('.pl-rule', { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, 0.15)

      /* 3 — each word's chars rise up through a clip */
      .to('.pl-char', {
        yPercent: 0, opacity: 1,
        duration: 0.7,
        stagger: { amount: 0.55, from: 'start' },
        ease: 'expo.out',
      }, 0.3)

      /* 4 — meta line slides in */
      .to('.pl-meta-line', {
        opacity: 1, xPercent: 0,
        duration: 0.6, stagger: 0.1,
      }, 0.7)

      /* 5 — seam line */
      .to(lineRef.current, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.inOut' }, 0.9)

      /* 6 — role lines stagger up */
      .to('.pl-role-line', {
        opacity: 1, yPercent: 0,
        duration: 0.5, stagger: 0.07,
      }, 1.0)

      /* 7 — pct counter appears */
      .to('.pl-pct-display', { opacity: 1, duration: 0.3 }, 1.1);

      /* ── PROGRESS ── */
      const counter = progressObj.current;
      gsap.to(counter, {
        val: 100,
        duration: 2.6,
        ease: 'power1.inOut',
        delay: 0.7,
        onUpdate() {
          const v = Math.round(counter.val);
          const pct = document.querySelector('.pl-pct-val');
          if (pct) pct.textContent = String(v).padStart(3, '0');
          const fill = document.querySelector('.pl-progress-fill');
          if (fill) gsap.set(fill, { scaleX: v / 100 });
        },
        onComplete() {

          /* ── EXIT SEQUENCE ── */
          const exit = gsap.timeline({
            onComplete() {
              if (onDoneRef.current) onDoneRef.current();
            }
          });

          /* all text blurs out + dissolves */
          exit.to('.pl-char', {
            yPercent: -105, opacity: 0,
            duration: 0.5,
            stagger: { amount: 0.3, from: 'end' },
            ease: 'expo.in',
          }, 0)

          .to(['.pl-meta-line', '.pl-index-num', '.pl-pct-display', '.pl-rule', '.pl-role-line'], {
            opacity: 0, duration: 0.3, ease: 'power2.in', stagger: 0.04,
          }, 0)

          .to(lineRef.current, {
            scaleX: 0, opacity: 0,
            duration: 0.35, ease: 'expo.in',
          }, 0.1)

          /* brief pause at black — then curtains split */
          .to(topRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'expo.inOut',
          }, 0.5)

          .to(btmRef.current, {
            yPercent: 100,
            duration: 0.85,
            ease: 'expo.inOut',
          }, 0.5)

          /* root unmounts cleanly */
          .set(rootRef.current, { display: 'none' }, 1.4);
        }
      });

    }, rootRef.current);

    return () => ctx.revert();
  }, []);

  /* split name into individually wrapped chars for per-char animation */
  function SplitName({ text }) {
    return (
      <>
        {text.split('').map((ch, i) => (
          <span key={i} className="pl-char-wrap">
            <span className="pl-char">{ch === ' ' ? '\u00A0' : ch}</span>
          </span>
        ))}
      </>
    );
  }

  const roles = ['EDITOR', 'MOTION DESIGNER', 'ART DIRECTOR', 'VISUAL ARTIST', 'WEB DEVELOPER'];

  return (
    <div ref={rootRef} className="pl-root">

      {/* ── TOP CURTAIN ── */}
      <div ref={topRef} className="pl-curtain pl-top">

        {/* top-left index */}
        <div className="pl-index-num">001</div>

        {/* top-right meta */}
        <div className="pl-tl-meta">
          <span className="pl-meta-line">PORTFOLIO 2025</span>
          <span className="pl-meta-line">CREATIVE DIRECTION</span>
        </div>

        {/* horizontal rule */}
        <div className="pl-rule" />

        {/* MAIN NAME — huge brutalist type */}
        <div className="pl-name-block">
          <div className="pl-name-overflow">
            <h1 className="pl-name-word">
              <SplitName text="YASH" />
            </h1>
          </div>
        </div>

      </div>

      {/* ── SEAM ── */}
      <div ref={lineRef} className="pl-seam" />

      {/* ── BOTTOM CURTAIN ── */}
      <div ref={btmRef} className="pl-curtain pl-btm">

        {/* role words */}
        <div className="pl-roles">
          {roles.map((r, i) => (
            <span key={r} className="pl-role-line" style={{ '--ri': i }}>{r}</span>
          ))}
        </div>

        {/* progress */}
        <div className="pl-progress-block">
          <div className="pl-progress-track">
            <div className="pl-progress-fill" />
          </div>
          <div className="pl-pct-display">
            <span className="pl-pct-val">000</span>
            <span className="pl-pct-sym">%</span>
          </div>
        </div>

        {/* bottom-right stamp */}
        <div className="pl-stamp">©{new Date().getFullYear()} ALL RIGHTS RESERVED</div>

      </div>

    </div>
  );
}
