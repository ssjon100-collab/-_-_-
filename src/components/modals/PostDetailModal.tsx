import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Eye, User, Pin } from 'lucide-react';

export const PostDetailModal: React.FC = () => {
  const { selectedPostForModal, setSelectedPostForModal, themeTokens } = useApp();

  if (!selectedPostForModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-4 pr-8">
          <div className="flex items-center gap-2 text-xs mb-2">
            {selectedPostForModal.isPinned && (
              <span className={`inline-flex items-center gap-1 font-bold ${themeTokens.accentText}`}>
                <Pin className="w-3.5 h-3.5 fill-current" /> [필독]
              </span>
            )}
            <span className="text-neutral-400 font-semibold">
              [{selectedPostForModal.category}]
            </span>
            <span className="text-neutral-600" aria-hidden="true">·</span>
            <span className="text-neutral-400 tabular-nums">{selectedPostForModal.createdAt}</span>
            <span className="text-neutral-600" aria-hidden="true">·</span>
            <span className="text-neutral-400 flex items-center gap-1">
              <Eye className="w-3 h-3" /> {selectedPostForModal.views}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
            {selectedPostForModal.title}
          </h3>
          <div className="text-xs text-neutral-400 mt-1">
            작성자: {selectedPostForModal.author}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedPostForModal(null)}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Body */}
        <div className="py-6 overflow-y-auto text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap flex-1 space-y-4">
          {selectedPostForModal.content}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={() => setSelectedPostForModal(null)}
            className="px-5 py-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
