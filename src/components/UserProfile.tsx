"use client";

import { useState } from "react";

interface UserProfileData {
  height: string;
  weight: string;
  style: string;
}

interface UserProfileProps {
  data: UserProfileData;
  onChange: (data: UserProfileData) => void;
}

const styles = [
  "简约",
  "韩系",
  "日系",
  "街头",
  "复古",
  "商务",
  "甜美",
  "中性",
];

export default function UserProfile({ data, onChange }: UserProfileProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-primary flex items-center gap-1 hover:underline"
      >
        {expanded ? "收起" : "填写更多信息，获得更精准推荐"}
        <span className="text-xs">{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div className="space-y-4 p-4 bg-card-bg rounded-xl border border-border fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted">身高</label>
              <input
                type="text"
                placeholder="如：170cm"
                value={data.height}
                onChange={(e) => onChange({ ...data, height: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-sm text-muted">体重</label>
              <input
                type="text"
                placeholder="如：60kg"
                value={data.weight}
                onChange={(e) => onChange({ ...data, weight: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-muted">偏好风格</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {styles.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...data,
                      style: data.style === s ? "" : s,
                    })
                  }
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    data.style === s
                      ? "bg-secondary text-white"
                      : "bg-background border border-border hover:border-secondary/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
