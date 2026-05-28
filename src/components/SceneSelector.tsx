"use client";

const scenes = [
  { id: "commute", label: "日常通勤", emoji: "💼", desc: "上班、上学" },
  { id: "date", label: "约会休闲", emoji: "🌸", desc: "周末、聚会" },
  { id: "trendy", label: "潮流个性", emoji: "🔥", desc: "时尚、出街" },
  { id: "formal", label: "正式场合", emoji: "👔", desc: "商务、宴会" },
  { id: "sporty", label: "运动活力", emoji: "🏃", desc: "健身、户外" },
];

interface SceneSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function SceneSelector({
  selected,
  onSelect,
}: SceneSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">偏好场景（可选）</label>
      <div className="flex flex-wrap gap-2">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            type="button"
            onClick={() => onSelect(selected === scene.id ? "" : scene.id)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              selected === scene.id
                ? "bg-primary text-white shadow-md"
                : "bg-card-bg border border-border hover:border-primary/50"
            }`}
          >
            <span className="mr-1">{scene.emoji}</span>
            {scene.label}
          </button>
        ))}
      </div>
    </div>
  );
}
