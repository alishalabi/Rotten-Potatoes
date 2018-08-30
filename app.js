const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

const Review = mongoose.model('Review', {
  title: String
});

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//This will render our index
 app.get('/', (req, res) => {
   Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// This will create a mock array for us to test with
// let reviews = [
//   { title: "Outstanding Review Ali!! Good job" },
//   { title: "Next Review" },
//   { title: "Additional Review" }
// ]
