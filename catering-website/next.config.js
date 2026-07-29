const branch = process.env.GITHUB_REF_NAME;
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = repository && branch ? `/${repository}/${branch}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
