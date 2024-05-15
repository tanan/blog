import { Blog } from "@/lib/types";
import { ArticleCard } from "./_components/ArticleCard";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export const runtime = "edge";

const getCategoryName = async (id: string) => {
  if (id === "") {
    return "記事一覧";
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/categories/${id}`
  );
  const data = await res.json();
  return data.name;
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

  const categoryName = getCategoryName(c);
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-col mx-auto min-h-screen">
        <h2 className="mx-auto md:mx-2 my-4 font-semibold text-2xl">
          {categoryName}
        </h2>
        <div className="flex">
          <div className="md:w-[768px] lg:min-w-[768px] grid grid-rows-6 grid-cols-auto-fit-60 sm:w-[600px] gap-2">
            {posts.map((post: Blog) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
