const express = require('express');
const router = express.Router();
const PremiumUserController = require('../controller/premium');
const authenticatemiddleware = require('../middleware/auth');

router.get('/getusers',PremiumUserController.forLeaderboard);
router.get('/download',authenticatemiddleware.authenticate ,PremiumUserController.downloadingFile);
router.get('/downloadedfilelist', PremiumUserController.gettingDownloadedFiles);
module.exports = router;
