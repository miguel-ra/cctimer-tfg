import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import path from "path";

import svgr from "./internals/vite/plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    outDir: path.resolve(__dirname, "build"),
  },
});
