import React, { useContext, useReducer, useCallback } from 'react';

import axios from 'axios';
import '../axios';

import {
  SET_LOADING,
  GET_CURRENT_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  UPLOAD_IMAGE_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LIKE_POST,
  UNLIKE_POST,
  GET_ALL_LIKES,
  MARK_NOTIFICATIONS_READ,
  SET_PAGE,
} from '../utils/actions';

import userReducer from '../reducers/userReducer';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  user: user ? JSON.parse(user) : null,
  userData: {},
  token: token,
  isLoading: false,
  showAlert: false,
  likes: [],
  notifications: [],
  page: 0,
};

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  /**
   * Set loading state to true
   */
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  /**
   * Regiter user in server
   * @param {Object} userInput User registration information - e-mail, password, username
   */
  const register = async (userInput) => {
    setLoading();

    try {
      // get response data from API
      const { data } = await axios.post('/auth/register', { ...userInput });

      //set loading to false and set user
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name });

      //save user authorization info to localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      //set loading to false, set user to null and show alert
      dispatch({ type: REGISTER_USER_ERROR });
    }
  };

  /**
   * Log user into server
   * @param {Object} userInput User login informaiton - email and password
   */
  const login = async (userInput) => {
    setLoading();

    try {
      const { data } = await axios.post('/auth/login', { ...userInput });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name });
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      //set loading to false, set user to null and show alert
      dispatch({ type: REGISTER_USER_ERROR });
    }
  };

  /**
   * Get all user likes - NOT USED
   */
  const getAllUserLikes = async () => {
    try {
      const { data } = await axios.get('/users/likes');

      dispatch({ type: GET_ALL_LIKES, payload: data.likes });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Get user data - we get user data, likes and notifications
   */
  const getUserData = useCallback(async () => {
    setLoading();

    try {
      const { data } = await axios.get('/users');

      dispatch({ type: GET_CURRENT_USER, payload: data.userData });

      // getAllUserLikes();
    } catch (error) {
      //set loading to false, set user to null and show alert
      dispatch({ type: REGISTER_USER_ERROR });
    }
  }, []);

  /**
   * Get all user data for User page
   */
  const getAllUserData = useCallback(async (userId) => {
    setLoading();

    try {
      const { data } = await axios.get(`/users/user/${userId}`);

      dispatch({ type: GET_CURRENT_USER, payload: data.user });

      // getAllUserLikes();
    } catch (error) {
      //set loading to false, set user to null and show alert
      dispatch({ type: REGISTER_USER_ERROR });
    }
  }, []);

  /**
   * Log out user from server
   */
  const logout = () => {
    // clear localStorage
    localStorage.removeItem('user');

    //set user to null and do not show alert.
    dispatch({ type: LOGOUT_USER });
  };

  /**
   * Load user image
   * We use updateUser function, to update user image
   * @param {*} formData User image file
   */
  const uploadImage = async (formData) => {
    setLoading();

    let imageValue;
    try {
      const {
        data: {
          image: { src },
        },
      } = await axios.post('/users/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      imageValue = src;

      updateUser({ image: imageValue });
      // const { data } = await axios.patch('/users', { image: imageValue });

      // dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data.user });
    } catch (error) {
      imageValue = null;

      dispatch({ type: UPLOAD_IMAGE_ERROR });
    }
  };

  /**
   * Update user data fields
   * @param {Object} userData User information
   */
  const updateUser = async (userData) => {
    setLoading();

    try {
      const { data } = await axios.patch('/users', { ...userData });

      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: UPDATE_USER_ERROR });
    }
  };

  /**
   * Add like
   * @param {Object} like Like object
   */
  const likeUserPost = (like) => {
    dispatch({ type: LIKE_POST, payload: like });
  };

  /**
   * Remove like
   * @param {Object} like Like object
   */
  const unLikeUserPost = (like) => {
    dispatch({ type: UNLIKE_POST, payload: like });
  };

  /**
   * Mark user notifications read
   * @param {Array} notificationIds Array of notification IDs
   */
  const markNotificationsRead = async (notificationIds) => {
    //TODO: send out array of notification Id's.

    try {
      await axios.patch('/notifications', { _id: notificationIds });

      dispatch({ type: MARK_NOTIFICATIONS_READ });
    } catch (error) {
      console.log(error);
    }
  };

  const setPage = (page) => {
    dispatch({ type: SET_PAGE, payload: page });
  };

  const value = {
    ...state,
    getUserData,
    getAllUserData,
    setLoading,
    register,
    login,
    logout,
    uploadImage,
    updateUser,
    likeUserPost,
    unLikeUserPost,
    markNotificationsRead,
    setPage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider };
