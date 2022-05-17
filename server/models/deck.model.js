const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Deck must have a name entered."]
    },

    colors:{
        type:String,
        required: [true, "Color field must be filled. Please read instructions below."]
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