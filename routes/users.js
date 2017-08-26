let express = require('express');
let router = express.Router();

const User = require('../models/userModel');

router.post('/newuser', function(req, res, next) {
    let newUser = new User({
        name: req.body.name,
        money: 1000000,
        ownedProperties: [],
        location: 0

    });

    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg: "Failed to register user " +err})
        }
        if (user) {
            res.json({success: true, msg: 'Registered user', user: user})
        }
        else {
            res.json({success: true, msg: "Registered user"})
    }
})
});

router.get('/allprofiles', function (req, res, next) {

    User.getAllUsers((err, user) => {
        if (err) {
            res.json({success: false, msg: "Error retrieving user " + err})
        }
        else {
            res.json({success: false, msg: 'Failed to retrieve user'})
        }
    })

});

router.post('/profile', function (req, res, next) {

    let userID = req.body.userID;

    User.getUserById(userID, (err, user) => {
        if (err) {
            res.json({success: false, msg: "Error retrieving user. " + err})
        }
        if (user) {
            res.json({user: user})
        }
        else {
            res.json({success: false, msg: 'Failed to retrieve user'})
        }
    })

});

router.post('/update/purchase', function (req, res, next) {
    let money = req.body.money;
    let userID = req.body._id;
    let locName = req.body.locationName;

    User.purchaseUpdate(userID, money, locName, (err, user) =>{
        if (err) {
            res.json({success: false, msg: "Error Updating Player " + err});
        }
        if (user) {
            res.json({success: true, msg: 'Updated Player', user: user});
        }
        else {
            res.json({success: false, msg: "Failed to update location"});
        }
    });
});


router.post('/clear', (req, res, next) =>{
    User.deleteAll((err) =>{
        if(err){
            res.json({success: false, msg: "Error deleting users"})
        }
        else {
            res.json({success: true, msg: "Cleared Users"})
        }
    });
});
module.exports = router;
