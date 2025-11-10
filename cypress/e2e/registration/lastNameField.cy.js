import { faker } from "@faker-js/faker";

describe("Registration form - Last Name field validation", () => {
  beforeEach(() => {
    cy.openRegistrationForm();
  });

  it("should show error when Last Name field is empty", () => {
    cy.get("#signupLastName").focus().blur();
    cy.get("#signupLastName")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Last name required");
    cy.checkBorderColorIsRed("#signupLastName");
  });

  it("should show error for invalid characters in Last Name", () => {
    cy.get("#signupLastName").type("123").blur();
    cy.get("#signupLastName")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Last name is invalid");
    cy.checkBorderColorIsRed("#signupLastName");
  });

  it("should show error when Last Name is less than 2 characters", () => {
    cy.get("#signupLastName").type("A").blur();
    cy.get("#signupLastName")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Last name has to be from 2 to 20 characters long");
    cy.checkBorderColorIsRed("#signupLastName");
  });

  it("should show error when Last Name is more than 20 characters", () => {
    const longName = faker.string.alpha(21);
    cy.get("#signupLastName").type(longName).blur();
    cy.get("#signupLastName")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Last name has to be from 2 to 20 characters long");
    cy.checkBorderColorIsRed("#signupLastName");
  });

  it("should trim spaces at the beginning and end", () => {
    const validLastName = faker.person.lastName();
    const validName = faker.person.firstName();
    const validEmail = `aqa-${faker.internet.email()}`;
    const validPassword = `${faker.string.alpha({
      length: 8,
      casing: "mixed",
    })}1`;

    cy.get("#signupLastName").type(`  ${validLastName}  `);
    cy.get("#signupName").type(validName);
    cy.get("#signupEmail").type(validEmail);
    cy.get("#signupPassword").type(validPassword);
    cy.get("#signupRepeatPassword").type(validPassword);
    cy.get(".modal-footer button").contains("Register").click();

    cy.get("#signupLastName")
      .parent()
      .find(".invalid-feedback")
      .should("not.be.visible");
  });
});
