import { GET_DATA_USER } from "../actions/userAction";

const initialState = {
    data: [],
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_DATA_USER:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;