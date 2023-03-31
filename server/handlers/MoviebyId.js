const request = require("request-promise");
require("dotenv").config();
// const { MOVIE_API } = process.env;
const movieAPI = process.env.MOVIE_API;

//GET MOVIE BY ID

const getMovieById = async (req, res) => {
  const {movieId} = req.params;
  const options = {
    uri: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieAPI}&language=en-US`,
    headers: {
        Accept: "application/json",
    },
    
  };
  try {
    const response = await request(options)
    
    const data = JSON.parse(response)
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      err,
    });
  }
}; 

//DELETE MOVIE BY ID




module.exports = { getMovieById };