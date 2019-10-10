describe("My First Test", function() {
  it("Loads Base State", function() {
    cy.visit("/");
    cy.contains("guesses left").should("have.text", "10 guesses left");
    cy.get(".peg").should("have.length", 4);
  });

  it("Should lose", function() {
    cy.visit("/");
    cy.get("button").as("guess");
    for (let i = 9; i >= 0; i--) {
      cy.get("@guess").click();
      cy.contains("guesses left").should("have.text", `${i} guesses left`);
    }

    cy.contains("Losses:")
      .find("span")
      .should("have.text", "1");

    cy.contains("guesses");
  });

  it("Should make a guess", () => {
    cy.get("select")
      .first()
      .select("Blue");
    cy.get("select")
      .last()
      .select("Green");
    cy.get("button").click();
    cy.contains("guesses left").should("have.text", "9 guesses left");
  });
});
