// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// Production URL for canonical links and structured data. Set SITE when deploying
// (e.g. SITE=https://your-domain.com on Vercel/Netlify/Cloudflare).
// https://docs.astro.build/en/reference/configuration-reference/#site
const site = process.env.SITE || "https://example.com";

// https://astro.build/config
export default defineConfig({
  site,
  // Match URL helpers (promptDetail, tagDetail, etc.) which use trailing slashes
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});
