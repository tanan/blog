import type { MicroCMSImage, MicroCMSDate } from "microcms-js-sdk";

export type Category = {
  id: string;
  name: string;
};

export type Blog = {
  id: string;
  title: string;
  content?: string;
  eyecatch?: MicroCMSImage;
  category?: string;
} & MicroCMSDate;
