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

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// ブログ一覧を取得
export const getBlogs = async (queries?: MicroCMSQueries) => {
  try {
    const res = await fetch(
      `https://${process.env.MICROCMS_SERVICE_DOMAIN}/api/v1/blogs?offset=${queries?.offset}&limit=${queries?.limit}&$fields=${queries?.fields}`,
      {
        headers: {
          "X-MICROCMS-API-KEY": `${process.env.MICROCMS_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data.contents;
  } catch (err) {
    console.log(err);
  }
};

// ブログの詳細を取得
export const getDetail = async (contentId: string) => {
  try {
    const res = await fetch(
      `https://${process.env.MICROCMS_SERVICE_DOMAIN}/api/v1/blogs/${contentId}`,
      {
        headers: {
          "X-MICROCMS-API-KEY": `${process.env.MICROCMS_API_KEY}`,
        },
      }
    );

    const data = await res.json();
    // console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
};
