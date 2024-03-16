import { Blog, getBlogs } from "@/lib/cms/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const offset = Number(searchParams.get("offset"));
  const limit = Number(searchParams.get("limit") || 10);
  const data = await getBlogs({
    offset: offset,
    limit: limit,
    fields: "id,title,eyecatch,category",
  });

  console.log(data);

  return Response.json(
    data.contents.map((post: Blog) => {
      return {
        id: post.id,
        title: post.title,
        eyecatch: post.eyecatch,
        content: post.content,
        category: post.category,
      };
    })
  );
}
