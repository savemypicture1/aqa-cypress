/// <reference types="cypress" />

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  return originalFn(url, {
    ...options,
    auth: {
      username: "guest",
      password: "welcome2qauto",
    },
  });
});

Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false;
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});

Cypress.Commands.add("openRegistrationForm", () => {
  cy.visit("/");
  cy.get(".hero-descriptor button").click();
});

Cypress.Commands.add("checkBorderColorIsRed", (locator) => {
  cy.get(locator).should("have.css", "border-color", "rgb(220, 53, 69)");
});

Cypress.Commands.add("logout", () => {
  cy.get("#userNavDropdown").click();
  cy.get(".dropdown-menu button").click();
});

Cypress.Commands.add("login", (email, password) => {
  cy.get(".header_right button:nth-of-type(2)").click();
  cy.get("#signinEmail").type(email);
  cy.get("#signinPassword").type(password, { sensitive: true });
  cy.get(".modal-footer .btn-primary").contains("Login").click();
});
