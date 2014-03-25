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
  app.use(express.session({ secret: process.env.CLIENT_SECRET }));
  app.use(org.expressOAuth({onSuccess: '/castdemosender.html', onError: '/oauth/error'}));
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
app.get('/castdemosender.html', function(req, res){
  if (req.session.oauth) {
    var query = 'SELECT Id, Name, ControllerType, ControllerKey FROM ApexPage ORDER BY Name';
    org.query({query: query, oauth: req.session.oauth}, function(err, resp) {
      if(!err) {
        res.render('castdemosender', {
          oauth: req.session.oauth,
          pages: resp.records
        });
      } else {
        if (err.errorCode === 'INVALID_SESSION_ID') {
          res.redirect(org.getAuthUri());
        } else {
          res.send(err.message);
        }
      }
    });
  } else {
    res.redirect(org.getAuthUri());
  }
});

app.get('/records', function(req, res){
  var objType = req.query.objType;

  // Need to find the name field, since sobjects
  // like Case don't use 'Name'
  org.getDescribe({
    oauth: req.session.oauth,
    type: objType
  },function(err, resp){
    resp.fields.forEach(function(field, i){
      if (field.nameField) {
        // Get the first 10 records
        var query = 'SELECT Id, '+field.name+
        ' FROM '+objType+
        ' ORDER BY '+field.name+' LIMIT 10';
        org.query({
          query: query, 
          oauth: req.session.oauth
        }, function(err, resp) {
          if(!err) {
            resp.nameField = field.name.toLowerCase();
            res.send(resp);
          } else {
            console.log(err);
            res.send(err.message);
          }
        });
        return false;       
      }
    });
  });
});

var httpPort = Number(process.env.PORT || 3000);
app.listen(httpPort);
console.log("Express server listening on port %d in %s mode", httpPort, app.settings.env);
