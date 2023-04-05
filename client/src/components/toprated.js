import { useState, useEffect } from "react";
import React from "react";
import Loading from "./Loading";
import Pagination from "./Pagination";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import WatchlistButton from "../components/WishListButton";
import { AiTwotoneStar } from "react-icons/ai";

const toprated = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/topRatedMovies?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data.results);
        setTotalPages(
          Math.min(Math.ceil(data.data.total_results / itemsPerPage), 20)
        );
      })
      .catch((err) => console.error(err));
  }, [currentPage]);

  //pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  data.slice(startIndex, endIndex);

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
                <Container>
                  <div
                    key={items.id}
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/movie/${items.id}`);
                    }}
                  >
                    <Words>
                      <Title>{items.title}</Title>
                      <p>
                        <Rating>RATING:</Rating>
                        <Span>
                          {items.vote_average}
                          <AiTwotoneStar />
                        </Span>
                      </p>
                    </Words>
                    <Img
                      src={`https://image.tmdb.org/t/p/w500/${items.backdrop_path}`}
                      alt={items.title}
                    />
                  </div>

                  <Backlog>
                    <span>ADD TO BACKLOG</span>
                    <WatchlistButton item={items} />
                  </Backlog>
                </Container>
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

const Span = styled.span`
  font-size: 20px;
`;

const Rating = styled.span`
  font-weight: bold;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

const Words = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Backlog = styled.div`
  display: flex;
  font-size: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #800020;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

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

  z-index: 1;
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
  margin-right: 100px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2em;
  margin-left: 5em;
`;
