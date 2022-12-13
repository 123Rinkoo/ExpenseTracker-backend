const jwt=require('jsonwebtoken');
const User=require('../model/user');

exports.authenticate=(req, res, next)=>{
    try{
        const token= req.header('Authorization');
        //now decrypting the token and getting user details
        const user=jwt.verify(token, '68A5894284FC367036BAFCD05E307098F1D1091DF46927863A0DD72C3366DE9B'); //merko yahan se user object milega  {userId:---, username: --, iat:---}
        console.log(user);
        User.findByPk(user.userId).then(user=>{
            console.log(JSON.stringify(user));
            req.user=user;
            console.log('i am in.....')
            next();
        })
        .catch(err=>{throw new Error(err)})

    }
    catch(err){
        console.log(err);
        return res.status(401).json({success: false})
    }
}

