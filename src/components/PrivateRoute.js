import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useUserContext();

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
