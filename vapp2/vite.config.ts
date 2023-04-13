import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [
      react(),
      federation({
        name: "sbhApp2",
        filename: "remoteEntry_vapp2.js",
        remotes: {
          sbhContainer:
            command === "build" && mode === "bcon"
              ? "/b-con/portal/sbh/assets/remoteEntry_container.js"
              : "http://localhost:5001/assets/remoteEntry.js",
        },
        exposes: {
          "./AppHeader": "./src/components/AppHeader",
        },
        shared: ["react", "react-dom"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});
