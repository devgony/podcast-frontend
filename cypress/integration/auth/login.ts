describe("First Test", () => {
  it("should go to homepage", () => {
    cy.visit("http://localhost:3000").title().should("eq", "Login | Podcloud");
    cy.findByPlaceholderText(/email/i).type("host@gmail.com");
  });
});
