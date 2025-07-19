const { getRandomNumber } = require("./utils.js");

describe("Search field is present, accepts value and filteres track list by the input value", () => {
  beforeEach(() => {
    cy.visit("https://vite-react-alpha-lemon.vercel.app/");

    cy.get("#tracklist .MuiGrid-container > button").then(($buttons) => {
      let numberOfTracks = getRandomNumber($buttons.length);
      for (let i = 0; i < numberOfTracks; i++) {
        cy.wrap($buttons[i]).click();
      }
    });
  });

  it("The duration is displayed in seconds", () => {
    cy.get("#playlist-duration")
      .invoke("text")
      .then((text) => expect(text.trim()).to.match(/^\d{3,}$/)); // String is expected to have only numbers and at least 3
  });

  it("The total duration of all tracks from 'Your playlist' is calculated correctly", () => {
    cy.get("#playlist > div")
      .should("exist")
      .children()
      .find(".MuiGrid-item.MuiGrid-grid-xs-2 p")
      .then(($items) => {
        let totalSeconds = 0;
        $items.each((index, item) => {
          const [minutes, seconds] = item.innerText
            .trim()
            .split(":")
            .map(Number);
          totalSeconds += minutes * 60 + seconds;
        });
        cy.get("#playlist-duration")
          .invoke("text")
          .then((duration) => {
            const durationInt = parseInt(duration, 10);
            expect(totalSeconds).to.equal(durationInt);
          });
      });
  });
});
