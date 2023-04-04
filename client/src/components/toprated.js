import { useState, useEffect } from "react";
import React from "react";
import Loading from "./Loading";
import Pagination from "./Pagination";
import styled,{keyframes} from "styled-components";
import {useNavigate} from "react-router-dom";
import WatchlistButton from "../components/WishListButton";

const toprated = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 360 / 20;
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;
  const navigate =useNavigate();

  useEffect(() => {
    fetch(`/topRatedMovies?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data.results);
        setTotalPages(Math.min(Math.ceil(data.data.total_results / itemsPerPage), 20));
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [currentPage]);

  //pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = data.slice(startIndex, endIndex);
  console.log(itemsToShow);
  return (
    <Wrapper>
      <HomePageTextWrap>
      <HomePageText> Welcome!</HomePageText>
      </HomePageTextWrap>
      {data.length === 0 ? (
        <Loading />
      ) : (
        <GridWrap>
          <AllItemGrid>
            {data.map((items) => {
              return (
                <div>
                <div key={items.id}
                onClick={(event)=>{
                  event.stopPropagation();
                  navigate(`/movie/${items.id}`);
                  }}
                >

                  <p>{items.title}</p>

                  <Img
                    src={`https://image.tmdb.org/t/p/w500/${items.backdrop_path}`}
                    alt={items.title}
                  />
                </div>
                <WatchlistButton item={items}/>
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

const Img = styled.img`
max-width: 100%;
  height: auto;
  border-radius: 20px;

`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: orange;
`;
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;


const HomePageTextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: ${slideIn} 1s ease-out forwards;

  z-index: 1; //adjusted

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

