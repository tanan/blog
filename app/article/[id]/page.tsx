import Image from "next/image";
import parse from "html-react-parser";
import { Blog } from "@/lib/types";
import { options } from "./_components/parser";
import "./page.css";

export default async function ArticlePage({ params }: any) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/articles/${params.id}`
  );

  const post: Blog = await data.json();

  const eyecatch = post.eyecatch?.url || "";
  const content = post.content || "";

  return (
    <main className="flex flex-col min-h-screen w-[620px] items-center mx-auto mt-12">
      <div className="article flex flex-col">
        <div className="w-full h-auto"></div>
        <Image src={eyecatch} width={1000} height={1000} alt="" />
        <h2 className="titile w-full mt-16 text-3xl font-bold">{post.title}</h2>
        <div className="article-info flex mt-5">
          <Image
            src="https://source.unsplash.com/80x80?face"
            width={10}
            height={10}
            className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
            alt=""
          />
          <div className="flex flex-col ml-4 justify-center text-gray-700">
            {/* <span className="text-sm">{article.author.name}</span> */}
            <span className="text-sm">Toshi</span>
            <span className="text-xs">{post.publishedAt}</span>
          </div>
        </div>
        <div className="article-text mt-12 mb-12 leading-9">
          {parse(content, options)}
        </div>
      </div>
    </main>
  );
}
