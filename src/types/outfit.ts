export interface OutfitItem {
  role: string;
  description: string;
  color: string;
}

export interface Outfit {
  scene: string;
  style_keywords: string[];
  items: OutfitItem[];
  color_logic: string;
  confidence: number;
}

export interface DetectedItem {
  category: string;
  color: string;
  style: string;
}

export interface RecommendResponse {
  detected_item: DetectedItem;
  outfits: Outfit[];
}

export interface RecommendRequest {
  image: string;
  scene_preference?: string;
  height?: string;
  weight?: string;
  style_preference?: string;
}

export interface HistoryRecord {
  id: string;
  timestamp: number;
  image: string;
  result: RecommendResponse;
}
