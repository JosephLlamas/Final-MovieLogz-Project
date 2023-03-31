"use strict";

const express = require("express");
const morgan = require("morgan");

const { popularMovies } = require("./handlers/PopularMovies");
const { TopRatedMovies } = require("./handlers/TopRatedMovies");
const {createUser,signin,deleteMovie} = require("./handlers/MongoHandlers")
const { getMovieById } = require("./handlers/MoviebyId");
const { addToWatchList } = require("./handlers/WishlistButton");

const PORT = 4000;

express()
.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
.use(morgan("tiny"))
.use(express.static("./server/assets"))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use("/", express.static(__dirname + "/"))

///MOVIE ENDPOINTS
.get("/popularMovies", popularMovies)
.get("/topRatedMovies", TopRatedMovies)
.get("/movieById/:movieId", getMovieById)

//add User
.post("/addUser", createUser)
.get("/signIn/:email/:password", signin)


.post("/watchlist", addToWatchList)
//delete Movie ID from watchlist
.delete("/deleteMovie/:id", deleteMovie)


//Error message
.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Error",
  });
})

  .listen(PORT, () => console.info(`Listening on port ${PORT}`)); 