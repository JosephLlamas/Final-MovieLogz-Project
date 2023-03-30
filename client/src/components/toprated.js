import { useState, useEffect } from "react";
import React from "react";
import Loading from "./Loading";
import Pagination from "./Pagination";
import styled from "styled-components";

const toprated = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 360 / 20;
  const itemsPerPage = 20;

  useEffect(() => {
    fetch("/topRatedMovies")
      .then((response) => response.json())
      .then((data) => {
        setData(data.data.results);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);
  //pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = data.slice(startIndex, endIndex);

  return (
    <Wrapper>
      <HomePageTextWrap>
        <HomePageText>All Items</HomePageText>
      </HomePageTextWrap>
      {data.length === 0 ? (
        <Loading />
      ) : (
        <GridWrap>
          <AllItemGrid>
            {itemsToShow.map((items) => {
              return (
                <div key={items.id}>
                  <p>{items.title}</p>

                  <img
                    src={`https://image.tmdb.org/t/p/w500/${items.backdrop_path}`}
                    alt={items.title}
                  />
                </div>
              );
            })}
          </AllItemGrid>
        </GridWrap>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Wrapper>
  );
};

export default toprated;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: orange;
`;
const HomePageTextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const HomePageText = styled.h2`
  border-bottom: 3px solid black;
  width: 200px;
  text-align: center;
  font-family: "nimbus-sans", sans-serif;
  font-weight: 400;
  font-style: normal;
`;
const GridWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AllItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2em;
  margin-left: 5em;
`;
