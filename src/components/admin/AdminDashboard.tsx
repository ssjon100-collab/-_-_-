import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  FileText,
  Settings,
  Layers,
  Palette,
  Globe,
  LogOut,
  X,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { AdminLeadsTab } from './tabs/AdminLeadsTab';
import { AdminPostsTab } from './tabs/AdminPostsTab';
import { AdminContentTab } from './tabs/AdminContentTab';
import { AdminUnitsTab } from './tabs/AdminUnitsTab';
import { AdminThemeTab } from './tabs/AdminThemeTab';
import { AdminSeoTab } from './tabs/AdminSeoTab';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAdminAuthenticated,
    logoutAdmin,
    siteConfig,
    leads,
    posts,
    resetToDefaults,
    themeTokens,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'leads' | 'posts' | 'content' | 'units' | 'theme' | 'seo'
  >('leads');

  if (!isAdminModalOpen || !isAdminAuthenticated) return null;

  const handleClose = () => {
    setIsAdminModalOpen(false);
  };

  const navItems = [
    { id: 'leads', label: '상담/방문예약 관리', icon: Users, badge: leads.length },
    { id: 'posts', label: '분양소식 및 공지', icon: FileText, badge: posts.length },
    { id: 'content', label: '사이트 콘텐츠 편집', icon: Settings },
    { id: 'units', label: '평면도 및 유니트', icon: Layers },
    { id: 'theme', label: '디자인 및 테마', icon: Palette },
    { id: 'seo', label: 'SEO 검색엔진 최적화', icon: Globe },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 flex flex-col overflow-hidden text-neutral-100">
      {/* Top Header Bar */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h1 className="text-base font-bold text-white tracking-tight">
              {siteConfig.name} 관리자 시스템
            </h1>
          </div>
          <span className="hidden sm:inline text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
            관리자 인증됨 (PW: 1440)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="hidden md:flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
            title="모든 설정을 초기 상태로 복원"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본값 복원</span>
          </button>

          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-white px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>홈페이지 보기</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              setIsAdminModalOpen(false);
            }}
            className="p-1.5 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-neutral-800 transition-colors"
            title="관리자 로그아웃"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <button
            onClick={handleClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-64 bg-neutral-900/60 border-r border-neutral-800 p-4 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider px-3 mb-2">
              MANAGEMENT MENU
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? `${themeTokens.accentBg} text-white shadow`
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {'badge' in item && typeof item.badge === 'number' && (
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${
                        isActive ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-neutral-950/70 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>시스템 보안 상태</span>
            </div>
            <p>비밀번호 보호 세션이 활성화되어 안전하게 저장됩니다.</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-neutral-950">
          {/* Mobile Tab Bar */}
          <div className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-4 mb-4 border-b border-neutral-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  activeTab === item.id
                    ? `${themeTokens.accentBg} text-white`
                    : 'bg-neutral-900 text-neutral-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            {activeTab === 'leads' && <AdminLeadsTab />}
            {activeTab === 'posts' && <AdminPostsTab />}
            {activeTab === 'content' && <AdminContentTab />}
            {activeTab === 'units' && <AdminUnitsTab />}
            {activeTab === 'theme' && <AdminThemeTab />}
            {activeTab === 'seo' && <AdminSeoTab />}
          </div>
        </main>
      </div>
    </div>
  );
};
