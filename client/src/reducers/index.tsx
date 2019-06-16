import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer'
import expenseReducer from './expenseReducer';
import budgetReducer from './budgetReducer'

export default combineReducers({
    category: categoryReducer,
    expense: expenseReducer,
    budget: budgetReducer
});