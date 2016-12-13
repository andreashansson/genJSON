var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var modul = require('./modules/modules.js');
var fs = require('fs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.set("view-engine", "ejs");
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res, next) {
  res.render("index.html");
});

app.get('/iframe', function(req, res, next) {
  res.render("preview/index.html");
});

app.post("/newportal", function(req, res, next) {

  var map = modul.getValueFromCheckbox(req.body.map);
  var connectivity = modul.getValueFromCheckbox(req.body.connectivity);
  var tempLang2 = {}
  var langJSON;

  fs.readFile("public/json/languages.json", function(err, data) {
    var langString = data.toString();
    langJSON = JSON.parse(langString);
    var langKeys = Object.keys(langJSON.languages);
    var langs = req.body.languages;
    console.log(langs);

    if (typeof langs === "string") {
      modul.createJSON(req.body.portalname, req.body.bgcolor, req.body.fgcolor, map, connectivity, langs);
    }
    else {
      for (var i=0; i<langs.length; i++) {
        tempLang2[langs[i]] = langJSON.languages[langs[i]];
      }
      modul.createJSON(req.body.portalname, req.body.bgcolor, req.body.fgcolor, map, connectivity, tempLang2);
    }

  });

  res.redirect('/');

});

var port = process.env.port || 3000;
app.listen(port, function() {
  console.log("Server listening on port: " + port);
});
