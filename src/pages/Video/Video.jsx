import React, { useEffect, useRef, useState, useCallback } from 'react';

// Video Data Array
const videos = [
  { id: 6, title: "Lanwenawado", subtitle: "Official Music Video • 2026", duration: "4:27", thumb: "/images/lanwenawado.jpeg", url: "https://youtu.be/qpsmec6bNe4?si=BFs882Wu4er0pZpZ" },  
  { id: 1, title: "Kuludul Araliyamal", subtitle: "Official Music Video • 2024", duration: "3:33", thumb: "/images/kuludul_araiya.png", url: "https://youtu.be/Te8miNP7hAo?si=_CkHYKsx_OamMtqA" },
  { id: 2, title: "Ape Kathandare", subtitle: "Official Music Video • 2024", duration: "2:56", thumb: "/images/ape_kathandare.jpg", url: "https://youtu.be/TwRe8R5sxLE?si=T7h_Na3uIMnAOUaM" },
  { id: 3, title: "Hanthane", subtitle: "Official Music Video • 2020", duration: "4:01", thumb: "/images/hantane.jpg", url: "https://youtu.be/HQ9OjFeC6Zc?si=gePW69Ep043rEiPt" },
  { id: 4, title: "Hithawanthi", subtitle: "Official Music Video • 2023", duration: "5:31", thumb: "/images/hithawanthi.jpg", url: "https://youtu.be/Td8BL6iuzps?si=2vmH61lnhChe23oV" },
  { id: 5, title: "Me Hitha Ne Palu", subtitle: "Official Music Video • 2022", duration: "3:09", thumb: "/images/me_hitha_ne_palu.jpg", url: "https://youtu.be/n2ayhLdwo2Y?si=bV8-NDf0_LNtRUAV" },
  { id: 7, title: "Pe sina", subtitle: "Official Music Video • 2025", duration: "3:48", thumb: "/images/pe_sina.jpeg", url: "https://youtu.be/PLj4JiHVFFU?si=mpNzmgnNxqwUqcYx" },
  {id: 8, title: "Numba Dun Adare", subtitle: "Official Music Video • 2026", duration: "4:16", thumb: "/images/Official.png", url: "https://youtu.be/3y8NtIx2hVg?si=3o9VDeT5mzBCWJny" },
  {id: 9, title: "Niwee Giya Atheethe", subtitle: "Official Music Video • 2026", duration: "3:11", badge: "NEW RELEASE", thumb: "/images/Niwee Giya Atheethe.jpeg", url: "https://youtu.be/NJCbhicn9tQ?si=4-gVUv_Txa4v4u_E" },
  {id: 10, title: "Me Hitha Na Palu", subtitle: "Alokana • 2026", duration: "3:09", thumb: "/images/alokana.png", url: "https://youtu.be/Nalgm4gi8IE?si=uksParFpWj5mSSZI" }
];

// Constants for 3D Coverflow Calculation
const PERSPECTIVE = 1600;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 240;

function cssTransition(t) {
  const dur = t && typeof t.duration === "number" ? t.duration : 0.6;
  let ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const e = t?.ease;
  if (Array.isArray(e) && e.length === 4) {
    ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
  } else if (typeof e === "string") {
    const map = {
      linear: "linear",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
    };
    ease = map[e] || "ease";
  }
  return { dur, ease };
}

