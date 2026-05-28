"use client";

import { Outfit } from "@/types/outfit";

interface OutfitCardProps {
  outfit: Outfit;
  index: number;
}

function ColorDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-5 h-5 rounded-full border border-gray-200 shadow-sm flex-shrink-0"
      style={{ backgroundColor: color }}
    />
  );
}

export default function OutfitCard({ outfit, index }: OutfitCardProps) {
  const delayClass = `fade-in-delay-${index + 1}`;

  return (
    <div
      className={`bg-card-bg rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow fade-in ${delayClass}`}
    >
      {/* 头部 */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">{outfit.scene}</h3>
          <div className="flex gap-1">
            {outfit.style_keywords.map((kw) => (
              <span
                key={kw}
                className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 单品列表 */}
      <div className="px-5 space-y-3">
        {outfit.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <ColorDot color={item.color} />
            <div className="flex-1 min-w-0">
              <span className="text-xs text-muted mr-2">{item.role}</span>
              <span className="text-sm">{item.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 配色逻辑 */}
      <div className="px-5 pt-3 pb-5">
        <div className="mt-3 p-3 bg-background rounded-xl">
          <p className="text-xs text-muted leading-relaxed">
            <span className="font-medium text-foreground">配色逻辑：</span>
            {outfit.color_logic}
          </p>
        </div>

        {/* 色卡条 */}
        <div className="flex gap-1 mt-3">
          {outfit.items.map((item, i) => (
            <div
              key={i}
              className="flex-1 h-2 rounded-full first:rounded-l-full last:rounded-r-full"
              style={{ backgroundColor: item.color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
