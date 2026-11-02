import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { UnitType } from '../../../types';
import { Plus, Edit2, Trash2, Check, X, Layers } from 'lucide-react';

export const AdminUnitsTab: React.FC = () => {
  const { units, addUnit, updateUnit, deleteUnit } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'아파트' | '오피스텔'>('아파트');
  const [exclusiveArea, setExclusiveArea] = useState('');
  const [supplyArea, setSupplyArea] = useState('');
  const [contractArea, setContractArea] = useState('');
  const [unitsCount, setUnitsCount] = useState<number>(76);
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  const [planImage, setPlanImage] = useState('');
  const [isoImage, setIsoImage] = useState('');

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setName('');
    setCategory('아파트');
    setExclusiveArea('69.7032㎡ (약 21.08평)');
    setSupplyArea('100.3750㎡ (약 30.36평)');
    setContractArea('148.8357㎡ (약 45.02평)');
    setUnitsCount(216);
    setDescription('');
    setFeaturesText('4Bay 맞통풍 판상형 설계, 대형 드레스룸, 광폭 거실');
    setIsPopular(false);
    setPlanImage('');
    setIsoImage('');
  };

  const handleStartEdit = (unit: UnitType) => {
    setEditingId(unit.id);
    setIsCreating(false);
    setName(unit.name);
    setCategory(unit.category);
    setExclusiveArea(unit.exclusiveArea);
    setSupplyArea(unit.supplyArea);
    setContractArea(unit.contractArea);
    setUnitsCount(unit.unitsCount);
    setDescription(unit.description);
    setFeaturesText(unit.features.join(', '));
    setIsPopular(!!unit.isPopular);
    setPlanImage(unit.planImage || '');
    setIsoImage(unit.isoImage || '');
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const features = featuresText
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    if (isCreating) {
      addUnit({
        name: name.trim(),
        category,
        exclusiveArea: exclusiveArea.trim(),
        supplyArea: supplyArea.trim(),
        contractArea: contractArea.trim(),
        unitsCount: Number(unitsCount) || 0,
        description: description.trim(),
        features,
        isPopular,
        planImage: planImage.trim() || undefined,
        isoImage: isoImage.trim() || undefined,
      });
      setIsCreating(false);
    } else if (editingId) {
      updateUnit(editingId, {
        name: name.trim(),
        category,
        exclusiveArea: exclusiveArea.trim(),
        supplyArea: supplyArea.trim(),
        contractArea: contractArea.trim(),
        unitsCount: Number(unitsCount) || 0,
        description: description.trim(),
        features,
        isPopular,
        planImage: planImage.trim() || undefined,
        isoImage: isoImage.trim() || undefined,
      });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
        <div>
          <h3 className="text-base font-bold text-white">
            세대 평면 및 유니트(Type) 관리
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            평형별 전용면적, 공급세대수, 특화 설계 사항을 등록하고 편집할 수 있습니다.
          </p>
        </div>

        {!isCreating && !editingId && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>새 평형(타입) 추가</span>
          </button>
        )}
      </div>

      {/* Editor Form */}
      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="bg-neutral-900 rounded-2xl border border-neutral-700 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>{isCreating ? '신규 평형 타입 추가' : '평형 정보 수정'}</span>
            </h4>
            <button type="button" onClick={handleCancel} className="text-neutral-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                타입 명칭 (예: 84㎡ A) *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                용도 구분
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as '아파트' | '오피스텔')}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="아파트">아파트 (공동주택)</option>
                <option value="오피스텔">오피스텔 (주거형)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                배정 세대수
              </label>
              <input
                type="number"
                value={unitsCount}
                onChange={(e) => setUnitsCount(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                전용면적
              </label>
              <input
                type="text"
                value={exclusiveArea}
                onChange={(e) => setExclusiveArea(e.target.value)}
                placeholder="59.98㎡ (18.14평)"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                공급면적
              </label>
              <input
                type="text"
                value={supplyArea}
                onChange={(e) => setSupplyArea(e.target.value)}
                placeholder="82.45㎡ (24.94평)"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                계약면적
              </label>
              <input
                type="text"
                value={contractArea}
                onChange={(e) => setContractArea(e.target.value)}
                placeholder="123.12㎡ (37.24평)"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              특장점 항목들 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="예: 4Bay 맞통풍 판상형 설계, 대형 드레스룸, 광폭 거실"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                평면도 이미지 경로 (예: /src/assets/images/units/unit_69.jpg)
              </label>
              <input
                type="text"
                value={planImage}
                onChange={(e) => setPlanImage(e.target.value)}
                placeholder="/src/assets/images/units/unit_69.jpg"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                3D 입체 아이소 이미지 경로 (예: /src/assets/images/units/unit_iso_69.png)
              </label>
              <input
                type="text"
                value={isoImage}
                onChange={(e) => setIsoImage(e.target.value)}
                placeholder="/src/assets/images/units/unit_iso_69.png"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              타입 상세 설명문
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="flex items-center pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
                className="rounded border-neutral-700 text-emerald-600 focus:ring-0"
              />
              <span className="font-semibold text-amber-400">[인기 추천] 뱃지 부착하기</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow"
            >
              저장하기
            </button>
          </div>
        </form>
      )}

      {/* Units Table */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
            <tr>
              <th className="py-3 px-4 font-semibold">타입명</th>
              <th className="py-3 px-4 font-semibold">구분</th>
              <th className="py-3 px-4 font-semibold">전용면적</th>
              <th className="py-3 px-4 font-semibold">공급면적</th>
              <th className="py-3 px-4 font-semibold">공급세대수</th>
              <th className="py-3 px-4 font-semibold">인기추천</th>
              <th className="py-3 px-4 font-semibold text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/70 text-neutral-300">
            {units.map((unit) => (
              <tr key={unit.id} className="hover:bg-neutral-800/40 transition-colors">
                <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                  {unit.name}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {unit.category}
                  </span>
                </td>
                <td className="py-3 px-4 tabular-nums text-neutral-300">
                  {unit.exclusiveArea}
                </td>
                <td className="py-3 px-4 tabular-nums text-neutral-400">
                  {unit.supplyArea}
                </td>
                <td className="py-3 px-4 tabular-nums font-bold text-white">
                  {unit.unitsCount}세대
                </td>
                <td className="py-3 px-4">
                  {unit.isPopular ? (
                    <span className="text-[11px] font-bold text-amber-400">★ 추천</span>
                  ) : (
                    <span className="text-neutral-600">-</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleStartEdit(unit)}
                    className="p-1 text-neutral-400 hover:text-white rounded"
                    title="수정"
                  >
                    <Edit2 className="w-4 h-4 inline" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`'${unit.name}' 타입을 삭제하시겠습니까?`)) {
                        deleteUnit(unit.id);
                      }
                    }}
                    className="p-1 text-neutral-400 hover:text-red-400 rounded"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
