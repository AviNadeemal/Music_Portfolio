import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import StrokeText from '../../components/StrokeText';

const SOCIAL_LINKS = {
  facebook:   "https://www.facebook.com/share/1GFFmHnYnR/?mibextid=wwXIfr",
  youtube:    "https://youtube.com/@dhyanhewage?si=k-ZK6jA0oFhAiuc0",
  instagram:  "https://www.instagram.com/dhyanhewage?igsh=Y2UxdDlkdmdvN25s&utm_source=qr",
  spotify:    "https://open.spotify.com/artist/3ES7kGNf8O344XSDG3kW8G?si=FHUnqBEETFWzGD5y1Tyubg",
  tiktok:     "https://www.tiktok.com/@dhyanhewage?_r=1&_t=ZT-97m6Mh408ZK",
  appleMusic: "https://music.apple.com/us/artist/dhyan-hewage/1449254201",
};

const SPOTIFY_PLAYLIST_ID = "37i9dQZF1DZ06evO282gHE";
const APPLE_MUSIC_ID   = "1449254201";
const PURCHASE_URL = "https://ceynk.link/dhyan/shop/numba-dun-adare-the-album?purchase=true";

const Home = () => {
  const musicSectionRef = useRef(null);
  const [isMusicVisible, setIsMusicVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMusicVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (musicSectionRef.current) {
      observer.observe(musicSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            className="hero-bg-zoom w-full h-full object-cover object-center md:object-[15%_center] opacity-65 md:opacity-80 grayscale-[25%]"
            src="/images/home-bg.jpg"
            alt="Dhyan Hewage"
          />
          {/* Subtle horizontal overlay for text clarity */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-transparent via-background/20 to-background/90"></div>
          
          {/* Radial accent blur */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(2,49,250,0.12)_0%,rgba(11,19,38,0)_70%)]"></div>

          {/* Smooth Bottom Fade Transition */}
          <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none"></div>
        </div>

        {/* Hero Content Layer */}
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 items-center min-h-screen pt-20 pb-16">
          <div className="md:col-span-6 md:col-start-7 text-center md:text-right flex flex-col items-center md:items-end w-full">
            
            {/* Artist Name */}
            <div className="mb-6 flex flex-col items-center md:items-end w-full">
              <h1 className="font-headline tracking-tight text-on-surface leading-none drop-shadow-2xl flex flex-col items-center md:items-end w-full">
                <StrokeText
                  text="DHYAN"
                  strokeColor="#E0E2EC"
                  fillColor="#E0E2EC"
                  strokeWidth={1.4}
                  drawDuration={1.6}
                  fillDelay={0.2}
                  stagger={0.05}
                  ease="power2.out"
                  trigger="mount"
                  fillMode="wipe"
                  fontSize={110}
                  fontWeight={900}
                  letterSpacing={-4}
                  style={{ marginBottom: '-24px' }}
                />
                <StrokeText
                  text="HEWAGE"
                  strokeColor="#D3CC00"
                  fillColor="#D3CC00"
                  strokeWidth={1.4}
                  drawDuration={1.6}
                  fillDelay={0.4}
                  stagger={0.05}
                  ease="power2.out"
                  trigger="mount"
                  fillMode="wipe"
                  fontSize={110}
                  fontWeight={900}
                  letterSpacing={-4}
                  className="italic"
                  style={{ marginTop: '-24px' }}
                />
              </h1>
            </div>

            {/* Action Group (Buttons + Centered Social Icons) */}
            <div className="inline-flex flex-col items-center gap-4 animate-fade-in-up delay-300">
              
              {/* Single Row Buttons Container */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full justify-center">
                <button
                  onClick={() => window.open('https://music.mrecentertainment.com/NumbaDunAdareAlbum', '_blank', 'noopener,noreferrer')}
                  className="w-full sm:w-auto px-5 sm:px-6 md:px-7 py-3.5 bg-tertiary-container text-on-tertiary font-label font-bold uppercase tracking-widest text-xs sm:text-sm rounded-full animate-glow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap"
                >
                  <img src="/images/play-bu.png" alt="Play" className="w-5 h-5" />
                  New Releases
                </button>

                {/* Download Album Button */}
                <button
                  onClick={() => window.open(PURCHASE_URL, '_blank', 'noopener,noreferrer')}
                  className="w-full sm:w-auto px-5 sm:px-6 md:px-7 py-3.5 border border-outline-variant/30 text-on-surface font-label font-bold uppercase tracking-widest text-xs sm:text-sm rounded-full backdrop-blur-md hover:bg-white/10 hover:border-white/50 active:scale-95 transition-all duration-300 whitespace-nowrap"
                >
                  Download Album
                </button>

                <button
                  onClick={() => window.open('https://ceynk.link/dhyan', '_blank', 'noopener,noreferrer')}
                  className="w-full sm:w-auto px-5 sm:px-6 md:px-7 py-3.5 border border-outline-variant/30 text-on-surface font-label font-bold uppercase tracking-widest text-xs sm:text-sm rounded-full backdrop-blur-md hover:bg-white/10 hover:border-white/50 active:scale-95 transition-all duration-300 whitespace-nowrap"
                >
                  Explore
                </button>
              </div>

              {/* Social Icons — Centered relative to the buttons above */}
              <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-3.5 w-full pt-1">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="animate-pop-in" style={{ animationDelay: '500ms' }}>
                  <img src="/images/communication.png" alt="Facebook" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/10 shadow-2xl hover:scale-125 transition-transform duration-300 cursor-pointer" />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="animate-pop-in" style={{ animationDelay: '620ms' }}>
                  <img src="/images/youtu.png" alt="YouTube" className="w-9 h-auto sm:w-10 md:w-11 object-contain drop-shadow-2xl hover:scale-125 transition-transform duration-300 cursor-pointer" />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="animate-pop-in" style={{ animationDelay: '740ms' }}>
                  <img src="/images/instagram_cc.png" alt="Instagram" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/10 shadow-2xl hover:scale-125 transition-transform duration-300 cursor-pointer" />
                </a>
                <a href={SOCIAL_LINKS.spotify} target="_blank" rel="noopener noreferrer" className="animate-pop-in" style={{ animationDelay: '860ms' }}>
                  <img src="/images/spotif.png" alt="Spotify" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/10 shadow-2xl hover:scale-125 transition-transform duration-300 cursor-pointer" />
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="animate-pop-in" style={{ animationDelay: '980ms' }}>
                  <img src="/images/tiktok.png" alt="TikTok" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/10 shadow-2xl hover:scale-125 transition-transform duration-300 cursor-pointer" />
                </a>
                <a href={SOCIAL_LINKS.appleMusic} target="_blank" rel="noopener noreferrer" className="animate-pop-in" style={{ animationDelay: '1100ms' }}>
                  <img src="/images/apple_music.png" alt="Apple Music" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/10 shadow-2xl hover:scale-125 transition-transform duration-300 cursor-pointer" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── MUSIC STREAMING PLAYERS (Scroll-Triggered) ── */}
      <section
        id="music"
        ref={musicSectionRef}
        className={`bg-background py-20 md:py-32 px-4 md:px-8 relative z-10 ${isMusicVisible ? 'scroll-animated' : ''}`}
      >
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12 md:mb-16 scroll-fade-up delay-100">
            <span className="font-label text-tertiary text-sm tracking-[0.3em] uppercase block mb-3">Stream Now</span>
            <h2 className="font-headline text-4xl md:text-7xl font-extrabold tracking-tight text-on-surface">MUSIC</h2>
            <p className="font-body italic text-secondary mt-3 text-base md:text-lg opacity-70">
              Listen on your favourite platform. Every stream supports the music.
            </p>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">

            {/* ── Spotify ── */}
            <div className="flex flex-col gap-4 scroll-fade-up delay-200">
              <div className="flex items-center gap-3 mb-1">
                <img src="/images/spotif.png" alt="Spotify" className="w-6 h-6 object-contain" />
                <span className="font-label text-xs uppercase tracking-[0.25em] text-secondary">Spotify</span>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(30,215,96,0.15)] border border-[#1ed760]/10 hover:border-[#1ed760]/40 hover:shadow-[0_0_40px_rgba(30,215,96,0.3)] card-hover-lift">
                <iframe
                  title="Spotify Player"
                  src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={{ borderRadius: '16px', display: 'block' }}
                />
              </div>
              <a
                href={`https://open.spotify.com/playlist/${SPOTIFY_PLAYLIST_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start font-label text-xs text-[#1ed760]/70 hover:text-[#1ed760] transition-colors uppercase tracking-widest flex items-center gap-1 group"
              >
                Open in Spotify
                <span className="material-symbols-outlined group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ fontSize: '0.9rem' }}>open_in_new</span>
              </a>
            </div>

            {/* ── Apple Music ── */}
            <div className="flex flex-col gap-4 scroll-fade-up delay-400">
              <div className="flex items-center gap-3 mb-1">
                <img src="/images/apple_music.png" alt="Apple Music" className="w-6 h-6 object-contain" />
                <span className="font-label text-xs uppercase tracking-[0.25em] text-secondary">Apple Music</span>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(252,60,68,0.15)] border border-[#fc3c44]/10 hover:border-[#fc3c44]/40 hover:shadow-[0_0_40px_rgba(252,60,68,0.3)] card-hover-lift">
                <iframe
                  title="Apple Music Player"
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  frameBorder="0"
                  height="450"
                  style={{ width: '100%', overflow: 'hidden', borderRadius: '16px', display: 'block', background: 'transparent' }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src={`https://embed.music.apple.com/us/artist/dhyan-hewage/${APPLE_MUSIC_ID}?l=en-US`}
                />
              </div>
              <a
                href={SOCIAL_LINKS.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start font-label text-xs text-[#fc3c44]/70 hover:text-[#fc3c44] transition-colors uppercase tracking-widest flex items-center gap-1 group"
              >
                Open in Apple Music
                <span className="material-symbols-outlined group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ fontSize: '0.9rem' }}>open_in_new</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;