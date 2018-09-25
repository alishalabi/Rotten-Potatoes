// INITIALIZATION
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express()

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });


// ROUTES
const reviews = require('./controllers/reviews.js')(app);
const comments  = require('./controllers/comments.js')(app);
const movies = require('./controllers/movies.js')(app);

// SERVER
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app;
