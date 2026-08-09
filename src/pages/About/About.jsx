import React from 'react';

const stats = [
  { value: "40+", label: "Singles Released" },
  { value: "2017", label: "Debut Year" },
  { value: "170K+", label: "Monthly Listeners" },
  { value: "75M+", label: "Views On YouTube" },
];

const About = () => (
  <section id="about" className="min-h-screen bg-background py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary-container blur-[120px] opacity-30 rounded-full pointer-events-none"></div>
    <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-tertiary blur-[150px] opacity-10 rounded-full pointer-events-none"></div>

    <div className="max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-16 md:mb-24">
        <span className="font-label text-tertiary text-sm tracking-[0.3em] uppercase block mb-4">The Artist</span>
        <h2 className="font-headline text-5xl md:text-8xl font-black text-on-surface tracking-tighter drop-shadow-2xl">
          DHYAN<br /><span className="text-tertiary italic">HEWAGE</span>
        </h2>
      </div>

      {/* Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-start mb-20">
        {/* Image */}
        <div className="lg:col-span-5 relative group">
          <div className="p-1 rounded-2xl shadow-2xl transform lg:-rotate-3 group-hover:rotate-0 transition-transform duration-700"
            style={{ background: 'rgba(45,52,73,0.4)', backdropFilter: 'blur(20px)' }}>
            <img
              src="/images/IMG_6351.webp"
              alt="Dhyan Hewage"
              className="w-full h-[400px] md:h-[550px] object-cover rounded-xl object-top"
            />
          </div>
        </div>

        {/* Story */}
        <div className="lg:col-span-7 pt-0 lg:pt-12">
          <h3 className="font-headline text-4xl md:text-6xl text-on-surface mb-8 md:mb-12 relative inline-block">
            The Story
            <div className="absolute -bottom-3 left-0 w-2/3 h-0.5 opacity-40" style={{ background: 'linear-gradient(to right, #d3cc00, transparent)' }}></div>
          </h3>
          <div className="space-y-5 text-on-surface-variant text-base md:text-lg leading-relaxed font-body">
            <p>
              Dhyan Hewage is a musician driven by passion, resilience, and a vision that extends far beyond the stage. Beginning his journey in Sri Lanka, he dedicated years to mastering his craft as a singer, songwriter, producer, and performer while inspiring others through music.
            </p>
            <p>
              Constantly seeking growth, he embraced new opportunities, aiming to build an international career in Los Angeles. Along the way, he has balanced creativity with entrepreneurship, live performances, and digital content creation.
            </p>
            <p>
              Every challenge has strengthened his determination to connect people through authentic music, proving that persistence, purpose, and passion can turn ambitious dreams into reality.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-12">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center p-4 rounded-xl border border-outline-variant/15"
                style={{ background: 'rgba(45,52,73,0.3)' }}>
                <span className="font-headline text-2xl md:text-3xl font-bold text-tertiary block">{value}</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary mt-1 block leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision Quote */}
      <div className="text-center py-14 md:py-20 px-6 md:px-12 rounded-[2rem] border border-outline-variant/10"
        style={{ background: 'rgba(11,19,38,0.6)', backdropFilter: 'blur(20px)' }}>
        <h4 className="font-headline text-xl md:text-2xl text-tertiary uppercase tracking-widest mb-6">Vision</h4>
        <blockquote className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-4xl mx-auto mb-10">
          "I believe music has the power to transcend borders, heal hearts, and shape culture. My vision is to create timeless music that inspires people, sparks meaningful change. I am committed to representing Sri Lanka with excellence while building a global career that proves extraordinary dreams can begin anywhere. I want to empower the next generation of artists by creating opportunities, sharing knowledge, and leading with integrity. Finally to leave a legacy that continues to transform lives long after I'm gone."
        </blockquote>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => window.open('https://ceynk.link/dhyan', '_blank', 'noopener,noreferrer')}
            className="bg-tertiary-container text-on-tertiary px-8 md:px-10 py-4 rounded-full font-headline font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(211,204,0,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            Explore Music
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default About;