let express = require('express');
let router = express.Router();

const User = require('../models/userModel');

/* GET users listing. */
router.post('/newuser', function(req, res, next) {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        money: 1000000,
        ownedProperties: [],
        location: 0

    });

    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg: "Failed to register user"})
        }
        else {
            res.json({success: true, msg: "Registered user"})
    }
})
});

router.get('/profile', function (req, res, next) {

    User.getUserById(id, (err, user) => {
        if (err) {
            res.json({success: false, msg: "Error retrieving user"})
        }
        if (user) {
            res.json({user: user})
        }
        else {
            res.json({success: false, msg: 'Failed to retrieve user'})
        }
    })

});

module.exports = router;
