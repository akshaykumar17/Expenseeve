const mongooseDB = require('mongoose');
const Schema = mongooseDB.Schema;

//Create Schema
const BudgetSchema = new Schema({
    totalamount: {
        type: Number,
        required: true
    }
});


module.exports = Budget = mongooseDB.model('budget', BudgetSchema);