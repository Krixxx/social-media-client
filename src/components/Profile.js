import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';

//MUI icons
import LocationOn from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import CalendarToday from '@mui/icons-material/CalendarToday';

import { useUserContext } from '../context/userContext';

const Profile = () => {
  const { _id: id, user, userData, getUserData, isLoading } = useUserContext();

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  // When loading Home screen, we get following error: GET http://localhost:5000/undefined 404 (Not Found)
  // This is caused by profile image loading. At first, image is undefined (when we get an error), and then we fetch image address with useEffect()

  const { name, createdAt, image, location, website } = userData;

  return (
    <Wrapper>
      {!isLoading ? (
        user ? (
          <Paper className='paper'>
            <div className='profile'>
              <div className='image-wrapper'>
                {image && (
                  <img src={`http://localhost:5000/${image}`} alt='profile' />
                )}
              </div>
              <hr />
              <div className='profile-details'>
                <MuiLink
                  component={Link}
                  to={`/users/${id}`}
                  color='primary'
                  variant='h5'
                >
                  @{name}
                </MuiLink>
                <hr />
                {location && (
                  <div className='item'>
                    <LocationOn color='primary' />
                    <span>{location}</span>
                  </div>
                )}
                {website && (
                  <div className='item'>
                    <LinkIcon color='primary' />
                    <a href={website} target='_blank' rel='noopener noreferrer'>
                      {' '}
                      {website}
                    </a>
                  </div>
                )}
                <div className='item'>
                  <CalendarToday color='primary' />{' '}
                  <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
              </div>
            </div>
          </Paper>
        ) : (
          <Paper className='paper'>
            <Typography variant='body2' align='center'>
              No profile found, please login again
            </Typography>
            <div className='buttons'>
              <Button
                variant='contained'
                color='primary'
                component={Link}
                to='/login'
              >
                Login
              </Button>
              <Button
                variant='contained'
                color='secondary'
                component={Link}
                to='/register'
              >
                Sign up
              </Button>
            </div>
          </Paper>
        )
      ) : (
        <p>Loading...</p>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .paper {
    padding: 20px;
    text-align: center;
  }
  .profile {
    text-align: center;
    display: grid;
  }
  .image-wrapper {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    position: relative;
  }
  .image-wrapper img {
    width: 100%;
    object-fit: cover;
    /* border-radius: 50%; */
  }
  .profile-details {
    text-align: center;
  }
  .profile-details span svg {
    vertical-align: middle;
  }
  hr {
    height: 10px;
    visibility: hidden;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

export default Profile;
