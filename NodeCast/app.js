var express = require('express');
var nforce = require('nforce');
var app = module.exports = express();

var org = nforce.createConnection({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
});

app.engine('.html', require('ejs').__express);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'super mega secret string goes here!' }));
  app.use(org.expressOAuth({onSuccess: '/', onError: '/oauth/error'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  if (req.session.oauth) {
    res.render('castdemosender', {
      oauth: req.session.oauth
    });
  } else {
    res.redirect(org.getAuthUri());
  }
});

var httpPort = 3000;
app.listen(httpPort);
console.log("Express server listening on port %d in %s mode", httpPort, app.settings.env);
