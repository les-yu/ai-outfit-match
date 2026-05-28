"use client";

import { useRef, useState, useCallback } from "react";

interface ImageUploadProps {
  onImageSelect: (base64: string) => void;
  preview: string | null;
}

export default function ImageUpload({
  onImageSelect,
  preview,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-primary/5"
      }`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {preview ? (
        <div className="space-y-4">
          <div className="relative inline-block">
            <img
              src={preview}
              alt="预览"
              className="max-h-64 rounded-xl shadow-lg object-contain"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onImageSelect("");
              }}
              className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-muted">点击或拖拽替换图片</p>
        </div>
      ) : (
        <div className="space-y-3 py-8">
          <div className="text-5xl">📷</div>
          <div>
            <p className="text-lg font-medium">上传一件衣服的照片</p>
            <p className="text-sm text-muted mt-1">
              支持 JPG、PNG、WebP，建议清晰展示单品
            </p>
          </div>
          <div className="inline-block px-4 py-2 bg-primary text-white rounded-full text-sm">
            选择图片
          </div>
        </div>
      )}
    </div>
  );
}
