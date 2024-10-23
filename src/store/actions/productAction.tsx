import instance from "../../config/axios";
import { Dispatch } from "@reduxjs/toolkit";

export const GET_DATA_PRODUCT = "GET_DATA_PRODUCT";

export const getDataProduct = () => async (dispatch: Dispatch) => {
    try {
        const res = await instance.get('/v1/products');

        dispatch({
            type: GET_DATA_PRODUCT,
            payload: res.data.data
        });
    } catch (error) {
        console.log(error);
    }
}