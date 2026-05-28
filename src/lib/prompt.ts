export function buildSystemPrompt(): string {
  return `你是一位资深时尚穿搭顾问，拥有 10 年造型经验，精通色彩搭配、风格混搭和场景着装规则。

你的能力：
1. 精准识别服装品类、颜色、材质、风格
2. 基于一件单品，构思完整的搭配方案
3. 根据用户体型和偏好调整推荐
4. 用专业但易懂的语言解释搭配逻辑

你的原则：
- 推荐必须实穿、可执行，不要过于前卫或夸张
- 注重色彩和谐，给出具体的配色逻辑
- 考虑季节和场合的适配性
- 每套搭配必须完整：包含上装、下装、鞋、配饰`;
}

export function buildUserPrompt(
  scenePreference?: string,
  height?: string,
  weight?: string,
  stylePreference?: string
): string {
  let prompt = `请分析这张图片中的服装单品，然后基于这件单品推荐 3 套完整搭配。

要求：
1. 首先识别图片中的单品：品类、颜色、风格特征
2. 推荐 3 套搭配，分别覆盖以下场景：
   ${scenePreference ? `- ${scenePreference}` : "- 日常通勤：适合上班、上学的实用搭配"}
   - 约会休闲：适合周末出行、朋友聚会
   - 潮流个性：有态度、有亮点的时尚搭配
3. 每套搭配包含：上装、下装、鞋、配饰（共 4 件）
4. 给出配色逻辑和风格关键词
5. confidence 字段表示你对识别结果的置信度（0-1）`;

  if (height || weight || stylePreference) {
    prompt += `\n\n用户信息：`;
    if (height) prompt += `\n- 身高：${height}`;
    if (weight) prompt += `\n- 体重：${weight}`;
    if (stylePreference) prompt += `\n- 偏好风格：${stylePreference}`;
    prompt += `\n请根据以上信息调整推荐。`;
  }

  prompt += `\n\n请严格按照以下 JSON 格式返回，不要包含任何其他文字：

{
  "detected_item": {
    "category": "服装品类",
    "color": "主色调",
    "style": "风格特征"
  },
  "outfits": [
    {
      "scene": "场景名称",
      "style_keywords": ["关键词1", "关键词2"],
      "items": [
        { "role": "上装", "description": "具体描述", "color": "#色值" },
        { "role": "下装", "description": "具体描述", "color": "#色值" },
        { "role": "鞋", "description": "具体描述", "color": "#色值" },
        { "role": "配饰", "description": "具体描述", "color": "#色值" }
      ],
      "color_logic": "配色逻辑说明",
      "confidence": 0.9
    }
  ]
}`;

  return prompt;
}
