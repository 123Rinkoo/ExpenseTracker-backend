require('dotenv').config();
// const Sib = require('sib-api-v3-sdk');
const Sib=require('sib-api-v3-sdk');

exports.forgotpassword = (req, res, next) => {
    const email = req.body.key1;
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']

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
        textContent: 'this is an amazing concept in the era of technology'
    })
        .then(result => console.log('msg sent'))
        // .catch(err => console.log(err))
}  
