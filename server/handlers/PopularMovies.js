

require("dotenv").config();
const { MOVIE_API } = process.env;


//GET ALL PopulaMovies

const popularMovies = async (req, res) => {
  page = req.query.page || 1;
  const options = {
    method: "GET",
    uri: `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API}&language=en-US&page=${page}`,
    headers: {
      useQueryString: true,
    },
  };
  try {
    const response = await request(options);
    const data = await JSON.parse(response);
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