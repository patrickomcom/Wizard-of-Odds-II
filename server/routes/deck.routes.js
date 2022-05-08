const deckController = require("../controllers/deck.controller");

module.exports = (app) => {
    app.post("/api/deck", deckController.createDeck);
    app.get("/api/deck", deckController.getAllDecks);
    app.get("/api/deck/:id", deckController.getOneDeck);
    app.put("/api/deck/:id", deckController.updateDeck);
    app.delete("/api/deck/:id", deckController.deleteDeck);
};