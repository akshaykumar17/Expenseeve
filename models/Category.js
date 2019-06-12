const mongooseDB = require('mongoose');
const Schema = mongooseDB.Schema;

//Create Schema
const CategorySchema = new Schema({
    budget: {
        type:Number,
        default:0
    },
    category: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});
const Category = mongooseDB.model('category',CategorySchema);
module.exports = Category  ;