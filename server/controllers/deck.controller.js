const Deck = require("../models/deck.model");

const createDeck = (req, res) => {
    Deck.create(req.body)
        .then((newDeck) => {
            res.json({ newDeck });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const getAllDecks = (req, res) => {
    Deck.find()
        .then((allDecks) => {
            res.json(allDecks);
        })
        .catch((err) => {
        res.status(400).json({ err });
        });
};

const getOneDeck = (req, res) => {
    Deck.findOne({ _id: req.params.id })
        .then((oneDeck) => {
            res.json(oneDeck);
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const updateDeck = (req, res) => {
    Deck.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedDeck) => {
            res.json({ updatedDeck });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const deleteDeck = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
        .then((deletedDeck) => {
            res.json({ deletedDeck });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

module.exports = {
    createDeck,
    getOneDeck,
    getAllDecks,
    updateDeck,
    deleteDeck,
};