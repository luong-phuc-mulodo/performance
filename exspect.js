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

var setRule = function(ob){
    ob.rules = check[ob.group.toString() + ob.isManager.toString() + ob.isLocked.toString()];
    return;
}

var convertData = function(data){
    var index = {};
    data.forEach(function(item,i){
        setRule(item);
        if(!item.idParent)
            item.users = [];
        index[item.id] = data[i];
    });
    data.forEach(function(item){
        if(item.idParent)
            index[item.idParent].users.push(item);
    });
    console.log("FINISH CONVERT DATA : " + new Date().toLocaleString());
    return data;
};


jsonfile.readFile(file, function(err, obj) {
  if(!err){
    console.log("START CONVERT DATA : " + new Date().toLocaleString());
    jsonfile.writeFile(output, convertData(obj), function (err) {
        if(!err)
            console.log("FINISH WRITE FILE : " + new Date().toLocaleString());
    });
  }
});
