var jsonfile = require('jsonfile')
var file = './data.json';
var output = './result.json';


var setRule = function(ob) {
  if(ob.isLocked == 1){
    ob.rules = ["Admin Lock" , "Client Lock"];
    return;
  }
  if(ob.group == 1){
    if(ob.isManager == 1){
      ob.rules = ["Admin Manager","Client Manager"];
      return;
    }
    else{
      ob.rules = ["Admin View" , "Client Manager"];
      return;
    }
  }else{
    if(ob.isManager == 1){
      ob.rules = ["Admin Lock" , "Client Manager"];
      return;
    }
    else{
      ob.rules = ["Admin Lock" , "Client View"];
      return;
    }
  }

};

/*


[
  {
    id: A1,
    users: [
           {id: "A2", idParent: "A1",group: 1,isManager: 1,isLocked: 0, rules: ["Admin Manager" , "Client Manager"]},
           {id: "A3", idParent: "A1",group: 1,isManager: 0,isLocked: 0, rules: ["Admin View" , "Client Manager"]},
           {id: "A4", idParent: "A1",group: 1,isManager: 1,isLocked: 1, rules: ["Admin Lock" , "Client Lock"]},
    ],
    group: 1,
    isManager: 1,
    isLocked: 0,
    rules: ["Admin Manager" , "Client Manager"]
  },
  {id: "A2", idParent: "A1",group: 1,isManager: 1,isLocked: 0, rules: ["Admin Manager" , "Client Manager"]},
  {id: "A3", idParent: "A1",group: 1,isManager: 0,isLocked: 0, rules: ["Admin View" , "Client Manager"]},
  {id: "A4", idParent: "A1",group: 1,isManager: 1,isLocked: 1, rules: ["Admin Lock" , "Client Lock"]},
]

 */
var convertData = function(data){

    data.forEach(function(item,i){

      setRule(item);
      if(item.idParent){
        data.forEach(function(parent,i){
          if(item.idParent == parent.id){
            if(parent.users){
              parent.users.push(item);
            }else{
              parent.users = [item];
            }
          }
        });
      }

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