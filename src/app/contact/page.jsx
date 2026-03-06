"use client";
import React from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { 
  MessageCircle, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin 
} from 'lucide-react';

function ContactPage() {
  const { theme } = useTheme();

  const cities = [
    "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", 
  "Barishal", "Rangpur", "Mymensingh", "Gazipur", "Narayanganj", "Cumilla"
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Hero Section */}
      <div className="pt-16 pb-12 px-6 text-center">
        <h1 className={`text-4xl md:text-4xl font-black mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Get in <span className="text-cyan-500">touch</span>
        </h1>
        <p className={`text-lg opacity-70 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          Let us know how we can help you today.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 pb-20">
        
        {/* Left Side: Contact Info & Support */}
        <div className="space-y-8">
          
          {/* Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-6 rounded-[2rem] border ${
              theme === 'dark' ? 'bg-slate-900/40 border-white/10' : 'bg-white border-slate-200'
            }`}>
              <MessageCircle className="text-cyan-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Looking For Service?</h3>
              <p className="text-sm opacity-60 mb-4">Chat with our dedicated support team for any issues.</p>
              <button className="flex items-center gap-2 text-cyan-500 font-bold hover:gap-3 transition-all">
                Chat with us <ArrowRight size={18} />
              </button>
            </div>

            <div className={`p-6 rounded-[2rem] border ${
              theme === 'dark' ? 'bg-slate-900/40 border-white/10' : 'bg-white border-slate-200'
            }`}>
              <Phone className="text-cyan-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">New Device?</h3>
              <p className="text-sm opacity-60 mb-4">Want a new SafeTap for your home?</p>
              <a href="tel:080-6876-4787" className="text-cyan-500 font-bold">080-6876-4787</a>
            </div>
          </div>

          {/* Address Box */}
          <div className={`p-8 rounded-[2.5rem] border ${
            theme === 'dark' ? 'bg-slate-900/20 border-white/5' : 'bg-cyan-50/30 border-cyan-100'
          }`}>
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="text-cyan-500 mt-1" />
              <div>
                <h4 className="font-bold text-lg">Our Office Address</h4>
                <p className="opacity-70 text-sm leading-relaxed">
                 SafeTap BD , Dhanmondi , 130 college road , Dhaka
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="text-cyan-500" />
              <p className="opacity-70 text-sm">Office hours: 10 am to 7 pm</p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-4 items-center">
            <span className="font-bold text-sm uppercase tracking-widest opacity-40">Follow us:</span>
            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
              <div key={i} className={`p-3 rounded-full cursor-pointer transition-all ${
                theme === 'dark' ? 'hover:bg-cyan-500/20 text-white' : 'hover:bg-cyan-100 text-slate-700'
              }`}>
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className={`p-8 md:p-12 rounded-[3rem] border ${
          theme === 'dark' ? 'bg-slate-900 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <h3 className="text-2xl font-black mb-6 text-cyan-500">Book Now</h3>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60 uppercase tracking-tighter">Choose City *</label>
              <select className={`w-full p-4 rounded-2xl border bg-transparent outline-none focus:border-cyan-500 transition-all ${
                theme === 'dark' ? 'border-white/10 text-white' : 'border-slate-200 text-slate-800'
              }`}>
                <option value="">Select your city</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60 uppercase tracking-tighter">Full Name</label>
              <input type="text" placeholder="John Doe" className={`w-full p-4 rounded-2xl border bg-transparent outline-none focus:border-cyan-500 transition-all ${
                theme === 'dark' ? 'border-white/10 text-white' : 'border-slate-200 text-slate-800'
              }`} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60 uppercase tracking-tighter">Phone Number</label>
              <input type="tel" placeholder="+91 00000 00000" className={`w-full p-4 rounded-2xl border bg-transparent outline-none focus:border-cyan-500 transition-all ${
                theme === 'dark' ? 'border-white/10 text-white' : 'border-slate-200 text-slate-800'
              }`} />
            </div>

            <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95">
              SUBMIT REQUEST
            </button>
          </form>
        </div>
      </div>

      {/* Footer Minimal */}
      <footer className={`border-t py-12 ${
        theme === 'dark' ? 'border-white/5 bg-black' : 'border-slate-200 bg-white'
      }`}>
    
      </footer>
    </div>
  );
}

export default ContactPage;