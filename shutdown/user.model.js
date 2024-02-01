const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
}, { timestamps: true });

const user = mongoose.model('user', userSchema);
module.exports = user;
