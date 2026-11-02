import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, KeyRound, AlertCircle, X, ShieldCheck } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isAdminModalOpen, setIsAdminModalOpen, isAdminAuthenticated, loginAdmin } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isAdminModalOpen || isAdminAuthenticated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setError(false);
      setPassword('');
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-700/80 rounded-2xl p-7 shadow-2xl">
        <button
          onClick={() => {
            setIsAdminModalOpen(false);
            setError(false);
            setPassword('');
          }}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 shadow">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            관리자 대시보드 인증
          </h3>
          <p className="text-xs text-neutral-400">
            웹사이트 콘텐츠 및 접수 데이터 관리를 위해 비밀번호를 입력해 주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              관리자 비밀번호 (Password)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="비밀번호 4자리 입력"
                autoFocus
                className={`w-full bg-neutral-950 border ${
                  error ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-700'
                } rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-500 tracking-widest`}
              />
            </div>
            {error && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> 비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-md active:scale-[0.99]"
          >
            대시보드 로그인
          </button>
        </form>
      </div>
    </div>
  );
};
