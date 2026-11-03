import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Clock, Calendar } from 'lucide-react';

export const Directions: React.FC = () => {
  const { siteConfig, themeTokens, setIsBookingModalOpen } = useApp();

  return (
    <section id="directions" className="py-24 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 text-center mx-auto">
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
            CONSULTATION CENTER
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            공식 대표 <span className={themeTokens.accentText}>분양상담 안내</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            대표상담센터({siteConfig.phone})를 통해 잔여 세대 및 분양 조건에 대한 신속하고 친절한 상담을 받으실 수 있습니다.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Card: 공식 대표 분양상담 센터 */}
          <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-2.5 py-1 rounded font-bold bg-neutral-800 text-neutral-300">
                  공식 분양상담 센터
                </span>
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {siteConfig.operatingHours}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                1:1 맞춤 분양상담 및 잔여호수 안내
              </h3>

              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 mb-6">
                <div className="text-xs text-neutral-400 mb-1">대표 분양상담 직통번호</div>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                  className={`text-2xl sm:text-3xl font-extrabold ${themeTokens.accentText} font-mono tracking-wider block hover:opacity-90`}
                >
                  {siteConfig.phone}
                </a>
                <p className="text-xs text-neutral-400 mt-2">
                  청약통장 유무와 상관없이 선착순 로얄동·호수 지정 계약 조건 및 분양가 실시간 안내
                </p>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${themeTokens.accentText}`} />
                  <div>
                    <strong className="text-white">상담 지원:</strong> 분양가, 잔여 동호수, 계약조건, 전매절차, 세무대출 안내
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Calendar className={`w-4 h-4 shrink-0 mt-0.5 ${themeTokens.accentText}`} />
                  <div>
                    <strong className="text-white">방문상담 신청:</strong> 온라인 사전 예약 시 전담 상담사 우선 배정
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs text-neutral-400">연중무휴 유선상담</span>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className={`px-4 py-2 text-xs font-bold text-white rounded-lg transition-colors flex items-center gap-1.5 shadow ${themeTokens.accentBg} ${themeTokens.accentHoverBg}`}
              >
                <span>온라인 상담신청</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
