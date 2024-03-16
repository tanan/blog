import { Category } from "@/lib/types";
import { getCategories } from "@/lib/cms/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const offset = Number(searchParams.get("offset"));
  const limit = Number(searchParams.get("limit") || 20);
  const data = await getCategories();

  console.log(data);

  return Response.json(
    data.contents.map((category: Category) => {
      return {
        id: category.id,
        name: category.name,
      };
    })
  );
}
