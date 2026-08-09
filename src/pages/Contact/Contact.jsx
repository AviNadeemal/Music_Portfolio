import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          // Replace with your Web3Forms Access Key from web3forms.com
          access_key: "902a3ae7-3031-4950-85cf-8663da54bac2", 
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Inquiry from ${form.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSent(true);
        setTimeout(() => { 
          setSent(false); 
          setForm({ name: '', email: '', message: '' }); 
        }, 4000);
      } else {
        alert("Failed to send message. Please check your Access Key.");
      }
    } catch (error) {
      alert("Something went wrong. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-background py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-label text-tertiary text-sm tracking-[0.3em] uppercase block mb-4">Get In Touch</span>
          <h2 className="font-headline text-5xl md:text-8xl font-bold tracking-tight text-on-surface drop-shadow-2xl">CONTACT</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Left — Info */}
          <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[600px] rounded-[2rem] overflow-hidden flex items-end p-8 md:p-12">
            <div className="absolute inset-0 z-0">
              <img src="/images/home-bg.jpg" alt="Artist" className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, #0b1326 100%)' }}></div>
            </div>
            <div className="relative z-10 max-w-md">
              <h3 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight">The Vision</h3>
              <div className="w-16 h-1 bg-tertiary mb-6"></div>
              <p className="font-body text-xl italic text-secondary leading-relaxed mb-6">
                "Music is the mist that connects the silence of the night to the vibration of the soul."
              </p>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4 text-secondary hover:text-tertiary transition-colors">
                  <span className="material-symbols-outlined">mail</span>
                  <span className="font-label text-sm uppercase tracking-wider">dhyanhewagemusic@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-secondary hover:text-tertiary transition-colors">
                  <span className="material-symbols-outlined">location_on</span>
                  <span className="font-label text-sm uppercase tracking-wider">Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden border border-outline-variant/15"
              style={{ background: 'rgba(45,52,73,0.4)', backdropFilter: 'blur(20px)' }}>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-tertiary mb-2 uppercase tracking-widest">Connect</h3>
              <p className="font-label text-secondary mb-8 text-sm uppercase tracking-[0.2em]">Inquiries & Bookings</p>

              {sent ? (
                <div className="py-16 text-center">
                  <span className="material-symbols-outlined text-tertiary text-5xl block mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <p className="font-headline text-xl text-on-surface">Message Sent!</p>
                  <p className="font-body text-secondary text-sm mt-2">Thank you for reaching out.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text' },
                    { id: 'email', label: 'Email Address', type: 'email' },
                  ].map(({ id, label, type }) => (
                    <div key={id} className="relative">
                      <input
                        id={id} name={id} type={type} value={form[id]} onChange={handleChange}
                        placeholder=" " required
                        className="block w-full px-0 py-2 bg-transparent border-0 border-b border-outline-variant/30 text-on-surface focus:ring-0 focus:border-tertiary peer transition-all duration-300 font-label outline-none"
                      />
                      <label htmlFor={id} className="absolute text-sm text-secondary font-label uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-tertiary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                        {label}
                      </label>
                    </div>
                  ))}
                  <div className="relative">
                    <textarea
                      id="message" name="message" value={form.message} onChange={handleChange}
                      placeholder=" " rows="3" required
                      className="block w-full px-0 py-2 bg-transparent border-0 border-b border-outline-variant/30 text-on-surface focus:ring-0 focus:border-tertiary peer transition-all duration-300 font-label resize-none outline-none"
                    />
                    <label htmlFor="message" className="absolute text-sm text-secondary font-label uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-tertiary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                      Message
                    </label>
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-tertiary-container text-on-tertiary font-label font-bold uppercase tracking-widest rounded-lg hover:bg-tertiary transition-all duration-500 shadow-[0_0_15px_rgba(211,204,0,0.4)] transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;