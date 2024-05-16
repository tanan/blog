import { Category } from "@/lib/types";
import SidebarItem from "./SidebarItem";

const Sidebar = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/categories`
  );

  const categories: Category[] = await data.json();
  return (
    <div className="categories min-w-[200px] lg:w-[280px] bg-white mx-2 px-4 py-4 rounded-md">
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
    </div>
  );
};

export default Sidebar;
