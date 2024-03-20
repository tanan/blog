import { isText } from "domhandler";
import * as cheerio from "cheerio";
import { TOC } from "@/lib/types";

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

export const TableOfContents = ({ content }) => {
  const toc = renderToc(content);
  return (
    <div>
      <p className="TableOfContentsHead">目次</p>
      <ul>
        {toc.map((data) => (
          <li key={data?.id}>
            <a href={`#${data?.text}`}>{data?.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
