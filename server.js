var app    = require('express')(),
    port   = process.env.PORT || 8080,
    morgan = require('morgan'),
    router = require('./app/routes');


// configure
app.use(morgan('dev'));

//set routes
app.use('/', router);

// start server
app.listen(port, function(){
  console.log('app listening on http://localhost:'+port)
});
