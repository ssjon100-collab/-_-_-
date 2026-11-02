import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, CheckCircle2, Info, ArrowRight } from 'lucide-react';

export const MortgageCalculator: React.FC = () => {
  const { themeTokens, setIsBookingModalOpen } = useApp();

  // Unit presale baseline pricing estimate (in 10,000 KRW = 만원)
  const [selectedUnitType, setSelectedUnitType] = useState<'69' | '84' | '84OA'>('84');
  const [loanRatio, setLoanRatio] = useState<number>(70); // 70% LTV
  const [loanPeriodYears, setLoanPeriodYears] = useState<number>(30); // 30 years
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(3.8); // 3.8%

  const basePriceMap = {
    '69': 51371, // 5억 1,371만원
    '84': 67019, // 6억 7,019만원
    '84OA': 46243, // 4억 6,243만원
  };

  const estimatedTotal = basePriceMap[selectedUnitType];
  const downPayment = 1000; // 계약금 1,000만원 정액제
  const intermediatePayment = estimatedTotal * 0.6; // 중도금 60% (무이자)
  const loanPrincipal = (estimatedTotal * (loanRatio / 100)); // 잔금 대출 시 원금

  // Monthly amortized payment formula: P * (r*(1+r)^n) / ((1+r)^n - 1)
  const monthlyRate = annualInterestRate / 100 / 12;
  const totalMonths = loanPeriodYears * 12;
  const monthlyRepayment =
    monthlyRate > 0
      ? (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanPrincipal / totalMonths;

  // Estimated interest savings from interest-free intermediate loan (approx 2.5 years @ 4.5%)
  const savedIntermediateInterest = Math.round(intermediatePayment * 0.045 * 2.5);

  const formatManwon = (val: number) => {
    const eok = Math.floor(val / 10000);
    const man = Math.round(val % 10000);
    if (eok > 0) {
      return `${eok}억 ${man > 0 ? man.toLocaleString() + '만' : ''}원`;
    }
    return `${man.toLocaleString()}만원`;
  };

  return (
    <section className="py-20 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
            FINANCIAL SIMULATION
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            스마트 <span className={themeTokens.accentText}>분양가 & 자금 계획 계산기</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            계약금 1,000만원 정액제와 중도금 전액 무이자 혜택으로 자금 부담을 획기적으로 낮췄습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Box */}
          <div className="lg:col-span-6 bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 space-y-6 shadow-xl">
            {/* 1. Unit Type Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-2">
                관심 평형 선택
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['69', '84', '84OA'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedUnitType(type)}
                    className={`py-3 px-4 rounded-xl text-center font-bold text-sm transition-all border ${
                      selectedUnitType === type
                        ? `${themeTokens.accentBg} text-white border-transparent shadow`
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>{type} 타입</div>
                    <div className="text-xs font-normal opacity-80 mt-0.5">
                      약 {formatManwon(basePriceMap[type])}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Loan Ratio (LTV) */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-400 mb-2">
                <span>잔금 대출 비율 (LTV)</span>
                <span className="text-white font-bold text-sm">{loanRatio}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="80"
                step="10"
                value={loanRatio}
                onChange={(e) => setLoanRatio(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span className={loanRatio === 50 ? 'text-white font-bold' : ''}>50%</span>
                <span className={loanRatio === 60 ? 'text-white font-bold' : ''}>60%</span>
                <span className={loanRatio === 70 ? 'text-white font-bold' : ''}>70% (생애최초/비규제)</span>
                <span className={loanRatio === 80 ? 'text-white font-bold' : ''}>80%</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2.5">
                {[50, 60, 70, 80].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setLoanRatio(ratio)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                      loanRatio === ratio
                        ? 'bg-neutral-800 text-white border-neutral-600'
                        : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {ratio}%
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Loan Period */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-400 mb-2">
                <span>대출 상환 기간</span>
                <span className="text-white font-bold text-sm">{loanPeriodYears}년</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 30, 40].map((years) => (
                  <button
                    key={years}
                    onClick={() => setLoanPeriodYears(years)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                      loanPeriodYears === years
                        ? 'bg-neutral-800 text-white border-neutral-600'
                        : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {years}년
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Interest Rate */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-400 mb-2">
                <span>예상 대출 금리 (연이율)</span>
                <span className="text-white font-bold text-sm">{annualInterestRate}%</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="6.0"
                step="0.1"
                value={annualInterestRate}
                onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-6 bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div>
                  <span className="text-xs text-neutral-400">시뮬레이션 결과</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {selectedUnitType}㎡ 예상 입주 자금 계획
                  </h3>
                </div>
                <div className={`p-2.5 rounded-xl ${themeTokens.lightAccentBg} ${themeTokens.accentText}`}>
                  <Calculator className="w-5 h-5" />
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-800/80">
                  <span className="text-neutral-400">초기 필요 계약금 (1차)</span>
                  <span className="font-extrabold text-white text-base">
                    1,000만원 정액제
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-neutral-800/80">
                  <div>
                    <span className="text-neutral-400 block">중도금 60%</span>
                    <span className={`text-xs ${themeTokens.accentText}`}>전액 무이자 지원</span>
                  </div>
                  <span className="font-bold text-white tabular-nums">
                    {formatManwon(intermediatePayment)} (0원 이자)
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-neutral-800/80">
                  <span className="text-neutral-400">입주 시 예상 대출금</span>
                  <span className="font-bold text-white tabular-nums">
                    약 {formatManwon(loanPrincipal)}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800/90 mt-4">
                  <div className="text-xs text-neutral-400">원리금 균등상환 시 예상 월 납입액</div>
                  <div className="text-2xl font-black text-white mt-1 tabular-nums">
                    약 {Math.round(monthlyRepayment).toLocaleString()} <span className="text-sm font-semibold text-neutral-400">만원 / 월</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    ({loanPeriodYears}년 만기, 연 {annualInterestRate}% 기준)
                  </div>
                </div>

                {/* Highlight banner on saved interest */}
                <div className={`p-3.5 rounded-xl ${themeTokens.badgeBg} border ${themeTokens.accentBorder} flex items-center gap-3 text-xs`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${themeTokens.accentText}`} />
                  <span className="text-neutral-200">
                    중도금 무이자 혜택으로 <strong className="text-white underline">약 {formatManwon(savedIntermediateInterest)} 상당</strong>의 금융 비용을 절감할 수 있습니다.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className={`w-full py-3.5 text-sm font-bold text-white rounded-xl transition-all shadow flex items-center justify-center gap-2 ${themeTokens.accentBg} ${themeTokens.accentHoverBg}`}
              >
                <span>내 조건 맞춤 1:1 세무·대출 무료 상담신청</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
