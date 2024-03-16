import Link from "next/link";
import { TOPICS_LIST } from "@/lib/constants/index";
import { Category } from "@/lib/types";

type Props = {
  href: string;
  name: string;
};

const SidebarItem: React.FC<Props> = ({ href, name }) => {
  return (
    <li className="my-2 mx-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 hover:rounded-md">
      <Link href={href} className="font-semibold text-ml px-2 leading-9">
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
    <div className="categories w-60">
      <ul className="my-2 w-full">
        {categories.map((topic) => (
          <SidebarItem
            key={topic.id}
            href={`/topic/${topic.id}`}
            name={topic.name}
          />
        ))}
      </ul>
      <div className="w-[calc(100%_-_16px)] mx-2 my-4 border-b border-gray-700 opacity-50"></div>
    </div>
  );
}
