const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('dcf608bd9d62b2bff51b0ac928dae0c4')

app.get('/', (req, res) => {
  moviedb.miscNowPlayingMovies().then(response => {
    res.render('movies-index', { movies: response.results });
  }).catch(console.error)
})
