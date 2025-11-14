import { faker } from "@faker-js/faker";

describe("Garage - Add Car", () => {
  const carBrand = "BMW";
  const carModel = "X5";
  const carMileage = faker.number.int({ min: 0, max: 999999 });

  beforeEach(() => {
    cy.register();
  });

  it("should add new car", () => {
    cy.addCar(carBrand, carModel, carMileage);
    cy.verifyCarAdded(carBrand, carModel);
  });
});
