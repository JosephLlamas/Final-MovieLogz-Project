const request = require("request-promise");
require("dotenv").config();
const movieAPI = process.env.MOVIE_API;

//GET ALL PopularMovies

const popularMovies = async (req, res) => {
  page = req.query.page || 1;
  const options = {
    method: "GET",
    uri: `https://api.themoviedb.org/3/movie/popular?api_key=${movieAPI}&language=en-US&page=${page}`,
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const response = await request(options);

    const data = JSON.parse(response);
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
};

module.exports = { popularMovies };
