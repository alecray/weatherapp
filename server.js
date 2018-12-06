const express = require('express') // require express library as a file server
const app = express()

app.set('view engine', 'ejs') 

app.use(express.static('public')); // make public folder visible for css

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.post('/', function(req, res) {
  res.render('index');
})
