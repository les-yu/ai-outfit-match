import { HistoryRecord, RecommendResponse } from "@/types/outfit";

const STORAGE_KEY = "ai-outfit-history";

export function getHistory(): HistoryRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(
  image: string,
  result: RecommendResponse
): HistoryRecord {
  const record: HistoryRecord = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    image,
    result,
  };

  const history = getHistory();
  history.unshift(record);
  if (history.length > 50) history.pop();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

  return record;
}

export function getHistoryById(id: string): HistoryRecord | undefined {
  return getHistory().find((r) => r.id === id);
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
