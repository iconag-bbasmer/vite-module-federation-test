import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { dependencies, peerDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [
      react(),
      federation({
        name: "sbhContainer",
        filename: "remoteEntry.js",
        exposes: {
          "./UserStore": "./src/components/store/UserStore",
        },
        remotes: {
          sbhContainer:
            command === "build" && mode === "bcon"
              ? "/b-con/portal/sbh/assets/remoteEntry"
              : "http://localhost:5001/assets/remoteEntry.js",
        },
        // shared: ["react", "react-dom", "jotai"],
        shared: {
          ...dependencies,
          ...peerDependencies,
          react: {
            requiredVersion: peerDependencies["react"],
          },
          "react-dom": {
            requiredVersion: peerDependencies["react-dom"],
          },
          jotai: {
            requiredVersion: dependencies["jotai"],
          },
        },
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
