import { Article } from "@/lib/types/article";

export async function GET(req: Request) {
  const res: Article[] = [
    {
      id: "1234567890qwertyuiopasdfghjkl1",
      title: "これはnoteのタイトルです",
      publishedAt: "2024/02/08 10:00",
      author: {
        id: "1",
        name: "Maki",
      },
      content:
        "これは文章です。長い文章です。テストのために作成しています。複数行の文章が正しく表示されるか確かめています。",
    },
    {
      id: "1234567890qwertyuiopasdfghjkl2",
      title: "これはnoteのタイトルです",
      publishedAt: "2024/02/08 10:00",
      author: {
        id: "2",
        name: "Toshi",
      },
      content:
        "これは文章です。長い文章です。テストのために作成しています。複数行の文章が正しく表示されるか確かめています。",
    },
    {
      id: "1234567890qwertyuiopasdfghjkl3",
      title: "これはnoteのタイトルです",
      publishedAt: "2024/02/08 10:00",
      author: {
        id: "3",
        name: "Bob",
      },
      content:
        "これは文章です。長い文章です。テストのために作成しています。複数行の文章が正しく表示されるか確かめています。",
    },
  ];
  return Response.json(res);
}
