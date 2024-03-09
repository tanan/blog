// export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const res = {
    message: "ok",
  };
  return Response.json(res);
}
