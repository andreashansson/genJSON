var fs = require('fs');

var getValueFromCheckbox = function(email) {

  if (email==="true") {
    return true;
  }
  else {
    return false;
  }
}

var createJSON = function(name, bgcolor, fgcolor, map, connectivity, lang) {

  if (typeof lang==="object") {

    var dataInput = {
      "name": name,
      "bgcolor": bgcolor,
      "fgcolor": fgcolor,
      "languages": lang,
      "connectivity": connectivity,
      "map": map
    }
  }
  else {
    var dataInput = {
      "name": name,
      "bgcolor": bgcolor,
      "fgcolor": fgcolor,
      "default_language": lang,
      "connectivity": connectivity,
      "map": map
    }
  }

  var dataString = JSON.stringify(dataInput);

  var data = fs.readFile("config/" + name + ".json", function(err, data) {
    if(err) {
      //console.error(err);
      console.log("File doesn't exist.");
      console.log("New file is being created.");
      fs.writeFile("config/" + name + ".json", dataString, (err) => {
        if (err) throw err;
        console.log("File " + name + ".json created and saved.");
        console.log("File content:");
        console.log(dataString);
      });
    }
    else {
      //File exist but overwrites with new values.
      fs.writeFile("config/" + name + ".json", dataString, (err) => {
        if (err) throw err;
      });
      console.log(dataString);
    }
  });
}

module.exports.createJSON = createJSON;
module.exports.getValueFromCheckbox = getValueFromCheckbox;
