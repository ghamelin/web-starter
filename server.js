var app = require('express')(),
    port = process.env.PORT || 8080,
    morgan = require('morgan');


    // configure
app.use(morgan('dev'));

//set routes
app.get('/', function(req,res){
  res.send('home page');
});

app.get('/premise', function(req,res) {
  res.send('premise page');
});
app.get('/sources', function(req,res){
  res.send('sources page');
});
app.get('/contact', function(req,res){
  res.send('contact page');
})

// start server
app.listen(port, function(){
  console.log('app listening on http://localhost:'+port)
});
