import React, { useState } from 'react';
import styled from 'styled-components';
import AppIcon from '../assets/images/logo.png';
import { Link, Navigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { useUserContext } from '../context/userContext';

const Signup = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { isLoading, register, showAlert, user } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword, name } = values;

    if (password !== confirmPassword) {
      setError(false);
      setError(true);
      setErrorText('Password do not match');
    } else if (password.length < 6) {
      setError(false);
      setError(true);
      setErrorText('Minimum length 6 characters');
    } else {
      setError(false);
      const userInput = {
        email,
        password,
        name,
      };

      register(userInput);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      {user && <Navigate to='/' />}
      <Wrapper>
        <Grid container className='form'>
          <Grid item sm />
          <Grid item className='center' sm>
            <img src={AppIcon} alt='icon' className='image' />
            <Typography variant='h2' className='pageTitle'>
              Signup
            </Typography>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                id='email'
                name='email'
                type='email'
                label='Email'
                variant='standard'
                className='textField'
                value={values.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                id='password'
                name='password'
                type='password'
                label='Password'
                variant='standard'
                className='textField'
                value={values.password}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                label='Confirm Password'
                variant='standard'
                helperText={errorText}
                error={error ? true : false}
                className='textField'
                value={values.confirmPassword}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                id='name'
                name='name'
                type='text'
                label='Username'
                variant='standard'
                className='textField'
                value={values.name}
                onChange={handleChange}
                fullWidth
              />
              {showAlert && (
                <Typography variant='body2' className='customError'>
                  Invalid Credentials!
                </Typography>
              )}
              <Button
                type='submit'
                variant='contained'
                disabled={isLoading}
                className='button'
              >
                Sign up
                {isLoading && (
                  <CircularProgress size={30} className='progress' />
                )}
              </Button>
              <br />
              <small>
                Already have an account? Login <Link to='/login'>here</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  .form {
    text-align: center;
  }
  .center {
    margin: 0 auto;
  }
  .image {
    height: 70px;
    margin: 20px auto 10px auto;
  }
  .pageTitle {
    margin: 10px auto;
  }
  .textField {
    margin: 10px auto;
  }
  .button {
    margin-top: 10px;
    position: relative;
  }
  .customError {
    color: red;
    margin-top: 10px;
  }
  .progress {
    position: absolute;
  }
`;

export default Signup;
