import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": "https://zwitter-backend.vercel.app",
  //   },
  // },
  // proxy not working
  plugins: [react()],
});
