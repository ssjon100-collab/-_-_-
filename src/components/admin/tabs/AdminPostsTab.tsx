import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Post } from '../../../types';
import { Plus, Edit2, Trash2, Pin, Check, X, FileText } from 'lucide-react';

export const AdminPostsTab: React.FC = () => {
  const { posts, addPost, updatePost, deletePost } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Post['category']>('공지사항');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('분양운영팀');
  const [isPinned, setIsPinned] = useState(false);

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingPostId(null);
    setTitle('');
    setCategory('공지사항');
    setContent('');
    setAuthor('분양운영팀');
    setIsPinned(false);
  };

  const handleStartEdit = (post: Post) => {
    setEditingPostId(post.id);
    setIsCreating(false);
    setTitle(post.title);
    setCategory(post.category);
    setContent(post.content);
    setAuthor(post.author);
    setIsPinned(!!post.isPinned);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingPostId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해 주세요.');
      return;
    }

    if (isCreating) {
      addPost({
        title: title.trim(),
        category,
        content: content.trim(),
        author: author.trim() || '분양운영팀',
        isPinned,
      });
      setIsCreating(false);
    } else if (editingPostId) {
      updatePost(editingPostId, {
        title: title.trim(),
        category,
        content: content.trim(),
        author: author.trim(),
        isPinned,
      });
      setEditingPostId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
        <div>
          <h3 className="text-base font-bold text-white">
            분양소식 및 공지사항 게시판 관리
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            새로운 분양 공고, 언론보도자료, 계약 안내글을 작성 및 편집할 수 있습니다.
          </p>
        </div>

        {!isCreating && !editingPostId && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>새 게시글 작성하기</span>
          </button>
        )}
      </div>

      {/* Editor Form (When Creating or Editing) */}
      {(isCreating || editingPostId) && (
        <form
          onSubmit={handleSave}
          className="bg-neutral-900 rounded-2xl border border-neutral-700 p-6 space-y-4 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>{isCreating ? '새 게시글 등록' : '게시글 수정'}</span>
            </h4>
            <button
              type="button"
              onClick={handleCancel}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                게시글 제목 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: [공지] 숭의역 유림 노르웨이숲더스카이 선착순 동호수 지정계약 안내"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                게시글 분류 (카테고리)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Post['category'])}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="공지사항">공지사항</option>
                <option value="분양일정">분양일정</option>
                <option value="보도자료">보도자료</option>
                <option value="이벤트">이벤트</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                작성자
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded border-neutral-700 text-emerald-600 focus:ring-0"
                />
                <span className="font-semibold text-amber-400">[필독] 게시판 최상단에 고정하기</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              본문 내용 *
            </label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="상세 내용을 입력해 주세요. (줄바꿈 지원)"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-neutral-500"
              required
            />
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
              {isCreating ? '게시글 등록하기' : '수정사항 저장하기'}
            </button>
          </div>
        </form>
      )}

      {/* Posts Table List */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
            <tr>
              <th className="py-3 px-4 font-semibold w-16 text-center">고정</th>
              <th className="py-3 px-4 font-semibold w-24">분류</th>
              <th className="py-3 px-4 font-semibold">제목</th>
              <th className="py-3 px-4 font-semibold w-28">작성자</th>
              <th className="py-3 px-4 font-semibold w-28">등록일</th>
              <th className="py-3 px-4 font-semibold w-20 text-center">조회수</th>
              <th className="py-3 px-4 font-semibold w-28 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/70 text-neutral-300">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-neutral-800/40 transition-colors">
                <td className="py-3 px-4 text-center">
                  {post.isPinned ? (
                    <Pin className="w-3.5 h-3.5 text-amber-400 fill-current mx-auto" />
                  ) : (
                    <span className="text-neutral-600">-</span>
                  )}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {post.category}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium text-white max-w-md truncate">
                  {post.title}
                </td>
                <td className="py-3 px-4 text-neutral-400 whitespace-nowrap">
                  {post.author}
                </td>
                <td className="py-3 px-4 text-neutral-400 whitespace-nowrap tabular-nums">
                  {post.createdAt}
                </td>
                <td className="py-3 px-4 text-center text-neutral-400 tabular-nums">
                  {post.views}
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleStartEdit(post)}
                    className="p-1 text-neutral-400 hover:text-white rounded"
                    title="수정"
                  >
                    <Edit2 className="w-4 h-4 inline" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`'${post.title}' 게시글을 삭제하시겠습니까?`)) {
                        deletePost(post.id);
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
