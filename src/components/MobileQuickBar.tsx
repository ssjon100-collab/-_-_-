import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Calendar, MapPin } from 'lucide-react';

export const MobileQuickBar: React.FC = () => {
  const { siteConfig, themeTokens, setIsBookingModalOpen } = useApp();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl h-[56px]">
      {/* 1. Phone Call */}
      <a
        href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white text-xs font-bold active:scale-[0.98] transition-transform"
      >
        <Phone className="w-3.5 h-3.5 text-emerald-400" />
        <span className="truncate">전화상담</span>
      </a>

      {/* 2. VIP Reservation */}
      <button
        onClick={() => setIsBookingModalOpen(true)}
        className={`flex-[1.4] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-white text-xs font-bold shadow active:scale-[0.98] transition-all ${themeTokens.accentBg}`}
      >
        <Calendar className="w-3.5 h-3.5" />
        <span className="truncate">VIP 분양상담</span>
      </button>

      {/* 3. Directions link */}
      <a
        href="#directions"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-neutral-900 border border-neutral-700/80 text-neutral-300 text-xs font-bold active:scale-[0.98] transition-transform"
      >
        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
        <span className="truncate">오시는길</span>
      </a>
    </div>
  );
};
