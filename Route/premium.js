const express = require('express');
const router = express.Router();
const PremiumUserController = require('../controller/premium');

// router.get('/getusers', (req, res, next)=>{
//     User.findAll()
//     .then((users)=>{
//         console.log(users);
//     }
//     )});

router.get('/getusers',PremiumUserController.forLeaderboard);
module.exports = router;
