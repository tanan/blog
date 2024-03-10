import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
} from "microcms-js-sdk";

//ブログの型定義
export type Blog = {
  id: string;
  title: string;
  content?: string;
  eyecatch?: MicroCMSImage;
  category?: string;
} & MicroCMSDate;

// if (!process.env.MICROCMS_SERVICE_DOMAIN) {
//   throw new Error("MICROCMS_SERVICE_DOMAIN is required");
// }

// if (!process.env.MICROCMS_API_KEY) {
//   throw new Error("MICROCMS_API_KEY is required");
// }

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// ブログ一覧を取得
export const getBlogs = async (queries?: MicroCMSQueries) => {
  console.log("getBlogs");
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

// ブログの詳細を取得
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
