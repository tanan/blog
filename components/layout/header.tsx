import Image from "next/image";

const Header = () => {
  return (
    <header>
      <a href="/" className="flex justify-center w-[240px] mx-auto py-12">
        <Image
          src="/logo.jpg"
          alt="Panda Logo"
          width={36}
          height={36}
          priority
        />
        <h2 className="flex mx-auto text-3xl font-bold">Panda3 Blog</h2>
      </a>
    </header>
  );
};

export default Header;
