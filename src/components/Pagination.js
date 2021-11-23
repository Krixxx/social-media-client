import React from 'react';
import styled from 'styled-components';

//MUI Icons
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';

const Pagination = ({ prevPage, nextPage, handlePage, page, maxPages }) => {
  //create an array of pages
  const pages = Array.from({ length: maxPages }, (_, i) => i);

  return (
    <Wrapper>
      <div className='btn-container'>
        <button className='prev-btn' onClick={prevPage}>
          <NavigateBefore />
        </button>
        {pages.map((_, index) => {
          return (
            <button
              key={index}
              className={`page-btn ${index === page ? 'active-btn' : null}`}
              onClick={() => handlePage(index)}
            >
              {index + 1}
            </button>
          );
        })}
        <button className='next-btn' onClick={nextPage}>
          <NavigateNext />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  text-align: center;
  button {
    border: none;
    text-decoration: none;
    background: none;
    cursor: pointer;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .btn-container {
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
  button svg {
    color: #1976d2;
  }
  .prev-btn {
    display: flex;
    align-items: center;
  }
  .next-btn {
    display: flex;
    align-items: center;
  }
  .page-btn {
    width: 10px;
  }
  .active-btn {
    font-weight: bold;
    transform: scale(1.1);
    color: #1976d2;
  }
`;

export default Pagination;
