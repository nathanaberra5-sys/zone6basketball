import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps asset URLs relative so the same build works on the
// GitHub Pages project URL and on zone6basketball.com.au.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
