"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import SceneSelector from "@/components/SceneSelector";
import UserProfile from "@/components/UserProfile";
import { requestRecommend } from "@/lib/api";
import { addToHistory } from "@/lib/history";

export default function Home() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [scene, setScene] = useState("");
  const [profile, setProfile] = useState({ height: "", weight: "", style: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!image) {
      setError("请先上传一张衣服的照片");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await requestRecommend({
        image,
        scene_preference: scene || undefined,
        height: profile.height || undefined,
        weight: profile.weight || undefined,
        style_preference: profile.style || undefined,
      });

      const record = addToHistory(image, result);
      router.push(`/result?id=${record.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "推荐失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">
          <span className="text-primary">拍一件衣服</span>
          <span className="text-foreground">，看它怎么搭</span>
        </h1>
        <p className="text-muted">
          上传衣橱里的任意单品，AI 帮你搭配 3 套完整方案
        </p>
      </div>

      {/* 上传 */}
      <ImageUpload
        onImageSelect={(img) => {
          setImage(img || null);
          setError("");
        }}
        preview={image}
      />

      {/* 场景 */}
      <SceneSelector selected={scene} onSelect={setScene} />

      {/* 用户信息 */}
      <UserProfile data={profile} onChange={setProfile} />

      {/* 错误 */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm fade-in">
          {error}
        </div>
      )}

      {/* 提交 */}
      <button
        onClick={handleSubmit}
        disabled={!image || loading}
        className={`w-full py-4 rounded-2xl text-lg font-medium transition-all ${
          !image || loading
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-light shadow-lg hover:shadow-xl active:scale-[0.98]"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            AI 正在搭配中...
          </span>
        ) : (
          "开始搭配"
        )}
      </button>

      {/* 使用说明 */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm text-muted">
        <div className="space-y-1">
          <div className="text-2xl">📸</div>
          <p>上传单品照片</p>
        </div>
        <div className="space-y-1">
          <div className="text-2xl">🤖</div>
          <p>AI 分析搭配</p>
        </div>
        <div className="space-y-1">
          <div className="text-2xl">✨</div>
          <p>获得 3 套方案</p>
        </div>
      </div>
    </div>
  );
}
