import { Blog } from "@/lib/types";
import { getBlogs } from "@/lib/cms/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get("q") || "";
  const offset = Number(searchParams.get("offset"));
  const limit = Number(searchParams.get("limit") || 10);
  const data = await getBlogs({
    q: q,
    offset: offset,
    limit: limit,
    fields: "id,title,eyecatch,category,publishedAt",
  });

  if (!data) {
    return Response.json({});
  }

  return Response.json(
    data.map((post: Blog) => {
      return {
        id: post.id,
        title: post.title,
        eyecatch: post.eyecatch,
        content: post.content,
        category: post.category,
        publishedAt: post.publishedAt,
      };
    })
  );
}
