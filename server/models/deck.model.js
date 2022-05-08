const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Deck must have a name entered."]
    },

    colors:{
        type:String,
        possibleValues: ["U", "R", "G", "W", "B"],
        required: [true, "Deck must have at least one color."]
    },
},{timestamps:true})

const Deck = mongoose.model("Deck", DeckSchema);

module.exports = Deck;