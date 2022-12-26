const Expense = require('../model/expense');

exports.addExpense = (req, res, next) => {
    // console.log('coming')
    if (req.body.key1.length == 0 || req.body.key2.length == 0) {
        return res.status(400).json({ success: false, message: 'Parameter missing' });
    }
    Expense.create({ Expense_Amount: req.body.key1, Description: req.body.key2, Category: req.body.key3, userId: req.user.id })
        .then(result => res.json(result))
        .catch(err => { return res.status(403).json({ success: false, error: err }) })
};

exports.getExpense = (req, res, next) => {

    const page = +req.query.paaag || 1;
    const ExpensesPerPage = 5;
    let totalExpenses;


    // req.user.getExpenses().count()
    Expense.count({ where: { userId: req.user.id } })
        .then(total => {
            totalExpenses = total;

            req.user.getExpenses({ offset: (page - 1) * ExpensesPerPage, limit: ExpensesPerPage }).then(expenses => {
                return res.json({
                    Expenses: expenses,
                    currentPage: page,
                    hasNextPage: ExpensesPerPage * page < totalExpenses,
                    nextPage: page + 1,
                    hasPreviousPage: page > 1,
                    previousPage: page - 1,
                    lastPage: Math.ceil(totalExpenses / ExpensesPerPage)

                });
            })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

// exports.getExpense=(req, res, next)=>{
//     const page= +req.query.paaag || 1;
//     console.log(page);
//     const itemsperpage=3;
//     let totalItems;
//     Product.count()
//     .then((total=>{
//       totalItems=total;
//       return Product.findAll({offset: (page-1)*itemsperpage , limit: itemsperpage})
//     }))
//       .then(products => {
//         // res.render('shop/product-list', {
//         //   prods: products,
//         //   pageTitle: 'All Products',
//         //   path: '/products'
//         // });
//         res.json({
//           Products: products,
//           currentPage: page,
//           hasNextPage: itemsperpage*page<totalItems,
//           nextPage: page+1,
//           hasPreviousPage: page>1,
//           previousPage: page-1,
//           lastPage: Math.ceil(totalItems/itemsperpage)
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     };



exports.deleteExpense = (req, res, next) => {
    const ExpId = req.params.expenseId;
    Expense.findByPk(ExpId)
        .then(found => found.destroy())
        .catch(err => console.log(err));
};
