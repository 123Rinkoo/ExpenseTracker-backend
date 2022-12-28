const Razorpay = require('razorpay');
const Order = require('../model/orders')

const purchasepremium =async (req, res) => {
    console.log('i am in purchasepremium')
    try {
        var rzp = new Razorpay({
            key_id: 'rzp_test_cEh3xYzZ2zi0AR',
            key_secret: '5QkZnnAG4ACaS2VMKabrMnvx'
        }) 
        const amount = 2500;
       
        rzp.orders.create({amount: amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(err);
            }
            console.log(order);
        
            req.user.createOrder({ orderid: order.id, status: 'PENDING'})
            .then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});              
            })
            .catch(err => {
                throw new Error(err);
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err})
    }
}

 const updateTransactionStatus = (req, res ) => {
     try {
        const { payment_id, order_id} = req.body;
        Order.findOne({where : {orderid : order_id}}).then(order => {
            order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}).then(() => {
                req.user.update({ispremiumuser: true})
                return res.status(202).json({success: true, message: "Transaction Successful"});
            }).catch((err)=> {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: 'Something went wrong' })
    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}