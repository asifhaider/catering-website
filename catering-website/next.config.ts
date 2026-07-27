import type { NextConfig } from "next";

const branch = process.env.GITHUB_REF_NAME;
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = repository && branch ? `/${repository}/${branch}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
