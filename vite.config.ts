import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then(m =>
            m.cartographer()
          ),
        ]
      : []),
    viteStaticCopy({
      targets: [
        {
          src: "assets/*.png",
          dest: "assets",
        },
        {
          src: "assets/robots.txt",
          dest: "",
        },
        {
          src: "assets/robots-prod.txt",
          dest: "",
        },
        {
          src: "assets/favicon.ico",
          dest: "",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          // Don't hash icon/favicon files - preserve original names
          if (
            assetInfo.names?.[0]?.match(/\.(png|ico)$/) &&
            assetInfo.names[0].match(/favicon|apple-touch-icon|android-chrome/)
          ) {
            return "assets/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  optimizeDeps: {
    // jSquash codecs locate their .wasm files relative to their own modules,
    // which breaks if Vite pre-bundles them.
    exclude: [
      "@jsquash/avif",
      "@jsquash/jpeg",
      "@jsquash/jxl",
      "@jsquash/oxipng",
      "@jsquash/qoi",
      "@jsquash/webp",
    ],
  },
  worker: {
    format: "es",
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
