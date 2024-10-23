import instance from "../../config/axios";
import { Dispatch } from "@reduxjs/toolkit";

export const GET_DATA_TRANSACTION_REPORT = "GET_DATA_TRANSACTION_REPORT";

export const getDataTransactionReport = () => async (dispatch: Dispatch) => {
    try {
        const res = await instance.get('/v1/transactions');

        dispatch({
            type: GET_DATA_TRANSACTION_REPORT,
            payload: res.data.data
        });
    } catch (error) {
        console.log(error);
    }
}