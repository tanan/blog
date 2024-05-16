import Image from "next/image";
import { toFormatDate } from "@/lib/utils";

const ArticleCard = ({ post }: any) => {
  return (
    <div className="mx-auto mb-4 h-[clamp(240px,9.667rem+12.59vw,336px)] max-w-[300px] duration-300 hover:opacity-70 bg-white rounded-md">
      <a href={`/article/${post.id}`} className="article h-full">
        <Image
          src={post.eyecatch.url}
          alt="eyecatch"
          width={300}
          height={168}
          className="thumbnail h-[clamp(120px,50%,168px)] rounded-t-md"
        />
        <div className="relative mt-1 md:mt-2 px-4 h-[clamp(120px,50%,168px)]">
          <span className="bg-gray-200 px-2 py-1 rounded-md sm:text-sm text-[12px] text-gray-700">
            {post.category?.name}
          </span>
          <h2 className="title mt-1 md:mt-2 mx-1 font-semibold text-[clamp(14px,1.5vw,16px)] line-clamp-3">
            {post.title}
          </h2>
          <span className="absolute right-4 bottom-3 md:bottom-2 sm:text-sm text-[12px] text-gray-700">
            {toFormatDate(post.publishedAt)}
          </span>
        </div>
      </a>
    </div>
  );
};

export default ArticleCard;
