import React, { useState, useEffect, useRef } from 'react';

export default function SeekBar() {
  const [progress, setProgress]       = useState(0);
  const [thumbH, setThumbH]           = useState(20);   // % height of thumb
  const [thumbTop, setThumbTop]       = useState(0);    // % top of thumb
  const [visible, setVisible]         = useState(false);
  const hideTimer                     = useRef(null);
  const trackRef                      = useRef(null);
  const isDragging                    = useRef(false);

  const getScrollElement = () => {
    const isDesktop = window.innerWidth >= 1025;
    const wrapper = document.querySelector('.app-wrapper');
    return isDesktop && wrapper ? wrapper : null;
  };

  const update = () => {
    const scrollEl = getScrollElement();
    let scrollTop, viewH, totalH;

    if (scrollEl) {
      scrollTop = scrollEl.scrollTop;
      viewH     = scrollEl.clientHeight;
      totalH    = scrollEl.scrollHeight;
    } else {
      scrollTop = window.scrollY;
      viewH     = window.innerHeight;
      totalH    = document.documentElement.scrollHeight;
    }

    const scrollable = totalH - viewH;
    if (scrollable <= 0) return;

    const pct       = (scrollTop / scrollable) * 100;
    const thumbPct  = Math.max(5, (viewH / totalH) * 100);
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

    // Use capture phase so scroll events inside .app-wrapper can be intercepted
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onResize);
      clearTimeout(hideTimer.current);
    };
  }, []);

  /* Click on track — jump to position */
  const handleTrackClick = (e) => {
    if (!trackRef.current) return;
    const rect     = trackRef.current.getBoundingClientRect();
    const clickY   = e.clientY - rect.top;
    const pct      = clickY / rect.height;
    
    const scrollEl = getScrollElement();
    if (scrollEl) {
      const scrollable = scrollEl.scrollHeight - scrollEl.clientHeight;
      scrollEl.scrollTo({ top: pct * scrollable, behavior: 'smooth' });
    } else {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: pct * scrollable, behavior: 'smooth' });
    }
  };

  /* Drag thumb */
  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    const startY   = e.clientY;
    
    const scrollEl = getScrollElement();
    const startTop = scrollEl ? scrollEl.scrollTop : window.scrollY;

    const onMove = (me) => {
      const dy = me.clientY - startY;
      let totalH, viewH, trackH;
      
      if (scrollEl) {
        totalH = scrollEl.scrollHeight;
        viewH  = scrollEl.clientHeight;
        trackH = trackRef.current?.getBoundingClientRect().height ?? viewH;
        const scrollDelta = (dy / trackH) * (totalH - viewH);
        scrollEl.scrollTop = startTop + scrollDelta;
      } else {
        totalH = document.documentElement.scrollHeight;
        viewH  = window.innerHeight;
        trackH = trackRef.current?.getBoundingClientRect().height ?? viewH;
        const scrollDelta = (dy / trackH) * (totalH - viewH);
        window.scrollTo(0, startTop + scrollDelta);
      }
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
