var express = require('express');
var app = express();

var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/penguinquotes');

var quotes = new mongoose.Schema({
    quote: String
});

var Quotes = mongoose.model('quotes', quotes);

/* Config */
var port = process.env.PORT || 80;

/* API ROUTES */
app.get('/quotes', function(req, res){
	Quotes.find({}, function(err, items){

		if(err){
			console.log("There was an error: " + err);
			return;
		}

		console.log("Got data!");
		res.json(items);

	});
});

app.get('/create', function(req, res){

	var quotee = req.query.quote;

	console.log(quotee);

	data = new Quotes({quote: quotee});

	data.save(function(err, dataObj){

		if(err){
			console.log("Error in 'create': " + err);
		}

		res.send(dataObj);

	});

});

/* Start app and log it */
app.listen(port, function(){
	console.log("App active and running on: " + port);
});
