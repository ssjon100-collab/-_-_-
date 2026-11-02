import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Train,
  Sunrise,
  Award,
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Train,
  Sunrise,
  Award,
  Building2,
  TrendingUp,
  ShieldCheck,
};

export const LocationPremiums: React.FC = () => {
  const { premiums, themeTokens, siteConfig } = useApp();

  return (
    <section id="location" className="py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
            PREMIUM LOCATION & INFRASTRUCTURE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
            {siteConfig.name}이 선사하는
            <br />
            <span className={themeTokens.accentText}>6가지 핵심 프리미엄 가치</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            교통, 자연, 조망, 인프라, 비전, 금융혜택까지 모두 갖춘 미추홀 최고의 초고층 주거 랜드마크입니다.
          </p>
        </div>

        {/* Asymmetric Bento-Grid for 6 Premiums */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiums.map((premium, index) => {
            const IconComponent = ICON_MAP[premium.iconName] || Train;
            // Feature cards 0 and 1 take larger visual presence if desired
            const isHighlight = index === 0 || index === 1;

            return (
              <div
                key={premium.id}
                className={`relative rounded-2xl p-7 transition-all duration-300 border ${
                  isHighlight
                    ? 'bg-neutral-900/90 border-neutral-700/80 shadow-xl'
                    : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
                } flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  {/* Top Header Row with Number and Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-black text-neutral-500/70 group-hover:text-neutral-400 transition-colors">
                      {premium.number}
                    </span>
                    <span className="text-xs font-medium text-neutral-400 tracking-wider">
                      {premium.subtitle}
                    </span>
                  </div>

                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-lg ${themeTokens.lightAccentBg} ${themeTokens.accentText}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {premium.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed mt-2">
                    {premium.description}
                  </p>
                </div>

                {/* Clean unboxed tag at bottom */}
                <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <span className={`font-semibold ${themeTokens.accentText}`}>
                    {premium.tag}
                  </span>
                  <span className="text-neutral-500 font-medium">유림 노르웨이숲더스카이</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transportation Connectivity Feature Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                TRANSIT ACCESSIBILITY
              </span>
              <h4 className="text-lg font-bold text-white">
                사통팔달 쾌속 교통망
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                수인분당선을 통해 강남 및 판교, 수원은 물론 서울 도심과 직결되는 특급 교통 환경을 자랑합니다.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80">
                <div className="text-xs text-neutral-400">지하철 직결</div>
                <div className="text-base font-bold text-white mt-1">수인분당선 숭의역</div>
                <div className="text-xs text-neutral-400 mt-1">도보 1분 (1번 출구 바로 앞)</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80">
                <div className="text-xs text-neutral-400">고속도로 인접</div>
                <div className="text-base font-bold text-white mt-1">제2경인고속도로</div>
                <div className="text-xs text-neutral-400 mt-1">능해IC 차량 3분 진입</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80">
                <div className="text-xs text-neutral-400">미래 철도망</div>
                <div className="text-base font-bold text-white mt-1">인천발 KTX (예정)</div>
                <div className="text-xs text-neutral-400 mt-1">송도역 2정거장 환승</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
