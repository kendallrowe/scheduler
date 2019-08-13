describe("Appointments", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3001/api/debug/reset")

    // Load page and confirm rendered waiting for "Monday" 
    cy.visit("/");

    cy.contains("[data-testid=day]", "Monday");
   });

  it("should book an interview", () => {
    // Clicks on the "Add" button in second appointment
    cy.get("[alt='Add']")
    .first()
    .click()
  
    // After click, enter name into input field
    cy.get("[data-testid=student-name-input").type("Lydia Miller-Jones");

    // Choose an interviewer
    cy.get("[alt='Sylvia Palmer']")
    .click()

    // Click the save button
    cy.contains("Save")
    .click()

    // Confirm booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Clicks on the "Edit" button in first appointment
    cy.get("[alt='Edit']")
    .first()
    .click({ force: true })
    
    // After click, enter name into input field
    cy.get("[data-testid=student-name-input")
    .clear()
    .type("Kendall Rowe");

    // // Choose an interviewer
    cy.get("[alt='Tori Malcolm']")
    .click()

    // // Click the save button
    cy.contains("Save")
    .click()

    // // Confirm booked appointment
    cy.contains(".appointment__card--show", "Kendall Rowe");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Clicks on the "Delete" button in first appointment
    cy.get("[alt='Delete']")
    .first()
    .click({ force: true })

    // // Click the confirm button
    cy.contains(".button--danger", "Confirm")
    .click()

    // // Confirm deleting appointment
    cy.contains("DELETING").should("exist");

    // Confirm deleting appointment goes away
    cy.contains("DELETING").should("not.exist");


    // Confirm appointment has been removed
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});