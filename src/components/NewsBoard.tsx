import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Post } from '../types';
import { Megaphone, Eye, Calendar, Pin, ChevronRight } from 'lucide-react';

export const NewsBoard: React.FC = () => {
  const { posts, themeTokens, setSelectedPostForModal, incrementPostView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '공지사항', '분양일정', '보도자료', '이벤트'];

  const filteredPosts = posts.filter(
    (post) => selectedCategory === '전체' || post.category === selectedCategory
  );

  const handlePostClick = (post: Post) => {
    incrementPostView(post.id);
    setSelectedPostForModal(post);
  };

  return (
    <section id="news" className="py-24 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
              NEWS & ANNOUNCEMENTS
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              분양소식 및 <span className={themeTokens.accentText}>공지사항</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400">
              숭의역 유림 노르웨이숲더스카이의 최신 청약 및 분양 소식을 신속하게 전달해 드립니다.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? `${themeTokens.accentBg} text-white shadow`
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Table / List */}
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
          <div className="divide-y divide-neutral-800/80">
            {filteredPosts.length === 0 ? (
              <div className="py-12 text-center text-sm text-neutral-500">
                등록된 게시글이 없습니다.
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className="p-5 sm:p-6 hover:bg-neutral-900/50 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5 text-xs">
                      {post.isPinned && (
                        <span className={`inline-flex items-center gap-1 font-bold ${themeTokens.accentText}`}>
                          <Pin className="w-3 h-3 fill-current" /> [필독]
                        </span>
                      )}
                      <span className="text-neutral-400 font-medium">
                        [{post.category}]
                      </span>
                      <span className="text-neutral-600" aria-hidden="true">·</span>
                      <span className="text-neutral-400 tabular-nums">{post.createdAt}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {post.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 text-xs text-neutral-500 shrink-0">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span className="tabular-nums">{post.views}</span>
                    </span>
                    <span className="hidden sm:inline font-medium text-neutral-400">{post.author}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
