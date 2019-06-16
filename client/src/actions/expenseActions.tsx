import axios from 'axios';
import { LOADING_ITEMS, GET_EXPENSE, ADD_EXPENSE, SOFTDELETE_EXPENSE, DELETE_EXPENSE } from './types';

export const getExpenses = () => (dispatch: any) => {
    dispatch(setloading());
    axios.get("/api/expense").then(res =>
        dispatch({
            type: GET_EXPENSE,
            payload: res.data
        })
    );
};

export const updateExpense = (expense: any) => (dispatch: any) => {

    axios.put(`/api/expense/${expense.id}`, expense).then(res => {
        dispatch({
            type: SOFTDELETE_EXPENSE,
            payload: res.data
        })
        return axios.get("/api/expense").then(res =>
            dispatch({
                type: GET_EXPENSE,
                payload: res.data
            })
        );
    })

}
export const addExpense = (item: any) => (dispatch: any) => {
    axios.post('/api/expense', item).then(res => {
        dispatch({
            type: ADD_EXPENSE,
            payload: res.data
        })
    })
}
export const softExpense = (expense: any) => (dispatch: any) => {
    console.log(expense)
    axios.put(`/api/expense/${expense.id}`, expense).then(res => {
        dispatch({
            type: SOFTDELETE_EXPENSE,
            payload: res.data
        })
        return axios.get("/api/expense").then(res =>
            dispatch({
                type: GET_EXPENSE,
                payload: res.data
            })
        );
    })

}
export const deleteExpense = (id: any) => (dispatch: any) => {
    console.log('ko')
    axios.delete(`/api/expense/${id}`).then(res => {
        dispatch({
            type: DELETE_EXPENSE,
            payload: id
        })
        return axios.get("/api/expense").then(res =>
            dispatch({
                type: GET_EXPENSE,
                payload: res.data
            })
        );
    })
}
export const setloading = () => {
    return {
        type: LOADING_ITEMS
    }
}