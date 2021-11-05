import {
  SET_LOADING,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_ERROR,
} from '../utils/actions';

const dataReducer = (state, action) => {
  // set loading state to true
  if (action.type === SET_LOADING) {
    return { ...state, isLoadingData: true, showAlert: false };
  }

  // get all posts
  if (action.type === GET_ALL_POSTS_SUCCESS) {
    return { ...state, isLoadingData: false, posts: action.payload };
  }

  if (action.type === GET_ALL_POSTS_ERROR) {
    return { ...state, isLoadingData: false };
  }

  throw new Error(`No such action: ${action}`);
};

export default dataReducer;
