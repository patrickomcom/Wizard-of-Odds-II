const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Must have a name entered!"],
        minLength: [3, "Name must be at least 3 characters long!"]
    }
})