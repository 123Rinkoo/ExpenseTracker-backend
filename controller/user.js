const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

function generateAccessToken(id, name){
    return jwt.sign({userId: id, userName: name}, '68A5894284FC367036BAFCD05E307098F1D1091DF46927863A0DD72C3366DE9B');
}



exports.signingUp = (req, res, next) => {
    User.findAll()
        .then(users => {
            var found = users.find(function (element) {
                return element.email == req.body.key2;
            });
            if (!found) {
                const saltRounds = 10;
                bcrypt.hash(req.body.key3, saltRounds, function (err, hash) {
                    User.create({ name: req.body.key1, email: req.body.key2, password: hash, ispremiumuser: false});
                    return res.status(200).json({ success: true, message: "User SignUp sucessful" });
                });
            }
            else {
                return res.status(500).json({ success: false, message: "User already exists" })
            }
        })
        .catch(err => console.log(err));

};

exports.login=(req, res, next)=>{
     User.findAll()
     .then(users => {
         var found = users.find(function (element) {
             return element.email == req.body.key1;
         });
         if (!found) {
             return res.status(404).json({ success: false, message: "User doesnot exist", });
         }
         else {
             bcrypt.compare(req.body.key2, found.password, function (err, result) {
                 if (err) {
                     throw new Error('something went wrong');
                 }
                 if (result) {
                     return res.status(200).json({ success: true, message: "User login successful", found, token: generateAccessToken(found.id, found.name) });
                 }
                 else {
                     return res.status(401).json({ success: false, message: "Invalid password!" });
                 }
             });
         }

     })
     .catch(err =>{ return res.status(500).json({ success: false, message: err })});

};




