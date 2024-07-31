const Express = require('express');
const Router = Express.Router();
const userController = require('../controllers/userController');

// Route for creating user
Router.post('/', userController.createUser);

// Route for getting user details by ID
Router.get('/:id', userController.getUserDetails);

module.exports = Router;