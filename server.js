// Run the server with the command: node server.js
// Express package is used here as a minimalist web framework & template engine for Node.js
const express = require('express') 

// Create an express instance named 'app' and invoke the express package
const app = express() 


const bodyParser = require('body-parser');

// Set the view engine to be embedded javascript
app.set('view engine', 'ejs') 

// Expose public folder for css visibility
app.use(express.static('public')); 

// BodyParser allows us to make use of key value pairs stored in req-body object
// This is similar to using a knockout binding
// By using body-parser, we can make use of the req.body object
app.use(bodyParser.urlencoded({ extended: true}));

// Focus the root url to render the index	
app.get('/', function (req, res) {
  res.render('index')
})

// Listen for connections on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// The app's form submits a post request to the / route, 
// so we need to setup a route here
app.post('/', function(req, res) {
  res.render('index');
  console.log(req.body.city);
})

