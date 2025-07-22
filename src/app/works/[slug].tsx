// pages/works/[slug].tsx

import { GetStaticPaths, GetStaticProps } from "next";

type Work = {
  id: string;
  title: string;
  slug: string;
  content: string;
};

type Props = {
  work: Work;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages?where[status][equals]=published&sort=-createdAt`,
  );

  const json = await res.json();

  console.log("works:", json.docs);

  const paths = json.docs.map((work: any) => ({
    params: { slug: work.slug },
  }));

  console.log("paths:", paths);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    const slug = params?.slug;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/works?where[slug][equals]=${slug}`,
    );
    const json = await res.json();

    const work = json.docs[0] ?? null;
    if (works !== undefined) {
      props.works = works;
    }
    return {
      props,
    };
  } catch (error) {
    return {
      props: {
        works: [], // エラー時も安全
      },
    };
  }
};

export default function WorkDetail({ work }: Props) {
  if (!work) {
    return (
      <div>申し訳ありませんが、該当の制作実績は見つかりませんでした。</div>
    );
  }

  return (
    <div>
      <h1>{work.title}</h1>
      <p>{work.content}</p>
    </div>
  );
}
