import { defineConfig } from "wxt";
import "@wxt-dev/auto-icons";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/auto-icons"],
  autoIcons: {
    baseIconPath: "assets/icon.svg",
  },
  manifestVersion: 3,
  manifest: {
    permissions: ["tabs", "scripting", "downloads"],
    host_permissions: ["<all_urls>"],
    browser_specific_settings: {
      gecko: {
        id: "manaba-download-router@nito008.com",
        data_collection_permissions: {
          required: ["none"],
        },
      },
    },
  },
});
