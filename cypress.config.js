const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 2560,
    viewportHeight: 1440,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
