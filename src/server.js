const Express = require('express');
const Cors = require('cors');
const Mongoose = require('mongoose');
const DotENV = require('dotenv');
const FS = require('fs');
const Path = require('path');
const PORT = process.env.PORT || 5000;


// creating downloads directory
const Downloads = Path.join(__dirname, '../downloads');
if (!FS.existsSync(Downloads)){
    FS.mkdirSync(Downloads);
}

DotENV.config();

const App = Express();

App.use(Cors());
App.use(Express.json());

console.log('MongoDB_URI:', process.env.DB_URI);

const MongoDB_URI = process.env.DB_URI;

Mongoose.connect(MongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('You have SUCCESSFULLY connected to MongoDB ATLAS!');
    App.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => {
    console.error('You have FAILED to connect to MongoDB ATLAS!');
});

// Importing Routes
const UserROUTES = require('./routes/userRoutes');
const ExpenseROUTES = require('./routes/expenseRoutes');
const path = require('path');

// Routes API
App.use('/api/users', UserROUTES);
App.use('/api/expenses', ExpenseROUTES);