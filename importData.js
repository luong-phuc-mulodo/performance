var jsonfile = require('jsonfile')
var file = './data.json';
var output = './result.json';


/*


[
  {
    id: A1,
    users: [
           {id: "A2", parentId: "A1",group: 1,isManager: 1,isLocked: 0, rules: ["Admin Manager" , "Client Manager"]},
           {id: "A3", parentId: "A1",group: 1,isManager: 0,isLocked: 0, rules: ["Admin View" , "Client Manager"]},
           {id: "A4", parentId: "A1",group: 1,isManager: 1,isLocked: 1, rules: ["Admin Lock" , "Client Lock"]},
    ],
    group: 1,
    isManager: 1,
    isLocked: 0,
    rules: ["Admin Manager" , "Client Manager"]
  },
  {id: "A2", parentId: "A1",group: 1,isManager: 1,isLocked: 0, rules: ["Admin Manager" , "Client Manager"]},
  {id: "A3", parentId: "A1",group: 1,isManager: 0,isLocked: 0, rules: ["Admin View" , "Client Manager"]},
  {id: "A4", parentId: "A1",group: 1,isManager: 1,isLocked: 1, rules: ["Admin Lock" , "Client Lock"]},
]

 */
var convertData = function(data){



    console.log("FINISH CONVERT DATA : " + new Date().toLocaleString());
    return data[0];
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