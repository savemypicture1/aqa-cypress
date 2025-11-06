describe("Footer", () => {
  const socialLinks = {
    facebook: "https://www.facebook.com/Hillel.IT.School",
    telegram: "https://t.me/ithillel_kyiv",
    youtube: "https://www.youtube.com/user/HillelITSchool?sub_confirmation=1",
    instagram: "https://www.instagram.com/hillel_itschool/",
    linkedin: "https://www.linkedin.com/school/ithillel/",
  };

  const companyLinks = {
    website: "https://ithillel.ua",
    email: "mailto:developer@ithillel.ua",
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("'Facebook' should be visible", () => {
    cy.get(".contacts_socials a:nth-of-type(1)")
      .should("be.visible")
      .should("have.attr", "href", socialLinks.facebook)
      .should("have.attr", "target", "_blank");
  });

  it("'Telegram' should be visible", () => {
    cy.get(".contacts_socials a:nth-of-type(2)")
      .should("be.visible")
      .should("have.attr", "href", socialLinks.telegram)
      .should("have.attr", "target", "_blank");
  });

  it("'Youtube' should be visible", () => {
    cy.get(".contacts_socials a:nth-of-type(3)")
      .should("be.visible")
      .should("have.attr", "href", socialLinks.youtube)
      .should("have.attr", "target", "_blank");
  });

  it("'Instagram' should be visible", () => {
    cy.get(".contacts_socials a:nth-of-type(4)")
      .should("be.visible")
      .should("have.attr", "href", socialLinks.instagram)
      .should("have.attr", "target", "_blank");
  });

  it("'Linkedin' should be visible", () => {
    cy.get(".contacts_socials a:nth-of-type(5)")
      .should("be.visible")
      .should("have.attr", "href", socialLinks.linkedin)
      .should("have.attr", "target", "_blank");
  });

  it("'Hillel' company link should be visible", () => {
    cy.get(".contacts_link.display-4")
      .should("be.visible")
      .should("have.attr", "href", companyLinks.website)
      .should("have.attr", "target", "_blank");
  });

  it("company email should be visible", () => {
    cy.get(".contacts_link.h4")
      .should("be.visible")
      .should("have.attr", "href", companyLinks.email);
  });
});
