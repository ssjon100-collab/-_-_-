import React from 'react';
import { useApp } from '../context/AppContext';
import { Building, MapPin, CheckCircle2 } from 'lucide-react';

export const ProjectOverview: React.FC = () => {
  const { projectOverview, siteConfig, themeTokens } = useApp();

  return (
    <section id="overview" className="py-20 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
            PROJECT OVERVIEW
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {projectOverview.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            {projectOverview.description}
          </p>
        </div>

        {/* 2-Column Split: Birdview Imagery + Detailed Spec Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Complex Bird's Eye View Rendering */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group h-full min-h-[360px] bg-neutral-950">
              <img
                src={siteConfig.images.birdview || "/assets/aistudio/image_4b41780d.png"}
                alt={`${siteConfig.name} 단지 조감도`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs font-semibold text-neutral-300">조감도(CG)</div>
                <div className="text-lg font-bold">{siteConfig.name}</div>
                <p className="text-xs text-neutral-400 mt-1">
                  지하 5층 ~ 지상 40층 랜드마크 스카이라인
                </p>
              </div>
            </div>

            {/* Quick Location Note */}
            <div className="mt-4 p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-3">
              <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${themeTokens.accentText}`} />
              <div className="text-xs text-neutral-300 leading-relaxed">
                <span className="font-semibold text-white">현장 위치:</span> {siteConfig.siteAddress}
                <br />
                <span className="text-neutral-400">수인분당선 숭의역 1번 출구 도보 1분 거리 초역세권</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specification Table */}
          <div className="lg:col-span-7 bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">건축 및 공급 세부개요</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  인허가 및 건축심의 완료 기준 상세 데이터
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded font-medium ${themeTokens.badgeBg} ${themeTokens.badgeText}`}>
                공식 승인
              </span>
            </div>

            <div className="divide-y divide-neutral-800/80 text-sm">
              {projectOverview.items.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 sm:grid-cols-4 px-6 py-3.5 hover:bg-neutral-900/40 transition-colors"
                >
                  <div className="font-semibold text-neutral-400 text-xs sm:text-sm">
                    {item.label}
                  </div>
                  <div className="col-span-2 sm:col-span-3 text-white text-xs sm:text-sm font-medium tabular-nums">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-neutral-900/60 border-t border-neutral-800 text-xs text-neutral-500">
              ※ 상기 사업개요 및 CG 이미지는 인허가 과정 및 실제 시공 시 다소 변경될 수 있습니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
