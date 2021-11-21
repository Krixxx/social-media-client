import React from 'react';
import { useUserContext } from '../context/userContext';
import { Profile, PostContainer } from '../components';

import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { user } = useUserContext();

  return (
    <>
      {!user && <Navigate to='/login' />}
      <Grid container padding={2} spacing={2}>
        <PostContainer />
        <Grid item sm={4} xs={12}>
          {user && <Profile />}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
