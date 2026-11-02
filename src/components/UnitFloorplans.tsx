import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UnitType } from '../types';
import { Check, Maximize2, Layers, CheckCircle2, Eye, X } from 'lucide-react';

export const UnitFloorplans: React.FC = () => {
  const { units, themeTokens, setSelectedUnitForModal, setIsBookingModalOpen, siteConfig } = useApp();
  const [selectedUnitId, setSelectedUnitId] = useState<string>(units[0]?.id || 'unit-69');
  const [viewMode, setViewMode] = useState<'plan' | 'iso'>('plan');
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const currentUnit = units.find((u) => u.id === selectedUnitId) || units[0];

  const handleBookUnit = (unit: UnitType) => {
    setSelectedUnitForModal(unit);
    setIsBookingModalOpen(true);
  };

  return (
    <section id="units" className="py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
              UNIT PLAN & FLOOR SPECIFICATIONS
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              공간의 미학을 완성한 <span className={themeTokens.accentText}>혁신 평면 설계</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400">
              실수요자 선호도 높은 중소형 아파트(69·84)와 3룸 주거형 오피스텔(84OA·84OB)로 구성되어 있습니다.
            </p>
          </div>

          {/* Unit Category Selector: 69, 84, 84OA, 84OB */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => {
                  setSelectedUnitId(unit.id);
                  setViewMode('plan');
                }}
                className={`px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                  selectedUnitId === unit.id
                    ? `${themeTokens.accentBg} text-white shadow`
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <span>{unit.name}</span>
                <span className="text-[10px] ml-1 opacity-70 font-normal">({unit.category})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Unit Detail Card */}
        {currentUnit && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Exact Architectural Floor Plan Image Viewer */}
            <div className="lg:col-span-7 bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                  <div>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                      {currentUnit.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                      <span>{currentUnit.name}</span>
                      {currentUnit.isPopular && (
                        <span className={`text-xs px-2.5 py-0.5 rounded font-bold ${themeTokens.badgeBg} ${themeTokens.badgeText}`}>
                          인기 추천
                        </span>
                      )}
                    </h3>
                  </div>

                  {/* Toggle between Floorplan and 3D Iso view */}
                  <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-800">
                    <button
                      onClick={() => setViewMode('plan')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        viewMode === 'plan'
                          ? 'bg-neutral-800 text-white shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      상세 평면도
                    </button>
                    <button
                      onClick={() => setViewMode('iso')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        viewMode === 'iso'
                          ? 'bg-neutral-800 text-white shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      3D 입체 아이소
                    </button>
                  </div>
                </div>

                {/* Exact High-Resolution Reference Image Viewport */}
                <div className="relative bg-white rounded-xl p-2 sm:p-4 border border-neutral-800/80 aspect-[4/3] flex items-center justify-center overflow-hidden group">
                  <img
                    src={
                      viewMode === 'plan'
                        ? currentUnit.planImage || `/src/assets/images/units/unit_${currentUnit.name.toLowerCase()}.jpg`
                        : currentUnit.isoImage || `/src/assets/images/units/unit_iso_${currentUnit.name.toLowerCase()}.png`
                    }
                    alt={`${siteConfig.name} ${currentUnit.name} ${viewMode === 'plan' ? '평면도' : '3D 아이소'}`}
                    className={`max-w-full max-h-full ${
                      viewMode === 'plan' ? 'object-contain' : 'object-contain filter drop-shadow-md'
                    } transition-transform duration-300 group-hover:scale-[1.02]`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Enlarge / Fullscreen Zoom Button */}
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="absolute top-3 right-3 px-2.5 py-1.5 bg-neutral-950/80 hover:bg-neutral-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 backdrop-blur transition-all shadow"
                    title="이미지 크게 확대보기"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>크게보기</span>
                  </button>

                  <div className="absolute bottom-3 left-3 text-[11px] font-medium px-2 py-1 bg-black/70 backdrop-blur rounded text-neutral-200">
                    {currentUnit.name} {viewMode === 'plan' ? '정밀 설계 평면도' : '3D 입체 투시도'}
                  </div>
                </div>

                <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
                  {currentUnit.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  ※ 배정 세대수: 총 <strong className="text-white font-bold tabular-nums">{currentUnit.unitsCount}</strong>세대 / 호실
                </span>
                <button
                  onClick={() => handleBookUnit(currentUnit)}
                  className={`px-4 py-2 text-xs font-bold text-white rounded-lg transition-colors shadow ${themeTokens.accentBg} ${themeTokens.accentHoverBg}`}
                >
                  {currentUnit.name} 잔여호수 문의
                </button>
              </div>
            </div>

            {/* Right: Area Breakdown Table & Features */}
            <div className="lg:col-span-5 space-y-6">
              {/* Dimensions Spec Box */}
              <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 shadow-xl">
                <h4 className="text-base font-bold text-white border-b border-neutral-800 pb-3 mb-4">
                  면적 산출표 (Square Meter Breakdown)
                </h4>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-800/60">
                    <span className="text-neutral-400 text-xs sm:text-sm">전용면적</span>
                    <span className="font-bold text-white tabular-nums">{currentUnit.exclusiveArea}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-800/60">
                    <span className="text-neutral-400 text-xs sm:text-sm">공급면적</span>
                    <span className="font-bold text-white tabular-nums">{currentUnit.supplyArea}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-800/60">
                    <span className="text-neutral-400 text-xs sm:text-sm">계약면적</span>
                    <span className="font-bold text-white tabular-nums">{currentUnit.contractArea}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-neutral-400 text-xs sm:text-sm">총 공급규모</span>
                    <span className={`font-extrabold ${themeTokens.accentText} tabular-nums`}>
                      {currentUnit.unitsCount} 세대 / 실
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Features Checklist */}
              <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 shadow-xl">
                <h4 className="text-base font-bold text-white border-b border-neutral-800 pb-3 mb-4">
                  {currentUnit.name} 평면 특화 프리미엄 설계
                </h4>

                <ul className="space-y-3">
                  {currentUnit.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <div className={`mt-0.5 p-1 rounded-full ${themeTokens.lightAccentBg} ${themeTokens.accentText}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-neutral-800">
                  <button
                    onClick={() => handleBookUnit(currentUnit)}
                    className="w-full py-3.5 text-sm font-bold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{currentUnit.name} 분양가 및 상세상담 신청</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Zoom Lightbox Modal */}
        {isZoomOpen && currentUnit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative max-w-5xl w-full bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 p-4 shadow-2xl flex flex-col max-h-[92vh]">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="text-sm font-bold text-white">
                  {siteConfig.name} - {currentUnit.name} ({currentUnit.category}) 고화질 평면도
                </div>
                <button
                  onClick={() => setIsZoomOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-white rounded-xl mt-3">
                <img
                  src={
                    viewMode === 'plan'
                      ? currentUnit.planImage || `/src/assets/images/units/unit_${currentUnit.name.toLowerCase()}.jpg`
                      : currentUnit.isoImage || `/src/assets/images/units/unit_iso_${currentUnit.name.toLowerCase()}.png`
                  }
                  alt={`${currentUnit.name} 평면도`}
                  className="max-w-full max-h-[75vh] object-contain"
                />
              </div>

              <div className="pt-3 text-right">
                <span className="text-xs text-neutral-400 mr-4">
                  전용: {currentUnit.exclusiveArea} | 공급: {currentUnit.supplyArea}
                </span>
                <button
                  onClick={() => setIsZoomOpen(false)}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
