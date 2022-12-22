const express = require('express');
const router = express.Router();
const PremiumUserController = require('../controller/premium');

router.get('/getusers',PremiumUserController.forLeaderboard);
module.exports = router;
