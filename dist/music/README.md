# 🎵 Yash Portfolio - Music Storage Directory

Place your custom audio tracks (`.mp3` files) in this folder. Vercel will bundle and host these files statically, allowing the audio player to stream them natively anywhere in the world.

## 🚀 How to Customize Tracks:

1. **Add your audio files**:
   Drop your `.mp3` files directly into this directory (`public/music/`).
   
   For example, save them as:
   - `public/music/cyberpunk-sunset.mp3`
   - `public/music/vhs-tape.mp3`
   - `public/music/deep-focus.mp3`

2. **Track Matching**:
   The built-in `MusicPlayer` is pre-configured to look for these files. If they are missing, the player dynamically falls back to streaming high-quality royalty-free ambient audio from a public CDN, ensuring your site never runs into 404 audio errors on launch!

3. **Updating the Tracklist Config**:
   If you want to add more songs or change the titles/artists, open `src/components/MusicPlayer.jsx` and modify the `DEFAULT_TRACKS` configuration array!

---
*Created automatically with precision for Yar Yash.*
