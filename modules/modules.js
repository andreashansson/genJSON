var fs = require('fs');

var checkboxValue = function(email) {

  if (email==="true") {
    return true;
  }
  else {
    return false;
  }
}

var createJSON = function(name, bgcolor, fgcolor, email, lang) {

  console.log(typeof lang);

  var dataInput = {
    "name": name,
    "bgcolor": bgcolor,
    "fgcolor": fgcolor,
    "email_login_field": email,
    "languages": lang
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
}

module.exports.createJSON = createJSON;
module.exports.checkboxValue = checkboxValue;
