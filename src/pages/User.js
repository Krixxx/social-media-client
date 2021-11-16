import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StaticProfile, UserPostContainer } from '../components';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { useUserContext } from '../context/userContext';
import { useDataContext } from '../context/dataContext';

const User = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const { id: userId } = useParams();
  const { user } = useUserContext();
  const { getAllUserPosts, posts } = useDataContext();

  /**
   * Get user Data and all Posts. Then set them to states.
   * @param {String} userId User ID, which we get from url parameters
   */
  const getData = async (userId) => {
    setLoading(true);

    const { data } = await axios.get(`/users/user/${userId}`);

    setProfile(data.user);

    setLoading(false);
  };

  useEffect(() => {
    getData(userId);
    getAllUserPosts(userId);
  }, [userId, getAllUserPosts]);

  return (
    <>
      {!user && <Navigate to='/login' />}
      <Grid container padding={2} spacing={2}>
        <UserPostContainer posts={posts} loading={loading} />
        <Grid item sm={4} xs={12}>
          {profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <StaticProfile profile={profile} loading={loading} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default User;
