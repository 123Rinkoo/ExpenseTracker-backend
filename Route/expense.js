const express = require('express');
const router = express.Router();
const ExpenseController = require('../controller/expense');
const authUser=require('../middleware/auth');

router.post('/addexpense', authUser.authenticate,ExpenseController.addExpense);
router.get('/getexpense', authUser.authenticate,ExpenseController.getExpense);
router.delete('/deleting/:expenseId', ExpenseController.deleteExpense);
// router.get('/GetExpenseForPremium/:userId', ExpenseController.getexpenseforpremium);


module.exports = router;
