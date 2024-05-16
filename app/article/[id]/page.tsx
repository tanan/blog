import parse from "html-react-parser";
import { Blog } from "@/lib/types";
import { options } from "./_components/parser";
import { toFormatDate } from "@/lib/utils";
import "./page.css";
import TableOfContents from "@/components/layout/TableOfContents";

export default async function ArticlePage({ params }: any) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/articles/${params.id}`
  );

  const post: Blog = await data.json();
  const content = post.content || "";
  const publishedAt = toFormatDate(post.publishedAt || "");

  return (
    <div className="flex mx-auto mt-12">
      <main className="flex basis-auto flex-col min-h-screen mx-6 md:max-w-[860px] items-center">
        <div className="article flex flex-col bg-white px-6 md:px-12 py-8 rounded-md">
          <h2 className="titile mt-16 text-3xl font-bold sm:text-2xl md:text-xl lg:text-3xl">
            {post.title}
          </h2>
          <div className="article-info mt-5">
            <div className="text-gray-700">
              <span className="text-sm">投稿日 {publishedAt}</span>
              <div className="flex mt-2 gap-2">
                <span className="bg-gray-200 px-2 py-1 rounded-md text-sm">
                  {post.category?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="article-text mt-12 mb-12">
            {parse(content, options)}
          </div>
        </div>
      </main>
      <div className="invisible hidden lg:block lg:visible">
        <TableOfContents content={content} />
      </div>
    </div>
  );
}
