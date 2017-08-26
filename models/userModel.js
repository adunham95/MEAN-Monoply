const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    money: {
        type: Number
    },
    ownedProperties: {
        type: Array
    },
    location: {
        type: Number
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getAllUsers = function (callback) {
    User.find(callback)
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    newUser.save(callback)
};

module.exports.purchaseUpdate = function (id, money, locName, callback) {
  User.where({_id: id}).update({money: money, ownedProperties: locName}, callback);
};

module.exports.deleteAll = function (callback) {
    let query = User.find();
    User.deleteMany(query.$all, callback)
};