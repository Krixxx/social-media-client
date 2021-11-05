import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_ERROR,
} from '../utils/actions';

const reducer = (state, action) => {
  // set loading state to true
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false };
  }

  //set loading to false and set user
  if (action.type === REGISTER_USER_SUCCESS) {
    return { ...state, isLoading: false, user: action.payload };
  }

  //set loading to false, set user to null and show alert
  if (action.type === REGISTER_USER_ERROR) {
    return { ...state, isLoading: false, user: null, showAlert: true };
  }

  //set user to null and do not show alert.
  if (action.type === LOGOUT_USER) {
    return { ...state, user: null, showAlert: false };
  }

  // get all jobs
  if (action.type === GET_ALL_POSTS_SUCCESS) {
    return { ...state, isLoading: false, posts: action.payload };
  }

  if (action.type === GET_ALL_POSTS_ERROR) {
    return { ...state, isLoading: false };
  }

  throw new Error(`No such action: ${action}`);
};

export default reducer;
