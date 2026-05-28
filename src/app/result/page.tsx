"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import OutfitCard from "@/components/OutfitCard";
import ShareButton from "@/components/ShareButton";
import { getHistoryById } from "@/lib/history";
import { HistoryRecord } from "@/types/outfit";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [record, setRecord] = useState<HistoryRecord | null>(null);

  useEffect(() => {
    if (!id) {
      router.replace("/");
      return;
    }
    const r = getHistoryById(id);
    if (!r) {
      router.replace("/");
      return;
    }
    setRecord(r);
  }, [id, router]);

  if (!record) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="skeleton h-8 w-48 mx-auto mb-4" />
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }

  const { result } = record;

  const shareText = `我用穿搭AI搭配了一件${result.detected_item.color}色${result.detected_item.category}，获得了${result.outfits.length}套搭配方案！`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* 识别结果 */}
      <div className="text-center space-y-2 fade-in">
        <h1 className="text-2xl font-bold">搭配方案</h1>
        <p className="text-muted">
          AI 识别到：
          <span className="text-foreground font-medium">
            {result.detected_item.color}色{result.detected_item.category}
          </span>
          <span className="text-xs ml-2 px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">
            {result.detected_item.style}
          </span>
        </p>
      </div>

      {/* 原图预览 */}
      <div className="flex justify-center fade-in">
        <img
          src={record.image}
          alt="上传的单品"
          className="max-h-48 rounded-xl shadow-md object-contain"
        />
      </div>

      {/* 搭配方案列表 */}
      <div className="space-y-4">
        {result.outfits.map((outfit, index) => (
          <OutfitCard key={index} outfit={outfit} index={index} />
        ))}
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-3 fade-in">
        <Link
          href="/"
          className="flex-1 py-3 text-center border border-border rounded-xl text-sm hover:bg-background transition-colors"
        >
          再搭一件
        </Link>
        <div className="flex-1">
          <ShareButton text={shareText} />
        </div>
      </div>

      {/* 免责提示 */}
      <p className="text-xs text-center text-muted">
        AI 推荐仅供参考，实际搭配请结合个人喜好与场合需求
      </p>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="skeleton h-8 w-48 mx-auto mb-4" />
          <div className="skeleton h-64 w-full" />
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
