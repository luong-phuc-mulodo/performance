var jsonfile = require('jsonfile')
var file = './data.json';
var output = './exspect.json';

var check = {
    "110": ["Admin Manager","Client Manager"],
    "100": ["Admin View" , "Client Manager"],
    "210": ["Admin Lock" , "Client Manager"],
    "200": ["Admin Lock" , "Client View"],
    "111": ["Admin Lock" , "Client Lock"],
    "101": ["Admin Lock" , "Client Lock"],
    "211": ["Admin Lock" , "Client Lock"],
    "201": ["Admin Lock" , "Client Lock"]
};

var convertData = function(data){
    var index = {};
    data.forEach(function(item){
        item["rules"] = check[item.group.toString() + item.isManager.toString() + item.isLocked.toString()];
        if(!item.idParent)
            item.users = [];
        index[item.id] = item;
    });
    data.forEach(function(item){
        if(item.idParent)
            index[item.idParent].users.push(item);
    });
    return index;
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
