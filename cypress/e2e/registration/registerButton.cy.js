import { faker } from "@faker-js/faker";

describe("Registration form - Register button", () => {
  const generateValidPassword = () => {
    return `${faker.string.alpha({ length: 8, casing: "mixed" })}1`;
  };

  beforeEach(() => {
    cy.openRegistrationForm();
  });

  it("should be disabled when form has invalid data", () => {
    const validName = faker.person.firstName();
    const validLastName = faker.person.lastName();
    const invalidEmail = "invalid-email";
    const validPassword = generateValidPassword();

    cy.get("#signupName").type(validName);
    cy.get("#signupLastName").type(validLastName);
    cy.get("#signupEmail").type(invalidEmail);
    cy.get("#signupPassword").type(validPassword, { sensitive: true });
    cy.get("#signupRepeatPassword").type(validPassword, { sensitive: true });

    cy.get(".modal-footer button").contains("Register").should("be.disabled");
  });

  it("should be enabled when all fields are valid", () => {
    const validName = faker.person.firstName();
    const validLastName = faker.person.lastName();
    const validEmail = `aqa-${faker.internet.email()}`;
    const validPassword = generateValidPassword();

    cy.get("#signupName").type(validName);
    cy.get("#signupLastName").type(validLastName);
    cy.get("#signupEmail").type(validEmail);
    cy.get("#signupPassword").type(validPassword, { sensitive: true });
    cy.get("#signupRepeatPassword").type(validPassword, { sensitive: true });

    cy.get(".modal-footer button")
      .contains("Register")
      .should("not.be.disabled");
  });

  it("should create new user when clicked with valid data", () => {
    const validName = faker.person.firstName();
    const validLastName = faker.person.lastName();
    const validEmail = `aqa-${faker.internet.email()}`;
    const validPassword = generateValidPassword();

    cy.get("#signupName").type(validName);
    cy.get("#signupLastName").type(validLastName);
    cy.get("#signupEmail").type(validEmail);
    cy.get("#signupPassword").type(validPassword, { sensitive: true });
    cy.get("#signupRepeatPassword").type(validPassword, { sensitive: true });
    cy.get(".modal-footer button").contains("Register").click();

    cy.url().should("include", "/panel/garage");

    cy.logout();
    cy.login(validEmail, validPassword);

    cy.url().should("include", "/panel/garage");
  });
});
