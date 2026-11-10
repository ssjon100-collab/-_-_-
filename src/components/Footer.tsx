import React from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig, setIsAdminModalOpen } = useApp();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/80 text-neutral-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <div className="text-lg font-bold text-white tracking-tight">
              {siteConfig.name}
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              {siteConfig.subName}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
            <a href="#overview" className="hover:text-white transition-colors">사업개요</a>
            <a href="#location" className="hover:text-white transition-colors">입지환경</a>
            <a href="#complex" className="hover:text-white transition-colors">단지안내</a>
            <a href="#units" className="hover:text-white transition-colors">세대평면</a>
            <a href="#schedule" className="hover:text-white transition-colors">분양일정</a>
            <a href="#news" className="hover:text-white transition-colors">분양소식</a>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>관리자 모드</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neutral-400 leading-relaxed">
          <div className="space-y-1">
            <p><strong>단지명:</strong> {siteConfig.name}</p>
            <p><strong>시행사:</strong> 코리아신탁(주) | <strong>시공사:</strong> 유림E&C (노르웨이숲)</p>
            <p><strong>사업현장:</strong> {siteConfig.siteAddress}</p>
            <p><strong>사이트운영자 :</strong> 김승식 | <strong>문의 :</strong> {siteConfig.phone}</p>
          </div>

          <div className="text-neutral-400 text-[11px] leading-relaxed">
            <p className="font-semibold text-neutral-300 mb-1">【 유의사항 안내 】</p>
            <p>
              본 홈페이지에 사용된 CG 및 조감도, 투시도, 평면도, 사진 등은 소비자의 이해를 돕기 위한 것으로 인·허가 과정 및 실제 시공 시 다소 변경될 수 있습니다. 
              자세한 분양가 및 계약 조건은 입주자모집공고 및 공식 공급계약서를 반드시 확인하시기 바랍니다.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
