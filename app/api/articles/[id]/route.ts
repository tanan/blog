import { getDetail } from "@/lib/cms/client";
import { NextRequest } from "next/server";

type Params = {
  id: string;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const data = await getDetail(params.id);

  return Response.json({
    id: data.id,
    title: data.title,
    eyecatch: data.eyecatch,
    content: data.content,
    category: data.category,
  });
}
