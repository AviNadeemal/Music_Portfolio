import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css';

const images = [
  { id: 2,  src: "/images/DSC_6087.webp",    label: "Stage Presence" },
  { id: 3,  src: "/images/DSC_6136.webp",    label: "In The Moment" },
  { id: 4,  src: "/images/DSC_6147.webp",    label: "The Artist" },
  { id: 5,  src: "/images/IMG_5884.webp",    label: "Live Energy" },
  { id: 6,  src: "/images/IMG_5891.webp",    label: "Spotlight" },
  { id: 7,  src: "/images/IMG_5899.webp",    label: "On Stage" },
  { id: 8,  src: "/images/IMG_5900.webp",    label: "Performance" },
  { id: 9,  src: "/images/IMG_6351.webp",    label: "A Dream" },
  { id: 10, src: "/images/IMG_6353.webp",    label: "Creative Process" },
  { id: 11, src: "/images/IMG_6357.webp",    label: "The Vision" },
  { id: 12, src: "/images/BVA04782.webp",    label: "Portrait" },
  { id: 13, src: "/images/BVA04794.webp",    label: "Candid" },
  { id: 14, src: "/images/BVA04843.webp",    label: "Artist Life" },
  { id: 15, src: "/images/BVA04851.webp",    label: "Captured" },
  { id: 16, src: "/images/BVA04641.webp",    label: "Backstage" },
  { id: 17, src: "/images/BVA04613.webp",    label: "Raw Emotion" },
  { id: 18, src: "/images/BVA04611.webp",    label: "Authentic" },
  { id: 19, src: "/images/BVA04607.webp",    label: "The Journey" },
  { id: 20, src: "/images/BVA04596.webp",    label: "Unforgettable" },
  { id: 21, src: "/images/BVA00317.webp",    label: "Dhyan Hewage" },
  { id: 22, src: "/images/BVA00357.webp",    label: "Music & Soul" },
  { id: 23, src: "/images/BVA00397.webp",    label: "The Stage" },
  { id: 24, src: "/images/BVA00416.webp",    label: "Passion" },
  { id: 26, src: "/images/BVA00194.webp",    label: "Connection" },
  { id: 27, src: "/images/BVA00180.webp",    label: "Electric" },
];

const row1 = images.filter((_, i) => i % 2 === 0);
const row2 = images.filter((_, i) => i % 2 !== 0);

const MarqueeRow = ({ items, direction = 'left', onImageClick }) => {
  const doubled = [...items, ...items];

  return (
    <div
      className="marquee-wrapper overflow-hidden w-full"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
    >
      <div
        className={`marquee-track flex gap-4 ${direction === 'right' ? 'marquee-right' : 'marquee-left'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((img, idx) => (
          <div
            key={`${img.id}-${idx}`}
            className="marquee-item relative shrink-0 rounded-xl overflow-hidden cursor-pointer group flex items-center justify-center bg-surface-container-high"
            style={{ width: '280px', height: '200px' }}
            onClick={() => onImageClick(img)}
          >
            <img
              src={img.src}
              alt={img.label}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 pointer-events-none"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
              <div>
                <p className="font-label text-[10px] text-tertiary uppercase tracking-widest mb-1">Click to view</p>
                <p className="font-headline text-sm text-white font-bold uppercase">{img.label}</p>
              </div>
            </div>

            {/* Expand icon */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-white" style={{ fontSize: '1rem' }}>open_in_full</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);
  const galleryRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="gallery" 
      ref={galleryRef}
      className={`min-h-screen py-24 md:py-32 relative overflow-hidden ${
        isVisible ? 'scroll-animated' : ''
      }`}
      style={{ background: 'radial-gradient(circle at 50% 50%, #0231fa22 0%, #0b1326 70%)' }}
    >
      <div className="text-center mb-12 md:mb-16 px-4 scroll-fade-up delay-100">
        <span className="font-label text-tertiary text-sm tracking-[0.3em] uppercase block mb-4">Captured Moments</span>
        <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-4 drop-shadow-2xl">
          VISUAL <span className="text-tertiary italic">ECHOES</span>
        </h2>
        <p className="font-body text-lg italic text-secondary max-w-xl mx-auto opacity-70">
          Hover to pause · Click to open
        </p>
      </div>

      <div className="flex flex-col gap-5 scroll-fade-up delay-200">
        <MarqueeRow items={row1} direction="left" onImageClick={setLightbox} />
        <MarqueeRow items={row2} direction="right" onImageClick={setLightbox} />
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.label}
              className="w-full rounded-2xl shadow-2xl object-cover object-center max-h-[80vh]"
            />
            <p className="text-center mt-4 font-headline text-lg text-tertiary uppercase tracking-widest">
              {lightbox.label}
            </p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-surface-variant rounded-full flex items-center justify-center text-on-surface hover:text-tertiary transition-colors shadow-lg"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;