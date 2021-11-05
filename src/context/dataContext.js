import React, { useContext, useReducer } from 'react';

import axios from 'axios';
import '../axios';

import {
  SET_LOADING,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_ERROR,
} from '../utils/actions';

import dataReducer from '../reducers/dataReducer';

const user = localStorage.getItem('user');

const initialState = {
  user: user ? JSON.parse(user) : null,
  isLoadingData: false,
  showAlert: false,
  posts: [],
};

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  //   set loading to true
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // get all posts
  const getAllPosts = async () => {
    setLoading();

    try {
      const { data } = await axios.get('/public');

      dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data.posts });
    } catch (error) {
      dispatch({ type: GET_ALL_POSTS_ERROR });
    }
  };

  const value = { ...state, setLoading, getAllPosts };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  return useContext(DataContext);
};

export { DataProvider };
