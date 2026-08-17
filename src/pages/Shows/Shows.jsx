import React, { useEffect, useRef, useState } from 'react';
import './Shows.css';

const shows = [
  {
    month: "SEP",
    day: "05",
    title: "DEDUNU PALAMA",
    city: "KULIYAPITIYA",
    venue: "Pandith W. D. Amaradewa Auditorium - University of Wayamba",
    availability: "AVAILABLE",
    status: "book",
    poster: "/images/IMG_5230.jpeg"
  }
];

const Shows = () => {
  const showsSectionRef = useRef(null);
  const [isShowsVisible, setIsShowsVisible] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsShowsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (showsSectionRef.current) {
      observer.observe(showsSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="shows"
      ref={showsSectionRef}
      className={`min-h-screen bg-background py-24 md:py-32 px-4 md:px-8 relative overflow-hidden ${
        isShowsVisible ? 'scroll-animated' : ''
      }`}
    >
      {/* Ambient Glows */}
      <div className="ambient-glow-1 absolute top-0 left-0 w-1/2 h-1/2 bg-primary-container/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="ambient-glow-2 absolute bottom-0 right-0 w-2/5 h-2/5 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 scroll-fade-up delay-100">
          <span className="font-label text-tertiary tracking-[0.3em] uppercase mb-4 text-sm font-semibold">
            Live Experience
          </span>
          <h2 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-6 drop-shadow-2xl">
            LIVE SHOWS
          </h2>
          <p className="font-body text-xl italic text-on-surface-variant max-w-2xl leading-relaxed">
            "A nocturnal journey through symphonic shadows and ethereal echoes."
          </p>
          <div
            className="h-[1px] w-48 mt-10 opacity-50"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #d3cc00 50%, transparent 100%)'
            }}
          ></div>
        </div>

        {/* Tour Dates Header Line */}
        <div className="mb-12 border-b border-outline-variant/20 pb-6 scroll-fade-up delay-200">
          <h3 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">DATES</h3>
        </div>

        {/* Tour List */}
        <div className="flex flex-col gap-6">
          {shows.map((show, i) => (
            <div
              key={i}
              className={`show-card scroll-fade-up delay-300 group relative backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border ${
                show.status === 'soldout'
                  ? 'bg-surface-container-low/20 border-outline-variant/5 opacity-50'
                  : 'bg-surface-variant/30 border-outline-variant/10 hover:bg-surface-variant/40'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-6 md:gap-8 w-full lg:w-auto">
                {/* Clickable Poster Thumbnail */}
                {show.poster && (
                  <button 
                    onClick={() => setSelectedPoster(show.poster)}
                    className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shrink-0 border border-outline-variant/20 focus:outline-none cursor-pointer group/poster relative"
                  >
                    <img 
                      src={show.poster} 
                      alt={`${show.city} concert poster`} 
                      className="w-full h-full object-cover group-hover/poster:scale-110 transition-transform duration-300" 
                    />
                  </button>
                )}

                {/* Date Display */}
                <div className="flex flex-col items-center shrink-0 min-w-[40px] sm:min-w-[64px]">
                  <span className="font-label text-tertiary text-xs sm:text-base font-bold tracking-tighter">
                    {show.month}
                  </span>
                  <span className="font-headline text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter leading-none">
                    {show.day}
                  </span>
                </div>

                {/* Divider Line */}
                <div className="w-[1px] h-10 md:h-12 bg-tertiary/20 shrink-0"></div>

                {/* Info Block */}
                <div className="min-w-0 flex-1">
                  {show.title && (
                    <span className="font-label text-tertiary text-[10px] sm:text-xs font-bold tracking-wider uppercase block mb-0.5">
                      {show.title}
                    </span>
                  )}
                  <h4 className="font-headline text-base sm:text-xl md:text-2xl font-bold text-on-surface group-hover:text-tertiary transition-colors break-words">
                    {show.city}
                  </h4>
                  <p className="font-body text-on-surface-variant italic text-xs sm:text-base leading-tight mt-1">
                    {show.venue}
                  </p>
                </div>
              </div>

              {/* Action / Status */}
              <div className="flex items-center gap-4 md:gap-6 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-outline-variant/10">
                <div className="flex lg:flex-col items-center lg:items-end gap-2 lg:gap-0">
                  <span className="font-label text-[10px] text-on-surface-variant tracking-[0.2em] lg:mb-1">
                    AVAILABILITY
                  </span>
                  <span
                    className={`font-label text-xs font-semibold ${
                      show.status === 'soldout'
                        ? 'text-outline'
                        : show.status === 'limited'
                        ? 'text-error'
                        : show.status === 'soon'
                        ? 'text-secondary'
                        : 'text-tertiary'
                    }`}
                  >
                    {show.availability}
                  </span>
                </div>

                {show.status === 'soldout' ? (
                  <span className="font-label font-bold px-6 md:px-8 py-3 md:py-4 rounded-full text-xs tracking-widest uppercase border border-outline/30 text-outline">
                    SOLD OUT
                  </span>
                ) : show.status === 'soon' ? (
                  <span className="font-label font-bold px-6 md:px-8 py-3 md:py-4 rounded-full text-xs tracking-widest uppercase border border-secondary/30 text-secondary">
                    COMING SOON
                  </span>
                ) : (
                  <button className="animate-glow-btn bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label font-bold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full hover:scale-105 active:scale-95 text-xs tracking-widest uppercase transition-all duration-300 shrink-0">
                    BOOK TICKETS
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enlarged Poster Modal */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPoster(null)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPoster(null)}
              className="absolute -top-10 right-0 text-white hover:text-tertiary text-2xl font-bold p-2 focus:outline-none"
              aria-label="Close modal"
            >
              ✕
            </button>
            <img 
              src={selectedPoster} 
              alt="Enlarged show poster" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Shows;