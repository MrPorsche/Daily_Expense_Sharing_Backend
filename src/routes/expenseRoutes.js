const Express = require('express');
const Router = Express.Router();

// Route for adding new expenses
Router.post('/', (req, res) => {
    res.send('Add expense route');
});

// Route for getting individual user expenses
Router.get('/user/:userId', (req, res) => {
    res.send(`Get expenses for user ID: ${req.params.userId}`);
});

// Route for getting overall expenses
Router.get('/', (req, res) => {
    res.send('Get overall expenses');
});

module.exports = Router;