const Express = require('express');
const Router = Express.Router();
const expenseController = require('../controllers/expenseController');

// Route for adding new expenses
Router.post('/', expenseController.addExpense);

// Route for getting individual user expenses
Router.get('/user/:Id', expenseController.getUserExpenses);

// Route for getting overall expenses
Router.get('/', expenseController.getAllExpense);

module.exports = Router;