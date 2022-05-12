const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
    //userId: {
    //    type:String
    //},
    name:{
        type:String,
        required: [true, "Deck must have a name entered."]
    },

    colors:{
        type:String,
        possibleValues: ["U", "R", "G", "W", "B"],
    },
    wins:{
        type:Number
    },
    losses: {
        type:Number
    }
},{timestamps:true})

const Deck = mongoose.model("Deck", DeckSchema);

module.exports = Deck;