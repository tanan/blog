import { createServerFn } from "@tanstack/react-start";
import {
	createClient,
	type MicroCMSContentId,
	type MicroCMSDate,
	type MicroCMSImage,
	type MicroCMSListResponse,
} from "microcms-js-sdk";

type Client = ReturnType<typeof createClient>;

export type Category = {
	name: string;
} & MicroCMSContentId &
	MicroCMSDate;

export type Blog = {
	title: string;
	content: string;
	eyecatch?: MicroCMSImage;
	category?: Category;
};

export type BlogListItem = Blog & MicroCMSContentId & MicroCMSDate;

let cachedClient: Client | undefined;

function getClient(): Client {
	if (cachedClient) return cachedClient;
	const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
	const apiKey = process.env.MICROCMS_API_KEY;
	if (!serviceDomain || !apiKey) {
		throw new Error(
			"MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が未設定です。.env を確認してください。",
		);
	}
	cachedClient = createClient({ serviceDomain, apiKey });
	return cachedClient;
}

export const fetchBlogs = createServerFn({ method: "GET" }).handler(
	async (): Promise<MicroCMSListResponse<Blog>> => {
		return await getClient().getList<Blog>({
			endpoint: "blogs",
			queries: {
				fields: "id,title,createdAt,eyecatch",
				orders: "-createdAt",
			},
		});
	},
);

export const fetchBlog = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }): Promise<BlogListItem> => {
		return await getClient().getListDetail<Blog>({
			endpoint: "blogs",
			contentId: data.id,
			queries: { fields: "id,title,createdAt,content,eyecatch,category" },
		});
	});
