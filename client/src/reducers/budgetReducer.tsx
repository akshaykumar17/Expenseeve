import { LOADING_ITEMS, GET_BUDGET, ADD_BUDGET, UPDATE_BUDGET } from '../actions/types';

const initialState = {
    budget: {},
    loading: false
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case GET_BUDGET:
                console.log(action.payload);
            return {
                ...state,
                budget:  action.payload,
                loading: false
            };
        case UPDATE_BUDGET:
            return {
                ...state
            };
        case ADD_BUDGET:
            console.log(state+' '+state.budget);
            return {
                ...state,
                budget:  action.payload
            };
        
        case LOADING_ITEMS:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}