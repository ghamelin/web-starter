var express = require('express'),
    app    = express(),
    port   = process.env.PORT || 5000,
    morgan = require('morgan'),
    router = require('./app/routes');


// configure
app.use(morgan('dev'));

//set routes
app.use('/', router);

// static files location
app.use(express.static(__dirname + '/public'));

// start server
app.listen(port, function(){
  console.log('app listening on http://localhost:'+port)
});
