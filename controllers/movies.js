const Review = require('../models/review');

const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('dcf608bd9d62b2bff51b0ac928dae0c4');

module.exports = function(app) {
  app.get('/now-playing', (req, res) => {
    moviedb.miscNowPlayingMovies().then(response => {
      var movies = response.results;
      console.log(movies);
      res.render('movies-index', { movies });
    }).catch(console.error)
  })
};
