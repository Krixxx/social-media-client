import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { Post } from '../components';

import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { isLoading, getAllPosts, posts, user } = useAppContext();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {!user && <Navigate to='/login' />}
      <Grid container padding={2} spacing={16}>
        <Grid item sm={8} xs={12}>
          {isLoading ? (
            <p>Loading..</p>
          ) : posts ? (
            posts.map((post, index) => {
              return <Post key={index} post={post} />;
            })
          ) : (
            <p>Loading...</p>
          )}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
