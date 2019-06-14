import axios from 'axios';
import { LOADING_ITEMS, GET_EXPENSE, ADD_EXPENSE, SOFTDELETE_EXPENSE } from './types';

export const getitems = () => (dispatch: any) => {
    dispatch(setloading());
    axios.get("/api/category").then(res =>
        dispatch({
            type: GET_EXPENSE,
            payload: res.data
        })
    );
};

export const deleteItem = (id: any, category: any, isActive: boolean) => (dispatch: any) => {
    axios.put(`/api/category/${id}`, { "isActive": isActive }).then(res => {
        dispatch({
            type: SOFTDELETE_EXPENSE,
            payload: res.data
        })
    })
    return {
        type: SOFTDELETE_EXPENSE,
        payload: { id: id, category: category, isActive: isActive }
    }
}
export const addItem = (item: any) => (dispatch: any) => {
    axios.post('/api/expense', item).then(res => {
        dispatch({
            type: ADD_EXPENSE,
            payload: res.data
        })
    })
}
export const setloading = () => {
    return {
        type: LOADING_ITEMS
    }
}