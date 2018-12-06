// Apparently this project requires a paid subscription to the OpenWeatherMap service
// Quite disappointing to learn upon nearly completing the tutorial
// Bummer, man
// - Alec

// Run the server with the command: node server.js
// Express package is used here as a minimalist web framework & template engine for Node.js
const express = require('express') 

// BodyParser allows us to make use of key value pairs stored in req-body object
// This is similar to using a knockout binding
const bodyParser = require('body-parser');

// Create an express instance named 'app' and invoke the express package
const app = express() 

const request = require('request');
const apiKey = 'f2bd6e46d05daae459d848418b8acb49';

// Expose public folder for css visibility
app.use(express.static('public')); 

// By using body-parser, we can make use of the req.body object
app.use(bodyParser.urlencoded({ extended: true}));

// Set the view engine to be embedded javascript
app.set('view engine', 'ejs') 

// Focus the root url to render the index	
app.get('/', function (req, res) {
  	res.render('index', {weather: null, error:null});
})

/*
 * The app's form submits a post request to the / route, 
 * so we need to setup a route here
 *
 * Create a url string to access the OpenWeatherMap API
 */

app.post('/', function (req, res) {
	let city = req.body.city;
	// URL for api request
	let url = 'http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}'; 
	
	// Actual request
	request(url, function (err, response, body) {
	    if(err){
			// Render has a second argument which accepts an object where we can specify
			// Properties to be handled by our view (index.ejs)
 			//
			// ~Here we've added an Error string
			res.render('index', {weather: null, error: 'Error, please try again'});
			console.log('first error');
		} else {
			let weather = JSON.parse(body)
			console.log(weather);
			// If the user input a string that isnt a city
			// Render the view and also pass back an error 
			if(weather.main == undefined){
				res.render('index', {weather: null, error: 'Error, please try again'});
				console.log('second error');
			// Otherwise, show the weather!
			} else {
				let weatherText = 'It\'s ${weather.main.temp} degrees in ${weather.name}!';
				res.render('index', {weather: weatherText, error: null});
			}
		}
	});
})

// Listen for connections on port 3000
app.listen(3000, function () {
	('Example app listening on port 3000!')
})
