import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ConsultationLead } from '../../../types';
import { Download, Search, Trash2, Edit3, CheckCircle, Clock, Calendar, UserCheck } from 'lucide-react';

export const AdminLeadsTab: React.FC = () => {
  const { leads, updateLeadStatus, updateLeadMemo, deleteLead } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingMemoId, setEditingMemoId] = useState<string | null>(null);
  const [memoInput, setMemoInput] = useState('');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.notes || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.preferredType || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ['접수일시', '고객성함', '연락처', '선호타입', '방문일자', '방문시간', '방문목적', '진행상태', '고객문의', '관리자메모'];
    const rows = leads.map((l) => [
      `"${l.createdAt}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.preferredType || '-'}"`,
      `"${l.visitDate || '-'}"`,
      `"${l.visitTime || '-'}"`,
      `"${l.visitPurpose || '-'}"`,
      `"${l.status}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${(l.adminMemo || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `숭의역_유림노르웨이숲_관심고객_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveMemo = (id: string) => {
    updateLeadMemo(id, memoInput);
    setEditingMemoId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Stats & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-white">
              관심고객 및 방문예약 실시간 접수 현황
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Formspree 실시간 수집 활성화
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            총 <strong className="text-emerald-400 font-bold tabular-nums">{leads.length}</strong>건의 접수 내역 (신규 신청 시 <a href="https://formspree.io/f/mqppgapq" target="_blank" rel="noreferrer" className="text-emerald-400 underline hover:text-emerald-300">Formspree</a>로 동시 전송 수집)
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto shadow"
        >
          <Download className="w-4 h-4" />
          <span>엑셀 CSV 내보내기</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="고객명, 연락처, 타입으로 검색..."
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800 shrink-0">
          {(['all', '접수완료', '상담대기', '방문예약', '상담완료'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                statusFilter === status
                  ? 'bg-neutral-800 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {status === 'all' ? '전체' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4 font-semibold">접수일시</th>
                <th className="py-3 px-4 font-semibold">고객명</th>
                <th className="py-3 px-4 font-semibold">연락처</th>
                <th className="py-3 px-4 font-semibold">선호타입</th>
                <th className="py-3 px-4 font-semibold">방문예약일시</th>
                <th className="py-3 px-4 font-semibold">목적</th>
                <th className="py-3 px-4 font-semibold">진행상태</th>
                <th className="py-3 px-4 font-semibold">관리자 메모</th>
                <th className="py-3 px-4 font-semibold text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/70 text-neutral-300">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-neutral-500">
                    일치하는 접수 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4 tabular-nums text-neutral-400 whitespace-nowrap">
                      {lead.createdAt}
                    </td>
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      {lead.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-400 whitespace-nowrap">
                      {lead.phone}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {lead.preferredType ? (
                        <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200">
                          {lead.preferredType}
                        </span>
                      ) : (
                        <span className="text-neutral-500">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-neutral-200 tabular-nums">
                      {lead.visitDate ? `${lead.visitDate} ${lead.visitTime || ''}`.trim() : '-'}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-neutral-400">
                      {lead.visitPurpose || '-'}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateLeadStatus(lead.id, e.target.value as ConsultationLead['status'])
                        }
                        className={`text-xs px-2 py-1 rounded font-semibold border-0 cursor-pointer ${
                          lead.status === '방문예약'
                            ? 'bg-blue-900/60 text-blue-300'
                            : lead.status === '상담완료'
                            ? 'bg-emerald-900/60 text-emerald-300'
                            : lead.status === '상담대기'
                            ? 'bg-amber-900/60 text-amber-300'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        <option value="접수완료">접수완료</option>
                        <option value="상담대기">상담대기</option>
                        <option value="방문예약">방문예약</option>
                        <option value="상담완료">상담완료</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 min-w-[200px]">
                      {editingMemoId === lead.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={memoInput}
                            onChange={(e) => setMemoInput(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-700 rounded px-2 py-1 text-xs text-white"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveMemo(lead.id)}
                            className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px]"
                          >
                            저장
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setEditingMemoId(lead.id);
                            setMemoInput(lead.adminMemo || '');
                          }}
                          className="cursor-pointer text-neutral-400 hover:text-white flex items-center gap-1 group truncate max-w-[240px]"
                          title="클릭하여 메모 수정"
                        >
                          <span className="truncate">{lead.adminMemo || '(메모 추가...)'}</span>
                          <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 shrink-0" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          if (window.confirm(`${lead.name} 고객 접수 내역을 삭제하시겠습니까?`)) {
                            deleteLead(lead.id);
                          }
                        }}
                        className="p-1 text-neutral-500 hover:text-red-400 rounded"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
