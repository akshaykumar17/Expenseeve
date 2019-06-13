import uuid from 'uuid';
import { GET_CATEGORY, ADD_CATEGORY, SOFTDEL_CATEGORY, LOADING_ITEMS } from '../actions/types';

const initialState = {
    items: [],
    loading: false
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case SOFTDEL_CATEGORY:
            return {
                ...state
            };
        case ADD_CATEGORY:
            return {
                ...state,
                items: [...state.items, action.payload]
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