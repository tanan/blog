type Params = {
  id: string;
};

export async function GET(req: Request, { params }: { params: Params }) {
  if (params.id === "1") {
    return Response.json({
      id: "1234567890qwertyuiopasdfghjkl1",
      title: "これはnoteのタイトルです",
      publishedAt: "2024/02/08 10:00",
      author: {
        id: "1",
        name: "Maki",
      },
      text: "これは文章です。長い文章です。テストのために作成しています。複数行の文章が正しく表示されるか確かめています。",
    });
  }

  return Response.json({
    id: "1234567890qwertyuiopasdfghjkl1",
    title: "これはnoteのタイトルです",
    publishedAt: "2024/02/08 10:00",
    author: {
      id: "2",
      name: "Toshi",
    },
    text: "これは文章です。長い文章です。テストのために作成しています。複数行の文章が正しく表示されるか確かめています。",
  });
}
