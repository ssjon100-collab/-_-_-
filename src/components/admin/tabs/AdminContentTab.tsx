import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Save, Check, RotateCcw } from 'lucide-react';

export const AdminContentTab: React.FC = () => {
  const { siteConfig, updateSiteConfig, projectOverview, updateOverviewItem } = useApp();
  const [savedNotice, setSavedNotice] = useState(false);

  // Form local state
  const [formData, setFormData] = useState({
    name: siteConfig.name,
    subName: siteConfig.subName,
    phone: siteConfig.phone,
    siteAddress: siteConfig.siteAddress,
    operatingHours: siteConfig.operatingHours,
    heroBadge: siteConfig.heroBadge,
    tagline: siteConfig.tagline,
    heroSubtitle: siteConfig.heroSubtitle,
    announcementTicker: siteConfig.announcementTicker,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
        <div>
          <h3 className="text-base font-bold text-white">
            사이트 기본 콘텐츠 및 텍스트 편집
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            단지명, 대표번호, 주소, 배너 문구 등을 실시간으로 수정하여 즉시 홈페이지에 반영합니다.
          </p>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-800">
            <Check className="w-4 h-4" />
            <span>성공적으로 저장되었습니다!</span>
          </div>
        )}
      </div>

      {/* Main Info Form */}
      <form onSubmit={handleSaveAll} className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-5 shadow">
        <h4 className="text-sm font-bold text-white border-b border-neutral-800 pb-3">
          1. 핵심 단지 정보 및 안내 연락처
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              단지 공식 명칭 (웹사이트 이름)
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              영문 브랜드 표기 (Sub Title)
            </label>
            <input
              type="text"
              name="subName"
              value={formData.subName}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              대표 분양문의 전화번호 (1688-8768)
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-neutral-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              분양상담 운영시간
            </label>
            <input
              type="text"
              name="operatingHours"
              value={formData.operatingHours}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              단지 신축 현장 주소
            </label>
            <input
              type="text"
              name="siteAddress"
              value={formData.siteAddress}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        <h4 className="text-sm font-bold text-white border-b border-neutral-800 pb-3 pt-4">
          2. 히어로 슬로건 및 배너 알림 문구
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              히어로 뱃지 강조 문구
            </label>
            <input
              type="text"
              name="heroBadge"
              value={formData.heroBadge}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              상단 롤링 티커 알림 문구
            </label>
            <input
              type="text"
              name="announcementTicker"
              value={formData.announcementTicker}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              히어로 상세 서브 설명문
            </label>
            <textarea
              rows={3}
              name="heroSubtitle"
              value={formData.heroSubtitle}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-2 shadow"
          >
            <Save className="w-4 h-4" />
            <span>기본 정보 변경사항 저장</span>
          </button>
        </div>
      </form>

      {/* Project Overview Table Editor */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-4 shadow">
        <h4 className="text-sm font-bold text-white border-b border-neutral-800 pb-3">
          3. 사업개요 테이블 상세 항목 편집
        </h4>

        <div className="space-y-3">
          {projectOverview.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
              <span className="text-xs font-semibold text-neutral-400">
                {item.label}
              </span>
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateOverviewItem(index, item.label, e.target.value)}
                className="sm:col-span-2 bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
