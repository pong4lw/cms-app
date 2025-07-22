// pages/works/index.tsx

import { GetStaticProps } from "next";
import Link from "next/link";

type Work = {
  id: string;
  title: string;
  slug: string;
};

type Props = {
  works: Work[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch("http://localhost:3000/api/works");
  const json = await res.json();

  return {
    props: {
      works: json.docs,
    },
    revalidate: 60, // ISR: 60秒ごとに再生成可能
  };
};

export default function WorksPage({ works }: Props) {
  return (
    <div>
      <h1>制作実績一覧</h1>
      <ul>
        {works.map((work) => (
          <li key={work.id}>
            <Link href={`/works/${work.slug}`}>{work.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
