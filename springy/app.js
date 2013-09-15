
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

// baker add
app.get('/springy', routes.springy);
app.get('/springy2', routes.springy2);
app.get('/test', routes.test);
app.get('/jstest',routes.jstest);
app.get('/jstest/:id', function(req,res) {
	res.render('jstest/' + req.params.id + '.jade', { title : 'Javascript Ninja' });
});
app.get('/lifegame',routes.lifegame);
app.get('/processing',routes.processing);
app.get('/processing/:id', function(req,res) {
	res.render('processing/index.jade', { title : 'PROCESSING SAMPLE', pde_file : req.params.id });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
