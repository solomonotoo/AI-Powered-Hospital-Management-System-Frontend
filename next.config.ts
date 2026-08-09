import type { NextConfig } from "next";
//proxy setup to connect frontend to the backend.
//this is the most preferrable way when cors is involved

//NB From the browser's perspective, you're calling:
// /api/v1/users
// which is the same origin as your Next.js application.
// So you can do:
// const response = await fetch("/api/v1/users");
// instead of:
// const response = await fetch(
//   "http://localhost:8080/api/v1/users"
// );
// The browser doesn't directly make a cross-origin request to localhost:8080.

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:8080/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
