/** @type {import('next').NextConfig} */
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/80x80",
      },
      {
        protocol: "https",
        hostname: "assets.st-note.com",
        port: "",
        pathname:
          "/production/uploads/images/130303280/rectangle_large_type_2_05b5a35cad6604d54de0eff2f631dd80.jpeg",
      },
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        port: "",
        pathname: "/assets/**/*.png",
      },
    ],
  },
};

export default nextConfig;
