import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { peerDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [
      react(),
      federation({
        name: "sbhApp2",
        filename: "remoteEntry.js",
        shared: ["react", "react-dom"],
        remotes: {
          sbhContainer:
            command === "build" && mode === "bcon"
              ? "/b-con/portal/sbh/assets/remoteEntry.js"
              : "http://localhost:5001/assets/remoteEntry.js",
        },
        exposes: {
          "./AppHeader": "./src/components/AppHeader",
        },
        // shared: {
        //   ...peerDependencies,
        //   react: {
        //     requiredVersion: peerDependencies["react"],
        //     generate: false,
        //   },
        //   "react-dom": {
        //     requiredVersion: peerDependencies["react-dom"],
        //     generate: false,
        //   },
        // },
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
