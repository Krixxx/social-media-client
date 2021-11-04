import React, { useContext, useReducer } from 'react';

import axios from 'axios';
import '../axios';

import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
} from '../utils/actions';

import reducer from './reducer';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  user: null,
  isLoading: false,
  showAlert: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  //   log out user
  const logout = () => {
    // clear localStorage
    localStorage.removeItem('user');

    //set user to null and do not show alert.
    dispatch({ type: LOGOUT_USER });
  };

  const value = { ...state, setLoading, register, login, logout };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
