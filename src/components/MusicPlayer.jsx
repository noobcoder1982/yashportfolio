import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music, ChevronDown, Radio } from 'lucide-react';

// Exclusively look for user uploaded local tracks in public/music/
const UPLOADED_TRACKS = [
  {
    id: 'track-1',
    title: 'Custom Track 01',
    artist: 'Yash Portfolio',
    url: '/music/track1.mp3'
  },
  {
    id: 'track-2',
    title: 'Custom Track 02',
    artist: 'Yash Portfolio',
    url: '/music/track2.mp3'
  },
  {
    id: 'track-3',
    title: 'Custom Track 03',
    artist: 'Yash Portfolio',
    url: '/music/track3.mp3'
  }
];

export default function MusicPlayer({ musicAutoplay }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(60);
  const [tracks] = useState(UPLOADED_TRACKS);
  
  // Playlist shuffling engine queue
  const [shuffledQueue, setShuffledQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(UPLOADED_TRACKS[0]);

  // UI state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Animated visualizer values
  const [barHeights, setBarHeights] = useState([20, 20, 20, 20]);

  const audioRef = useRef(null);

  // 1. Shuffle queue generator on mount
  useEffect(() => {
    generateShuffledQueue();
  }, []);

  const generateShuffledQueue = () => {
    const indices = Array.from({ length: UPLOADED_TRACKS.length }, (_, i) => i);
    // Fisher-Yates Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledQueue(indices);
    setQueueIndex(0);
    setCurrentTrack(UPLOADED_TRACKS[indices[0]]);
  };

  // 2. Listen to preloader launch command (Autoplay)
  useEffect(() => {
    if (musicAutoplay && audioRef.current && !isInitialized) {
      setIsInitialized(true);
      setIsPlaying(true);
      // Delayed playback start for smooth preloader slide transition
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => console.log('Lofi deck successfully unlocked & playing.'))
            .catch(err => {
              console.log('Autoplay play hook deferred:', err);
              // Fallback: listen for any page interactions if browser blocks
              const unlockAudio = () => {
                if (audioRef.current) {
                  audioRef.current.play().catch(e => console.log(e));
                  setIsPlaying(true);
                }
                window.removeEventListener('click', unlockAudio);
              };
              window.addEventListener('click', unlockAudio);
            });
        }
      }, 350);
    }
  }, [musicAutoplay, isInitialized]);

  // 3. Fallback for manual user clicks (Autoplay backup)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isInitialized) {
        setIsInitialized(true);
        setIsPlaying(true);
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => console.log('Audio activated via user focus.'))
            .catch(err => console.log(err));
        }
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    if (!musicAutoplay) {
      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);
    }

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isInitialized, musicAutoplay]);

  // 4. Audio volume & source syncing
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Playback sync
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Playback waiting for focus.');
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // 5. Bouncing Equalizer Bars loop
  useEffect(() => {
    if (!isPlaying) {
      setBarHeights([4, 4, 4, 4]);
      return;
    }

    const interval = setInterval(() => {
      setBarHeights(
        Array.from({ length: 4 }).map(() => Math.floor(Math.random() * 22) + 4)
      );
    }, 110);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // 6. Queue control navigation
  const handleNextTrack = () => {
    if (shuffledQueue.length === 0) return;

    let nextIndex = queueIndex + 1;
    
    // Reshuffle and loop back if we completed the list
    if (nextIndex >= shuffledQueue.length) {
      const indices = Array.from({ length: tracks.length }, (_, i) => i).sort(() => Math.random() - 0.5);
      setShuffledQueue(indices);
      nextIndex = 0;
    }
    
    setQueueIndex(nextIndex);
    const track = tracks[shuffledQueue[nextIndex]];
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleTrackEnded = () => {
    handleNextTrack();
  };

  const handleAudioError = (e) => {
    console.log(`Audio read error. Ensure you have placed files inside public/music/ named track1.mp3, track2.mp3, etc.`);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    if (!isInitialized) setIsInitialized(true);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const toggleCollapse = (e) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`cyber-music-player ${isCollapsed ? 'player-collapsed' : 'player-expanded'}`}
      onClick={() => isCollapsed && setIsCollapsed(false)}
      title={isCollapsed ? 'Expand Cyber Deck Audio Player' : ''}
    >
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop={false} // Managed by our dynamic shuffle engine
        onEnded={handleTrackEnded}
        onError={handleAudioError}
        preload="auto"
      />

      {/* COLLAPSED VIEW: Glowing headphone musical widget */}
      {isCollapsed ? (
        <div className="player-minimal-indicator">
          <div className={`minimal-eq-rings ${isPlaying ? 'spinning-glow' : ''}`}>
            <Music size={15} className="minimal-note-icon" />
          </div>
          <span className="minimal-tag">AUDIO</span>
        </div>
      ) : (
        /* EXPANDED VIEW: Complete micro tape console deck */
        <div className="player-deck-container">
          
          {/* Header Bar */}
          <div className="deck-header">
            <div className="deck-title-lock">
              <Radio size={11} className="deck-icon pulsing-red" />
              <span>DECK_01 // DISK_AUDIO</span>
            </div>
            <button className="deck-collapse-btn" onClick={toggleCollapse} aria-label="Minimize player">
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Cassette Tape Visual & Equalizer Bars */}
          <div className="deck-mid-section">
            
            {/* Cassette vector hubs */}
            <div className="tape-illustration">
              <div className={`tape-hub left-hub ${isPlaying ? 'rotating-hub' : ''}`}>
                <span className="hub-notch"></span>
                <span className="hub-notch"></span>
              </div>
              <div className={`tape-hub right-hub ${isPlaying ? 'rotating-hub' : ''}`}>
                <span className="hub-notch"></span>
                <span className="hub-notch"></span>
              </div>
            </div>

            {/* Bouncing Spectrogram Bars */}
            <div className="mini-equalizer-rack">
              {barHeights.map((h, i) => (
                <div 
                  key={i} 
                  className="eq-bar" 
                  style={{ height: `${h}px` }}
                ></div>
              ))}
            </div>

          </div>

          {/* Digital Metadata Display */}
          <div className="deck-meta-readout">
            <div className="meta-scrolling-ticker">
              <span className="track-details">
                {currentTrack.title} — {currentTrack.artist} [LOCAL_DISK]
              </span>
            </div>
          </div>

          {/* Lower Control Actions */}
          <div className="deck-footer-controls">
            
            {/* Play/Pause Button */}
            <button 
              className={`deck-action-btn btn-playpause ${isPlaying ? 'active' : ''}`}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause lofi sequence' : 'Play lofi sequence'}
            >
              {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
            </button>

            {/* Next Track Button */}
            <button 
              className="deck-action-btn btn-next"
              onClick={(e) => { e.stopPropagation(); handleNextTrack(); }}
              aria-label="Skip to next shuffled track"
            >
              <SkipForward size={13} fill="currentColor" />
            </button>

            {/* Mute toggle button */}
            <button 
              className={`deck-action-btn btn-mute ${isMuted ? 'muted' : ''}`}
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>

            {/* Inline volume scrubber slider */}
            <div className="deck-volume-slider-container" onClick={(e) => e.stopPropagation()}>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="deck-vol-input" 
                title={`Volume: ${volume}%`}
              />
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
