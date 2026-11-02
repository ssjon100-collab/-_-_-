import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Globe, Search, Share2, Copy, Check, FileCode, CheckCircle } from 'lucide-react';

export const AdminSeoTab: React.FC = () => {
  const { seoConfig, updateSeoConfig } = useApp();
  const [formData, setFormData] = useState({ ...seoConfig });
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoConfig(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const generatedRobotsTxt = `User-agent: *
Allow: /
Sitemap: ${formData.canonicalUrl}/sitemap.xml`;

  const generatedSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${formData.canonicalUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <span>SEO 검색엔진 최적화 및 소셜 공유 설정 도구</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            네이버(Naver), 구글(Google) 포털 검색 노출 최적화 및 카카오톡 공유 미리보기를 관리합니다.
          </p>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-800">
            <CheckCircle className="w-4 h-4" />
            <span>SEO 설정이 저장되었습니다!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Settings */}
        <form onSubmit={handleSave} className="lg:col-span-7 bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-4 shadow">
          <h4 className="text-sm font-bold text-white border-b border-neutral-800 pb-3">
            메타 태그 및 검색엔진 메타데이터 입력
          </h4>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              페이지 타이틀 (Meta Title) *
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
              required
            />
            <span className="text-[11px] text-neutral-500 mt-0.5 block">
              권장 글자수: 30~50자 내외 ({formData.metaTitle.length}자)
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              사이트 설명 (Meta Description) *
            </label>
            <textarea
              rows={3}
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-500 leading-relaxed"
              required
            />
            <span className="text-[11px] text-neutral-500 mt-0.5 block">
              권장 글자수: 80~120자 내외 ({formData.metaDescription.length}자)
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              키워드 태그 (Meta Keywords, 쉼표 구분)
            </label>
            <input
              type="text"
              name="metaKeywords"
              value={formData.metaKeywords}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div className="pt-2 border-t border-neutral-800 space-y-4">
            <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              오픈그래프 (OpenGraph) 소셜 공유 태그
            </h5>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                og:title (카카오톡/페이스북 공유 제목)
              </label>
              <input
                type="text"
                name="ogTitle"
                value={formData.ogTitle}
                onChange={handleChange}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                og:description (공유 설명)
              </label>
              <input
                type="text"
                name="ogDescription"
                value={formData.ogDescription}
                onChange={handleChange}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                og:image URL (공유 썸네일 이미지)
              </label>
              <input
                type="text"
                name="ogImage"
                value={formData.ogImage}
                onChange={handleChange}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-neutral-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow"
            >
              SEO 설정 저장하기
            </button>
          </div>
        </form>

        {/* Right Column: Live Previews */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Naver Search Live Snippet Preview */}
          <div className="bg-white rounded-2xl p-5 shadow text-neutral-800 space-y-2 border border-neutral-200">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-600 pb-2 border-b border-neutral-100">
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 bg-emerald-500 text-white rounded flex items-center justify-center font-black text-[10px]">N</span>
                네이버(NAVER) 검색결과 미리보기
              </span>
              <span className="text-[11px] text-neutral-400 font-normal">통합검색</span>
            </div>
            <div>
              <div className="text-[11px] text-neutral-500 truncate">
                {formData.canonicalUrl}
              </div>
              <div className="text-sm font-bold text-blue-700 hover:underline cursor-pointer truncate">
                {formData.metaTitle}
              </div>
              <p className="text-xs text-neutral-600 line-clamp-2 mt-1 leading-snug">
                {formData.metaDescription}
              </p>
            </div>
          </div>

          {/* 2. Google Search Live Snippet Preview */}
          <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 space-y-2 text-neutral-200">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-300 pb-2 border-b border-neutral-800">
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-400" />
                구글(Google) 검색결과 미리보기
              </span>
              <span className="text-[11px] text-neutral-500 font-normal">모바일/PC</span>
            </div>
            <div>
              <div className="text-[11px] text-neutral-400 truncate">
                {formData.canonicalUrl}
              </div>
              <div className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer truncate mt-0.5">
                {formData.metaTitle}
              </div>
              <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                {formData.metaDescription}
              </p>
            </div>
          </div>

          {/* 3. KakaoTalk Share Preview */}
          <div className="bg-[#fee500] rounded-2xl p-5 shadow space-y-2 text-neutral-900">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800 pb-2 border-b border-yellow-400/50">
              <span className="flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                카카오톡 링크 공유 카드 미리보기
              </span>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200/60">
              <div className="aspect-[1.91/1] bg-neutral-900 overflow-hidden relative">
                <img
                  src={formData.ogImage}
                  alt="OG Image Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="text-xs font-bold text-neutral-900 truncate">
                  {formData.ogTitle}
                </div>
                <div className="text-[11px] text-neutral-600 line-clamp-1 mt-0.5">
                  {formData.ogDescription}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 uppercase">
                  {new URL(formData.canonicalUrl || 'https://sungui-yurim.com').hostname}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Robots & Sitemap Quick Tools */}
          <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>검색로봇 수집 파일 생성 (robots.txt & sitemap)</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyCode(generatedRobotsTxt, 'robots')}
                className="flex-1 py-1.5 px-3 bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-neutral-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedType === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>robots.txt 복사</span>
              </button>
              <button
                onClick={() => copyCode(generatedSitemapXml, 'sitemap')}
                className="flex-1 py-1.5 px-3 bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-neutral-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedType === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>sitemap.xml 복사</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
