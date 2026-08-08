import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { securityHeaders } from "./security-headers.mjs";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Note: optimizePackageImports for framer-motion breaks Turbopack HMR
  // ("module factory is not available" for use-scroll / use-transform).
  async headers() {
    const headers = [
      {
        source: "/:path*",
        headers: [...securityHeaders],
      },
    ];

    // Never immutable-cache hashed assets in development — Turbopack reuses
    // chunk filenames while CSS content changes, which freezes a broken UI.
    if (process.env.NODE_ENV === "production") {
      headers.push({
        source: "/(.*)\\.(js|css|woff2|svg|png|jpg|jpeg|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      });
    }

    return headers;
  },
};

export default withNextIntl(nextConfig);
