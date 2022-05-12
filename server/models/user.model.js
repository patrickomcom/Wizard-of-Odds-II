const mongoose = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Must have a name entered!"],
        minLength: [3, "Name must be at least 3 characters long!"]
    },
    email:{
        type:String,
        required: [true, "Email is required."],
        validate: [isEmail, "Please enter valid email"]
    },
    password:{
        type:String,
        required: [true, "Password is required."],
        minLength: [8, "Passwords must be at least 8 characters."]
    }
}, {timestamps:true});



const User = mongoose.model("User", UserSchema);

module.exports = User;