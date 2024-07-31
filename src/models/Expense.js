const Mongoose = require('mongoose');

const expenseSchema = new Mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    splitMethod: {
        type: String,
        enum: ['equal', 'exact', 'percentage'],
        require: true
    },
    participants: [
        {
            userId: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            amount: {
                type: Number
            },
            percentage: {
                type: Number
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Expense = Mongoose.model('Expense', expenseSchema);

module.exports = Expense;