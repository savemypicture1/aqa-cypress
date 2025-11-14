/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

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

Cypress.Commands.add("register", () => {
  const userName = faker.person.firstName();
  const userLastName = faker.person.lastName();
  const userEmail = `aqa-${faker.internet.email()}`;
  const userPassword = `${faker.string.alpha({ length: 8, casing: "mixed" })}1`;

  cy.openRegistrationForm();
  cy.get("#signupName").clear().type(userName);
  cy.get("#signupLastName").clear().type(userLastName);
  cy.get("#signupEmail").clear().type(userEmail);
  cy.get("#signupPassword").clear().type(userPassword, { sensitive: true });
  cy.get("#signupRepeatPassword")
    .clear()
    .type(userPassword, { sensitive: true });
  cy.get(".modal-footer .btn-primary").contains("Register").click();
  cy.url().should("include", "/panel/garage");
});

Cypress.Commands.add("addCar", (carBrand, carModel, carMileage) => {
  cy.contains("Add car").click();
  cy.get("#addCarBrand").select(carBrand);
  cy.get("#addCarModel").select(carModel);
  cy.get("#addCarMileage").clear().type(carMileage);
  cy.get(".modal-footer button:nth-of-type(2)").click();
});

Cypress.Commands.add("verifyCarAdded", (brand, model) => {
  cy.contains(brand).should("be.visible");
  cy.contains(model).should("be.visible");
});

Cypress.Commands.add("openFuelExpensesPage", () => {
  cy.contains("Fuel expenses").click();
});

Cypress.Commands.add(
  "addFuelExpense",
  (carExpenseMileage, carExpenseLiters, carExpenseTotalCost) => {
    cy.contains("Add an expense").click();
    cy.get("#addExpenseMileage").clear().type(carExpenseMileage);
    cy.get("#addExpenseLiters").clear().type(carExpenseLiters);
    cy.get("#addExpenseTotalCost").clear().type(carExpenseTotalCost);
    cy.get(".modal-footer button:nth-of-type(2)").click();
  },
);

Cypress.Commands.add("verifyFuelExpenseAdded", (mileage, liters, cost) => {
  cy.get("tbody tr:first td:nth-child(2)").should("contain", mileage);
  cy.get("tbody tr:first td:nth-child(3)").should("contain", `${liters}L`);
  cy.get("tbody tr:first td:nth-child(4)").should(
    "contain",
    `${cost.toFixed(2)} USD`,
  );
  cy.get("tbody tr:first td:nth-child(5)").within(() => {
    cy.get(".btn-delete").should("be.visible");
    cy.get(".btn-edit").should("be.visible");
  });
});
