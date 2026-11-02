import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ThemeColor, FontStyle } from '../../../types';
import { Palette, Type, Image as ImageIcon, Check, RotateCcw } from 'lucide-react';
import { DEFAULT_SITE_CONFIG } from '../../../data/defaultData';

export const AdminThemeTab: React.FC = () => {
  const { siteConfig, changeTheme, changeFont, updateSiteConfig, themeTokens } = useApp();

  const [imagesForm, setImagesForm] = useState({
    hero: siteConfig.images.hero,
    birdview: siteConfig.images.birdview,
    livingRoom: siteConfig.images.livingRoom,
    bedroom: siteConfig.images.bedroom,
    community: siteConfig.images.community,
  });

  const [savedNotice, setSavedNotice] = useState(false);

  const themeOptions: { id: ThemeColor; name: string; desc: string; sampleBg: string }[] = [
    {
      id: 'emerald',
      name: 'Forest Emerald (노르웨이숲 시그니처)',
      desc: '유림 노르웨이숲 브랜드의 정체성을 담은 딥 그린 & 에메랄드 하이엔드 컬러',
      sampleBg: 'bg-emerald-600',
    },
    {
      id: 'navy',
      name: 'Royal Sapphire Navy (사파이어 네이비)',
      desc: '인천 앞바다와 스카이라인을 상징하는 신뢰감 있는 오션 딥블루',
      sampleBg: 'bg-sky-600',
    },
    {
      id: 'gold',
      name: 'Imperial Champagne Gold (샴페인 골드)',
      desc: '최상위 펜트하우스의 품격과 황금빛 가치를 부여하는 럭셔리 골드',
      sampleBg: 'bg-amber-600',
    },
    {
      id: 'charcoal',
      name: 'Urban Obsidian (어반 흑연 차콜)',
      desc: '모던 건축미와 세련된 도시적 감각을 극대화한 미니멀리즘 차콜',
      sampleBg: 'bg-stone-600',
    },
  ];

  const fontOptions: { id: FontStyle; name: string; desc: string }[] = [
    {
      id: 'modern',
      name: '모던 산세리프 (Pretendard & Noto Sans KR)',
      desc: '뛰어난 가독성과 명확한 정보 전달을 자랑하는 현대적인 서체',
    },
    {
      id: 'serif',
      name: '럭셔리 명조 (나눔명조 & Editorial Serif)',
      desc: '고급 주거 단지 브로슈어의 우아함과 전통적인 품격을 더하는 서체',
    },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setImagesForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveImages = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({ images: imagesForm });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleResetImages = () => {
    setImagesForm(DEFAULT_SITE_CONFIG.images);
    updateSiteConfig({ images: DEFAULT_SITE_CONFIG.images });
    alert('기본 고해상도 생성 이미지로 복원되었습니다.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Palette className={`w-5 h-5 ${themeTokens.accentText}`} />
          <span>디자인 테마 및 비주얼 비트 커스터마이징</span>
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          메인 브랜드 컬러 팔레트, 타이포그래피 서체 스타일, 주요 건축 이미지를 변경할 수 있습니다.
        </p>
      </div>

      {/* 1. Theme Color Palette Selector */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-4 shadow">
        <h4 className="text-sm font-bold text-white border-b border-neutral-800 pb-3 flex items-center justify-between">
          <span>1. 메인 브랜드 테마 컬러 (Accent Color)</span>
          <span className="text-xs text-neutral-400 font-normal">현재: {siteConfig.themeColor}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themeOptions.map((opt) => {
            const isSelected = siteConfig.themeColor === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => changeTheme(opt.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-neutral-950 border-white ring-1 ring-white/20 shadow-lg'
                    : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                } flex items-start gap-3`}
              >
                <div className={`w-8 h-8 rounded-full ${opt.sampleBg} shrink-0 mt-0.5 shadow-inner flex items-center justify-center text-white`}>
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{opt.name}</span>
                    {isSelected && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-emerald-400 font-semibold">
                        적용 중
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Typography Font Style Selector */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-4 shadow">
        <h4 className="text-sm font-bold text-white border-b border-neutral-800 pb-3">
          2. 대표 타이포그래피 서체 스타일 (Font Family)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fontOptions.map((f) => {
            const isSelected = siteConfig.fontStyle === f.id;
            return (
              <div
                key={f.id}
                onClick={() => changeFont(f.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-neutral-950 border-white ring-1 ring-white/20 shadow-lg'
                    : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{f.name}</span>
                  {isSelected && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-emerald-400 font-semibold">
                      선택됨
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  {f.desc}
                </p>
                <div className="mt-3 p-2 bg-neutral-900 rounded text-xs text-neutral-300 font-medium">
                  {f.id === 'serif' ? (
                    <span className="font-serif-luxury">숭의역 유림 노르웨이숲더스카이 47층 랜드마크</span>
                  ) : (
                    <span className="font-sans-modern">숭의역 유림 노르웨이숲더스카이 47층 랜드마크</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Image URLs Manager */}
      <form onSubmit={handleSaveImages} className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-5 shadow">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            <span>3. 주요 섹션 고화질 건축 이미지 경로 관리</span>
          </h4>
          <button
            type="button"
            onClick={handleResetImages}
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본 이미지로 초기화</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              ① 메인 히어로 외관 투시도 이미지 URL / 경로
            </label>
            <input
              type="text"
              name="hero"
              value={imagesForm.hero}
              onChange={handleImageChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              ② 단지 전체 조감도 (항공뷰) 이미지 URL / 경로
            </label>
            <input
              type="text"
              name="birdview"
              value={imagesForm.birdview}
              onChange={handleImageChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              ③ 거실 인테리어 쇼룸 이미지 URL / 경로
            </label>
            <input
              type="text"
              name="livingRoom"
              value={imagesForm.livingRoom}
              onChange={handleImageChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              ④ 마스터 침실 인테리어 쇼룸 이미지 URL / 경로
            </label>
            <input
              type="text"
              name="bedroom"
              value={imagesForm.bedroom}
              onChange={handleImageChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              ⑤ 스카이 라운지 & 커뮤니티 클럽 이미지 URL / 경로
            </label>
            <input
              type="text"
              name="community"
              value={imagesForm.community}
              onChange={handleImageChange}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
          {savedNotice ? (
            <span className="text-xs text-emerald-400 font-semibold">
              이미지 경로가 업데이트되었습니다!
            </span>
          ) : (
            <span className="text-xs text-neutral-500">
              ※ 로컬 경로 또는 외부 HTTPS 이미지 URL 모두 지원됩니다.
            </span>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow"
          >
            이미지 설정 저장
          </button>
        </div>
      </form>
    </div>
  );
};
