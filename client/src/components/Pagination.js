import React from "react";
import styled from "styled-components";

//COMPONENET FOR IMPLEMENTING PAGES AT BOTTOM OF PAGE

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationWrap>
      <UnList className="pagination">
        {pageNumbers.map((number) => (
          <List
            key={number}
            className={`page-item${currentPage === number ? " active" : ""}`}
          >
            <A
              href="#"
              className="page-link"
              onClick={() => onPageChange(number)}
            >
              {number}
            </A>
          </List>
        ))}
      </UnList>
    </PaginationWrap>
  );
};

const PaginationWrap = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const UnList = styled.ul`
  text-decoration: none;
`;
const List = styled.li`
  display: inline;
  text-decoration: none;
  padding: 10px;
`;
const A = styled.a`
  text-decoration: none;
  color: black;
  font-size: 20px;
`;

export default Pagination;
