import { faker } from "@faker-js/faker";

describe("Registration form - Re-enter Password field validation", () => {
  const generateValidPassword = () => {
    return `${faker.string.alpha({ length: 8, casing: "mixed" })}1`;
  };

  beforeEach(() => {
    cy.openRegistrationForm();
  });

  it("should show error when Re-enter Password field is empty", () => {
    cy.get("#signupRepeatPassword").focus().blur();
    cy.get("#signupRepeatPassword")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Re-enter password required");
    cy.checkBorderColorIsRed("#signupRepeatPassword");
  });

  it("should show error when passwords do not match", () => {
    const password = generateValidPassword();
    const repeatPassword = generateValidPassword();

    cy.get("#signupPassword").type(password, { sensitive: true }).blur();
    cy.get("#signupRepeatPassword")
      .type(repeatPassword, { sensitive: true })
      .blur();
    cy.get("#signupRepeatPassword")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Passwords do not match");
    cy.checkBorderColorIsRed("#signupRepeatPassword");
  });

  it("should accept matching passwords", () => {
    const validPassword = generateValidPassword();

    cy.get("#signupPassword").type(validPassword, { sensitive: true }).blur();
    cy.get("#signupRepeatPassword")
      .type(validPassword, { sensitive: true })
      .blur();

    cy.get("#signupRepeatPassword").should("have.class", "ng-valid");
  });
});
