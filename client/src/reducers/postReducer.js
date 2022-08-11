import { GET_POSTS, DELETE_POST, UPDATE_POST } from "../actions/postActions";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type){
        case GET_POSTS:
            return action.payload;
        case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.postId);
            case UPDATE_POST:
                return state.map((post) => {
                    if (post.id === action.payload.postId) {
                        return {
                                ...post,
                                content: action.payload.content,
                            };
                    } else return post;
            });
        default:
            return state;
    }
}