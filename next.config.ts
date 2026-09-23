import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = '';

if (isGithubActions) {
  const repoName = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '');
  repo = `/${repoName}`;
}

const nextConfig: NextConfig = {
  output: 'export',
  basePath: repo,
  env: {
    NEXT_PUBLIC_BASE_PATH: repo,
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
