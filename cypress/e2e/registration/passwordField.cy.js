import { faker } from "@faker-js/faker";

describe("Registration form - Password field validation", () => {
  const errorMessage =
    "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

  beforeEach(() => {
    cy.openRegistrationForm();
  });

  it("should show error when Password field is empty", () => {
    cy.get("#signupPassword").focus().blur();
    cy.get("#signupPassword")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Password required");
    cy.checkBorderColorIsRed("#signupPassword");
  });

  it("should show error when password is less than 8 characters", () => {
    const shortPassword = faker.string.alpha({ length: 5, casing: "mixed" });
    cy.get("#signupPassword").type(shortPassword, { sensitive: true }).blur();
    cy.get("#signupPassword")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", errorMessage);
    cy.checkBorderColorIsRed("#signupPassword");
  });

  it("should show error when password is more than 15 characters", () => {
    const longPassword = `${faker.string.alpha({
      length: 16,
      casing: "mixed",
    })}1`;
    cy.get("#signupPassword").type(longPassword, { sensitive: true }).blur();
    cy.get("#signupPassword")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", errorMessage);
    cy.checkBorderColorIsRed("#signupPassword");
  });

  it("should show error when password has no integer", () => {
    const noIntPassword = faker.string.alpha({ length: 8, casing: "mixed" });
    cy.get("#signupPassword").type(noIntPassword, { sensitive: true }).blur();
    cy.get("#signupPassword")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", errorMessage);
    cy.checkBorderColorIsRed("#signupPassword");
  });

  it("should show error when password has no capital letter", () => {
    const noCapitalPassword = `${faker.string.alpha({
      length: 7,
      casing: "lower",
    })}1`;
    cy.get("#signupPassword")
      .type(noCapitalPassword, { sensitive: true })
      .blur();
    cy.get("#signupPassword")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", errorMessage);
    cy.checkBorderColorIsRed("#signupPassword");
  });

  it("should show error when password has no small letter", () => {
    const noSmallPassword = `${faker.string.alpha({
      length: 7,
      casing: "upper",
    })}1`;
    cy.get("#signupPassword").type(noSmallPassword, { sensitive: true }).blur();
    cy.get("#signupPassword")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", errorMessage);
    cy.checkBorderColorIsRed("#signupPassword");
  });
});
