import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAppContext();

  console.log(user);

  return (
    <Route
      {...rest}
      render={(props) => {
        return !user ? <Navigate to='/login' /> : <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
