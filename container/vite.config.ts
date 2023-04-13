import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [
      react(),
      federation({
        name: "sbhContainer",
        filename: "remoteEntry_container.js",
        exposes: {
          "./UserStore": "./src/components/store/UserStore",
        },
        remotes: {
          sbhUser:
            command === "build" && mode === "bcon"
              ? "/b-con/portal/sbh/assets/remoteEntry"
              : "http://localhost:4173/assets/remoteEntry_user.js",
          sbhApp1:
            command === "build" && mode === "bcon"
              ? "/b-con/portal/sbh/assets/remoteEntry_vapp1.js"
              : "http://localhost:4174/assets/remoteEntry.js",
          sbhApp2:
            command === "build" && mode === "bcon"
              ? "/b-con/portal/sbh/assets/remoteEntry_vapp2.js"
              : "http://localhost:4175/assets/remoteEntry.js",
        },
        shared: ["react", "react-dom", "jotai"],
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
