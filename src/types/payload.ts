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
  text?: string;
  format?: string;
  children?: RichTextNode[];
};
