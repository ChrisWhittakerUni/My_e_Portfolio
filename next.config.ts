import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // This project sits inside a parent directory that is itself a git repo,
    // so pin the workspace root instead of letting Turbopack infer it.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
