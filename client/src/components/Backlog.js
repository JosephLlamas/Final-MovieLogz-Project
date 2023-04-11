import React from "react";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import styled, { keyframes } from "styled-components";

const Backlog = () => {
  const { currentUser } = useContext(UserContext);
  const [info, setInfo] = useState([]);
  const [refresh, setRefresh] = useState();
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    fetch(`/viewWatchlist/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo(data.data);
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  const handleClickButtonDelete = (id) => {
    fetch(`/deleteMovie/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        setRefresh(data.data);
        setClickCount(clickCount + 1);
      });
  };

  if (!info.watchlist) {
    return <Loading />;
  }

  return (
    <div>
      {clickCount === 3 && (
        <Banner>
          Congratulations! I see you love movies, but you seriously need to take
          a break.{" "}
        </Banner>
      )}
      {clickCount === 2 && <Banner>Keep up the great work! </Banner>}
      {info.watchlist.length === 0 ? (
        <H2>
          Click <Link to={"/"}>here</Link> for more Movies!
        </H2>
      ) : (
        <>
          <Grid>
            {info.watchlist.map((item) => {
              return (
                <Container
                key={item.id}
                >
                  <Content >
                    <Img
                      src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                      alt={item.title || "Movie Poster"}
                    />

                    <Words>
                      <P>{item.title}</P>
                    </Words>

                    <Button
                      onClick={() => {
                        handleClickButtonDelete(item.id);
                      }}
                    >
                      <Span>DONE WATCHING</Span>
                    </Button>
                  </Content>
                </Container>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Backlog;
//hello
const H2 = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding-top: 50px;
`;

const moveLeftToRight = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const Banner = styled.div`
  animation: ${moveLeftToRight} 10s linear infinite;
  background-color: orange;
  color: #000;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
`;

const Grid = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2em;
  margin-left: 5em;
  margin-right: 10em;
`;

const Span = styled.div`
  margin: 0 auto;
`;
const Button = styled.button`
  font-weight: bold;

  align-items: center;
  background-color: #fee6e3;
  border: 2px solid #111;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: Inter, sans-serif;
  font-size: 16px;
  height: 48px;
`;

const P = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
const Words = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;

  background-color: #800020;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;

  margin-bottom: 20px;
`;
