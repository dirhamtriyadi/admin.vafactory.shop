import instance from "../../config/axios";
import { Dispatch } from "@reduxjs/toolkit";

export const GET_DATA_CUSTOMER = "GET_DATA_CUSTOMER";

export const getDataCustomer = () => async (dispatch: Dispatch) => {
    try {
        const res = await instance.get('/v1/customers');

        dispatch({
            type: GET_DATA_CUSTOMER,
            payload: res.data.data
        });
    } catch (error) {
        console.log(error);
    }
}