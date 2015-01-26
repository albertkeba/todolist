/*global require, __dirname*/

var express = require('express'),
	session	= require('cookie-session'),
	bParser	= require('body-parser'),
	uEncoder= bParser.urlencoded({ extended: false }),
	app		= express(),
	handlebar= require('express3-handlebars');

app.engine('html', handlebar({extname: 'html', defaultLayout: 'main.html'}));
app.set('view engine', 'html')
	.set('port', 3000);

app.use( session({secret: 's8X7sty9yn'}) )
	.use(function(req, res, next){
		'use strict';
	
		if ( typeof(req.session.todolist) === 'undefined' )
		{
			req.session.todolist = [];
		}
	
		next();
	});

app.get('/',function(req, res){
	'use strict';

	res.render('index',{todolist: req.session.todolist});
});

app.post('/add', uEncoder, function(req, res){
	'use strict';
	
	if ( req.body.newtodo !== null )
	{
		var todo = {
			id	: req.session.todolist.length,
			name: req.body.newtodo
		};
		req.session.todolist.push( todo );
	}
	
	res.redirect('/');
});

app.get('/delete/:id', function(req, res){
	'use strict';
	
	if ( req.params.id !== '' )
	{
		req.session.todolist.splice( req.params.id, 1 );
	}
	
	res.redirect('/');
});

app.get('/reset', function(req, res){
	'use strict';
	
	req.session.todolist = [];
	
	res.redirect('/');
});

app.listen(3000, function(){
	'use strict';
});