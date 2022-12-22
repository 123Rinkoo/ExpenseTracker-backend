const express=require('express');
const router = express.Router();
const passwordController= require('../controller/password')

router.post('/forgotpassword', passwordController.forgotpassword);
router.get('/forgotpassword/:resetId', passwordController.resetpassword);
router.post('/updatePassword', passwordController.updatepassword);

module.exports=router;