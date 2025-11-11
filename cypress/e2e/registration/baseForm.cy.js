describe("Registration form - Base UI", () => {
  beforeEach(() => {
    cy.openRegistrationForm();
  });

  it("should display registration form with all required fields", () => {
    cy.get(".modal-title").should("contain", "Registration");

    cy.get(".close").should("be.visible");
    cy.get("#signupName").should("be.visible");
    cy.get("#signupLastName").should("be.visible");
    cy.get("#signupEmail").should("be.visible");
    cy.get("#signupPassword").should("be.visible");
    cy.get("#signupRepeatPassword").should("be.visible");
    cy.get(".modal-footer button").contains("Register").should("be.visible");
  });
});
