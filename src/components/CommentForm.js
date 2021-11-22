import React, { useState } from 'react';
import styled from 'styled-components';

//MUI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { useUserContext } from '../context/userContext';
import { useDataContext } from '../context/dataContext';

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState({ message: '' });

  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const { user } = useUserContext();
  const { postComment } = useDataContext();

  /**
   * clear error states.
   */
  const removeError = () => {
    setError('');
    setIsError(false);
  };

  /**
   * Handle changes in comment textinput. Also clear errors, if there are any.
   * @param {Event} e event
   */
  const handleChange = (e) => {
    setComment({ message: e.target.value });
    removeError();
  };

  /**
   * Submit comment. If no text in comment textfield, the set the error.
   * @param {Event} e event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.message !== '') {
      postComment(postId, comment);
      removeError();
    } else {
      setIsError(true);
      setError('Comment cannot be empty!');
    }
  };

  return (
    <Wrapper>
      {user ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name='message'
              type='text'
              label='Comment on post'
              multiline
              rows='2'
              helperText={error}
              error={isError ? true : false}
              value={comment.message}
              onChange={handleChange}
              fullWidth
              className='textfield'
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='button'
            >
              Submit
            </Button>
          </form>
          <hr className='visible-separator' />
        </Grid>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  .button {
    margin: 10px auto;
  }
`;

export default CommentForm;
