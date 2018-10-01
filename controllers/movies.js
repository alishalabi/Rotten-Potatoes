const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('dcf608bd9d62b2bff51b0ac928dae0c4');
const Review = require('../models/review');

module.exports = function(app) {
  app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then(response => {
      var movies = response.results;
      // Test to see if we are getting information form our API
      // console.log(movies);
      res.render('movies-index', { movies });
    }).catch(console.error)
  })

  app.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({ id: req.params.id }).then(movie => {
    moviedb.movieTrailers({ id: req.params.id }).then(videos => {
    movie.trailer_youtube_id = videos.youtube[0].source
    console.log('VIDEOS.TRAILER_YOUTUBE_ID', videos.trailer_youtube_id)
    renderTemplate(movie)
  });

  function renderTemplate(movie)  {
    res.render('movies-show', { movie: movie });
  }
}).catch(console.error)
});

};
