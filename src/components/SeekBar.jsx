import React, { useState, useEffect, useRef } from 'react';

export default function SeekBar() {
  const [progress, setProgress]       = useState(0);
  const [thumbH, setThumbH]           = useState(20);   // % height of thumb
  const [thumbTop, setThumbTop]       = useState(0);    // % top of thumb
  const [visible, setVisible]         = useState(false);
  const hideTimer                     = useRef(null);
  const trackRef                      = useRef(null);
  const isDragging                    = useRef(false);

  const update = () => {
    const scrollTop  = window.scrollY;
    const viewH      = window.innerHeight;
    const totalH     = document.documentElement.scrollHeight;
    const scrollable = totalH - viewH;
    if (scrollable <= 0) return;

    const pct       = (scrollTop / scrollable) * 100;
    const thumbPct  = Math.max(5, (viewH / totalH) * 100);
    // thumb top: map scrollPct into the remaining track space
    const topPct    = pct * (1 - thumbPct / 100);

    setProgress(pct);
    setThumbH(thumbPct);
    setThumbTop(topPct);
  };

  const showBar = () => {
    setVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!isDragging.current) setVisible(false);
    }, 1800);
  };

  useEffect(() => {
    const onScroll = () => { update(); showBar(); };
    const onResize = () => { update(); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(hideTimer.current);
    };
  }, []);

  /* Click on track — jump to position */
  const handleTrackClick = (e) => {
    if (!trackRef.current) return;
    const rect   = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const pct    = clickY / rect.height;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: pct * scrollable, behavior: 'smooth' });
  };

  /* Drag thumb */
  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    const startY   = e.clientY;
    const startTop = window.scrollY;

    const onMove = (me) => {
      const dy = me.clientY - startY;
      const totalH = document.documentElement.scrollHeight;
      const viewH  = window.innerHeight;
      const trackH = trackRef.current?.getBoundingClientRect().height ?? viewH;
      const scrollDelta = (dy / trackH) * (totalH - viewH);
      window.scrollTo(0, startTop + scrollDelta);
    };

    const onUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      hideTimer.current = setTimeout(() => setVisible(false), 1800);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  return (
    <div className={`seekbar-wrapper${visible ? ' seekbar-visible' : ''}`}>
      <div
        className="seekbar-track"
        ref={trackRef}
        onClick={handleTrackClick}
      >
        {/* Fill — shows scroll progress */}
        <div className="seekbar-fill" style={{ height: `${progress}%` }} />

        {/* Draggable thumb */}
        <div
          className="seekbar-thumb"
          style={{ top: `${thumbTop}%`, height: `${thumbH}%` }}
          onMouseDown={handleThumbMouseDown}
          onMouseEnter={() => { clearTimeout(hideTimer.current); setVisible(true); }}
        />
      </div>
    </div>
  );
}
