var serverPort = process.env.port || 3003;

var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', function (req, res) {
	res.send('Hello World');
});


const isEmailTaken = (email) => {
	return new Promise((resolve, reject) =>
	{
		var userEmails = ["radi@abv.bg", "radi@yahoo.com"];
		if ( userEmails.indexOf(email) > -1 ) {
			reject("Error. Email is taken.");
		}
		else {
			resolve('Success. User registered.');
		}
  });
};

app.post(
	'/',
	[
	check('username')
	.isEmail()
	.withMessage('must be an email')
	.trim()
	.normalizeEmail()
	.custom(email => {
		return isEmailTaken(email)
		.then(user => { return user; })
	}),

	check('password', 'passwords must be at least 5 chars long and contain one number')
	.isLength({ min: 5 })
    .matches(/\d/)
	], 
	function(req, res, next) {
		const errors = validationResult(req);
  		if (!errors.isEmpty()) {
    		return res.status(422).json({ errors: errors.mapped() });
  		}

  		// matchedData returns only the subset of data validated by the middleware
  		const user = matchedData(req);
		res.json(user);
	}
);

app.listen(serverPort, function() {
	console.log("Server started on port " + serverPort);
});
