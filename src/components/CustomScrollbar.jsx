import React, { useState, useEffect, useRef } from 'react';

export default function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      
      setScrollProgress(progress);
      
      // Show scrollbar when scrolling
      setIsVisible(true);
      
      // Clear existing timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      
      // Hide scrollbar after 1.5 seconds of no scrolling
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`custom-scrollbar ${isVisible ? 'scrollbar-visible' : ''}`}>
      <div className="scrollbar-track">
        <div 
          className="scrollbar-progress" 
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}

// Made with Bob
