import { defineConfig } from "cypress";

export default defineConfig({
  video: false,

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:9001",
  },

  // Component testing is disabled: this project uses React 16, which is
  // incompatible with the cypress/react mount helper in Cypress 13+
  // (requires react-dom/client from React 18).
  // Re-enable after upgrading to React 18.
});
