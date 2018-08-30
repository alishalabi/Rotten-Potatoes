const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// This will create a mock array for us to test with
let reviews = [
  { title: "Outstanding Review Ali!! Good job" },
  { title: "Next Review"}
]

//This will render our index
 app.get('/', (req, res) => {
   res.render('reviews-index', { reviews: reviews });
})
