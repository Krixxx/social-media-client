import React from 'react';
import styled from 'styled-components';

import NoImg from '../../assets/images/no_image.png';

// MUI
import Paper from '@mui/material/Paper';

//MUI icons
import LocationOn from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import CalendarToday from '@mui/icons-material/CalendarToday';

const ProfileSkeleton = () => {
  return (
    <Wrapper>
      <Paper className='paper'>
        <div className='profile'>
          <div className='image-wrapper'>
            <img src={NoImg} alt='profile' className='profile-image' />
          </div>
          <hr />
          <div className='profile-details'>
            <div className='handle' />
            <hr />
            <div className='item'>
              <LocationOn color='primary' /> <span>Location</span>
            </div>
            <hr />
            <div className='item'>
              <LinkIcon color='primary' /> https://website.com
            </div>
            <hr />
            <div className='item'>
              <CalendarToday color='primary' /> Joined date
            </div>
          </div>
        </div>
      </Paper>
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
  .handle {
    height: 20px;
    width: 60px;
    background-color: #00bcd4;
    margin: 0 auto 7px auto;
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
  hr {
    border: none;
    margin: 0 0 10px 0;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

export default ProfileSkeleton;
