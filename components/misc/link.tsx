"use client";

import { Link as Scroll } from "react-scroll";

export const Link = ({ to, content }: { to: string; content: string }) => {
  return (
    <Scroll
      activeClass="active"
      spy={true}
      to={to}
      smooth={true}
      duration={500}
      className="leading-8 text-sm text-gray-500 hover:text-gray-800 hover:rounded-md cursor-pointer"
    >
      {content}
    </Scroll>
  );
};
