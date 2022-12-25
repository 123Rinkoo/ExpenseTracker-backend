// 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
const express= require('express');
const app=express();
var cors=require('cors');
const path = require('path');
const UserRoute=require('./Route/User');
const ExpenseRoute=require('./Route/expense');
const purchaseRoute=require('./Route/purchase');
const premiumRoute=require('./Route/premium');
const passwordRoute=require("./Route/password");

const Order=require('./model/orders');
const User=require('./model/user');
const Expense=require('./model/expense');
const ForgetPassword=require('./model/forget_password');
const File_URL=require('./model/downloadfileURL');

const sequelize=require('./util/database');
const bodyParser = require('body-parser');
const ForgotPassword = require('./model/forget_password');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', UserRoute);
app.use('/expense', ExpenseRoute);
app.use('/purchase', purchaseRoute);
app.use('/premium', premiumRoute);
app.use('/password', passwordRoute);

Expense.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);
 
ForgetPassword.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(ForgotPassword);

sequelize
// .sync({force: true})
.sync()

.then(result=>{
    app.listen(8000); 
} )
.catch(err=> console.log(err));



// npm init
// npm install nodemon
// npm install express
// ab express require kar lo
// make route

// install sequelize , mysql2
// make util => database
// make any model 
// app.js pe pehli table k liye.