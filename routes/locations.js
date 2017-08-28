const express = require('express');
const router = express.Router();
const Location = require('../models/locationModel');
const config = require('../config/database');

// Add properties
router.post('/savelocation', (req, res, next) => {

    let locations =  [
        {
            type: 'action',
            name: "Go",
            group: 'None',
            color: "#000000",
            locationOnBoard: 1,
            actions: {
                type: 'money',
                money: 200,
                message: "Pay Day! Paycheck: $200"
            }
        },
        {
            type: 'property',
            name: "Mediterranean Avenue",
            group: 'Purple',
            color: "#560D3B",
            cost: 60,
            rent: [ 2, 10, 30, 90, 160, 250 ],
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
            type: 'property',
            name: "Baltic Avenue",
            group: 'Purple',
            color: "#560D3B",
            cost: 60,
            rent: [ 4, 20, 60, 180, 320, 450 ],
            mortgage: 30,
            accessories: [
                {houses: 50}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 4,
            buildings: 0
        },
        {
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
            locationOnBoard: 7,
            buildings: 0
        },
        {
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
            locationOnBoard: 9,
            buildings: 0
        },
        {
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
            locationOnBoard: 10,
            buildings: 0
        },
        {
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
            owned: false,
            ownedBy: null,
            locationOnBoard: 12,
            buildings: 0
        },
        {
            type: 'property',
            name: "States Ave",
            group: 'Pink',
            color: "#FF69B4",
            cost: 140,
            rent: [ 10,50,150,450,625,750 ],
            mortgage: 70,
            accessories: [
                {houses: 100}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 14,
            buildings: 0
        },
        {
            type: 'property',
            name: "Virgina Ave",
            group: 'Pink',
            color: "#FF69B4",
            cost: 160,
            rent: [ 12,60,180,500,700,900 ],
            mortgage: 80,
            accessories: [
                {houses: 100}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 15,
            buildings: 0
        },
        {
            type: 'property',
            name: "St James Place",
            group: 'Orange',
            color: "#FF9538",
            cost: 180,
            rent: [ 14, 70, 200, 550, 750, 950 ],
            mortgage: 80,
            accessories: [
                {houses: 100}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 17,
            buildings: 0
        },
        {
            type: 'property',
            name: "Tennessee Ave",
            group: 'Orange',
            color: "#FF9538",
            cost: 180,
            rent: [ 14, 70, 200, 550, 750, 950 ],
            mortgage: 80,
            accessories: [
                {houses: 100}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 19,
            buildings: 0
        },
        {
            type: 'property',
            name: "New York Ave",
            group: 'Orange',
            color: "#FF9538",
            cost: 200,
            rent: [ 16, 80, 220, 600, 800 ],
            mortgage: 100,
            accessories: [
                {houses: 100}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 20,
            buildings: 0
        },
        {
            type: 'property',
            name: "Kentucky Ave",
            group: 'Red',
            color: "#FF3B38",
            cost: 220,
            rent: [ 18, 90, 250, 700, 875, 1050 ],
            mortgage: 100,
            accessories: [
                {houses: 150}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 22,
            buildings: 0
        },
        {
            type: 'property',
            name: "Indiana Ave",
            group: 'Red',
            color: "#FF3B38",
            cost: 220,
            rent: [ 18, 90, 250, 700, 875, 1050 ],
            mortgage: 100,
            accessories: [
                {houses: 150}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 24,
            buildings: 0
        },
        {
            type: 'property',
            name: "Illinois Ave",
            group: 'Red',
            color: "#FF3B38",
            cost: 240,
            rent: [ 20, 100, 300, 750, 925, 1100],
            mortgage: 120,
            accessories: [
                {houses: 150}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 25,
            buildings: 0
        },
        {
            type: 'property',
            name: "Atlantic Ave",
            group: 'Yellow',
            color: "#FFD700",
            cost: 260,
            rent: [ 22, 110, 330, 800, 975, 1150 ],
            mortgage: 120,
            accessories: [
                {houses: 150}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 27,
            buildings: 0
        },
        {
            type: 'property',
            name: "Ventnor Ave",
            group: 'Yellow',
            color: "#FFD700",
            cost: 260,
            rent: [ 22, 110, 330, 800, 975, 1150 ],
            mortgage: 120,
            accessories: [
                {houses: 150}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 28,
            buildings: 0
        },
        {
            type: 'property',
            name: "Marvin Gardens",
            group: 'Yellow',
            color: "#FFD700",
            cost: 280,
            rent: [ 24, 120, 350, 850, 1025, 1200 ],
            mortgage: 125,
            accessories: [
                {houses: 150}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 30,
            buildings: 0
        },
        {
            type: 'property',
            name: "Pacific Ave",
            group: 'Green',
            color: "#0AA604",
            cost: 300,
            rent: [ 26, 130, 390, 900, 1100, 1275 ],
            mortgage: 150,
            accessories: [
                {houses: 200}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 32,
            buildings: 0
        },
        {
            type: 'property',
            name: "North Carolina Ave",
            group: 'Green',
            color: "#0AA604",
            cost: 300,
            rent: [ 26, 130, 390, 900, 1100, 1275 ],
            mortgage: 150,
            accessories: [
                {houses: 200}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 33,
            buildings: 0
        },
        {
            type: 'property',
            name: "Pennsylvania Ave",
            group: 'Green',
            color: "#0AA604",
            cost: 320,
            rent: [ 28, 150, 450, 1000, 1200, 1400],
            mortgage: 160,
            accessories: [
                {houses: 200}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 35,
            buildings: 0
        },
        {
            type: 'property',
            name: "Park Place",
            group: 'Dark Blue',
            color: "#3B38FF",
            cost: 350,
            rent: [ 35, 175, 500, 1100, 1300, 1500],
            mortgage: 200,
            accessories: [
                {houses: 200}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 38,
            buildings: 0
        },
        {
            type: 'property',
            name: "Boardwalk",
            group: 'Dark Blue',
            color: "#3B38FF",
            cost: 350,
            rent: [ 50, 200, 600, 1400, 1700, 2000],
            mortgage: 200,
            accessories: [
                {houses: 200}
            ],
            owned: false,
            ownedBy: null,
            locationOnBoard: 40,
            buildings: 0
        },
        {
            type: 'action',
            name: "Community Chest",
            group: 'None',
            color: "#000000",
            locationOnBoard: 3,
            actions: {
                type: 'communityChest',
            }
        },
        {
            type: 'action',
            name: "Income Tax",
            group: 'None',
            color: "#000000",
            locationOnBoard: 5,
            actions: {
                type: 'incomeTax',
                money: -250
            }
        },
        {
            type: 'railRoad',
            name: "Reading Railroad",
            group: 'Railroad',
            color: "#000000",
            cost: 200,
            rent: [],
            mortgage: 500,
            owned: false,
            ownedBy: null,
            locationOnBoard: 6,
        },
        {
            type: 'railRoad',
            name: "Pennsylvania Railroad",
            group: 'Railroad',
            color: "#000000",
            cost: 200,
            rent: [],
            mortgage: 50,
            owned: false,
            ownedBy: null,
            locationOnBoard: 16,
        },
        {
            type: 'railRoad',
            name: "B & O Railroad",
            group: 'Railroad',
            color: "#000000",
            cost: 200,
            rent: [],
            mortgage: 50,
            owned: false,
            ownedBy: null,
            locationOnBoard: 26,
        },
        {
            type: 'railRoad',
            name: "Short Line Railroad",
            group: 'Railroad',
            color: "#000000",
            cost: 200,
            rent: [],
            mortgage: 50,
            owned: false,
            ownedBy: null,
            locationOnBoard: 36,
        },
        {
            type: 'utility',
            name: "Electric Company",
            group: 'utility',
            color: "#000000",
            cost: 150,
            rent: [],
            mortgage: 50,
            owned: false,
            ownedBy: null,
            locationOnBoard: 13,
        },
        {
            type: 'utility',
            name: "Water Company",
            group: 'utility',
            color: "#000000",
            cost: 150,
            rent: [],
            mortgage: 50,
            owned: false,
            ownedBy: null,
            locationOnBoard: 29,
        },
        {
            type: 'action',
            name: "Luxury Tax",
            group: 'None',
            color: "#000000",
            locationOnBoard: 39,
            actions: {
                type: 'luxuryTax',
                money: -250
            }
        },
        {
            type: 'action',
            name: "Community Chest",
            group: 'None',
            color: "#000000",
            locationOnBoard: 18,
            actions: {
                type: 'communityChest',
            }
        },
        {
            type: 'action',
            name: "Community Chest",
            group: 'None',
            color: "#000000",
            locationOnBoard: 34,
            actions: {
                type: 'communityChest',
            }
        },
        {
            type: 'action',
            name: "Chance",
            group: 'None',
            color: "#000000",
            locationOnBoard: 8,
            actions: {
                type: 'chance',
            }
        },
        {
            type: 'action',
            name: "Chance",
            group: 'None',
            color: "#000000",
            locationOnBoard: 23,
            actions: {
                type: 'chance',
            }
        },
        {
            type: 'action',
            name: "Chance",
            group: 'None',
            color: "#000000",
            locationOnBoard: 37,
            actions: {
                type: 'chance',
            }
        },
        {
            type: 'action',
            name: "Free Parking",
            group: 'None',
            color: "#000000",
            locationOnBoard: 21,
            actions: {
                type: 'chance',
            }
        },
        {
            type: 'action',
            name: "Go to Jail",
            group: 'None',
            color: "#000000",
            locationOnBoard: 31,
            actions: {
                type: 'jail',
            }
        },
        {
            type: 'action',
            name: "Go to Jail",
            group: 'None',
            color: "#000000",
            locationOnBoard: 11,
            actions: {
                type: 'jail',
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

//Get All Locations
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

//Get Single Location
router.post('/getsinglelocation', (req, res, next) => {

    let id = req.body._id;

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
});


router.post('/update/purchase', (req, res, next) =>{

    let locationID = req.body.locationID;
    let user = req.body.user;

    Location.purchaseUpdate(locationID, user, (err, location) =>{
        if (err) {
            res.json({success: false, msg: "Error Updating Location"});
        }
        if (location) {
            res.json({location: location})
        }
        else {
            res.json({success: false, msg: "Failed to update location"});
        }
    });
});



module.exports = router;
