import { combineReducers } from "@reduxjs/toolkit";
import customerReducer from "./customerReducer";
import transactionReportReducer from "./transactionReportReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    customers: customerReducer,
    transactionReports: transactionReportReducer,
    products: productReducer,
    users: userReducer,
});