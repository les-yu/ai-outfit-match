import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt";
import { RecommendResponse } from "@/types/outfit";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, scene_preference, height, weight, style_preference } = body;

    if (!image) {
      return NextResponse.json({ error: "请上传图片" }, { status: 400 });
    }

    // 提取 base64 数据和 media type
    const matches = image.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.json(
        { error: "图片格式不正确" },
        { status: 400 }
      );
    }

    const mediaType = matches[1] as
      | "image/jpeg"
      | "image/png"
      | "image/webp"
      | "image/gif";
    const base64Data = matches[2];

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(
      scene_preference,
      height,
      weight,
      style_preference
    );

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64Data,
              },
            },
            {
              type: "text",
              text: userPrompt,
            },
          ],
        },
      ],
    });

    // 提取文本响应
    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "AI 未能生成推荐结果" },
        { status: 500 }
      );
    }

    // 解析 JSON 响应
    let result: RecommendResponse;
    try {
      // 尝试从响应中提取 JSON（AI 可能会包裹在 markdown 代码块中）
      let jsonStr = textBlock.text;
      const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }
      result = JSON.parse(jsonStr.trim());
    } catch {
      console.error("Failed to parse AI response:", textBlock.text);
      return NextResponse.json(
        { error: "AI 返回格式异常，请重试" },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Recommend API error:", error);

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `AI 服务异常：${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json({ error: "服务异常，请稍后重试" }, { status: 500 });
  }
}
