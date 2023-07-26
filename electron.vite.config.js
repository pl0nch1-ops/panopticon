// electron.vite.config.js
import react from "@vitejs/plugin-react";
import {defineConfig, externalizeDepsPlugin} from "electron-vite";

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        // vite config options
    }
})