var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var modul = require('./modules/modules.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.set("view-engine", "ejs");
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res, next) {
  res.render("index.html");
});

app.post("/newportal", function(req, res, next) {

  var name = req.body.name;

  var dataInput = {
    "name": name,
    "bgcolor": req.body.bgcolor,
    "fgcolor": req.body.fgcolor,
    "email_login_field": modul.checkboxValue(req.body.email_login_field)
    //"languages": languages
  }

  var dataString = JSON.stringify(dataInput);

  var data = fs.readFile(name + ".json", function(err, data) {
    if(err) {
      //console.error(err);
      console.log("File doesn't exist.");
      console.log("New file is being created.");
      fs.writeFile(name + ".json", dataString, (err) => {
        if (err) throw err;
        console.log("File " + name + ".json created and saved.");
        console.log("File content:");
        console.log(dataString);
      });
    }
    else {
      //File exist but overwrites with new values.
      fs.writeFile(name + ".json", dataString, (err) => {
        if (err) throw err;
      });
      console.log(dataString);
    }
  });

  res.redirect('/');

});

var port = process.env.port || 3000;
app.listen(port, function() {
  console.log("Server listening on port: " + port);
});
