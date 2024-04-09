import Link from "next/link";
import { TOPICS_LIST } from "@/lib/constants/index";
import { Category } from "@/lib/types";

type Props = {
  href: string;
  name: string;
};

const SidebarItem: React.FC<Props> = ({ href, name }) => {
  return (
    <li className="my-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 hover:rounded-md">
      <Link href={href} className="text-sm px-2 leading-8">
        {name}
      </Link>
    </li>
  );
};

export default async function Sidebar() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/categories`
  );

  const categories: Category[] = await data.json();
  return (
    <div className="categories min-w-[200px] w-[240px] bg-white mx-2 px-2 py-4">
      <h2 className="leading-8 text-gray-800 font-bold">カテゴリ</h2>
      <ul className="my-2 w-full">
        {categories.map((category) => (
          <SidebarItem
            key={category.id}
            href={`?category=${category.id}`}
            name={category.name}
          />
        ))}
      </ul>
      {/* <div className="w-[calc(100%_-_16px)] mx-2 my-4 border-b border-gray-700 opacity-50"></div> */}
    </div>
  );
}
