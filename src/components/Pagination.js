import React from 'react';
import styled from 'styled-components';

const Pagination = ({ prevPage, nextPage, handlePage, page, maxPages }) => {
  //create an array of pages
  const pages = Array.from({ length: maxPages }, (_, i) => i);

  return (
    <Wrapper>
      <div className='btn-container'>
        <button className='prev-btn' onClick={prevPage}>
          prev
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
          next
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  button {
    border: none;
    text-decoration: none;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .btn-container {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  button .prev-btn.next-btn {
    color: #00bcd4;
  }
  .prev-btn {
  }
  .page-btn {
    width: 10px;
  }
  .active-btn {
    font-weight: bold;
  }
  .next-btn {
  }
`;

export default Pagination;
