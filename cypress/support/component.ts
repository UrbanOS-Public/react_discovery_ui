// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Component testing mount is not configured because this project uses React 16,
// which is incompatible with the cypress/react mount helper bundled in Cypress 13+
// (which requires react-dom/client from React 18).
// If component testing is needed, upgrade to React 18 first.