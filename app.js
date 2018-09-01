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
      res.redirect('/reviews/${review._id}');
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
