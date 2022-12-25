const User = require('../model/user');
const Expense = require('../model/expense');
const userServices=require('../services/userservices');
const S3service=require('../services/S3service');
const fileURL_table=require('../model/downloadfileURL');

exports.forLeaderboard = (req, res, next) => {
    User.findAll()
        .then((users) => {
            const array = [];
            for (let i = 0; i < users.length; i++) {
                Expense.findAll({ where: { userId: users[i].id } })
                    .then(expenses => {
                        let TotalExpense = 0;
                        for (let j = 0; j < expenses.length; j++) {
                            TotalExpense = TotalExpense + expenses[j].Expense_Amount;
                        }
                        array.push({ "name": users[i].name, "TotalExpense": TotalExpense })
                        array.sort(function (a, b) { return b.TotalExpense - a.TotalExpense });
                        if (i == users.length - 1) {
                            return res.json(array);
                        }
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
}

exports.downloadingFile = async (req, res, next) => {
    try{
        const expenses = await userServices.getExpenses(req);
        console.log(expenses);
        const stringifiedExpenses = JSON.stringify(expenses);
    
        // every time jab bhi downloading request aayegi to file name to same hai to vo purani vali ko update kar dega. isiliye is name ko dynamic bnana hai.
        // const filename='Expense.txt';
        const userId = req.user.id;
        const filename = `Expense${userId}/${new Date()}.txt`;
        const fileURL = await S3service.uploadToS3(stringifiedExpenses, filename);  //ye ek asynchronous task hai to direct niche aa jayega jisse file url ki value undefined btayega.
        console.log(fileURL);
        fileURL_table.create({ File_Name: filename, File_URL: fileURL})
        .then()
        .catch(err=>console.log(err));
        res.status(200).json({ fileURL, success: true });
    }
    catch (err){
        console.log(err);
        res.status(500).json({fileURL: "", success: false, err: err});
    }
}

exports.gettingDownloadedFiles= async(req, res, next)=>{
    fileURL_table.findAll()
    .then(result=>{
        return res.status(200).json({success: true, result: result});
    })
    .catch(err=>{
        return res.status(500).json({success: false, err: err});
    });
}