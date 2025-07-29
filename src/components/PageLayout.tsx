// components/PageLayout.tsx
import { Fragment } from "react";
import type { LayoutBlock } from "@/types/payload";

// --- RichTextレンダラーの型と定義 ---
type RichTextNode = {
  type: string;
  text?: string;
  format?: string;
  children?: RichTextNode[];
};

type RichTextProps = {
  richText: {
    root: RichTextNode;
  };
};

function RichTextRenderer({ richText }: RichTextProps) {
  const renderNode = (
    node: RichTextNode,
    key: number,
  ): React.ReactElement | null => {
    if (node.type === "paragraph") {
      return (
        <p key={key}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </p>
      );
    }

    if (node.type === "text") {
      const content = node.text || "";
      if (node.format === "bold") {
        return <strong key={key}>{content}</strong>;
      }
      return <Fragment key={key}>{content}</Fragment>;
    }

    return null;
  };

  return (
    <>{richText.root.children?.map((node, index) => renderNode(node, index))}</>
  );
}

// --- ページレイアウトの本体 ---
type Props = {
  layout: LayoutBlock[];
};

export default function PageLayout({ layout }: Props) {
  return (
    <>
      {layout.map((block) => {
        switch (block.blockType) {
          case "content":
          case "cta":
            return (
              <section key={block.id} className="py-8">
                <RichTextRenderer richText={block.richText} />
              </section>
            );
          // 他のブロックもここに追加可
          default:
            return null;
        }
      })}
    </>
  );
}
