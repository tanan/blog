import { getCategoryById, getDetail } from "@/lib/cms/client";
import { NextRequest } from "next/server";

type Params = {
  id: string;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const data = await getCategoryById(params.id);

  return Response.json({
    id: data.id,
    name: data.name,
  });
}
