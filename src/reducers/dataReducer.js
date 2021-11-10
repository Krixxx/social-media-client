import {
  SET_LOADING,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_ERROR,
  LIKE_POST,
  DELETE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
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
    return { ...state, isLoadingData: false, posts: [] };
  }

  /**
   * Like and unlike a post
   */
  if (action.type === LIKE_POST) {
    // get liked post index from posts array
    let index = state.posts.findIndex(
      (post) => post._id === action.payload._id
    );

    // update post on current index
    state.posts[index] = action.payload;

    return { ...state, isLoadingData: false };
  }

  /**
   * Delete post from server and remove from posts array
   */
  if (action.type === DELETE_POST) {
    let index = state.posts.findIndex((post) => post._id === action.payload);

    state.posts.splice(index, 1);

    return { ...state };
  }

  if (action.type === CREATE_POST_SUCCESS) {
    return {
      ...state,
      isLoadingData: false,
      showAlert: false,
      posts: [action.payload, ...state.posts],
    };
  }

  if (action.type === CREATE_POST_ERROR) {
    return { ...state, isLoadingData: false, showAlert: true };
  }

  throw new Error(`No such action: ${action}`);
};

export default dataReducer;
