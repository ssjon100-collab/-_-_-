import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const { siteConfig, themeTokens, addLead } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Korean phone number auto-formatter
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else if (raw.length > 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
    }
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('성함을 입력해 주세요.');
      return;
    }
    if (phone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg('올바른 휴대폰 번호를 입력해 주세요 (10~11자리).');
      return;
    }
    if (!agreed) {
      setErrorMsg('개인정보 수집 및 분양상담 안내에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addLead({
        name: name.trim(),
        phone: phone.trim(),
        notes: notes.trim(),
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reserve" className="py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              VIP RESERVATION & CONSULTATION
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              VIP 분양상담 및
              <br />
              <span className={themeTokens.accentText}>로얄동호수 1:1 상담신청</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              사전 상담예약을 신청해 주신 고객님께는 전문 상담사 1:1 전담 배정 및 잔여 호수 분양가 혜택을 상세히 안내해 드립니다.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-3">
                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${themeTokens.accentText}`} />
                <div className="text-xs text-neutral-300">
                  <strong className="text-white block mb-0.5">신속한 1:1 전문 분양상담</strong>
                  원하시는 평형과 층수에 맞추어 맞춤 상담을 제공합니다.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-3">
                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${themeTokens.accentText}`} />
                <div className="text-xs text-neutral-300">
                  <strong className="text-white block mb-0.5">로얄층 우선 매칭 및 분양가 상담</strong>
                  오션뷰 및 시티뷰 선호 로얄 동·호수 잔여분을 우선 안내해 드립니다.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 text-xs text-neutral-400">
              <span className="font-semibold text-white">직통 상담센터:</span> {siteConfig.phone} (연중무휴 10:00~18:00)
            </div>
          </div>

          {/* Right: Lead Registration Form */}
          <div className="lg:col-span-7 bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-5">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${themeTokens.badgeBg} ${themeTokens.accentText}`}>
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    분양상담 신청이 정상 접수되었습니다
                  </h3>
                  <p className="text-sm text-neutral-300 mt-2">
                    <strong className="text-white">{name}</strong> 고객님, 감사합니다.
                    <br />
                    전문 상담사가 배정되어 남겨주신 연락처로 신속히 안내 전화를 드리겠습니다.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 max-w-md mx-auto text-left space-y-1">
                  <div>· 예약 신청자: {name} ({phone})</div>
                  <div>· 사업지: {siteConfig.siteAddress}</div>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setPhone('');
                    setNotes('');
                  }}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  추가 예약 및 신청
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-neutral-800 pb-4 mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    VIP 관심고객 등록 및 예약 정보 입력
                  </h3>
                  <span className="text-xs text-neutral-500 font-medium">
                    * 필수 입력 항목
                  </span>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/80 border border-red-800/80 text-xs text-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      고객 성함 *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="예: 홍길동"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      연락처 (휴대폰) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="010-0000-0000"
                        maxLength={13}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 tabular-nums"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    추가 문의사항 (선택사항)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="희망 층수나 대출 조건 등 궁금하신 점을 적어주세요."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="privacy-terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-700 text-emerald-600 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="privacy-terms" className="text-xs text-neutral-400 cursor-pointer leading-relaxed">
                    [필수] 개인정보 수집 및 분양상담 안내 연락에 동의합니다. (수집 항목: 성함, 연락처 / 보유기간: 분양 완료 시 파기)
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 text-sm font-bold text-white rounded-xl transition-all shadow-lg ${themeTokens.accentBg} ${themeTokens.accentHoverBg} active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>상담 신청 데이터 전송 중...</span>
                      </>
                    ) : (
                      'VIP 분양상담 신청완료'
                    )}
                  </button>
                  <p className="text-[11px] text-neutral-500 text-center mt-2">
                    ※ 접수된 고객 정보는 안전하게 암호화되어 Formspree 실시간 전송 시스템으로 전달됩니다.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
