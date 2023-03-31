import React from 'react'
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Loading from "./Loading";

const SpecificMovie = () => {
  const [movie, setMovie] = useState([]);
  const {movieId} = useParams();

  useEffect(() => {
    fetch(`/movieById/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Wrapper>
      {!movie ? (
        <Loading/>
        ) : (
          <Container>
            <Img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>

            <Description>
            <Title>{movie.title}</Title>
            <Views><Label>VIEWS:</Label>{movie.popularity}</Views>
            <Date><Label>RELEASE DATE:</Label>{movie.release_date}</Date>
            <Summary><Label>Synopsis:</Label>{movie.overview}</Summary>
            </Description>

          </Container>
        )}
    </Wrapper>
  )
}

export default SpecificMovie;

const Date= styled.p`
margin-bottom:20px;

`;
const Summary= styled.p`
margin-bottom:20px;
font-size: 20px;
`;

const Views= styled.p`
margin-bottom:20px;
margin-top:20px;
`;

const Title = styled.p`
  margin: 0 0 10px 0;
  font-weight: bold;
`;


const Label = styled.span`
  font-weight: bold;
`;

const Description = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const Container =styled.div`

display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #800020;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: orange;
  
`;
const Img = styled.img`
max-width: 50%;
  height: auto;
  border-radius: 20px;

`;