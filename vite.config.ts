import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { readFileSync } from "fs";
// import postcss from "rollup-plugin-postcss";
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// Read package.json to get peer dependencies
const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
const peerDeps = Object.keys(pkg.peerDependencies || {});

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      outDir: "dist/types",
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json",
      rollupTypes: true,
    }),
    libInjectCss(),
  ],
  build: {
    lib: {
      // Use the index.ts file as entry point
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactSmartChatbot",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // Make sure to externalize all dependencies and peer dependencies
      external: [...peerDeps, "react/jsx-runtime"],
      output: {
        // Global variables for UMD build (if needed in the future)
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        exports: "named",
        assetFileNames: "[name][extname]",
      },
    },
    commonjsOptions: {
      // Ensure CommonJS interoperability
      transformMixedEsModules: true,
    },
    sourcemap: true,
    // This ensures we don't delete type definitions when building
    emptyOutDir: false,
  },
  resolve: {
    dedupe: [...peerDeps],
  },
});
