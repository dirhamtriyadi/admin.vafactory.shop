import { GET_DATA_PRODUCT } from "../actions/productAction";

const initialState = {
    data: [],
};

const productReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_DATA_PRODUCT:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;