import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      outDir: "dist",
    },
    base: "/",
    plugins: [react()],
  };
});
