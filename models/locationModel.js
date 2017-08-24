const mongoose = require('mongoose');
const config = require('../config/database');

//Accessories Schema
const AccessoriesSchema = mongoose.Schema({
    houses: Number
});

const ActionsSchema = mongoose.Schema({
    type: String,
    money: Number,
    message: String
});

// Location Schema
const LocationSchema = mongoose.Schema({
    _id: Number,
    type: String,
    name: String,
    group: String,
    color: String,
    cost: Number,
    rent: [],
    mortgage: Number,
    accessories: [AccessoriesSchema],
    owned: Boolean,
    ownedBy: String,
    locationOnBoard: Number,
    buildings: Number,
    actions: [ActionsSchema]
});

const Location = module.exports = mongoose.model('Location', LocationSchema);

module.exports.getLocationById = function (id, callback) {
    Location.findById(id, callback);
};

module.exports.addLocation = function (location, callback) {
    Location.create(location, callback)
};

module.exports.getAllLocations= function (callback) {
    Location.find(callback);
};

module.exports.deleteAll = function (callback) {
    let query = Location.find();
    Location.deleteMany(query.$all, callback)
};
