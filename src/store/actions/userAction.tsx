import instance from "../../config/axios";
import { Dispatch } from "@reduxjs/toolkit";

export const GET_DATA_USER = "GET_DATA_USER";

export const getDataUser = () => async (dispatch: Dispatch) => {
    try {
        const res = await instance.get('/v1/users');

        dispatch({
            type: GET_DATA_USER,
            payload: res.data.data
        });
    } catch (error) {
        console.log(error);
    }
}