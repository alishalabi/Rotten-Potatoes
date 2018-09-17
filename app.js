// import reviews from 'reviews';
const bodyParser = require('body-parser');
const express = require('express')
const methodOverride = require('method-override')
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'))

const reviews = require('./controllers/reviews.js')(app)

// Edited out - final steps of tutorial
const Review = require('./models/review.js');

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

// function addGrade() {
//   document.getElementById("dropdownGrade").classList.toggle("show");
// }
//
// // Sample code from w3schools.com to add dropdown menu
// // Will close dropdown window if you click outside window
// onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//
//     var dropdowns = document.getElementByClassName("dropdown-content");
//     var i;
//     for (i = 0; i <dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

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
      res.redirect(`/reviews/${reviews._id}`);
  }).catch((err) => {
    console.log(err.message);
  })
})

//Action: Show
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

// Action: Edit
app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', { review: review});
  })
})

// Action: Update
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

//Action: Delete
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

// DELETE comment
app.delete('/reviews/comments/:id', function (req, res) {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    res.redirect(`/reviews/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})
module.exports = app;
