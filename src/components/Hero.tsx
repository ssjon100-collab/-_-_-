import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Calendar, Compass, ShieldAlert, Sparkles, Building, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { siteConfig, themeTokens, setIsBookingModalOpen } = useApp();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-neutral-950">
      {/* Background Photography with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteConfig.images.hero}
          alt={`${siteConfig.name} 외관 투시도`}
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Elegant CSS fallback if image load fails
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Measured dark gradient overlay for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-neutral-950/30 to-neutral-950/80" />
      </div>

      {/* Top Announcement Ticker */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 text-xs text-neutral-300">
          <span className={`w-2 h-2 rounded-full ${themeTokens.accentBg}`} />
          <span className="font-semibold text-white tracking-wide">{siteConfig.heroBadge}</span>
          <span className="text-neutral-500 hidden sm:inline">|</span>
          <span className="text-neutral-300 text-xs truncate max-w-md hidden md:inline">
            {siteConfig.announcementTicker}
          </span>
        </div>
      </div>

      {/* Main Hero Proposition */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-3xl space-y-6">
          {/* Subtitle kicker */}
          <div className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 font-medium uppercase">
            <span>{siteConfig.subName}</span>
            <span aria-hidden="true">·</span>
            <span>INCHEON DOWNTOWN LANDMARK</span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.18]"
            style={{ textWrap: 'balance' }}
          >
            수인분당선 숭의역 초역세권
            <br />
            <span className={`${themeTokens.accentText}`}>최고 40층</span> 초고층 스카이라인
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            {siteConfig.heroSubtitle}
          </p>

          {/* Key Quick Facts (Unboxed text with subtle typographic separators) */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-neutral-300 pt-2 border-t border-white/10">
            <span className="font-medium text-white">숭의역 1번출구 도보 1분</span>
            <span className="text-neutral-600" aria-hidden="true">/</span>
            <span className="font-medium text-white">총 432세대 랜드마크</span>
            <span className="text-neutral-600" aria-hidden="true">/</span>
            <span className="font-medium text-white">중도금 전액 무이자</span>
            <span className="text-neutral-600" aria-hidden="true">/</span>
            <span className="font-medium text-white">계약금 1,000만원 정액제</span>
          </div>

          {/* Primary Action Zone */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className={`px-7 py-3.5 text-sm font-bold text-white rounded-lg transition-all shadow-lg flex items-center gap-2 ${themeTokens.accentBg} ${themeTokens.accentHoverBg} active:scale-[0.99]`}
            >
              <span>VIP 분양상담 신청</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#units"
              className="px-6 py-3.5 text-sm font-medium text-neutral-200 hover:text-white bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-700/80 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>평면도 및 분양가 보기</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4-Column KPI Strip (Full-width row below hero split) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 shadow-xl">
          <div className="space-y-1">
            <div className="text-xs text-neutral-400 font-medium">교통 프리미엄</div>
            <div className="text-lg sm:text-xl font-bold text-white tracking-tight">도보 1분</div>
            <div className="text-xs text-neutral-400">수인분당선 숭의역 직결</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs text-neutral-400 font-medium">건축 규모</div>
            <div className="text-lg sm:text-xl font-bold text-white tracking-tight">최고 40층</div>
            <div className="text-xs text-neutral-400">파노라마 오션 & 시티뷰</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-neutral-400 font-medium">공급 세대</div>
            <div className="text-lg sm:text-xl font-bold text-white tracking-tight">총 432세대</div>
            <div className="text-xs text-neutral-400">아파트 324 + 오피스텔 108</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-neutral-400 font-medium">금융 특별혜택</div>
            <div className={`text-lg sm:text-xl font-bold ${themeTokens.accentText} tracking-tight`}>중도금 무이자</div>
            <div className="text-xs text-neutral-400">계약금 1,000만원 정액제</div>
          </div>
        </div>
      </div>
    </section>
  );
};
