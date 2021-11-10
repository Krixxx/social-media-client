import React, { useContext, useReducer } from 'react';

import axios from 'axios';
import '../axios';

import { useUserContext } from './userContext';

import {
  SET_LOADING,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_ERROR,
  LIKE_POST,
  DELETE_POST,
} from '../utils/actions';

import dataReducer from '../reducers/dataReducer';

const user = localStorage.getItem('user');

const initialState = {
  user: user ? JSON.parse(user) : null,
  isLoadingData: false,
  showAlert: false,
  posts: [],
  likes: [],
  comments: [],
};

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const { likeUserPost, unLikeUserPost } = useUserContext();

  const [state, dispatch] = useReducer(dataReducer, initialState);

  /**
   * Set loading to true
   */
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  /**
   * Get all posts.
   * Set loading true
   * Get all posts data from server and pass it to reducer
   */
  const getAllPosts = async () => {
    setLoading();

    try {
      const { data } = await axios.get('/public');
      dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data.posts });
    } catch (error) {
      dispatch({ type: GET_ALL_POSTS_ERROR });
    }
  };

  /**
   * We send like data to server and get back like info
   * Then we pass it to userContext, where we store likes array
   * we also get updated post information from server and update it in our posts array
   * @param {String} postId Post, where we want to add like
   */
  const likePost = async (postId) => {
    try {
      const { data } = await axios.post(`/posts/${postId}/like`);

      likeUserPost(data.like);

      const { data: post } = await axios.get(`/posts/${postId}`);

      dispatch({ type: LIKE_POST, payload: post.post });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * We delete like data from server
   * Then we pass postId to userContext, where we delete lik from likes array, with matchind postId
   * We get updated post information from server and update it in our posts array
   * @param {String} postId Post ID, which user unliked
   * @param {String} likeId Current like ID, which we want to delete
   */
  const unLikePost = async (postId, likeId) => {
    try {
      await axios.delete(`/posts/${postId}/like/${likeId}`);

      unLikeUserPost(postId);

      const { data } = await axios.get(`/posts/${postId}`);

      dispatch({ type: LIKE_POST, payload: data.post });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete post from server
   * @param {String} postId Post ID, which we need to delete
   */
  const deletePost = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);

      dispatch({ type: DELETE_POST, payload: postId });
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    ...state,
    setLoading,
    getAllPosts,
    likePost,
    unLikePost,
    deletePost,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  return useContext(DataContext);
};

export { DataProvider };
