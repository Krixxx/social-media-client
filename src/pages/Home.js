import React, { useEffect } from 'react';
import { useUserContext } from '../context/userContext';
import { useDataContext } from '../context/dataContext';
import { Post } from '../components';

import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { isLoading, user } = useUserContext();
  const { isLoadingData, getAllPosts, posts } = useDataContext();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {!user && <Navigate to='/login' />}
      <Grid container padding={2} spacing={16}>
        <Grid item sm={8} xs={12}>
          {isLoadingData ? (
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
