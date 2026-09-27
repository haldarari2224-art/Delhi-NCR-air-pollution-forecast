import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import QRCodeModal from './QRCodeModal';

function Navbar() {
  const [showQR, setShowQR] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/dashboard', label: 'AQI Dashboard' },
    { to: '/causes', label: 'Causes' },
    { to: '/solutions', label: 'Solutions' },
    { to: '/essay', label: 'Essay' },
    { to: '/map', label: 'Map' },
    { to: '/sources', label: 'Sources' },
  ];

  return (
    <>
      <nav className="w-full min-h-[70px] flex items-center justify-between px-4 sm:px-8 lg:px-10 bg-white/80 backdrop-blur-md border-b border-emerald-900/10 fixed top-0 left-0 z-50 transition-all">
        {/* Brand Name / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-black text-emerald-950 tracking-tight hover:opacity-90 transition-opacity shrink-0"
        >
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-900 to-teal-600 text-white flex items-center justify-center text-sm shadow-sm">
            🌬️
          </span>
          <span>
            AirNova<span className="text-emerald-600">72</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex list-none items-center gap-5 lg:gap-7 m-0 p-0">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`text-sm lg:text-[15px] font-semibold transition-colors ${
                    isActive
                      ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-1'
                      : 'text-slate-700 hover:text-emerald-800'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Action Controls: QR Code + Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Quick QR Code Trigger */}
          <button
            onClick={() => setShowQR(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
            title="Scan QR Code to open on mobile"
          >
            <span>📱</span>
            <span className="hidden sm:inline">QR Code</span>
            <span className="sm:hidden">QR</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-emerald-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <span className="text-xl font-bold leading-none">✕</span>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-[70px] left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 md:hidden px-6 py-4 shadow-xl animate-fadeIn">
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-base font-semibold transition-colors ${
                    location.pathname === link.to ? 'text-emerald-800 font-bold' : 'text-slate-700 hover:text-emerald-800'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowQR(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-900 rounded-xl font-bold text-sm border border-emerald-200"
              >
                <span>📱</span> Show Website QR Code
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Reusable QR Code Modal */}
      <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </>
  );
}

export default Navbar;