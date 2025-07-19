const { getRandomNumber } = require("./utils.js");

describe("'+' button is functional and adds a single track to the 'Your Playlist' list", () => {
  beforeEach(() => {
    cy.visit("https://vite-react-alpha-lemon.vercel.app/");
    cy.get("#tracklist .MuiGrid-container").then(($containers) => {
      const randomIndex = getRandomNumber($containers.length);
      const randomContainer = $containers[randomIndex]
      cy.wrap(randomContainer).as("randomContainer");
    });

      cy.get("@randomContainer").find("button").as("randomButton");
      cy.get("@randomContainer")
        .find(".MuiGrid-item.MuiGrid-grid-xs-4 p")
        .invoke("text")
        .as("randomTrackName");
    });
  
 

  it("Button is clickable", () => {
    cy.get("@randomButton").click();
  });

  it("Buttons '+' adds a track to the 'Your Playlist' list", () => {
    cy.get("@randomButton").click();
    cy.get("#playlist > div")
      .should("exist")
      .children()
      .should("have.length", 2)
      .eq(1)
      .find(".MuiGrid-item.MuiGrid-grid-xs-4 p")
      .invoke("text")
      .then((text) => {
        cy.get("@randomTrackName").then((randomName) => {
          expect(text).to.equal(randomName);
        });
      });
  });
});
