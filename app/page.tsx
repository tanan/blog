import Image from "next/image";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Blog } from "@/lib/types";
import { toFormatDate } from "@/lib/utils";

export const runtime = "edge";

const ArticleCard = ({ post }: any) => {
  return (
    <div className="mx-2 h-64 mb-4 max-w-[236px] duration-300 hover:opacity-70 bg-white rounded-md">
      <a href={`/article/${post.id}`} className="article">
        <Image
          src={post.eyecatch.url}
          alt="eyecatch"
          width={236}
          height={118}
          className="thumbnail h-[120px] mb-2 rounded-t-md"
        />
        <div className="px-4">
          <h2 className="title font-semibold text-lg line-clamp-3">
            {post.title}
          </h2>
          <div className="flex mt-2">
            <div className="flex items-center text-gray-700 gap-4">
              <span className="text-sm">{toFormatDate(post.publishedAt)}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default async function Home({
  searchParams: { category, offset },
}: {
  searchParams: { category: string; offset: number };
}) {
  const c = category === undefined ? "" : category;
  const o = offset === undefined ? 0 : offset;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/articles?category=${c}&offset=${o}`
  );

  const posts: Blog[] = await data.json();
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex mx-auto min-h-screen">
        <div className="md:w-[768px] lg:min-w-[768px] grid grid-rows-6 grid-cols-auto-fit-60 sm:w-[600px] gap-2">
          {posts.map((post: Blog) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
