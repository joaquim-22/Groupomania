import { DELETE_COMMENTS, GET_COMMENTS, UPDATE_COMMENT } from "../actions/postActions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
    switch (action.type){
        case GET_COMMENTS:
            return action.payload;
        case DELETE_COMMENTS:
            return state.filter(( comment ) => comment.id !== action.payload.commentId);
        case UPDATE_COMMENT:
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