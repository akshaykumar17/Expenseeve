import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer'
import expenseReducer from './expenseReducer';

export default combineReducers({
    category: categoryReducer,
    expense: expenseReducer
});