"use client";

import { useState } from "react";

interface ShareButtonProps {
  text: string;
}

export default function ShareButton({ text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "穿搭AI 推荐",
          text: text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // 用户取消分享
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 border border-border rounded-xl text-sm hover:bg-background transition-colors"
    >
      {copied ? "已复制 ✓" : "分享结果"}
    </button>
  );
}
