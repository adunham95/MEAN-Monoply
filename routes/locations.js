const express = require('express');
const router = express.Router();
const Location = require('../models/locationModel');
const config = require('../config/database');

// Add properties
router.post('/savelocation', (req, res, next) => {

    let locations =  [
        {
            _id: 1,
            type: 'action',
            name: "Go",
            group: 'None',
            color: "#FFFFFF",
            actions: {
                type: 'money',
                money: 200,
                message: "Pay Day! Paycheck: $200"
            }
        },
        {
            _id: 2,
            type: 'property',
            name: "Mediterranean Avenue",
            group: 'Purple',
            color: "#EE82EE",
            cost: 60,
            rent: [ 2, 10, 30, 90, 160, 250 ],
            mortgage: 30,
            accessories: [
                {houses: 50}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 1,
            buildings: 0
        },
        {
            _id: 3,
            type: 'property',
            name: "Baltic Avenue",
            group: 'Purple',
            color: "#EE82EE",
            cost: 60,
            rent: [ 4, 20, 60, 180, 320, 450 ],
            mortgage: 30,
            accessories: [
                {houses: 50}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 2,
            buildings: 0
        },
        {
            _id: 4,
            type: 'property',
            name: "Oriental Avenue",
            group: 'Light Blue',
            color: "#80CCFF",
            cost: 100,
            rent: [ 6, 30, 90, 270, 400, 550 ],
            mortgage: 50,
            accessories: [
                {houses: 50}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 3,
            buildings: 0
        },
        {
            _id: 5,
            type: 'property',
            name: "Vermont Avenue",
            group: 'Light Blue',
            color: "#80CCFF",
            cost: 100,
            rent: [ 6, 30, 90, 270, 400, 550 ],
            mortgage: 50,
            accessories: [
                {houses: 50}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 4,
            buildings: 0
        },
        {
            _id: 6,
            type: 'property',
            name: "Connecticut Avenue",
            group: 'Light Blue',
            color: "#80CCFF",
            cost: 120,
            rent: [ 8, 40, 100, 300, 450, 600 ],
            mortgage: 60,
            accessories: [
                {houses: 50}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 5,
            buildings: 0
        },
        {
            _id: 7,
            type: 'property',
            name: "St. Charles Place",
            group: 'Pink',
            color: "#FF69B4",
            cost: 140,
            rent: [ 10,50,150,450,625,750 ],
            mortgage: 70,
            accessories: [
                {houses: 100}
            ],
            owned: true,
            ownedBy: "steve",
            locationOnBoard: 6,
            buildings: 2
        },
        {
            _id: 8,
            type: 'action',
            name: "Go To Jail",
            group: 'None',
            color: "#FFFFFF",
            actions: {
                type: 'goToJail',
                message: "Go to Jail"
            }
        },
        {
            _id: 9,
            type: 'action',
            name: "Jail Cell",
            group: 'None',
            color: "#3A3A3A",
            actions: {
                type: 'jail',
                message: ""
            }
        },
    ];


    Location.addLocation(locations, (err) =>{
        if(err){
            res.json({success: false, msg: "Failed to add Location"})
        }
        else {
            res.json({success: true, msg: "Added Location"})
        }
    })
});

router.get('/getlocations', (req, res, next) => {

    Location.getAllLocations((err, location) => {

        if (err) {
            res.json({success: false, msg: "Error retrieving Locations"});
        }
        if (location) {
            res.json({locations: location})
        }
        else {
            res.json({success: false, msg: "Failed to retrieve locations"});
        }
    })
});

router.get('/getsinglelocation', (req, res, next) => {


    Location.getLocationById(id, (err, location) => {
        if (err) {
            res.json({success: false, msg: "Error retrieving Location"});
        }
        if (location) {
            res.json({location: location})
        }
        else {
            res.json({success: false, msg: "Failed to retrieve location"});
        }
    })
});

router.post('/clear', (req, res, next) =>{
    Location.deleteAll((err) =>{
        if(err){
            res.json({success: false, msg: "Error deleting locations"})
        }
        else {
            res.json({success: true, msg: "Cleared Locations"})
        }
    });
})



module.exports = router;
