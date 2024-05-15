import Link from "next/link";

type Props = {
  href: string;
  name: string;
};

export const SidebarItem: React.FC<Props> = ({ href, name }) => {
  return (
    <li className="my-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 hover:rounded-md">
      <Link href={href} className="text-sm px-2 leading-8">
        {name}
      </Link>
    </li>
  );
};
