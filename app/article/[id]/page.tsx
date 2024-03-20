import Image from "next/image";
import parse from "html-react-parser";
import { Blog } from "@/lib/types";
import { options } from "./_components/parser";
import { toFormatDate } from "@/lib/utils";
import "./page.css";

export default async function ArticlePage({ params }: any) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/articles/${params.id}`
  );

  const post: Blog = await data.json();

  const eyecatch = post.eyecatch?.url || "";
  const content = post.content || "";
  const publishedAt = toFormatDate(post.category?.publishedAt || "");
  console.log(post);

  return (
    <main className="flex flex-col min-h-screen w-[800px] items-center mx-auto mt-12">
      <div className="article flex flex-col bg-white px-12 py-8">
        <div className="w-full h-auto"></div>
        <Image src={eyecatch} width={1000} height={1000} alt="" />
        <h2 className="titile w-full mt-16 text-3xl font-bold">{post.title}</h2>
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
        <div className="article-text mt-12 mb-12 leading-9">
          {parse(content, options)}
        </div>
      </div>
    </main>
  );
}
