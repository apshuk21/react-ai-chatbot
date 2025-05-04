import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      outDir: "dist/types",
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true
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
