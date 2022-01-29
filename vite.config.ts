import svgr from "@honkhonk/vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import path from "path";

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
  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, "src/models"),
  //     name: "models",
  //     fileName: (format) => `cctimer-models.${format}.js`,
  //   },
  //   rollupOptions: {
  //     // make sure to externalize deps that shouldn't be bundled
  //     // into your library
  //     external: ["cctimer-scrambles"],
  //     output: {
  //       // Provide global variables to use in the UMD build
  //       // for externalized deps
  //       globals: {
  //         "cctimer-scrambles": "cctimer-scrambles",
  //       },
  //     },
  //   },
  // },
});
