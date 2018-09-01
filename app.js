const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Action: Index
 app.get('/', (req, res) => {
   Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// Action: New
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

//Action: Create
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((reviews) => {
      console.log(reviews);
      res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

// This will create a mock array for us to test with
// let reviews = [
//   { title: "Outstanding Review Ali!! Good job" },
//   { title: "Next Review" },
//   { title: "Additional Review" }
// ]
