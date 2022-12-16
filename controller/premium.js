const User = require('../model/user');
const Expense=require('../model/expense');

exports.forLeaderboard=(req, res, next)=>{
   
    User.findAll()
    .then((users)=>{
        // console.log(users[0].id);
        const array=[];
        for(let i=0; i<users.length; i++){
            Expense.findAll({where: {userId: users[i].id}})
            .then(expenses=>{
                let TotalExpense=0;
                    for(let j=0; j<expenses.length;j++)
                    {
                        TotalExpense=TotalExpense+expenses[j].Expense_Amount;
                    }
                    array.push({"name":users[i].name, "TotalExpense":TotalExpense})
                    array.sort(function(a, b){return b.TotalExpense-a.TotalExpense});
                    if(i==users.length-1){
                        return res.json(array);
                        // console.log(array);
                    }
                })
                .catch(err=>console.log(err));
            }
           
            // array.length=0;
        })
    .catch(err=>console.log(err));
}