// 3D Coverflow Carousel Sub-Component
const Smooth3DCoverFlow = ({
  items = [],
  cardWidth = 480,
  cardHeight = 300,
  radius = 6,
  tilt = 12,
  sideTilt = 8,
  gap = 8,
  opacity = 60,
  autoSweepInterval = 4000, // Updated to 4 seconds
  transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}) => {
  const [active, setActive] = useState(0);
  const n = items.length;
  const moveDur = transition?.duration || 0.6;
  const lockRef = useRef(false);

  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, Math.max(50, moveDur * 1000));
  }, [moveDur]);

  const step = useCallback(
    (dir) => {
      if (lockRef.current || n === 0) return;
      lock();
      setActive((a) => (((a + dir) % n) + n) % n);
    },
    [n, lock]
  );

  // Auto Sweep Timer (Runs continuously every 4 seconds)
  useEffect(() => {
    if (n === 0) return;

    const timer = setInterval(() => {
      step(1);
    }, autoSweepInterval);

    return () => clearInterval(timer);
  }, [step, autoSweepInterval, n]);

  const handleCardClick = useCallback(
    (i, url) => {
      if (lockRef.current) return;
      if (i === active) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        lock();
        setActive(i);
      }
    },
    [active, lock]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    },
    [step]
  );

  const { dur, ease } = cssTransition(transition);
  const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`;
  const effectiveRadius = (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(cardWidth, cardHeight) / 2);
  const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100;

  if (n === 0) return null;

  return (
    <div className="flex flex-col items-center w-full">
      <div
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        onKeyDown={onKeyDown}
        className="relative w-full h-[480px] md:h-[550px] flex items-center justify-center outline-none select-none"
        style={{ perspective: `${PERSPECTIVE}px` }}
      >
        <div
          className="relative"
          style={{
            width: cardWidth,
            height: cardHeight,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((v, i) => {
            let rel = i - active;
            if (rel > n / 2) rel -= n;
            if (rel < -n / 2) rel += n;

            const ax = Math.abs(rel);
            const visible = ax <= MAX_VISIBLE;
            const isActive = rel === 0;
            const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
            const tx = rel * (gap * 30);
            const tz = -ax * DEPTH;
            const ry = -rel * tilt;
            const rz = rel * sideTilt;

            const cardStyle = {
              position: "absolute",
              left: "50%",
              top: "50%",
              width: cardWidth,
              height: cardHeight,
              borderRadius: effectiveRadius,
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
              transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
              transition: transitionCss,
              opacity: visible ? 1 : 0,
              cursor: "pointer",
              pointerEvents: visible ? "auto" : "none",
            };

            return (
              <div
                key={v.id}
                style={cardStyle}
                onClick={() => handleCardClick(i, v.url)}
                className="group overflow-hidden bg-surface-container-high shadow-2xl border border-outline-variant/10 hover:border-tertiary/40 card-hover-lift"
                aria-label={v.title}
                aria-hidden={!visible}
              >
                {/* Thumbnail Image */}
                <img
                  src={v.thumb}
                  alt={v.title}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="font-label text-[10px] bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded shadow">
                    {v.duration}
                  </span>
                </div>

                {/* YouTube Logo Watermark */}
                <div className="absolute top-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity z-10">
                  <svg viewBox="0 0 90 20" fill="white" className="w-14 h-auto drop-shadow-lg">
                    <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
                    <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
                  </svg>
                </div>

                {/* YouTube Play Button */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10 ${isActive ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'}`}>
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FF0000] flex items-center justify-center shadow-2xl scale-95 group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                  <h4 className="font-headline text-lg md:text-xl font-bold text-white uppercase drop-shadow-md">
                    {v.title}
                  </h4>
                  <p className="font-body text-xs md:text-sm text-gray-200 italic mt-0.5 opacity-90 drop-shadow">
                    {v.subtitle}
                  </p>
                </div>

                {/* Dim overlay for non-active cards */}
                <div
                  className="absolute inset-0 bg-black pointer-events-none"
                  style={{
                    opacity: isActive ? 0 : dim,
                    transition: `opacity ${dur}s ${ease}`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Sweep Indicator Icons below the grid */}
      <div className="flex items-center gap-2 mt-4 z-20">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!lockRef.current) {
                lock();
                setActive(index);
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              active === index
                ? "w-8 bg-tertiary"
                : "w-2.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Main Section Component
const Video = () => {
  const videoSectionRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // Separate New Release video from carousel videos
  const newReleaseVideo = videos.find((v) => v.badge === "NEW RELEASE");
  const carouselVideos = videos.filter((v) => v.badge !== "NEW RELEASE");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="video"
      ref={videoSectionRef}
      className={`min-h-screen bg-background py-24 md:py-32 px-4 md:px-8 overflow-hidden ${isVideoVisible ? 'scroll-animated' : ''}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 scroll-fade-up delay-100">
          <span className="font-label text-tertiary text-sm tracking-[0.3em] uppercase block mb-4">Visual Stories</span>
          <h2 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tight text-on-surface drop-shadow-2xl">VIDEOS</h2>
        </div>

        {/* Separate New Release Feature */}
        {newReleaseVideo && (
          <div className="mb-16 scroll-fade-up delay-200 flex flex-col items-center">
            <div className="mb-4">
              <span className="font-label text-xs bg-tertiary/90 text-on-tertiary px-3 py-1 rounded font-bold tracking-widest shadow uppercase">
                New Release
              </span>
            </div>
            
            <a
              href={newReleaseVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full max-w-[600px] h-[320px] md:h-[360px] rounded-2xl overflow-hidden bg-surface-container-high shadow-2xl border border-tertiary/30 hover:border-tertiary card-gradient-wrapper transition-all duration-300 block"
            >
              <img
                src={newReleaseVideo.thumb}
                alt={newReleaseVideo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded shadow">
                {newReleaseVideo.duration}
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FF0000] flex items-center justify-center shadow-2xl scale-95 group-hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-headline text-2xl md:text-3xl font-bold text-white uppercase drop-shadow-md">
                  {newReleaseVideo.title}
                </h3>
                <p className="font-body text-sm text-gray-200 italic mt-1 opacity-90">
                  {newReleaseVideo.subtitle}
                </p>
              </div>
            </a>
          </div>
        )}

        {/* Carousel Note */}
        <p className="font-body italic text-center text-base md:text-lg text-secondary max-w-xl mx-auto mb-8 opacity-70 scroll-fade-up delay-300">
          Click any video to bring to focus, click active video to watch on YouTube.
        </p>

        {/* 3D Coverflow Gallery */}
        <div className="scroll-fade-up delay-400">
          <Smooth3DCoverFlow items={carouselVideos} autoSweepInterval={4000} />
        </div>
      </div>
    </section>
  );
};

export default Video;