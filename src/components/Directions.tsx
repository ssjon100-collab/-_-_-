import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Navigation, Phone, Clock, Copy, Check, Car, Train, Calendar } from 'lucide-react';

export const Directions: React.FC = () => {
  const { siteConfig, themeTokens, setIsBookingModalOpen } = useApp();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="directions" className="py-24 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
            LOCATION & CONSULTATION
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            사업지 현장 위치 및 <span className={themeTokens.accentText}>분양상담 안내</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            수인분당선 숭의역 도보 1분 초역세권 현장 및 대표상담센터(1688-8768)를 통해 신속한 상담을 받으실 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: 신축 공사현장 (Site) */}
          <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs px-2.5 py-1 rounded font-bold ${themeTokens.badgeBg} ${themeTokens.badgeText}`}>
                  신축 공사현장 (Site)
                </span>
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 2030년 05월 준공예정
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {siteConfig.name} 현장 위치
              </h3>

              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 mb-6">
                <div className="text-xs text-neutral-400 mb-1">현장 대지위치</div>
                <div className="text-sm font-semibold text-white select-all">
                  {siteConfig.siteAddress}
                </div>
                <button
                  onClick={() => copyToClipboard(siteConfig.siteAddress)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>현장 주소 복사완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>주소 복사하기</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <Train className={`w-4 h-4 shrink-0 mt-0.5 ${themeTokens.accentText}`} />
                  <div>
                    <strong className="text-white">지하철 이용 시:</strong> 수인분당선 숭의역 1번 출구 도보 1분 (단지 직결)
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Car className={`w-4 h-4 shrink-0 mt-0.5 ${themeTokens.accentText}`} />
                  <div>
                    <strong className="text-white">자가용 이용 시:</strong> 제2경인고속도로 능해IC 차량 3분 / 내비게이션 &quot;{siteConfig.siteAddress}&quot; 검색
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs text-neutral-400">수인분당선 초역세권</span>
              <a
                href={`https://map.naver.com/v5/search/${encodeURIComponent(siteConfig.siteAddress)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
              >
                네이버 지도에서 현장 보기
              </a>
            </div>
          </div>

          {/* Card 2: 공식 대표 분양상담 센터 */}
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
