/* eslint-disable @typescript-eslint/no-explicit-any */
// components/blocks/ContentBlock.tsx
type ContentBlockProps = {
  id: string;
  columns: any[];
};

export function ContentBlock({ columns }: ContentBlockProps) {
  return (
    <section className="prose max-w-3xl mx-auto my-8">
      <p>ここに columns の中身を描画</p>
      {/* 実際は columns.map して表示 */}
    </section>
  );
}
