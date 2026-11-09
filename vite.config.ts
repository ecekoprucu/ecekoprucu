import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // Use pdf.js's legacy build: the modern one calls browser features (e.g.
      // Map.prototype.getOrInsertComputed) with no fallback, which breaks the CV page
      // on older iPhones. The worker path in CvPage.tsx points at the legacy build too.
      { find: /^pdfjs-dist$/, replacement: "pdfjs-dist/legacy/build/pdf.mjs" },
      {
        find: /^pdfjs-dist\/web\/pdf_viewer\.mjs$/,
        replacement: "pdfjs-dist/legacy/web/pdf_viewer.mjs",
      },
    ],
  },
});
