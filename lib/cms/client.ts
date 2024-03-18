import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import { Blog } from "@/lib/types";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getBlogs = async (queries?: MicroCMSQueries) => {
  try {
    const data = await client.get({
      endpoint: "blogs",
      queries,
    });
    return data.contents;
  } catch (err) {
    console.log(err);
  }
};

export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });

  return detailData;
};

export const getCategories = async () => {
  try {
    const data = await client.get({
      endpoint: "categories",
    });
    return data.contents;
  } catch (err) {
    console.log(err);
  }
};
