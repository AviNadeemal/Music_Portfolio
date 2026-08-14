import React, { useEffect, useRef, useState } from 'react';

const videos = [
  { id: 6, title: "Lanwenawado", subtitle: "Official Music Video • 2026", duration: "4:27", badge: "NEW RELEASE", thumb: "/images/lanwenawado.jpeg", url: "https://youtu.be/qpsmec6bNe4?si=BFs882Wu4er0pZpZ" },
  { id: 1, title: "Kuludul Araliyamal", subtitle: "Official Music Video • 2024", duration: "3:33", thumb: "/images/kuludul_araliyamal.jpg", url: "https://youtu.be/Te8miNP7hAo?si=_CkHYKsx_OamMtqA" },
  { id: 2, title: "Ape Kathandare", subtitle: "Official Music Video • 2024", duration: "2:56", thumb: "/images/ape_kathandare.jpg", url: "https://youtu.be/TwRe8R5sxLE?si=T7h_Na3uIMnAOUaM" },
  { id: 3, title: "Hanthane", subtitle: "Official Music Video • 2020", duration: "4:01", thumb: "/images/hantane.jpg", url: "https://youtu.be/HQ9OjFeC6Zc?si=gePW69Ep043rEiPt" },
  { id: 4, title: "Hithawanthi", subtitle: "Official Music Video • 2023", duration: "5:31", thumb: "/images/hithawanthi.jpg", url: "https://youtu.be/Td8BL6iuzps?si=2vmH61lnhChe23oV" },
  { id: 5, title: "Me Hitha Ne Palu", subtitle: "Official Music Video • 2022", duration: "3:09", thumb: "/images/me_hitha_ne_palu.jpg", url: "https://youtu.be/n2ayhLdwo2Y?si=bV8-NDf0_LNtRUAV" },
];

const Video = () => {
  const videoSectionRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect(); // Triggers once on first scroll
        }
      },
      { threshold: 0.15 } // Triggers when 15% of the section enters view
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
      className={`min-h-screen bg-background py-24 md:py-32 px-4 md:px-8 ${isVideoVisible ? 'scroll-animated' : ''}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Animation */}
        <div className="text-center mb-12 md:mb-16 scroll-fade-up delay-100">
          <span className="font-label text-tertiary text-sm tracking-[0.3em] uppercase block mb-4">Visual Stories</span>
          <h2 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tight text-on-surface drop-shadow-2xl">VIDEOS</h2>
          <p className="font-body italic text-lg text-secondary max-w-xl mx-auto mt-4 opacity-70">
            Click any video to watch on YouTube.
          </p>
        </div>

        {/* Video Grid with Staggered Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videos.map((v, index) => {
            const delays = ['delay-200', 'delay-300', 'delay-400', 'delay-500', 'delay-600', 'delay-700'];
            const delayClass = delays[index % delays.length];

            return (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group cursor-pointer block scroll-fade-up ${delayClass}`}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-container-high mb-4 shadow-lg border border-outline-variant/10 hover:border-tertiary/40 hover:shadow-[0_0_25px_rgba(211,204,0,0.2)] transition-all duration-500 card-hover-lift">
                  <img
                    src={v.thumb}
                    alt={v.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    {v.badge && (
                      <span className="font-label text-[10px] bg-tertiary/90 text-on-tertiary px-2 py-0.5 rounded font-bold tracking-widest">
                        {v.badge}
                      </span>
                    )}
                    <span className="font-label text-[10px] bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded">
                      {v.duration}
                    </span>
                  </div>

                  {/* YouTube Play Button — appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FF0000] flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
                      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* YouTube logo watermark */}
                  <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 90 20" fill="white" className="w-16 h-auto drop-shadow-lg">
                      <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
                      <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
                    </svg>
                  </div>
                </div>

                <h4 className="font-headline text-base md:text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors uppercase">
                  {v.title}
                </h4>
                <p className="font-body text-sm text-secondary italic mt-1">{v.subtitle}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Video;