import {
  SET_LOADING,
  GET_CURRENT_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  UPLOAD_IMAGE_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from '../utils/actions';

const userReducer = (state, action) => {
  // set loading state to true
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false };
  }

  //set loading to false and set user
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload,
    };
  }

  //set loading to false, set user to null and show alert
  if (action.type === REGISTER_USER_ERROR) {
    return { ...state, isLoading: false, user: null, showAlert: true };
  }

  if (action.type === GET_CURRENT_USER) {
    return { ...state, isLoading: false, userData: action.payload };
  }

  //set user to null and do not show alert.
  if (action.type === LOGOUT_USER) {
    return { ...state, user: null, showAlert: false };
  }

  if (action.type === UPLOAD_IMAGE_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return { ...state, isLoading: false, userData: action.payload };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return { ...state, isLoading: false };
  }

  throw new Error(`No such action: ${action}`);
};

export default userReducer;
