import React from 'react';
import { useAppContext } from '../context/appContext';

const Home = () => {
  const { user, isLoading } = useAppContext();

  return <div>{isLoading ? 'loading' : 'not loading'}</div>;
};

export default Home;
