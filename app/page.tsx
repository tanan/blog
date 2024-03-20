import Image from "next/image";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Blog } from "@/lib/types";
import { toFormatDate } from "@/lib/utils";

export const runtime = "edge";

const ArticleCard = ({ post }: any) => {
  return (
    <a
      href={`/article/${post.id}`}
      className="article mx-4 h-60 mb-4 md:w-[200px] duration-300 hover:opacity-70"
    >
      <Image
        src={post.eyecatch.url}
        alt="eyecatch"
        width={200}
        height={100}
        className="hidden md:block thumbnail h-28 mb-2"
      />
      <Image
        src={post.eyecatch.url}
        alt="eyecatch"
        width={400}
        height={200}
        className="block md:hidden thumbnail h-[200px] mb-2"
      />
      <h2 className="title font-semibold text-lg line-clamp-3">{post.title}</h2>
      <div className="flex mt-2">
        <div className="flex items-center text-gray-700 gap-4">
          <span className="text-sm">
            {toFormatDate(post.category.publishedAt)}
          </span>
        </div>
      </div>
    </a>
  );
};

export default async function Home({
  searchParams: { offset },
}: {
  searchParams: { offset: number };
}) {
  const o = offset === undefined ? 0 : offset;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/articles?offset=${o}`
  );

  const posts: Blog[] = await data.json();
  return (
    <div className="flex flex-col">
      <Header />
      {/* <h2 className="mx-auto mx-4 my-4 font-semibold text-xl">記事一覧</h2> */}
      <main className="flex mx-auto min-h-screen">
        {/* sm */}
        <div className="md:w-[800px] grid grid-rows-6 grid-cols-auto-fit-60 gap-4">
          {posts.map((post: Blog) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
        {/* <div className="flex flex-col flex-wrap list">
          {posts.map((post: Blog) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div> */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
