describe("Search field is present, accepts value and filteres track list by the input value", () => {
  beforeEach(() => {
    cy.visit("https://vite-react-alpha-lemon.vercel.app/");
    cy.get('input[type="text"]').as("searchField");
  });

  it("Search field to be present, enabled and clickable", () => {
    cy.get("@searchField").should("be.visible").and("not.be.disabled").click();
  });

  it("Search field accepts values", () => {
    cy.get("@searchField").type("test").should("have.value", "test");
  });

  it("Track list filtered by searched value", () => {
    cy.get("@searchField").type("autumn");

    cy.get("#tracklist .MuiGrid-container")
      .should("exist")
      .and("have.length.gte", 1)
      .each((item) => {
        cy.wrap(item)
          .find(".MuiGrid-item.MuiGrid-grid-xs-4 p")
          .invoke("text")
          .then((text) => expect(text.toLowerCase()).to.contain("autumn"));
      });
  });
});
