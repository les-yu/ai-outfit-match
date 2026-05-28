"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHistory, clearHistory } from "@/lib/history";
import { HistoryRecord } from "@/types/outfit";

function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - ts;

  if (diff < 60000) return "刚刚";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;

  return `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export default function HistoryPage() {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setRecords(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setRecords([]);
    setShowConfirm(false);
  };

  if (records.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="text-5xl">👗</div>
        <h2 className="text-xl font-bold">还没有搭配记录</h2>
        <p className="text-muted">上传一件衣服，开始你的第一次 AI 搭配</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-light transition-colors"
        >
          去搭配
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">搭配记录</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">{records.length} 条记录</span>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            清空
          </button>
        </div>
      </div>

      {/* 确认弹窗 */}
      {showConfirm && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between fade-in">
          <p className="text-sm text-red-600">确定清空所有记录？此操作不可撤销。</p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 text-sm border border-border rounded-lg hover:bg-background"
            >
              取消
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              确认清空
            </button>
          </div>
        </div>
      )}

      {/* 记录列表 */}
      <div className="space-y-3">
        {records.map((record) => (
          <Link
            key={record.id}
            href={`/result?id=${record.id}`}
            className="block bg-card-bg border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              {/* 缩略图 */}
              <img
                src={record.image}
                alt="搭配记录"
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />

              {/* 信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">
                    {record.result.detected_item.color}色
                    {record.result.detected_item.category}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">
                    {record.result.detected_item.style}
                  </span>
                </div>
                <div className="flex gap-1 mb-2">
                  {record.result.outfits.map((o, i) => (
                    <span
                      key={i}
                      className="text-xs text-muted bg-background px-2 py-0.5 rounded"
                    >
                      {o.scene}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted">{formatDate(record.timestamp)}</p>
              </div>

              {/* 箭头 */}
              <div className="flex items-center text-muted">›</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
