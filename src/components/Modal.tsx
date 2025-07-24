// app/components/Modal.tsx
"use client";

export default function Modal({
  title,
  date,
  onClose,
}: {
  title: string;
  date: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <time className="text-sm text-gray-500">{date}</time>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
