import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Panda3 Blog - Article Page",
  description: "Panda3 Blog - Article Page",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
      <Script src="//cdn.iframe.ly/embed.js" />
    </div>
  );
}
