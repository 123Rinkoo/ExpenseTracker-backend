const Expense = require('../model/expense');

exports.addExpense=(req, res, next)=>{
    // console.log('coming')
    if(req.body.key1.length==0|| req.body.key2.length==0){
        return res.status(400).json({success: false, message: 'Parameter missing'});
    }
    Expense.create({Expense_Amount: req.body.key1, Description: req.body.key2, Category: req.body.key3, userId: req.user.id})
    .then(result=>res.json(result))
    .catch(err=>{return res.status(403).json({success: false, error : err})})
};

exports.getExpense=(req, res, next)=>{
    console.log(req.user.id);
    
    req.user.getExpenses().then(expenses=>{
        res.json(expenses);
    })
    .catch(err=> console.log(err));
};

exports.deleteExpense=(req, res, next)=>{
    const ExpId=req.params.expenseId;
    Expense.findByPk(ExpId)
    .then(found=>found.destroy())
    .catch(err=>console.log(err));
};
