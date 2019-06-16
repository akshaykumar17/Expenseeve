import { LOADING_ITEMS, ADD_EXPENSE, GET_EXPENSE, SOFTDELETE_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../actions/types';

const initialState = {
    expenses: [],
    loading: false
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case GET_EXPENSE:
            return {
                ...state,
                expenses: action.payload,
                loading: false
            };
        case UPDATE_EXPENSE:
            return {
                ...state
            };
        case ADD_EXPENSE:
            console.log(state + ' ' + state.expenses);
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            };
        case SOFTDELETE_EXPENSE:
            return {
                ...state,
                expenses: [...state.expenses]
            };
        case DELETE_EXPENSE:
            return {
                ...state,
                expense: state.expenses.filter((item: { id: any }) => item.id !== action.payload.id)
            }
        case LOADING_ITEMS:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}