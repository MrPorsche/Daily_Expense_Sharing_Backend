const Expense = require('../models/Expense');
const User = require('../models/User');
const { Parser } = require('json2csv');
const FS = require('fs');
const Path = require('path');

exports.addExpense = async (req, res) => {
    try {
        const { description, amount, splitMethod, participants } = req.body;

        if(splitMethod === 'percentage'){
            const totalPercentage = participants.reduce((sum, p) => sum + p.percentage, 0);
            if(totalPercentage !== 100){
                return res.status(400).json({ message: 'Percentages must add up to 100%' });
            }
        }

        const newExpense = new Expense({ description, amount, splitMethod, participants });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch(err){
        res.status(500).json({ message: 'Sorry! this occurred from our side, please try again later.', error: err.message });
    }
};

exports.getUserExpenses = async (req, res) => {
    try {
        const userId = req.params.id;
        const userExpenses = await Expense.find({ 'participants.userId': userId });
        res.json(userExpenses);
    } catch(err){
        res.status(500).json({ message: 'Sorry! this occurred from our side, please try again later.', error: err.message });
    }
};

exports.getAllExpense = async (req, res) => {
    try {
        const allExpenses = await Expense.find();
        res.json(allExpenses)
    } catch(err){
        res.status(500).json({ message: 'Sorry! this occurred from our side, please try again later.', error: err.message });
    }
};

exports.generateBalanceSheet = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({ message: 'User not registered!' });
        }

        const Expenses = await Expense.find({ participant: { $elemMatch: { user: userId } } });
        const Fields = [ 'description', 'amount', 'date', 'participants'];
        const Opts = { Fields };
        const parser = new Parser(Opts);
        const CSV = parser.parse(Expenses);

        const filePath = Path.join(__dirname, `../../downloads/balance_sheet_${userId}.csv`);
        FS.writeFileSync(filePath, CSV);

        res.download(filePath, `balance_sheet_${userId}.csv`, (err) => {
            if (err){
                res.status(500).json({ message: 'Sorry, can not download the file now. Please try again!' });
            }
            FS.unlinkSync(filePath);
        });
    } catch(err){
        res.status(500).json({ message: 'Sorry! this occurred from our side, please try again later.', error: err.message  });
    }
};