const Expense = require('../models/Expense');
const User = require('../models/User');

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