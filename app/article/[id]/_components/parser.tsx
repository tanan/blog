import {
  HTMLReactParserOptions,
  Element,
  domToReact,
  Text,
} from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

const isElement = (element: unknown): element is Element =>
  element instanceof Element;
const isText = (text: unknown): text is Text => text instanceof Text;

export const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (!(domNode instanceof Element)) return;

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
  },
};
