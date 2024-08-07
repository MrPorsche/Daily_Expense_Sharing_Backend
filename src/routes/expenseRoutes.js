const Express = require('express');
const Router = Express.Router();
const expenseController = require('../controllers/expenseController');

// Route for adding new expenses
Router.post('/', expenseController.addExpense);

// Route for getting individual user expenses
Router.get('/user/:userId', expenseController.getUserExpenses);

// Route for getting overall expenses
Router.get('/', expenseController.getAllExpense);

// Route for downloading balance sheet of an individual
Router.get('/balance-sheet/:userId', expenseController.generateBalanceSheet);

module.exports = Router;