import React, { useEffect, useState } from 'react';

const navItems = [
  { id: 'home',    label: 'HOME' },
  { id: 'music',   label: 'MUSIC' },
  { id: 'video',   label: 'VIDEO' },
  { id: 'shows',   label: 'SHOWS' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'about',   label: 'ABOUT' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find all sections that exist in the DOM
      const sections = navItems
        .map(item => ({ id: item.id, el: document.getElementById(item.id) }))
        .filter(s => s.el !== null);

      if (!sections.length) return;

      // Use a point 30% down from the top of the viewport as our detection line
      const detectionY = window.scrollY + window.innerHeight * 0.3;

      // Walk backwards — pick the last section whose top is above detectionY
      let current = sections[0].id;
      for (const section of sections) {
        const top = section.el.getBoundingClientRect().top + window.scrollY;
        if (top <= detectionY) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    // Small delay on mount so all sections are rendered and have layout
    const timer = setTimeout(() => {
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="relative w-full px-4 md:px-8 flex items-start justify-between mt-4 md:mt-6">

          {/* LOGO */}
          <div className="pointer-events-auto flex items-center h-[52px]">
            <button onClick={() => scrollTo('home')} className="transition-transform duration-300 hover:scale-110 active:scale-95">
              <img src="/images/logo.png" alt="Dhyan Hewage Logo" className="w-10 h-auto md:w-14 drop-shadow-lg" />
            </button>
          </div>

          {/* DESKTOP NAV PILL */}
          <nav className="pointer-events-auto hidden lg:flex bg-surface-variant/50 backdrop-blur-[20px] rounded-full px-6 xl:px-10 py-3 shadow-[0_0_20px_rgba(0,0,0,0.25)] items-center gap-4 xl:gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`font-label relative py-1 transition-all duration-300 text-xs uppercase tracking-[0.05em] transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(211,204,0,0.5)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:bg-tertiary after:rounded-full after:transition-all after:duration-300 after:ease-out ${
                    isActive
                      ? 'text-tertiary font-bold after:w-full'
                      : 'text-secondary hover:text-tertiary after:w-0'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* MOBILE HAMBURGER */}
          <div className="pointer-events-auto flex lg:hidden items-center h-[52px]">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-surface-variant/70 backdrop-blur-[20px] rounded-full p-3 shadow-[0_0_20px_rgba(0,0,0,0.25)]"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-on-surface rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 bg-on-surface rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 bg-on-surface rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          <div className="hidden lg:block w-10 xl:w-14"></div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)}></div>
        <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8">
          {navItems.map((item, i) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{ transitionDelay: `${i * 50}ms` }}
                className={`font-headline relative py-1 text-3xl uppercase tracking-tight transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:bg-tertiary after:rounded-full after:transition-all after:duration-300 after:ease-out ${
                  isActive
                    ? 'text-tertiary after:w-full'
                    : 'text-secondary hover:text-on-surface after:w-0'
                } ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Navbar;