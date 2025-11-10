describe("Registration form - Email field validation", () => {
  const wrongEmails = [
    "hasd123",
    "user@",
    "@domain.com",
    "user@domain",
    "user@@domain.com",
    "user@domain..com",
    "userdomain.com",
    "user@.com",
    "username@.com.com",
    "username@%*.com",
    ".username@domain.com",
    "username.@domain.com",
    "user@domain,com",
    "username@domain.com (Joe Smith)",
    "user@domain@domain.com",
    "user@-domain.com",
    "user@domain-.com",
    "user@.subdomain.com",
    "user@domain.com.",
    "user@domain.123",
    " user@domain.com",
    "user@domain.com ",
    "user@ domain.com",
    "user\t@domain.com",
    "user@domain.",
    "user@domain name.com",
    "user@a",
    "user@ab",
  ];

  beforeEach(() => {
    cy.openRegistrationForm();
  });

  it("should show error when Email field is empty", () => {
    cy.get("#signupEmail").focus().blur();
    cy.get("#signupEmail")
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Email required");
    cy.checkBorderColorIsRed("#signupEmail");
  });

  it("should show error for all incorrect email formats", () => {
    wrongEmails.forEach((email) => {
      cy.get("#signupEmail").clear().type(email).blur();
      cy.get("#signupEmail")
        .parent()
        .find(".invalid-feedback")
        .should("be.visible")
        .and("contain", "Email is incorrect");
      cy.get("#signupEmail").should("have.class", "is-invalid");
      cy.checkBorderColorIsRed("#signupEmail");
    });
  });
});
