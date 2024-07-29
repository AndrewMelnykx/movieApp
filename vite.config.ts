import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@data": path.resolve(__dirname, "src/data"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@modals": path.resolve(__dirname, "src/components/modals"),
      "@header": path.resolve(__dirname, "src/components/header"),
      "@filter": path.resolve(__dirname, "src/components/filter"),
      "@reducer": path.resolve(__dirname, "src/components/reducer"),
      "@cards": path.resolve(__dirname, "src/cards"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@selectors": path.resolve(__dirname, "src/components/selectors"),
      "@redux": path.resolve(__dirname, "src/components/redux"),
      "@stateSelectors": path.resolve(__dirname, "src/components/redux/selectors"),
      "@slices": path.resolve(__dirname, "src/components/redux/slices"),
    },
  },
});
