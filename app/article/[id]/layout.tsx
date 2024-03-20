import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
          <Header />
          <div className="flex">{children}</div>
        </div>
      </body>
    </html>
  );
}
