import React, { useContext, useReducer } from 'react';

import axios from 'axios';
import '../axios';

import {
  SET_LOADING,
  GET_CURRENT_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
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
};

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  //   set loading to true
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  //   register user
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

  //   login user
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

  // get user data
  const getUserData = async () => {
    setLoading();

    try {
      const { data } = await axios.get('/users');
      dispatch({ type: GET_CURRENT_USER, payload: data.user });
    } catch (error) {
      //set loading to false, set user to null and show alert
      dispatch({ type: REGISTER_USER_ERROR });
    }
  };

  //   log out user
  const logout = () => {
    // clear localStorage
    localStorage.removeItem('user');

    //set user to null and do not show alert.
    dispatch({ type: LOGOUT_USER });
  };

  const value = { ...state, getUserData, setLoading, register, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider };
