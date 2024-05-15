import Image from "next/image";
import { toFormatDate } from "@/lib/utils";

export const ArticleCard = ({ post }: any) => {
  return (
    <div className="mx-auto mb-4 h-[clamp(200px,9.667rem+12.59vw,336px)] max-w-[300px] duration-300 hover:opacity-70 bg-white rounded-md">
      <a href={`/article/${post.id}`} className="article">
        <Image
          src={post.eyecatch.url}
          alt="eyecatch"
          width={300}
          height={168}
          className="thumbnail h-[clamp(130px,50%,168px)] mb-2 rounded-t-md"
        />
        <div className="px-4">
          <h2 className="title font-semibold text-[clamp(12px,1.5vw,16px)] line-clamp-3">
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
