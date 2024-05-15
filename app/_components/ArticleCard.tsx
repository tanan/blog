import Image from "next/image";
import { toFormatDate } from "@/lib/utils";

export const ArticleCard = ({ post }: any) => {
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
          <div className="flex justify-end mt-2 items-center text-gray-700 gap-4">
            <span className="text-sm">{toFormatDate(post.publishedAt)}</span>
          </div>
        </div>
      </a>
    </div>
  );
};
