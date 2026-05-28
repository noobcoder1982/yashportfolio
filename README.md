# 🎬 Yash Portfolio — Ultra-Premium Cinematic & Post-Production Showcase

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-8.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Style](https://img.shields.io/badge/CSS-Vanilla%20CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![License](https://img.shields.io/badge/License-MIT-000000?style=for-the-badge)](https://opensource.org/licenses/MIT)

*An immersive, hyper-aesthetic interactive developer & video-editor portfolio custom-tailored for creative directors, narrative colorists, and post-production specialists.*

[✨ Live Preview](#-local-installation-quick-start) • [⚡ Interactive Features](#-interactive-key-features) • [🎥 Video Integration](#-google-drive-video-integration-guide) • [🎵 Ambient Music](#-music-deck-customization) • [🎨 Themes](#-case-study-multitheme-engine)

</div>

---

## 🎭 Project Introduction

Welcome to **Yash Portfolio**, a state-of-the-art interactive digital stage built for directors and video editors. Unlike standard minimalist static portfolios, this site is designed with a premium, brutalist cinematic feel—blending fluid keyframe dynamics, dark-mode glassmorphic layouts, and customizable interactive dossiers.

This showcase allows visitors to preview high-definition video assets directly in a fully-themed modal environment, listen to ambient lo-fi tracks through an integrated cassette audio console, and browse selected pacing cuts through a responsive kinetic accordion block.

---

## ⚡ Interactive Key Features

### 1. 🎬 Cinematic Kinetic Grid (Selected Cuts)
A horizontal accordion/strip layout styled in a clean Swiss print aesthetic. Hovering over a project strip shrinks the others and expands the selected strip with a subtle high-contrast outline. Clicking a project triggers an immersive **curtain-opening background spread** that scales the strip directly into a full-page editorial case study!

### 2. 🎨 Dossier Multitheme Engine (`Neon` | `Editorial` | `Matrix`)
Every project detail page has an interactive real-time theme switcher at the top. Visitors can toggle between three custom-designed typographic stylesheets with a single click:
*   **🔵 Neon Mode**: Glitchy neon typography, dark grid backgrounds, glowing status borders, and cybernetic vibes.
*   **📖 Editorial Mode**: Clean minimalist layout, high-contrast black-and-white grids, elegant serif typography (`Cinzel`/`Playfair` styled), and spacious structures.
*   **🟢 Matrix Mode**: Terminal green monochrome style, retro pixelated fonts, simulated CRT screen flickers, falling ASCII numbers, and vintage hacker command-line aesthetic.

### 3. 🖱️ Cine-Reel Custom Cursor
A responsive, high-performance mouse cursor tracking system that overlays a retro movie film reel around your pointer. It includes real-time counter indicators (e.g., active frame tracking and timestamp tickers) that animate and snap satisfyingly onto clickable links and interactive cards.

### 4. 🎵 Cyber cassette Audio Player
A gorgeous retro tape cassette deck console widget anchored to the screen. It features:
*   Dynamic SVG audio visualizer equalizer bars that pulse in sync with the audio state.
*   Fully integrated media playback control (Play, Pause, Mute, Volume scrubbers, and Track Shuffle).
*   Automatic playback unlock handlers tracking the user's first document click to bypass browser media restrictions.

### 5. ⏱️ Cinematic Seek Bar HUD
A subtle post-production timeline seek bar pinned to the absolute bottom of the screen. As you scroll down the page, it fills up dynamically, giving the user a literal visual indicator of their scroll position styled exactly like an editing suite's sequence playhead.

---

## 📂 Repository Blueprint (File Structure)

Understanding the folder structure is simple. Everything is highly modularized and self-contained:

```text
Yash Portfolio/
├── public/                     # Static media files & textures
│   ├── music/                  # Add your local MP3 tracks here!
│   │   ├── Kintsugi Grid.mp3
│   │   └── Paper Lantern Grid.mp3
│   ├── cinematic_cover.png     # Selected Cuts background covers
│   ├── commercial_cover.png
│   ├── documentary_cover.png
│   ├── social_cover.png
│   ├── favicon.svg             # Page tab icon
│   └── icons.svg               # Web vector symbols
├── src/
│   ├── assets/                 # SVGs and UI graphics
│   ├── components/             # Reusable modular visual components
│   │   ├── About.jsx           # Backstory, client log, and bio details
│   │   ├── Contact.jsx         # Dynamic email feedback layout & social slots
│   │   ├── CustomScrollbar.jsx # Tailored scroll momentum smoothing
│   │   ├── FilmCursor.jsx      # Canvas-based cine-wheel custom cursor & HUD
│   │   ├── Footer.jsx          # Site copyright & real-time clock footer
│   │   ├── Header.jsx          # Persistent interactive glass navigation bar
│   │   ├── Hero.jsx            # Cinematic opening title & headline sequence
│   │   ├── MusicPlayer.jsx     # Cassette audio controller & visualizer deck
│   │   ├── Preloader.jsx       # Brutalist black curtain intro loader text
│   │   ├── Projects.jsx        # Project catalog database & kinetic accordion strips
│   │   ├── ProjectDetailPage.jsx # Rich case-study dossiers & theme switcher
│   │   ├── SeekBar.jsx         # Post-production playhead scroll progress HUD
│   │   └── Skills.jsx          # Skill charts, grids & post-production badges
│   ├── App.css                 # Advanced component-level visual animations & layouts
│   ├── App.jsx                 # Site coordinator & section mounting core
│   ├── index.css               # Design system tokens, variables, & fonts
│   └── main.jsx                # DOM mounting compiler hook
├── package.json                # Project dependencies manifest
├── vite.config.js              # Vite optimization engine settings
└── README.md                   # Complete developer manual (This file!)
```

---

## 🚀 Local Installation & Quick Start

Get your local portfolio up and running in **less than 2 minutes** by following these steps:

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (Version 18 or above recommended) installed on your computer.

### Step 1: Clone the Repository
Open your terminal (PowerShell, Command Prompt, or Bash) and clone the workspace:
```bash
git clone https://github.com/noobcoder1982/yashportfolio.git
```

### Step 2: Navigate into the Project Folder
```bash
cd "Yash Portfolio"
```

### Step 3: Install Project Dependencies
Use `npm` to install all modular packages defined in the manifest:
```bash
npm install
```

### Step 4: Launch the Local Dev Server
Fire up the lightning-fast Vite developer server:
```bash
npm run dev
```

### Step 5: Open Your Browser 🎉
Once the terminal outputs the local URL, open it in your browser:
*   👉 **http://localhost:5173** (or the port specified in your terminal window)

---

## 🎥 Google Drive Video Integration Guide

This portfolio features direct, full-screen embedded video previews for case studies. You can host your video editing sequences directly on **Google Drive** for free, and embed them beautifully inside the case study containers.

Follow these simple steps to fetch the correct link format:

### 1. Upload & Share Your Video
*   Upload your video (`.mp4`, `.mov`, etc.) to your **Google Drive** folder.
*   Right-click the video file -> click **Share** -> click **Share**.
*   Under **General access**, change it from *Restricted* to **Anyone with the link**.
*   Ensure the role is set to **Viewer**. Click **Done**.

### 2. Grab the Embedded Link Format
*   **Double-click** the video file inside Google Drive to open the browser video player.
*   Look at the top-right corner and click the **three vertical dots** (`More actions`).
*   Select **Open in new window** from the dropdown menu.
*   Once the new tab loads, click the **three vertical dots** in the top-right corner again.
*   Select **Embed item...** from the menu.
*   A pop-up modal will appear containing an `<iframe>` tag. **Copy ONLY the source URL inside the `src` attribute.** It will look like this:
    ```text
    https://drive.google.com/file/d/1_V4QjO7Xp7C2yqJ-P5g3XgUaH7l9_K8n/preview
    ```
    *(Notice it must end in `/preview` instead of `/view` or `/edit`!)*

### 3. Add to Your Projects Database
*   Open the file [src/components/Projects.jsx](file:///c:/Users/DELL/Desktop/Yash%20Portfolio/src/components/Projects.jsx) in your editor.
*   Locate the `projectsData` array block.
*   Replace the placeholder `driveLink` with your copied URL:
    ```javascript
    {
      title: 'commercial brand identity',
      desc: 'High-pacing post-production sequence detailing...',
      category: 'commercial',
      number: '01',
      driveLink: 'https://drive.google.com/file/d/YOUR_NEW_VIDEO_ID_HERE/preview',
      // ... rest of project details
    }
    ```

---

## 🎵 Music Deck Customization

The retro audio deck in the corner looks for local MP3 tracks stored in the public folder. You can add your own custom background tracks:

1.  Drag and drop your audio files into the `public/music/` directory.
2.  Open [src/components/MusicPlayer.jsx](file:///c:/Users/DELL/Desktop/Yash%20Portfolio/src/components/MusicPlayer.jsx).
3.  Locate the constant array `UPLOADED_TRACKS` at the top of the file:
    ```javascript
    const UPLOADED_TRACKS = [
      {
        id: 'track-1',
        title: 'Your Song Title 01',
        artist: 'Producer/Artist Name',
        url: '/music/Kintsugi Grid.mp3' // Path matches your public directory filename
      },
      {
        id: 'track-2',
        title: 'Your Song Title 02',
        artist: 'Producer/Artist Name',
        url: '/music/Paper Lantern Grid.mp3'
      }
    ];
    ```
4.  Save the file. The visualizer and custom shuffle tape-hubs will automatically update and cycle through your audio files!

---

## 🎨 Case Study Multitheme Engine

If you want to fine-tune the styles, colors, or typography for the neon grid, editorial print layout, or green retro command matrix:

*   **Global Variables**: View [src/index.css](file:///c:/Users/DELL/Desktop/Yash%20Portfolio/src/index.css) to tweak the root colors, custom HSL color definitions, and font integrations.
*   **Theme Blocks**: Open [src/components/ProjectDetailPage.jsx](file:///c:/Users/DELL/Desktop/Yash%20Portfolio/src/components/ProjectDetailPage.jsx). Theme-specific UI rendering and classes are managed cleanly with React template classes:
    ```javascript
    // Toggles between neon, editorial, and matrix styling layouts
    <div className={`project-detail-overlay theme-${activeTheme}`}>
    ```
*   **Visual Assets**: Make sure to drop custom covers for your project strips into the `/public` root folder, named consistently and mapped in `coverImage` fields.

---

## 📦 Production Build & Deployment

When your portfolio is customized and you are ready to publish it to the web:

### Create a Optimized Production Bundle
Run the build script in your terminal:
```bash
npm run build
```
Vite will compile and compress all Javascript, CSS, and assets, outputting a highly optimized folder named **`dist`** at the project root.

### 🌐 Where to Host for Free?
1.  **Vercel** (Highly Recommended):
    *   Install the vercel CLI (`npm i -g vercel`) and run `vercel` in the project root, or simply connect your GitHub repository directly in the Vercel dashboard. It detects Vite automatically and deploys in seconds.
2.  **Netlify**:
    *   Drag and drop the newly created `dist/` folder directly onto the Netlify dropzone web console, or connect your repository.
3.  **GitHub Pages**:
    *   Push your code to GitHub and set up a deployment workflow utilizing GitHub Actions to automatically build and host static files from your repo.

---

<div align="center">

*Crafted with 🎬 cinematic passion by **Yash**. Hit the ⭐ star button on GitHub if you love this design template!*

</div>
