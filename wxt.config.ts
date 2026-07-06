import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 3,
  manifest: {
    permissions: ['tabs', 'scripting'],
    host_permissions: ['<all_urls>'],
    browser_specific_settings: {
      gecko: {
        id: 'manaba-download-router-firefox@nito-008.github.com',
        data_collection_permissions: {
          required: ['none'],
        },
      },
    },
  },
});
