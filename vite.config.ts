import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: "dist/types",
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/components/Chatbot.tsx",
      name: "Chatbot",
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
});
