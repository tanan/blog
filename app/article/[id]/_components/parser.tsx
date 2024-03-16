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

    if (domNode.name === "p") {
      return (
        <p className="text-lg leading-9 text-gray-700">
          {domToReact(children)}
        </p>
      );
    }

    if (domNode.name === "h2") {
      return (
        <p className="text-2xl font-bold mt-12 mb-4">{domToReact(children)}</p>
      );
    }

    if (domNode.name === "a") {
      return (
        <Link href={attribs.href} className="underline hover:no-underline">
          {domToReact(children)}
        </Link>
      );
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
      return <code className="bg-gray-200">{domToReact(children)}</code>;
    }
    if (domNode.name === "pre") {
      const code: Element = children[0] as Element;
      const text: Text = code.children[0] as Text;
      const highlightCode: AutoHighlightResult = hljs.highlightAuto(text.data);
      return (
        <pre className="p-4 bg-gray-200">
          <code className={code.attribs["class"]}>
            {parse(highlightCode.value, options)}
          </code>
        </pre>
      );
    }
  },
};
