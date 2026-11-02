import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Phone, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { siteConfig, themeTokens, setIsAdminModalOpen, setIsBookingModalOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '사업개요', href: '#overview' },
    { label: '입지환경', href: '#location' },
    { label: '단지안내', href: '#complex' },
    { label: '세대평면', href: '#units' },
    { label: '분양안내', href: '#schedule' },
    { label: '분양소식', href: '#news' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-neutral-950/90 backdrop-blur-md border-neutral-800/80 py-3 shadow-lg'
            : 'bg-neutral-950/60 backdrop-blur-sm border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title wordmark */}
          <a
            href="#"
            className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-neutral-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="font-extrabold tracking-normal text-white">
              {siteConfig.name}
            </span>
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Admin Entry */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Phone quick link on desktop */}
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors px-2 py-1.5"
              title="대표 분양상담 전화연결"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              <span className="tabular-nums tracking-wider">{siteConfig.phone}</span>
            </a>

            {/* Admin entry trigger */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
              title="관리자 로그인"
              aria-label="관리자 로그인"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Primary Action CTA */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm ${themeTokens.accentBg} ${themeTokens.accentHoverBg}`}
            >
              분양상담 신청
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-950/98 border-b border-neutral-800 px-4 pt-3 pb-5 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-neutral-200 hover:text-white hover:bg-neutral-900 rounded-md"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-400">분양상담: {siteConfig.phone}</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminModalOpen(true);
                }}
                className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1"
              >
                <Lock className="w-3 h-3" /> 관리자 모드
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
