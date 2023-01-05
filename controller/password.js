require('dotenv').config();
const Sib = require('sib-api-v3-sdk');
const uuid = require('uuid');
const ForgotPassword = require('../model/forget_password');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const { use } = require('../Route/expense');

function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, userName: name }, '68A5894284FC367036BAFCD05E307098F1D1091DF46927863A0DD72C3366DE9B');
}

exports.forgotpassword = (req, res, next) => {
    const email = req.body.key1;
    console.log(email);
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key']
    const resetId = uuid.v4();
    // const resetUrl='7bd3c424-4b7a-4f9d-8916-32173381c11c';
    const resetUrl = `http://54.250.168.167:8005/password/forgotpassword/${resetId}`;

    console.log(`http://54.250.168.167:8005/password/forgotpassword/${resetId}`);

    User.findOne({ where: { email: `${email}` } })
        .then(foundUser => {
            // console.log(foundUser);
            if (!foundUser) {
                return res.status(500).json({ success: false, message: 'user does not exist' });
            }
            else {
                ForgotPassword.findOne({ where: { userId: foundUser.id,  isactive: true } })
                    .then(result => {
                        if (result) {
                            return res.status(400).json({ success: false, message: 'Reset link already sent to your email' })
                        }
                        else {
                            ForgotPassword.create({ id: resetId, isactive: true, resetlink: resetUrl, userId: foundUser.id })
                                .then(result => {
                                    return res.status(200).json({ success: true, message: 'Reset link sent to your email, click to reset your password' })
                                })
                                .catch(err => console.log('not done'));
                        }
                    })
                    .catch(err);
            }
        })
        .catch(err => console.log(err));

    apiKey.apiKey = process.env.SendInBlue_ApiKey;
    const tranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
        email: 'rinkookandpal1966@gmail.com'
    }

    const receivers = {
        email: 'kbeena2001@gmail.com'
    }

    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'hello this is demo of sendInBlue',
        htmlContent: `
        <h1>Cules Coding</h1>
        <a href="http://54.250.168.167:8005/password/forgotpassword/${resetUrl}">Click this link to reset your password</a>`
    })
        .then(result => console.log('msg sent'))
        .catch(err => console.log("err is coming"))
}
let resetingId;
exports.resetpassword = (req, res, next) => {
    console.log("This is from url", req.params.resetId);
    resetingId = req.params.resetId;
    ForgotPassword.findOne({ where: { id: req.params.resetId } })
        .then(result => {
            if (result.isactive) {
                res.redirect('/updatePassword.html');
            }
            if (!result.isactive) {
                console.log('try again reset your password')
            }
        })
        .catch(err => console.log(err));
}

exports.updatepassword = (req, res, next) => {
    // console.log("Awesome:", resetingId);
    ForgotPassword.findOne({ where: { id: resetingId } })
        .then(result => {
            console.log(result.userId);
            User.findOne({ where: { id: result.userId } })
                .then(userdetail => {
                    const saltRounds = 10;
                    bcrypt.hash(req.body.key1, saltRounds, function (err, hash) {
                        User.update({ password: hash }, { where: { id: userdetail.id } })
                            .then(result => {
                                ForgotPassword.update({ isactive: false }, { where: { id: resetingId } })
                                .then(done=>console.log('password updated'));
                                })
                            .catch(err => console.log('password is not updated'));
                        // return res.status(200).json({ success: true, message: "User SignUp sucessful" });
                    });
                })
        })
        .catch(err => console.log(err));
    console.log('yeah this is coming to update the password', req.body.key1);
}


