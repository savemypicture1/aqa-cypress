import { faker } from "@faker-js/faker";

describe("Expenses - Add Fuel", () => {
  const carBrand = "Porsche";
  const carModel = "911";
  const carMileage = faker.number.int({ min: 0, max: 999900 });
  const carExpenseMileage = carMileage + 99;
  const carExpenseLiters = faker.number.float({
    min: 0.01,
    max: 9999,
    precision: 0.01,
  });
  const carExpenseTotalCost = faker.number.float({
    min: 0.01,
    max: 1000000,
    precision: 0.01,
  });

  beforeEach(() => {
    cy.register();
    cy.addCar(carBrand, carModel, carMileage);
    cy.openFuelExpensesPage();
  });

  it("should add fuel expense", () => {
    cy.addFuelExpense(carExpenseMileage, carExpenseLiters, carExpenseTotalCost);
    cy.verifyFuelExpenseAdded(
      carExpenseMileage,
      carExpenseLiters,
      carExpenseTotalCost,
    );
  });
});
