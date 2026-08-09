import React from 'react';

const SOCIAL_LINKS = [
  { label: 'INSTAGRAM',   icon: '/images/instagram_cc.png',  url: 'https://www.instagram.com/dhyanhewage?igsh=Y2UxdDlkdmdvN25s&utm_source=qr' },
  { label: 'YOUTUBE',     icon: '/images/youtu.png',          url: 'https://youtube.com/@dhyanhewage?si=k-ZK6jA0oFhAiuc0' },
  { label: 'SPOTIFY',     icon: '/images/spotif.png',         url: 'https://open.spotify.com/artist/3ES7kGNf8O344XSDG3kW8G?si=FHUnqBEETFWzGD5y1Tyubg' },
  { label: 'APPLE MUSIC', icon: '/images/apple_music.png',    url: 'https://music.apple.com/ec/artist/dhyan-hewage/1449254201' },
  { label: 'TIKTOK',      icon: '/images/tiktok.png',         url: 'https://www.tiktok.com/@dhyanhewage?_r=1&_t=ZT-97m6Mh408ZK' },
  { label: 'FACEBOOK',    icon: '/images/communication.png',  url: 'https://www.facebook.com/share/1GFFmHnYnR/?mibextid=wwXIfr' },
];

const Footer = () => (
  <footer className="bg-surface-container-lowest/80 backdrop-blur-lg rounded-t-[3rem] relative overflow-hidden">
    <div className="h-[1px] w-[60%] mx-auto" style={{ background: 'linear-gradient(90deg, transparent 0%, #d3cc00 50%, transparent 100%)' }}></div>
    <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 px-8 py-16 relative z-10">
      <img src="/images/logo.png" alt="Dhyan Hewage" className="w-14 h-auto opacity-80" />
      <div className="font-headline text-lg font-bold text-tertiary tracking-widest">DHYAN HEWAGE</div>

      {/* Social links — 2 rows on mobile, 1 row on desktop */}
      <div className="flex flex-wrap justify-center gap-5 md:gap-8 max-w-2xl">
        {SOCIAL_LINKS.map(({ label, icon, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary hover:text-tertiary transition-colors font-label text-[10px] md:text-xs uppercase tracking-widest"
          >
            <img src={icon} alt={label} className="w-4 h-4 md:w-5 md:h-5 object-contain" />
            {label}
          </a>
        ))}
      </div>

      <p className="text-secondary/40 font-label text-[10px] uppercase tracking-[0.3em] text-center">
        © {new Date().getFullYear()} Dhyan Hewage. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
