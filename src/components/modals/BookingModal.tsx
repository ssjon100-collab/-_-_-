import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, User, Phone, AlertCircle } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    setSelectedUnitForModal,
    themeTokens,
    siteConfig,
    addLead,
  } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isBookingModalOpen) return null;

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

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setSelectedUnitForModal(null);
    setIsSubmitted(false);
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
      setErrorMsg('올바른 연락처를 입력해 주세요 (10~11자리).');
      return;
    }
    if (!agreed) {
      setErrorMsg('개인정보 수집 및 분양상담 동의가 필요합니다.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center ${themeTokens.badgeBg} ${themeTokens.accentText}`}>
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              VIP 분양상담 신청이 접수되었습니다
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              <strong className="text-white">{name}</strong> 님, 감사합니다.
              <br />
              담당 전문 상담사가 배정되어 남겨주신 연락처로 신속히 안내 전화를 드립니다.
            </p>
            <div className="p-3 bg-neutral-950 rounded-lg text-xs text-neutral-400 text-left space-y-1">
              <div>· 신청 고객: {name} ({phone})</div>
              <div>· 사업현장: {siteConfig.siteAddress}</div>
            </div>
            <button
              onClick={handleClose}
              className={`w-full py-2.5 text-xs font-bold text-white rounded-lg transition-colors ${themeTokens.accentBg} ${themeTokens.accentHoverBg}`}
            >
              확인 및 창 닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${themeTokens.badgeBg} ${themeTokens.badgeText}`}>
                VIP FAST PASS
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                VIP 분양상담 신청
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                전담 상담사 1:1 배정 및 로얄동호수 분양가 혜택을 안내해 드립니다.
              </p>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-red-950/90 border border-red-800 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  고객 성함 *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="성함을 입력해 주세요"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  연락처 (휴대폰) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
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

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  문의 및 요청사항 (선택사항)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="예: 선호 동호수 또는 상담 문의사항"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modal-terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-neutral-700 text-emerald-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="modal-terms" className="text-[11px] text-neutral-400 cursor-pointer">
                  [필수] 개인정보 수집 및 분양상담 안내 연락에 동의합니다.
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 text-xs font-bold text-white rounded-lg transition-all shadow ${themeTokens.accentBg} ${themeTokens.accentHoverBg} disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>상담 신청 데이터 전송 중...</span>
                  </>
                ) : (
                  '예약 접수하기'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
