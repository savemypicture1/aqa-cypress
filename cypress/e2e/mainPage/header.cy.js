describe("Header navigation menu", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("logo should be visible", () => {
    cy.get(".header_logo")
      .should("be.visible")
      .should("have.attr", "href", "/");
  });

  it("nav link 'Home' should be visible", () => {
    cy.get(".header_nav a")
      .should("be.visible")
      .should("have.attr", "href", "/");
  });

  it("nav link 'About' should be visible", () => {
    cy.get(".header_nav button:nth-of-type(1)").should("be.visible");
  });

  it("nav link 'Contacts' should be visible", () => {
    cy.get(".header_nav button:nth-of-type(2)").should("be.visible");
  });

  it("'Guest log in' button should be visible", () => {
    cy.get(".header_right button:nth-of-type(1)")
      .should("be.visible")
      .should("not.be.disabled");
  });

  it("'Sign in' button should be visible", () => {
    cy.get(".header_right button:nth-of-type(2)")
      .should("be.visible")
      .should("not.be.disabled");
  });
});
