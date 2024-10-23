import { GET_DATA_TRANSACTION_REPORT } from "../actions/transactionReportAction";

const initialState = {
    data: [],
};

const transactionReportReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_DATA_TRANSACTION_REPORT:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export default transactionReportReducer;