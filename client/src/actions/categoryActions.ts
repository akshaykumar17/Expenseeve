import axios from 'axios';
import { GET_CATEGORY, ADD_CATEGORY, SOFTDEL_CATEGORY, LOADING_ITEMS } from './types';

export const getitems = () => (dispatch: any) => {
    dispatch(setloading());
    axios.get("/api/category").then(res =>
        dispatch({
            type: GET_CATEGORY,
            payload: res.data
        })
    );
};

export const deleteItem = (id: any, category: any, isActive: boolean) => (dispatch: any) => {
    axios.put(`/api/category/${id}`, { "isActive": isActive }).then(res => {
        dispatch({
            type: SOFTDEL_CATEGORY,
            payload : res.data
        })
    })
    return {
        type: SOFTDEL_CATEGORY,
        payload: { id: id, category: category, isActive: isActive }
    }
}
export const addItem = (item: any) => (dispatch: any) => {
    axios.post('/api/category', item).then(res => {
        dispatch({
            type: ADD_CATEGORY,
            payload: res.data
        })
    })
}
export const setloading = () => {
    return {
        type: LOADING_ITEMS
    }
}