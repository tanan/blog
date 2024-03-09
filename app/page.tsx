import Image from "next/image";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Blog, getBlogs } from "@/lib/cms/client";
import { toFormatDate } from "@/lib/utils";

const ArticleCard = ({ post }: any) => {
  return (
    <a
      href={`/article/${post.id}`}
      className="article mx-4 mb-12 h-60 w-[200px] duration-300 hover:opacity-70"
    >
      <Image
        src={post.eyecatch.url}
        alt="eyecatch"
        width={200}
        height={100}
        className="thumbnail h-28 max-h-28 mb-2"
      />
      <h2 className="title font-semibold text-lg line-clamp-3">{post.title}</h2>
      <div className="flex mt-2">
        <Image
          src="https://source.unsplash.com/80x80?face"
          width={6}
          height={6}
          className="h-6 w-6 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
          alt=""
        />
        <div className="flex ml-2 items-center text-gray-700 gap-4">
          <span className="text-sm">Toshi</span>
          <span className="text-xs">
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
  const data = await getBlogs({
    offset: offset,
    limit: 10,
    fields: "id,title,eyecatch,category",
  });

  console.log(data);
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="min-h-screen w-full">
          <h2 className="mx-4 my-4 font-semibold text-xl">フォロー中</h2>
          <div className="flex flex-wrap list">
            {data.map((post: Blog) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
