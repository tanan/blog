import { AutoHighlightResult } from "highlight.js";
import {
  HTMLReactParserOptions,
  Element,
  domToReact,
  Text,
  DOMNode,
} from "html-react-parser";
import parse from "html-react-parser";
import hljs from "highlight.js/lib/core";
import Image from "next/image";
import Link from "next/link";

const isElement = (element: unknown): element is Element =>
  element instanceof Element;
const isText = (text: unknown): text is Text => text instanceof Text;

export const options: HTMLReactParserOptions = {
  replace(domNode: DOMNode) {
    if (!(domNode instanceof Element && domNode.attribs)) return;

    const children = domNode.children.filter(
      (node): node is Element | Text => isElement(node) || isText(node)
    );

    const { attribs } = domNode;

    if (domNode.name === "h2") {
      return (
        <h2 id={attribs.id} className="anchor text-2xl font-bold mt-12 mb-4">
          {domToReact(children)}
        </h2>
      );
    }

    if (domNode.name === "a") {
      if (attribs.href.startsWith("http")) {
        return <a {...attribs}>{domToReact(children)}</a>;
      } else {
        return <Link href={attribs.href}>{domToReact(children)}</Link>;
      }
    }

    if (domNode.name === "img") {
      const { height, width } = attribs;
      return (
        <Image
          className="my-4"
          src={attribs.src}
          width={parseInt(width)}
          height={parseInt(height)}
          alt={attribs.alt ? attribs.alt : "Image"}
        />
      );
    }
    if (domNode.name === "code") {
      return <code className="bg-[#1a2638] p-1">{domToReact(children)}</code>;
    }
    if (domNode.name === "pre") {
      const code: Element = children[0] as Element;
      const text: Text = code.children[0] as Text;
      const highlightCode: AutoHighlightResult = hljs.highlightAuto(text.data);
      return (
        <pre className="p-4 bg-[#1a2638] whitespace-pre-wrap rounded-md">
          <code className={code.attribs["class"]}>
            {parse(highlightCode.value, options)}
          </code>
        </pre>
      );
    }

    if (
      domNode.name === "script" &&
      attribs.src === "//cdn.iframe.ly/embed.js"
    ) {
      return <></>;
    }
  },
};
