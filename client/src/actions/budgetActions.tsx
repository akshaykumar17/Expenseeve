import axios from 'axios';
import { LOADING_ITEMS, GET_BUDGET, ADD_BUDGET, UPDATE_BUDGET } from './types';

export const getBudget = () => (dispatch: any) => {
    dispatch(setloading());
    axios.get("/api/budget").then(res =>
        dispatch({
            type: GET_BUDGET,
            payload: res.data
        })
    );
};

export const updateBudget = (budget: any) => (dispatch: any) => {

    axios.put(`/api/budget/${budget.id}`, budget).then(res => {
        dispatch({
            type: UPDATE_BUDGET,
            payload: res.data
        })
        return axios.get("/api/budget").then(res =>
            dispatch({
                type: GET_BUDGET,
                payload: res.data
            })
        );
    })

}
export const addBudget = (budget: any) => (dispatch: any) => {
    console.log(budget)
    axios.post('/api/budget', { totalamount: budget.totalamount }).then(res => {
        dispatch({
            type: ADD_BUDGET,
            payload: res.data
        })
        return axios.get("/api/budget").then(res =>
            dispatch({
                type: GET_BUDGET,
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