import type { MicroCMSQueries } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const fetchClient = async (url: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": `${process.env.MICROCMS_API_KEY}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getBlogs = async (queries?: MicroCMSQueries) => {
  const data = await fetchClient(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN}/api/v1/blogs?offset=${queries?.offset}&limit=${queries?.limit}&$fields=${queries?.fields}`
  );
  return data;
};

export const getDetail = async (contentId: string) => {
  return await fetchClient(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN}/api/v1/blogs/${contentId}`
  );
};

export const getCategories = async () => {
  return await fetchClient(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN}/api/v1/categories`
  );
};
