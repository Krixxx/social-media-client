import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { EditDetails } from '../components';

// MUI
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

//MUI icons
import LocationOn from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import CalendarToday from '@mui/icons-material/CalendarToday';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';
import KeyboardReturn from '@mui/icons-material/KeyboardReturn';

import { useUserContext } from '../context/userContext';

const Profile = () => {
  const { user, userData, getUserData, isLoading, uploadImage, logout } =
    useUserContext();

  const handleLogout = () => {
    logout();
  };

  const { _id: id, name, createdAt, image, location, website } = userData;

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    const formData = new FormData();
    formData.append('image', imageFile);

    uploadImage(formData);
  };

  const handleEditPicture = (e) => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      {!isLoading ? (
        user ? (
          <Paper className='paper'>
            <div className='profile'>
              <div className='image-wrapper'>
                {image && <img src={image} alt='profile' />}
                <input
                  type='file'
                  id='imageInput'
                  hidden='hidden'
                  onChange={handleImageChange}
                />
                <Tooltip title='Edit profile picture' placement='top'>
                  <IconButton onClick={handleEditPicture} className='button'>
                    <Edit color='primary' />
                  </IconButton>
                </Tooltip>
              </div>
              <hr />
              <div className='profile-details'>
                <MuiLink
                  component={Link}
                  to={`/users/${id}`}
                  color='primary'
                  className='user-link'
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
              <div>
                <Tooltip title='Logout' placement='top'>
                  <IconButton className='logout' onClick={handleLogout}>
                    <KeyboardReturn color='primary' />
                  </IconButton>
                </Tooltip>
                <EditDetails />
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
    text-align: center;
    position: relative;
  }
  .image-wrapper .button {
    position: absolute;
    top: 85%;
    left: 75%;
  }
  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .user-link {
    text-decoration: none;
  }
  .profile-details a {
    color: #00bcd4;
  }
  hr {
    border: none;
    margin: 0 0 10px 0;
    /* height: 10px; */
    /* visibility: hidden; */
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .logout {
    float: left;
  }
`;

export default Profile;
