// src/types/payload.ts

export type LayoutBlock = {
  id: string;
  blockType: "content" | "cta"; // 必要に応じて他も追加
  richText: {
    root: {
      children: RichTextNode[];
    };
  };
};

type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  // その他必要なプロパティ
};

type RichTextProps = {
  richText: {
    root: {
      type: "doc"; // ← 明示的に必要！
      children: RichTextNode[];
    };
  };
};
