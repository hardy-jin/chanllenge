// require the library that needed,
// I use the "express" framework
var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routers/index_router');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(session({
   name: 'usersession',
   secret: 'testing',
   store: new FileStore(),
   saveUninitialized: false,
   resave: true,
   cookie: {
     maxAge: 1000 * 60 * 60 * 3
   }
 }));

app.use('/', indexRouter);


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
