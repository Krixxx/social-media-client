import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { ProfileSkeleton } from '../components';

// MUi
import Paper from '@mui/material/Paper';
import MuiLink from '@mui/material/Link';

//MUI icons
import LocationOn from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import CalendarToday from '@mui/icons-material/CalendarToday';
import { useUserContext } from '../context/userContext';

const StaticProfile = ({ profile, loading }) => {
  const { getUserData } = useUserContext();

  const { _id: id, name, createdAt, image, location, website } = profile;

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <Wrapper>
      {!loading ? (
        <Paper className='paper'>
          <div className='profile'>
            <div className='image-wrapper'>
              {image && <img src={image} alt='profile' />}
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
                  <a
                    href={
                      website.startsWith('http') //is website address starts with http
                        ? website // then use given address
                        : `http://${website}` // else add http:// to the beginning of website
                    }
                    target='_blank'
                    rel='noopener noreferrer external'
                  >
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
        <ProfileSkeleton />
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

export default StaticProfile;
