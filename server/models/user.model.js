const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Must have a name entered!"],
        minLength: [3, "Name must be at least 3 characters long!"]
    },
    email:{
        type:String,
        required: [true, "Email is required."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password:{
        type:String,
        required: [true, "Password is required."],
        minLength: [8, "Passwords must be at least 8 characters."]
    }
}, {timestamps:true});

UserSchema.virtual('confirmPassword')
    .get(()=>this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match.')
    }
    next();
})


const User = mongoose.model("User", UserSchema);

module.exports = User;