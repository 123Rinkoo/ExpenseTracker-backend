const express = require('express');
const router = express.Router();
const Expense = require('../model/expense');

router.post('/addexpense',(req, res, next)=>{
    Expense.create({Expense_Amount: req.body.key1, Description: req.body.key2, Category: req.body.key3})
    .then(result=>res.json(result))
    .catch(err=>console.log(err))
})

router.get('/getexpense', (req, res, next)=>{
    Expense.findAll()
    .then(expenses=>{
        res.json(expenses);
    })
    .catch(err=> console.log(err));
})

router.delete('/deleting/:expenseId', (req, res, next)=>{
    const ExpId=req.params.expenseId;
    Expense.findByPk(ExpId)
    .then(found=>found.destroy())
    .catch(err=>console.log(err));
})
module.exports = router;