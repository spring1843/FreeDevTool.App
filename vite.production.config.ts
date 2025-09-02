import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "assets/favicon-32x32.png",
          dest: "assets",
        },
        {
          src: "assets/robots.txt",
          dest: "",
        },
        {
          src: "assets/sitemap.xml",
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
        manualChunks: {
          // Core React libraries - most cacheable
          'vendor-react': ['react', 'react-dom'],
          // Routing and state management
          'vendor-routing': ['wouter', '@tanstack/react-query'],
          // UI component libraries 
          'vendor-ui': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-dropdown-menu', 
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-select',
            '@radix-ui/react-switch',
            '@radix-ui/react-slider',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-radio-group'
          ],
          // Utility libraries
          'vendor-utils': ['date-fns', 'clsx', 'tailwind-merge', 'js-yaml'],
          // Specialized libraries
          'vendor-charts': ['recharts'],
          'vendor-code': ['@codemirror/state', '@codemirror/view']
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});