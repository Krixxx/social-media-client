import React, { useEffect } from 'react';
import { useUserContext } from '../context/userContext';
import { useDataContext } from '../context/dataContext';
import { Post, Profile } from '../components';

import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { user } = useUserContext();
  const { isLoadingData, getAllPosts, posts } = useDataContext();

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!user && <Navigate to='/login' />}
      <Grid container padding={2} spacing={2}>
        <Grid item sm={8} xs={12}>
          {isLoadingData ? (
            <p>Loading..</p>
          ) : posts ? (
            posts.map((post, index) => {
              return <Post key={post._id} post={post} />;
            })
          ) : (
            <p>Loading...</p>
          )}
        </Grid>
        <Grid item sm={4} xs={12}>
          {user && <Profile />}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
