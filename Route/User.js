const express = require('express');
const router = express.Router();
const User = require('../model/user')

router.post("/SigningUp", (req, res, next) => {
    // console.log(req.body.key1, req.body.key2, req.body.key3);  
    User.findAll()
        .then(users => {
            console.log(users[0].email)
            // const findemail=users.find(element.email=> element.email==req.body.key2)
            var found = users.find(function (element) {
                return element.email == req.body.key2;
            });
            if (!found) {
                User.create({ name: req.body.key1, email: req.body.key2, password: req.body.key3 });
            }
            else{
                console.log('user exist');
            }
        })
        .catch(err => console.log(err));





})

module.exports = router;