import { GET_USER, UPDATE_USER } from "../actions/userActions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPDATE_USER:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}