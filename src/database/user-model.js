const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    password: String
});

userSchema.methods.validPassword = (password) => {
    return password === this.password;
}

module.exports = mongoose.model("users", userSchema);