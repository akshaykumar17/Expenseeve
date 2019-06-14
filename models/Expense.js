const mongooseDB = require('mongoose');
const Schema = mongooseDB.Schema;

//Create Schema
const ExpenseItemSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});


module.exports = Expense = mongooseDB.model('expense', ExpenseItemSchema);