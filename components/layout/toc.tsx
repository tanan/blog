import { isText } from "domhandler";
import * as cheerio from "cheerio";
import { Link } from "../misc/link";

export const renderToc = (content: string) => {
  const $ = cheerio.load(content);
  const headings = $("h1, h2, h3").toArray();
  const toc = headings.map((data: cheerio.Element) => {
    if (isText(data.children[0])) {
      const text = data.children[0].data;
      return {
        text: text,
        id: data.attribs.id,
      };
    }
  });
  return toc;
};

export const TableOfContents = ({ content }: any) => {
  const toc = renderToc(content);
  return (
    <div className="max-w-[280px] sticky top-20 bg-white px-6 py-4 rounded-md">
      <p className="TableOfContentsHead leading-8 text-gray-800 font-bold">
        目次
      </p>
      <ul>
        {toc.map((data) => {
          const id = data?.id || "";
          const text = data?.text || "";
          return (
            <li key={data?.id}>
              <Link to={id} content={text} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
