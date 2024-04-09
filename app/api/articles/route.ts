import { Blog } from "@/lib/types";
import { getBlogs } from "@/lib/cms/client";
import { NextRequest } from "next/server";
import type { MicroCMSQueries } from "microcms-js-sdk";

const generateQueries = (searchParams: URLSearchParams): MicroCMSQueries => {
  const category = searchParams.get("category");
  const offset = Number(searchParams.get("offset") || 0);
  const limit = Number(searchParams.get("limit") || 10);
  if (category) {
    return {
      filters: `category[equals]${category}`,
      offset: offset,
      limit: limit,
      fields: "id,title,eyecatch,category,publishedAt",
    };
  }
  return {
    offset: offset,
    limit: limit,
    fields: "id,title,eyecatch,category,publishedAt",
  };
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const data = await getBlogs(generateQueries(searchParams));

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
