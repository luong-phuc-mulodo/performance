var jsonfile = require('jsonfile')
var file = './data.json';
var output = './result.json';


/*
 *
 */
var convertData = function(data){
    return data[0];
};


console.log(new Date().toLocaleString());
jsonfile.readFile(file, function(err, obj) {
  if(!err){
    jsonfile.writeFile(output, convertData(obj), function (err) {
        if(!err)
            console.log(new Date().toLocaleString());
    });
  }
});