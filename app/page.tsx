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
    <>
      <Header />
      <section className="posts">
        <div className="mx-auto w-[min(94%,1280px)]">
          <h2 className="text-center sm:text-start sm:mx-6 my-6 font-semibold text-2xl">
            {categoryName}
          </h2>
          <div className="flex">
            <div className="posts-container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
              {posts.map((post: Blog) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
            <div className="hidden lg:block">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
