import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, FileText, CheckCircle, Clock } from 'lucide-react';
import { DEFAULT_SCHEDULE_STEPS } from '../data/defaultData';

export const SalesSchedule: React.FC = () => {
  const { themeTokens, siteConfig, setIsBookingModalOpen } = useApp();

  return (
    <section id="schedule" className="py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
            SALES SCHEDULE & PROCEDURE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            분양 일정 및 <span className={themeTokens.accentText}>계약 절차 안내</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            현재 청약통장 유무와 상관없이 원하는 로얄 동·호수를 직접 선택하여 계약하실 수 있습니다.
          </p>
        </div>

        {/* Timeline Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEFAULT_SCHEDULE_STEPS.map((step, idx) => {
            const isCurrent = step.status === 'current';
            const isPast = step.status === 'past';

            return (
              <div
                key={idx}
                className={`relative p-6 rounded-2xl border transition-all ${
                  isCurrent
                    ? `${themeTokens.badgeBg} border-emerald-500/80 shadow-lg ring-1 ring-emerald-500/30`
                    : 'bg-neutral-900/60 border-neutral-800'
                } flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-neutral-500">
                      STEP {step.step}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        isCurrent
                          ? `${themeTokens.accentBg} text-white`
                          : isPast
                          ? 'bg-neutral-800 text-neutral-400'
                          : 'bg-neutral-900 text-neutral-500'
                      }`}
                    >
                      {step.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {isCurrent && (
                  <div className="pt-4 mt-4 border-t border-emerald-500/20">
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className={`w-full py-2 text-xs font-bold text-white rounded-lg transition-colors ${themeTokens.accentBg} ${themeTokens.accentHoverBg}`}
                    >
                      선착순 잔여호수 예약하기
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Special Contract Privileges Notice */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <FileText className={`w-5 h-5 ${themeTokens.accentText}`} />
            <span>선착순 계약 고객 특별 혜택 및 필수 지참물</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                특별 계약 프로모션
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-400 leading-relaxed list-disc list-inside">
                <li><strong className="text-neutral-200">계약금 500만원 정액제:</strong> 초기 목돈 부담 최소화</li>
                <li><strong className="text-neutral-200">중도금 전액 무이자:</strong> 입주 시까지 추가 이자비용 0원</li>
                <li><strong className="text-neutral-200">분양권 즉시 전매:</strong> 무제한 전매 가능 (비규제 단지)</li>
                <li><strong className="text-neutral-200">발코니 확장 무상 시공:</strong> 수천만원 상당 옵션 혜택 지원</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                계약 체결 시 구비서류
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-400 leading-relaxed list-disc list-inside">
                <li>계약자 본인 신분증 (주민등록증 또는 운전면허증)</li>
                <li>인감도장 및 인감증명서 1통 (본인발급용)</li>
                <li>주민등록표 등본 1통 (주민등록번호 뒷자리 포함)</li>
                <li>계약금 무통장 입금증 (지정 계좌 사전 입금 필수)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
