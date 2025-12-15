'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Menu, X, ChevronDown, Phone, Mail, Droplet, Home, Info, Package,
  Wrench, FileText, Contact, Facebook, Youtube, Linkedin,
  Clock, Filter, Users, TestTube, Sparkles, Sun, Moon
} from 'lucide-react';
import { Target } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

/* ------------------ DATA ------------------ */

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  {
    name: 'About Us',
    href: '/about',
    icon: Info,
    dropdown: [
      { name: 'Our Story', href: '/about/story', icon: FileText },
      { name: 'Our Team', href: '/about/team', icon: Users },
      { name: 'Mission & Vision', href: '/about/mission', icon: Target },
      { name: 'Technology', href: '/about/technology', icon: Sparkles },
    ],
  },
  { name: 'Products', href: '/products', icon: Package },
  {
    name: 'Services',
    href: '/services',
    icon: Wrench,
    dropdown: [
      { name: 'Installation', href: '/services/installation', icon: Wrench },
      { name: 'Maintenance', href: '/services/maintenance', icon: Clock },
      { name: 'Filter Replacement', href: '/services/filter-replacement', icon: Filter },
      { name: 'Water Testing', href: '/services/water-testing', icon: TestTube },
    ],
  },
  { name: 'Contact', href: '/contact', icon: Contact },
];

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Youtube, href: '#' },
  { icon: Linkedin, href: '#' },
];

/* ------------------ COMPONENT ------------------ */

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div
        className={`hidden lg:block bg-gradient-to-r from-cyan-700 to-cyan-600 text-white text-sm py-2 ${
          scrolled && 'hidden'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 text-cyan-100">
              <Phone className="w-4 h-4" /> +880 1919 222 222
            </span>
            <span className="flex items-center gap-2 text-cyan-100">
              <Mail className="w-4 h-4" /> info@safetapbd.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((s, i) => (
              <s.icon
                key={i}
                className="w-4 h-4 text-cyan-100 hover:text-white cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav
        className={`z-50 transition-all duration-300 ${
          scrolled
            ? 'fixed top-0 inset-x-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-cyan-200'
            : 'relative bg-white dark:bg-gray-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-700 to-cyan-600 flex items-center justify-center">
              <Droplet className="text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-700 to-cyan-500 bg-clip-text text-transparent">
                SafeTap BD
              </h1>
              <p className="text-xs text-cyan-600 hidden sm:block">
                Pure Water, Smart Life
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-2">
            {navigationItems.map(item =>
              item.dropdown ? (
                <div key={item.name} className="relative">
                  <button
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    className="px-4 py-2 font-semibold text-cyan-500 hover:text-cyan-600 flex items-center gap-1"
                  >
                    {item.name} <ChevronDown className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-cyan-200 overflow-hidden"
                      >
                        <div className="bg-gradient-to-r from-cyan-700 to-cyan-600 text-white px-4 py-2 font-semibold">
                          {item.name}
                        </div>
                        {item.dropdown.map(sub => (
                          <Link key={sub.name} href={sub.href}>
                            <div className="px-4 py-3 hover:bg-cyan-50 flex items-center gap-3 text-cyan-700">
                              <sub.icon className="w-4 h-4 text-cyan-500" />
                              {sub.name}
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 font-semibold text-cyan-500 hover:text-cyan-600"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-gray-700 flex items-center justify-center"
            >
              {theme === 'dark' ? <Moon /> : <Sun />}
            </button>

            <Link href="/get-started" className="hidden lg:flex">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-700 to-cyan-600 text-white font-semibold flex items-center gap-2">
                <Droplet className="w-4 h-4" />
                Get Started
              </button>
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-cyan-600"
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-cyan-700">
                  SafeTap BD
                </span>
                <X onClick={() => setMobileOpen(false)} />
              </div>

              {navigationItems.map(item => (
                <Link key={item.name} href={item.href}>
                  <div className="p-3 rounded-lg hover:bg-cyan-50 text-cyan-700 font-semibold">
                    {item.name}
                  </div>
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
