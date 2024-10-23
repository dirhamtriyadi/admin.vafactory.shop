import { GET_DATA_CUSTOMER } from "../actions/customerAction";

const initialState = {
    data: [],
};

const customerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_DATA_CUSTOMER:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export default customerReducer;