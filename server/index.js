"use strict";

const express = require("express");
const morgan = require("morgan");

const { popularMovies } = require("./handlers/PopularMovies");


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

//Error message
.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Error",
  });
})

  .listen(PORT, () => console.info(`Listening on port ${PORT}`)); 