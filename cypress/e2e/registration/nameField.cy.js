import { faker } from "@faker-js/faker";

describe("Registration form - Name field validation", () => {
  beforeEach(() => {
    cy.openRegistrationForm();
  });

  it("should show error when Name field is empty", () => {
    cy.get("#signupName").focus().blur();
    cy.get("#signupName")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Name required");
    cy.checkBorderColorIsRed("#signupName");
  });

  it("should show error for invalid characters in Name", () => {
    cy.get("#signupName").type("123").blur();
    cy.get("#signupName")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Name is invalid");
    cy.checkBorderColorIsRed("#signupName");
  });

  it("should show error when Name is less than 2 characters", () => {
    cy.get("#signupName").type("A").blur();
    cy.get("#signupName")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Name has to be from 2 to 20 characters long");
    cy.checkBorderColorIsRed("#signupName");
  });

  it("should show error when Name is more than 20 characters", () => {
    const longName = faker.string.alpha(21);
    cy.get("#signupName").type(longName).blur();
    cy.get("#signupName")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Name has to be from 2 to 20 characters long");
    cy.checkBorderColorIsRed("#signupName");
  });

  it("should trim spaces at the beginning and end", () => {
    const validName = faker.person.firstName();
    const validLastName = faker.person.lastName();
    const validEmail = `aqa-${faker.internet.email()}`;
    const validPassword = `${faker.string.alpha({
      length: 8,
      casing: "mixed",
    })}1`;

    cy.get("#signupName").type(`  ${validName}  `).blur();
    cy.get("#signupLastName").type(validLastName);
    cy.get("#signupEmail").type(validEmail);
    cy.get("#signupPassword").type(validPassword);
    cy.get("#signupRepeatPassword").type(validPassword);
    cy.get(".modal-footer button").contains("Register").click();

    cy.get("#signupName")
      .parent()
      .find(".invalid-feedback")
      .should("not.be.visible");
  });
});
