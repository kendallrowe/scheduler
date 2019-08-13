import { checkPropTypes } from "prop-types";

describe("Appointments", () => {
  // Load page and confirm rendered waiting for "Monday"
  it("should book an interview", () => {
    cy.visit("/");
    cy.containers("[data-testid=day]", "Monday");

    // Clicks on the "Add" button in second appointment
  });

  // it("should navigate to Tuesday", () => {
  //   cy.visit("/");
  //   cy.contains("[data-testid=day]", "Tuesday").click()
  //   .should('have.class', "day-list__item--selected");


  // });
});