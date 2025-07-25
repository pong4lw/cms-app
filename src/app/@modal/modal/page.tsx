// app/@modal/modal/page.tsx
"use client";

export default function ModalPage() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">モーダル表示</h2>
        <p>ここにモーダルの中身が入ります</p>
      </div>
    </div>
  );
}
