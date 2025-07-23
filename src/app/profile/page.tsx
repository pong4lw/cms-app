import SkillSection from "@/components/sections/SlillSection"

export default function Profile() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">プロフィール</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">自己紹介</h2>
        <p>
          フルスタックエンジニアの洋喜本多です。Web開発を中心に、フロントエンドからバックエンドまで幅広く対応しています。
        </p>
      </section>

      <section>
      {/* 他のセクション */}
          <SkillSection />
      </section>
    </main>
  );
}
