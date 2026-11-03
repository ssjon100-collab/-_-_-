import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Dumbbell, BookOpen, Trees } from 'lucide-react';

export const ComplexCommunity: React.FC = () => {
  const { siteConfig, themeTokens } = useApp();
  const [activeTab, setActiveTab] = useState<'community' | 'living' | 'bedroom'>('community');

  const facilities = [
    {
      title: "피트니스 & GX룸",
      subtitle: "WELLNESS CENTER",
      icon: Dumbbell,
      desc: "최신식 명품 웨이트 머신과 유산소 기구가 완비된 입주민 전용 헬스 케어존",
    },
    {
      title: "북카페 & 작은도서관",
      subtitle: "CULTURE & STUDY",
      icon: BookOpen,
      desc: "자녀와 부모가 함께 여유롭게 독서와 학습을 즐길 수 있는 아늑한 문화 공간",
    },
    {
      title: "포레스트 중앙정원",
      subtitle: "NATURE PLAZA",
      icon: Trees,
      desc: "노르웨이숲 시그니처 조경 테마를 담은 친환경 분수대 및 숲속 산책로",
    },
  ];

  return (
    <section id="complex" className="py-24 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
            EXCLUSIVE COMMUNITY & NATURE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            입주민의 일상을 품격으로 채우는
            <br />
            <span className={themeTokens.accentText}>하이엔드 커뮤니티 & 특화 조경</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            도심 속에서 북유럽 숲의 평온함과 호텔급 프리미엄 라이프를 동시에 누리실 수 있습니다.
          </p>
        </div>

        {/* Tab Controls (Functional buttons for interactive photo switching) */}
        <div className="flex items-center gap-2 p-1.5 bg-neutral-950 rounded-xl border border-neutral-800 w-fit mb-8">
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'community'
                ? `${themeTokens.accentBg} text-white shadow`
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            입주민 커뮤니티 클럽
          </button>
          <button
            onClick={() => setActiveTab('living')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'living'
                ? `${themeTokens.accentBg} text-white shadow`
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            거실 인테리어 (파노라마 뷰)
          </button>
          <button
            onClick={() => setActiveTab('bedroom')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'bedroom'
                ? `${themeTokens.accentBg} text-white shadow`
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            마스터 침실 인테리어
          </button>
        </div>

        {/* Interactive Media Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950 aspect-[16/9] max-h-[580px] group">
          <img
            src={
              activeTab === 'community'
                ? siteConfig.images.community
                : activeTab === 'living'
                ? siteConfig.images.livingRoom
                : siteConfig.images.bedroom
            }
            alt="커뮤니티 및 인테리어 투시도"
            className="w-full h-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                {activeTab === 'community' ? 'COMMUNITY CLUB' : 'INTERIOR SHOWROOM'}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mt-1">
                {activeTab === 'community'
                  ? '입주민을 위한 고품격 피트니스 & 커뮤니티 클럽'
                  : activeTab === 'living'
                  ? '대형 통창으로 펼쳐지는 파노라마 오션 & 시티뷰 거실'
                  : '호텔 스위트룸 감성의 마스터 침실 & 드레스룸 공간'}
              </h3>
            </div>
            <span className="text-xs text-neutral-400 shrink-0">
              ※ 실제 시공 및 마감재는 인허가 과정에 따라 다소 상이할 수 있습니다.
            </span>
          </div>
        </div>

        {/* 3 Feature Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${themeTokens.lightAccentBg} ${themeTokens.accentText}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-neutral-400 tracking-wider">
                  {fac.subtitle}
                </div>
                <h4 className="text-base font-bold text-white mt-1 mb-2">
                  {fac.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
