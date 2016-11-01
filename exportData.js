var jsonfile = require('jsonfile')
var file = './data.json';

var index = {};
var data = [];

var totalUsers = 1000000;

var templateAdmin = function(id) {
    return {
        id: id,
        group: 1,
        isManager: 1,
        isLocked: 0
    };
};

var templateClient = function(id,parentId) {
    return {
        id: id,
        idParent: parentId,
        group: Math.floor((Math.random() * 2) + 1),
        isManager: Math.floor((Math.random() * 10) % 2),
        isLocked: Math.floor((Math.random() * 10) % 2)
    };
};

var randomPosition = function(n) {
    return Math.floor((Math.random() * n) + 1);
};

var idAdmin = "";
var idClient = "";
for(i=1;i<=totalUsers;i++){
    idAdmin = 'AD' + randomPosition(100).toString();
    idClient = 'CL' + i.toString();
    if(!index[idAdmin]){
        index[idAdmin] = templateAdmin(idAdmin);
        data.push(index[idAdmin]);
    }
    data.push(templateClient(idClient,idAdmin));
}

jsonfile.writeFile(file, data, function (err) {
  console.error(err);
});

